import React, { useState } from 'react'
import styled from 'styled-components'
import { useNavigate } from 'react-router-dom'
import { getCurrentUser, logout } from '../../no3_store/hooks/useUser'
import LoginFormModal from '../user/LoginFormModal'
import RegisterFormModal from '../user/RegisterFormModal'



const HeaderBar = () => {
  const user = getCurrentUser();
  const navigate = useNavigate();
  const [loginOpen, setLoginOpen] = useState(false);
  const [registerOpen, setRegisterOpen] = useState(false);
  const handleLogout = () => {
    logout()
    alert("로그아웃 되었습니다.");
    navigate("/login");
  }

  return (
    <>
      <Header>
        <Logo>Logo</Logo>
        <ButtonGroup>
          {user ?
            <>
              <WelcomeText>{user.name}님</WelcomeText>
              <LogoutButton onClick={handleLogout}>로그아웃</LogoutButton>
            </>
            :
            <>
              <AuthButton onClick={() => setLoginOpen(true)}>로그인</AuthButton>
              <AuthButton onClick={() => setRegisterOpen(true)}>회원가입</AuthButton>
            </>
          }
        </ButtonGroup>
      </Header>
      <LoginFormModal
        open={loginOpen}
        setOpen={setLoginOpen}
      />
      <RegisterFormModal
        open={registerOpen}
        setOpen={setRegisterOpen}
      />
    </>
  )
}

export default HeaderBar


const Header = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 24px;
  height: 60px;
  background-color: #1e1e2f;
  color: white;
  position: sticky;
  top: 0;
  z-index: 100;
`
const Logo = styled.div`
  font-size: 22px;
  font-weight: bold;
  color: #7c6af7;
`
const ButtonGroup = styled.div`
  display: flex;
  gap: 10px;
  align-items: center;
`
const WelcomeText = styled.span`
  color: #a5b4fc;
  font-size: 14px;
  font-weight: 500;
`
const AuthButton = styled.button`
  padding: 8px 16px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 14px;
  &:first-child {
    background: transparent;
    color: white;
    border: 1px solid #7c6af7;
    &:hover { background: #7c6af7; }
  }
  &:last-child {
    background: #7c6af7;
    color: white;
    &:hover { background: #6a5be0; }
  }
`
const LogoutButton = styled.button`
  padding: 8px 16px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 14px;
  background: transparent;
  color: #f87171;
  border: 1px solid #f87171;
  transition: 0.2s;
  &:hover {
    background: #f87171;
    color: white;
  }
`