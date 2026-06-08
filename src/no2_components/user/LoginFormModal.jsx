import React, { useState } from 'react'
import { Modal, Input, Typography, Divider } from 'antd'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import { useLoginUser } from '../../no3_store/hooks/useUser'

const { Title, Text } = Typography;

const initialState = {
    username: "",
    password: ""
}

const LoginForm = ({ open, setOpen }) => {
    const navigate = useNavigate()
    const [user, setUser] = useState(initialState)
    const loginMutation = useLoginUser()
    const handleChange = (e) => {
        const { name, value } = e.target
        setUser(prev => ({ ...prev, [name]: value }))
    }

    const handleLogin = async () => {
        if (!user.username.trim() || !user.password.trim()) {
            alert("아이디와 비밀번호를 입력해주세요.")
            return
        }
        try {
            await loginMutation.mutateAsync(user)
            alert("로그인 성공")
            setOpen(false)
            setUser(initialState)
            navigate("/")
        } catch (error) {
            alert(error?.message || "로그인 실패")
        }
    }

    return (
        <Modal
            open={open}
            onOk={handleLogin}
            onCancel={() => setOpen(false)}
            okText="로그인"
            cancelText="취소"
            confirmLoading={loginMutation.isPending}
            width={450}
            centered
        >
            <Wrapper>
                <Title>로그인</Title>
                <Desc>관리자 계정으로 로그인하세요</Desc>
                <InputGroup>
                    <Label>아이디</Label>
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
            </Wrapper>
        </Modal>
    )
}

export default LoginForm

const Wrapper = styled.div`
    padding: 10px 0;
`
const Desc = styled.p`
    color: #a5b4fc;
    font-size: 14px;
    margin: 0;
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