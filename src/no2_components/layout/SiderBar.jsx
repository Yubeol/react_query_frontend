import React, { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import styled from 'styled-components'

const Aside = styled.aside`
  width: 220px;
  min-height: calc(100vh - 60px);
  background-color: #13131f;
  padding: 24px 12px;
  transition: transform 0.3s ease;

  @media (max-width: 768px) {
    position: fixed;
    top: 60px;
    left: 0;
    z-index: 99;
    transform: ${({ $open }) => $open ? 'translateX(0)' : 'translateX(-100%)'};
  }
`

const NavItem = styled.div`
  margin-bottom: 8px;
`

const NavLink = styled(Link)`
  display: block;
  padding: 12px 16px;
  border-radius: 10px;
  text-decoration: none;
  color: ${({ $active }) => $active ? 'white' : '#aaa'};
  background: ${({ $active }) => $active ? '#7c6af7' : 'transparent'};
  font-size: 15px;
  transition: all 0.2s;

  &:hover {
    background: ${({ $active }) => $active ? '#7c6af7' : '#2a2a3d'};
    color: white;
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
  color: white;
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

const menus = [
  { path: '/', label: '🏠 Home' },
  { path: '/todo', label: '📝 할일' },
  { path: '/employee', label: '👤 고용인 정보' },
]

const SiderBar = () => {
  const location = useLocation()
  const [open, setOpen] = useState(false)

  return (
    <>
      <HamburgerButton onClick={() => setOpen(!open)}>☰</HamburgerButton>
      <Overlay $open={open} onClick={() => setOpen(false)} />
      <Aside $open={open}>
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