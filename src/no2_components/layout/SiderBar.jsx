import React, { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import styled from 'styled-components'

const menus = [
  { path: '/', label: '🏠 Home' },
  { path: '/todo', label: '📝 할일' },
  { path: '/employee', label: '👤 고용인 정보' },
  { path: '/product', label: '🛒 상품 정보' },
  { path: '/sales', label: '📊 판매 정보' }
]

const SiderBar = () => {
  const location = useLocation()
  const [open, setOpen] = useState(false)

  return (
    <>
      <HamburgerButton onClick={() => setOpen(!open)}>☰</HamburgerButton>
      <Overlay $open={open} onClick={() => setOpen(false)} />
      <Aside $open={open}>
        <MenuTitle>NAVIGATION</MenuTitle>
        {menus.map(({ path, label }) => (
          <NavItem key={path}>
            <NavLink
              to={path}
              $active={location.pathname === path ? 1 : 0}
              onClick={() => setOpen(false)}
            >
              {label}
            </NavLink>
          </NavItem>
        ))}
      </Aside>
    </>
  )
}

export default SiderBar

const Aside = styled.aside`
  width: 220px;
  min-height: calc(100vh - 60px);
  background: #fff;
  padding: 16px 8px;
  border-right: 1px solid #f0f0f0;
  transition: transform 0.3s ease;

  @media (max-width: 768px) {
    position: fixed;
    top: 60px;
    left: 0;
    z-index: 99;
    transform: ${({ $open }) => $open ? 'translateX(0)' : 'translateX(-100%)'};
  }
`
const MenuTitle = styled.p`
  font-size: 11px;
  font-weight: 700;
  color: #bbb;
  letter-spacing: 0.08em;
  padding: 0 12px;
  margin: 0 0 8px;
`
const NavItem = styled.div`
  margin-bottom: 4px;
`
const NavLink = styled(Link)`
  display: flex;
  align-items: center;
  padding: 10px 12px;
  border-radius: 8px;
  text-decoration: none;
  font-size: 14px;
  font-weight: ${({ $active }) => $active ? '600' : '400'};
  color: ${({ $active }) => $active ? '#1677ff' : '#555'};
  background: ${({ $active }) => $active ? '#e6f4ff' : 'transparent'};
  border-right: ${({ $active }) => $active ? '3px solid #1677ff' : '3px solid transparent'};
  transition: all 0.2s;

  &:hover {
    background: #f5f5f5;
    color: #1677ff;
  }
`
const HamburgerButton = styled.button`
  display: none;
  position: fixed;
  top: 14px;
  left: 16px;
  z-index: 200;
  background: transparent;
  border: none;
  color: #333;
  font-size: 24px;
  cursor: pointer;

  @media (max-width: 768px) {
    display: block;
  }
`
const Overlay = styled.div`
  display: none;

  @media (max-width: 768px) {
    display: ${({ $open }) => $open ? 'block' : 'none'};
    position: fixed;
    inset: 0;
    background: rgba(0,0,0,0.5);
    z-index: 98;
  }
`