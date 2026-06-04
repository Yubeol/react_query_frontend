// EmployeeRegister.jsx
import React, { useState } from 'react'
import styled from 'styled-components'
import {
    usePostRegisterEmployee
} from "../../no3_store/hooks/useEmployee";

const initialEmp = { id: '', name: '', email: '', job: '', pay: '' }


const EmployeeRegister = ({ selectedId }) => {
    const [emp, setEmp] = useState(initialEmp)
    const registerMutation = usePostRegisterEmployee();
    const handleChange = (e) => {
        const { name, value } = e.target
        setEmp(prev => ({ ...prev, [name]: value }))
    }
    const handleSubmit = async (e) => {
        e.preventDefault()
        if (!emp.name || !emp.email || !emp.job || !emp.pay) {
            alert("모든 항목을 입력해주세요."); return
        }
        try {
            await registerMutation.mutateAsync(emp)
            setEmp(initialEmp)
            alert("직원 등록이 완료되었습니다.")
        } catch {
            alert("직원 등록 실패")
        }

    }

    return (
        <FormCard onSubmit={handleSubmit}>
            <FormTitle>새 직원 등록</FormTitle>
            <Grid>
                <Field><Label>이름</Label><Input name="name" value={emp.name} onChange={handleChange} placeholder="홍길동" /></Field>
                <Field><Label>이메일</Label><Input name="email" value={emp.email} onChange={handleChange} placeholder="hong@example.com" /></Field>
                <Field><Label>직무</Label><Input name="job" value={emp.job} onChange={handleChange} placeholder="frontend" /></Field>
                <Field><Label>급여 (만원)</Label><Input name="pay" value={emp.pay} onChange={handleChange} placeholder="500" /></Field>
            </Grid>
            <SubmitBtn $color="#6366f1">직원 등록</SubmitBtn>
        </FormCard>
    )
}

export default EmployeeRegister

export const FormCard = styled.form`
    background: white;
    padding: 28px 32px;
    border-radius: 16px;
    border: 1px solid #e2e8f0;
    box-shadow: 0 1px 4px rgba(0,0,0,0.04);
`
export const FormTitle = styled.h3`
    font-size: 15px;
    font-weight: 700;
    color: #0f172a;
    margin: 0 0 20px;
    padding-bottom: 16px;
    border-bottom: 1px solid #f1f5f9;
`
export const Grid = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 14px;
    margin-bottom: 20px;
    @media (max-width: 600px) { grid-template-columns: 1fr; }
`
export const Field = styled.div``
export const Label = styled.label`
    display: block;
    font-size: 11px;
    font-weight: 700;
    color: #94a3b8;
    text-transform: uppercase;
    letter-spacing: 0.06em;
    margin-bottom: 6px;
`
export const Input = styled.input`
    width: 100%;
    padding: 10px 14px;
    border: 1.5px solid #e2e8f0;
    border-radius: 10px;
    font-size: 14px;
    outline: none;
    box-sizing: border-box;
    color: #0f172a;
    transition: 0.2s;
    &:focus {
        border-color: #6366f1;
        box-shadow: 0 0 0 3px rgba(99,102,241,0.10);
    }
    &::placeholder { color: #cbd5e1; }
`
export const SubmitBtn = styled.button`
    padding: 11px 24px;
    background: ${({ $color }) => $color};
    color: white;
    border: none;
    border-radius: 10px;
    font-size: 14px;
    font-weight: 600;
    cursor: pointer;
    transition: 0.2s;
    &:hover { opacity: 0.88; transform: translateY(-1px); }
    &:active { transform: translateY(0); }
`