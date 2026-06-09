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
    navigate("/");
  }

  return (
    <>
      <Header>
        <LogoArea>
          <LogoIcon>M</LogoIcon>
          <LogoText>MySystem</LogoText>
        </LogoArea>
        <ButtonGroup>
          {user ? (
            <>
              <UserInfo>
                <Avatar>{user.name?.[0]?.toUpperCase()}</Avatar>
                <WelcomeText>{user.name}님</WelcomeText>
              </UserInfo>
              <LogoutButton onClick={handleLogout}>로그아웃</LogoutButton>
            </>
          ) : (
            <>
              <AuthButton $outline onClick={() => setLoginOpen(true)}>로그인</AuthButton>
              <AuthButton onClick={() => setRegisterOpen(true)}>회원가입</AuthButton>
            </>
          )}
        </ButtonGroup>
      </Header>
      <LoginFormModal open={loginOpen} setOpen={setLoginOpen} />
      <RegisterFormModal open={registerOpen} setOpen={setRegisterOpen} />
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
  background: #fff;
  border-bottom: 1px solid #f0f0f0;
  position: sticky;
  top: 0;
  z-index: 100;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.08);
`
const LogoArea = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`
const LogoIcon = styled.div`
  width: 32px;
  height: 32px;
  background: #1677ff;
  border-radius: 8px;
  color: white;
  font-weight: 700;
  font-size: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
`
const LogoText = styled.div`
  font-size: 18px;
  font-weight: 700;
  color: #1677ff;
  `

const ButtonGroup = styled.div`
  display: flex;
  gap: 10px;
  align-items: center;
`
const UserInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`
const Avatar = styled.div`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: #1677ff;
  color: white;
  font-size: 13px;
  font-weight: 600;
  display: flex;
  align-items: center;
  justify-content: center;
`
const WelcomeText = styled.span`
  color: #333;
  font-size: 14px;
  font-weight: 500;
`
const AuthButton = styled.button`
  padding: 6px 16px;
  border-radius: 6px;
  cursor: pointer;
  font-size: 14px;
  font-weight: 500;
  transition: 0.2s;
  background: ${({ $outline }) => $outline ? 'transparent' : '#1677ff'};
  color: ${({ $outline }) => $outline ? '#1677ff' : 'white'};
  border: 1px solid #1677ff;
  &:hover {
    background: ${({ $outline }) => $outline ? '#e6f4ff' : '#0958d9'};
  }
`
const LogoutButton = styled.button`
  padding: 6px 16px;
  border-radius: 6px;
  cursor: pointer;
  font-size: 14px;
  font-weight: 500;
  background: transparent;
  color: #ff4d4f;
  border: 1px solid #ff4d4f;
  transition: 0.2s;
  &:hover {
    background: #fff1f0;
  }
`