import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import { useRegisterUser } from '../../no3_store/hooks/useUser'


const initialState = { username: "", password: "", confirmPassword: "", age: "30", email: "", city: "" }

const RegisterForm = () => {
    const [user, setUser] = useState(initialState)
    const registerMutation = useRegisterUser()
    const navigate = useNavigate()

    const handleChange = (e) => {
        const { name, value } = e.target
        setUser(prev => ({ ...prev, [name]: value }))
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (user.password !== user.confirmPassword) {
            alert("비밀번호가 일치하지 않습니다.")
            return
        }
        const {confirmPassword, ...userData} = user;
        try {
            await registerMutation.mutateAsync(userData)
            alert("회원가입 성공")
            navigate("/login")
        } catch {
            alert("회원가입 실패")
        }

    }

    return (
        <Wrapper>
            <Container>
                <HeaderBox>
                    <Badge>✨ 새 계정 만들기</Badge>
                    <Title>회원가입</Title>
                    <Desc>관리자 포털에 오신 것을 환영합니다</Desc>
                </HeaderBox>
                <Card onSubmit={handleSubmit}>
                    <InputGroup>
                        <Label>사용자 이름</Label>
                        <Input
                            type="text"
                            name="username"
                            value={user.username}
                            onChange={handleChange}
                            placeholder='사용자 이름을 입력하세요'
                        />
                    </InputGroup>
                    <InputGroup>
                        <Label>비밀번호</Label>
                        <Input
                            type="password"
                            name="password"
                            value={user.password}
                            onChange={handleChange}
                            placeholder='비밀번호를 입력하세요'
                        />
                    </InputGroup>
                    <InputGroup>
                        <Label>비밀번호 확인</Label>
                        <Input
                            type="password"
                            name="confirmPassword"
                            value={user.confirmPassword}
                            onChange={handleChange}
                            placeholder='비밀번호를 다시 입력하세요'
                        />
                    </InputGroup>
                    <InputGroup>
                        <Label>나이</Label>
                        <Input
                            type="number"
                            name="age"
                            value={user.age}
                            onChange={handleChange}
                            placeholder='사용자 나이를 입력하세요'
                        />
                    </InputGroup>
                    <InputGroup>
                        <Label>이메일</Label>
                        <Input
                            type="email"
                            name="email"
                            value={user.email}
                            onChange={handleChange}
                            placeholder='사용자 이메일을 입력하세요'
                        />
                    </InputGroup>
                    <InputGroup>
                        <Label>도시</Label>
                        <Input
                            type="city"
                            name="city"
                            value={user.city}
                            onChange={handleChange}
                            placeholder='사용자 도시을 입력하세요'
                        />
                    </InputGroup>

                    <PrimaryButton>가입하기</PrimaryButton>
                    <Divider />
                    <LinkButton type="button" onClick={() => navigate("/login")}>
                        이미 계정이 있으신가요? <span>로그인</span>
                    </LinkButton>
                </Card>
            </Container>
        </Wrapper>
    )
}

export default RegisterForm

const Wrapper = styled.div`
    width: 100%;
    height: 100%;    
    display: flex;
    justify-content: center;
    align-items: center;
    background: #F5F7FB;
    position: relative;
    overflow: hidden;

    &::before {
        content: '';
        position: absolute;
        top: -120px;
        left: -120px;
        width: 480px;
        height: 480px;
        background: radial-gradient(circle, rgba(124, 92, 255, 0.18) 0%, transparent 70%);
        border-radius: 50%;
        pointer-events: none;
    }

    &::after {
        content: '';
        position: absolute;
        bottom: -100px;
        right: -100px;
        width: 420px;
        height: 420px;
        background: radial-gradient(circle, rgba(99, 102, 241, 0.14) 0%, transparent 70%);
        border-radius: 50%;
        pointer-events: none;
    }
`
const Container = styled.div`
    width: 420px;
    display: flex;
    flex-direction: column;
`
const HeaderBox = styled.div`
    background: linear-gradient(135deg, #1e1b4b 0%, #312e81 60%, #4c1d95 100%);
    border-radius: 20px 20px 0 0;
    padding: 32px 36px 28px;
    display: flex;
    flex-direction: column;
    gap: 8px;
`
const Badge = styled.span`
    display: inline-flex;
    align-items: center;
    gap: 6px;
    background: rgba(124, 92, 255, 0.3);
    border: 1px solid rgba(124, 92, 255, 0.5);
    color: #c4b5fd;
    font-size: 12px;
    font-weight: 600;
    padding: 4px 12px;
    border-radius: 20px;
    width: fit-content;
    letter-spacing: 0.04em;
`
const Title = styled.h2`
    color: white;
    font-size: 26px;
    font-weight: 700;
    margin: 0;
`
const Desc = styled.p`
    color: #a5b4fc;
    font-size: 14px;
    margin: 0;
`
const Card = styled.form`
    background: white;
    padding: 32px 36px;
    border-radius: 0 0 20px 20px;
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.08);
    border: 1px solid #e2e8f0;
    border-top: none;
    display: flex;
    flex-direction: column;
`
const InputGroup = styled.div`
    display: flex;
    flex-direction: column;
    gap: 6px;
    margin-bottom: 16px;
`
const Label = styled.label`
    font-size: 13px;
    font-weight: 600;
    color: #475569;
`
const Input = styled.input`
    width: 100%;
    padding: 11px 14px;
    border: 1px solid #e2e8f0;
    border-radius: 12px;
    font-size: 14px;
    outline: none;
    color: #1e293b;
    transition: 0.2s;
    box-sizing: border-box;
    background: #fafbff;
    &:focus {
        border-color: #7C5CFF;
        background: white;
        box-shadow: 0 0 0 3px rgba(124, 92, 255, 0.1);
    }
    &::placeholder { color: #cbd5e1; }
`
const PrimaryButton = styled.button`
    width: 100%;
    padding: 12px;
    background: #7C5CFF;
    color: white;
    border: none;
    border-radius: 12px;
    font-size: 14px;
    font-weight: 600;
    cursor: pointer;
    transition: 0.2s;
    margin-top: 4px;
    &:hover { background: #6a4de8; }
    &:active { transform: scale(0.98); }
`
const Divider = styled.div`
    height: 1px;
    background: #f1f5f9;
    margin: 20px 0 16px;
`
const LinkButton = styled.button`
    background: transparent;
    border: none;
    color: #94a3b8;
    font-size: 13px;
    cursor: pointer;
    text-align: center;
    span {
        color: #7C5CFF;
        font-weight: 600;
        margin-left: 4px;
        &:hover { text-decoration: underline; }
    }
`