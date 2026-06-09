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
            <Td style={{ color: '#00000040', fontWeight: 500 }}>#{item.id}</Td>
            <Td>
                <SubjectCell>
                    <CheckBox onClick={handleToggle}>
                        {item.checked
                            ? <MdCheckBox size={18} color="#1677ff" />
                            : <MdCheckBoxOutlineBlank size={18} color="#d9d9d9" />
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
            <Td style={{ color: '#00000073', fontSize: '13px' }}>{createdAt}</Td>
            <Td>
                <DeleteBtn onClick={handleDelete}>
                    <MdRemoveCircleOutline size={16} />
                </DeleteBtn>
            </Td>
        </Tr>
    )
}

export default TodoListChild

const Tr = styled.tr`
    background: ${({ $checked }) => $checked ? '#fafafa' : 'white'};
    border-bottom: 1px solid #f0f0f0;
    transition: background 0.15s;
    &:hover { background: #e6f4ff; }
    &:last-child { border-bottom: none; }
`
const Td = styled.td`
    padding: 12px 16px;
    font-size: 14px;
    color: #000000d9;
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
    &:hover { transform: scale(1.1); }
`
const SubjectText = styled.span`
    font-size: 14px;
    color: ${({ $checked }) => $checked ? '#00000040' : '#000000d9'};
    text-decoration: ${({ $checked }) => $checked ? 'line-through' : 'none'};
    cursor: text;
    transition: 0.2s;
`
const EditInput = styled.input`
    flex: 1;
    padding: 4px 8px;
    border: 1px solid #1677ff;
    border-radius: 6px;
    font-size: 14px;
    outline: none;
    box-shadow: 0 0 0 2px rgba(22, 119, 255, 0.1);
`
const Badge = styled.span`
    display: inline-block;
    padding: 2px 8px;
    border-radius: 4px;
    font-size: 12px;
    font-weight: 500;
    background: ${({ $checked }) => $checked ? '#f6ffed' : '#e6f4ff'};
    color: ${({ $checked }) => $checked ? '#52c41a' : '#1677ff'};
    border: 1px solid ${({ $checked }) => $checked ? '#b7eb8f' : '#91caff'};
`
const DeleteBtn = styled.div`
    cursor: pointer;
    color: #d9d9d9;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: 0.2s;
    &:hover { color: #ff4d4f; transform: scale(1.1); }
`