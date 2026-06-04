import React, { useState } from 'react'
import styled from 'styled-components'
import { MdCheckBox, MdCheckBoxOutlineBlank, MdRemoveCircleOutline } from "react-icons/md"
import { usePutUpdateTodo, useDeleteTodo } from '../../no3_store/hooks/useTodos'

const TodoListChild = ({ item }) => {
    const updateMutation = usePutUpdateTodo()
    const deleteMutation = useDeleteTodo()
    const [editing, setEditing] = useState(false)
    const [value, setValue] = useState(item.subject)

    const handleToggle = async () => {
        await updateMutation.mutateAsync({ ...item, checked: !item.checked })
    }
    const handleUpdate = async () => {
        await updateMutation.mutateAsync({ ...item, subject: value })
        setEditing(false)
    }
    const handleDelete = async () => {
        await deleteMutation.mutateAsync(item.id)
    }

    const createdAt = item.createdAt
        ? new Date(item.createdAt).toLocaleDateString('ko-KR')
        : '-'

    return (
        <Tr $checked={item.checked}>
            <Td style={{ color: '#94a3b8', fontWeight: 500 }}>#{item.id}</Td>
            <Td>
                <SubjectCell>
                    <CheckBox onClick={handleToggle}>
                        {item.checked
                            ? <MdCheckBox size={20} color="#7C5CFF" />
                            : <MdCheckBoxOutlineBlank size={20} color="#cbd5e1" />
                        }
                    </CheckBox>
                    {editing ? (
                        <EditInput
                            type="text"
                            value={value}
                            onChange={(e) => setValue(e.target.value)}
                            onBlur={handleUpdate}
                            onKeyDown={(e) => { if (e.key === 'Enter') handleUpdate() }}
                            autoFocus
                        />
                    ) : (
                        <SubjectText $checked={item.checked} onDoubleClick={() => setEditing(true)}>
                            {item.subject}
                        </SubjectText>
                    )}
                </SubjectCell>
            </Td>
            <Td>
                <Badge $checked={item.checked}>
                    {item.checked ? '완료' : '진행중'}
                </Badge>
            </Td>
            <Td style={{ color: '#64748b', fontSize: '13px' }}>{createdAt}</Td>
            <Td>
                <DeleteBtn onClick={handleDelete}>
                    <MdRemoveCircleOutline size={18} />
                </DeleteBtn>
            </Td>
        </Tr>
    )
}

export default TodoListChild

const Tr = styled.tr`
    background: ${({ $checked }) => $checked ? '#fafbff' : 'white'};
    border-bottom: 1px solid #f1f5f9;
    transition: background 0.15s;
    &:hover {
        background: #f8faff;
    }
    &:last-child {
        border-bottom: none;
    }
`
const Td = styled.td`
    padding: 14px 16px;
    font-size: 14px;
    color: #1e293b;
    vertical-align: middle;
`
const SubjectCell = styled.div`
    display: flex;
    align-items: center;
    gap: 10px;
`
const CheckBox = styled.div`
    cursor: pointer;
    display: flex;
    align-items: center;
    flex-shrink: 0;
    transition: transform 0.1s;
    &:hover {
        transform: scale(1.1);
    }
`
const SubjectText = styled.span`
    font-size: 14px;
    color: ${({ $checked }) => $checked ? '#94a3b8' : '#1e293b'};
    text-decoration: ${({ $checked }) => $checked ? 'line-through' : 'none'};
    cursor: text;
    transition: 0.2s;
    line-height: 1.5;
`
const EditInput = styled.input`
    flex: 1;
    padding: 5px 10px;
    border: 1.5px solid #7C5CFF;
    border-radius: 8px;
    font-size: 14px;
    outline: none;
    box-shadow: 0 0 0 3px rgba(124, 92, 255, 0.1);
`
const Badge = styled.span`
    display: inline-block;
    padding: 4px 10px;
    border-radius: 20px;
    font-size: 12px;
    font-weight: 600;
    background: ${({ $checked }) => $checked ? '#f0fdf4' : '#eff6ff'};
    color: ${({ $checked }) => $checked ? '#16a34a' : '#2563eb'};
`
const DeleteBtn = styled.div`
    cursor: pointer;
    color: #cbd5e1;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: 0.2s;
    &:hover {
        color: #ef4444;
        transform: scale(1.1);
    }
`