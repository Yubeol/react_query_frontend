import React, { useState } from 'react'
import { Modal, Input, Typography,Divider } from 'antd'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import { useRegisterUser } from '../../no3_store/hooks/useUser'

const { Title } = Typography;

const initialState = {
    username: "",
    password: "",
    confirmPassword: "",
    age: "",
    email: "",
    city: ""
}

const RegisterForm = ({ open, setOpen }) => {
    const [user, setUser] = useState(initialState)
    const registerMutation = useRegisterUser()
    const navigate = useNavigate()

    const handleChange = (e) => {
        const { name, value } = e.target
        setUser(prev => ({ ...prev, [name]: value }))
    }

    const handleRegister = async () => {
        const { 
            username, 
            password, 
            confirmPassword, 
            email 

        } = user

        if(!username.trim()){
            alert("아이디를 입력하세요.")
            return;
        }
        if(!password.trim()){
            alert("비밀번호를 입력하세요.")
            return;
        }
        if (password !== confirmPassword) {
            alert("비밀번호가 일치하지 않습니다.")
            return
        }
        if(!email.trim()){
            alert("이메일을 입력하세요.")
            return;
        }
        
        const { confirmPassword: _, ...userData } = user;
        try {
            await registerMutation.mutateAsync(userData)
            alert("회원가입 성공")
            setOpen(false)
            setUser(initialState)
            navigate("/")
        } catch (error) {
            alert(error?.message || "회원가입 실패")
        }

    }

    return (
        <>
            <Modal
                open={open}
                onOk={handleRegister}
                onCancel={() => setOpen(false)}
                okText="회원가입"
                cancelText="취소"
                confirmLoading={registerMutation.isPending}
                width={500}
                centered
            >
                <Wrapper>
                    <Title>회원가입</Title>
                    <Desc>새로운 계정을 생성하세요.</Desc>
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
                            placeholder='도시 입력'
                        />
                    </InputGroup>
                    <Divider />

                </Wrapper>

            </Modal>
        </>
    )
}

export default RegisterForm

const Wrapper = styled.div`
    padding: 10px 0
`

const Desc = styled.p`
    color: #a5b4fc;
    font-size: 14px;
    margin: 0;
    text-align: center;
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
