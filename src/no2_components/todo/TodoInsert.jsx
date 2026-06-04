import React, { useState } from 'react'
import styled from 'styled-components'
import { useAllPostTodo } from '../../no3_store/hooks/useTodos'

const TodoInsert = () => {
    const [subject, setSubject] = useState('')
    const postMutation = useAllPostTodo()

    const handleChange = (e) => {
        setSubject(e.target.value)
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (!subject.trim()) return
        try {
            await postMutation.mutateAsync({ subject, checked: false })
            setSubject('')
            alert("등록 성공")
        } catch {
            alert("등록 실패")
        }
    }

    return (
        <Form onSubmit={handleSubmit}>
            <StyledInput
                type="text"
                name="subject"
                value={subject}
                onChange={handleChange}
                required
                placeholder='할 일을 입력하세요'
            />
            <AddButton>+ 추가</AddButton>
        </Form>
    )
}
export default TodoInsert

const Form = styled.form`
    display: flex;
    gap: 10px;
    padding: 20px 24px;
    border-bottom: 1px solid #e2e8f0;
    background: #f8fafc;
`
const StyledInput = styled.input`
    flex: 1;
    padding: 10px 16px;
    border: 1px solid #e2e8f0;
    border-radius: 12px;
    font-size: 14px;
    outline: none;
    background: white;
    color: #1e293b;
    transition: 0.2s;
    &:focus {
        border-color: #7C5CFF;
        box-shadow: 0 0 0 3px rgba(124, 92, 255, 0.1);
    }
    &::placeholder {
        color: #cbd5e1;
    }
`
const AddButton = styled.button`
    padding: 10px 22px;
    background: #7C5CFF;
    color: white;
    border: none;
    border-radius: 12px;
    font-size: 14px;
    font-weight: 600;
    cursor: pointer;
    transition: 0.2s;
    white-space: nowrap;
    &:hover { background: #6a4de8; }
    &:active { transform: scale(0.98); }
`