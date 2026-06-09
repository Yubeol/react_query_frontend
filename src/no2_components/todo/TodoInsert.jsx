import React, { useState } from 'react'
import styled from 'styled-components'
import { useAllPostTodo } from '../../no3_store/hooks/useTodos'

const TodoInsert = () => {
    const [subject, setSubject] = useState('')
    const postMutation = useAllPostTodo()

    const handleChange = (e) => setSubject(e.target.value)

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (!subject.trim()) return
        try {
            await postMutation.mutateAsync({ subject, checked: false })
            setSubject('')
        } catch {
            alert("등록 실패")
        }
    }

    return (
        <Form onSubmit={handleSubmit}>
            <StyledInput
                type="text"
                value={subject}
                onChange={handleChange}
                placeholder='할 일을 입력하세요'
            />
            <AddButton>+ 추가</AddButton>
        </Form>
    )
}

export default TodoInsert

const Form = styled.form`
    display: flex;
    gap: 8px;
    padding: 16px 20px;
    border-bottom: 1px solid #f0f0f0;
    background: #fafafa;
`
const StyledInput = styled.input`
    flex: 1;
    padding: 8px 12px;
    border: 1px solid #d9d9d9;
    border-radius: 6px;
    font-size: 14px;
    outline: none;
    background: white;
    color: #000000d9;
    transition: 0.2s;
    &:focus {
        border-color: #1677ff;
        box-shadow: 0 0 0 2px rgba(22, 119, 255, 0.1);
    }
    &::placeholder { color: #bfbfbf; }
`
const AddButton = styled.button`
    padding: 8px 20px;
    background: #1677ff;
    color: white;
    border: none;
    border-radius: 6px;
    font-size: 14px;
    font-weight: 500;
    cursor: pointer;
    transition: 0.2s;
    white-space: nowrap;
    &:hover { background: #4096ff; }
    &:active { background: #0958d9; }
`