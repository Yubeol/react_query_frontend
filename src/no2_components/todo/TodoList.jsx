import React from 'react'
import TodoListChild from './TodoListChild'
import styled from 'styled-components'
import { useAllGetTodo } from '../../no3_store/hooks/useTodos'

const TodoList = () => {
    const { data: todoList = [], isLoading, error } = useAllGetTodo()
    if (isLoading) return <h3>loading...</h3>
    if (error) return <h3>{error.message}</h3>

    return (
        <TableWrap>
            <Table>
                <thead>
                    <tr>
                        <Th style={{ width: '72px' }}>ID</Th>
                        <Th>일정명</Th>
                        <Th style={{ width: '100px' }}>상태</Th>
                        <Th style={{ width: '140px' }}>생성일</Th>
                        <Th style={{ width: '60px' }}></Th>
                    </tr>
                </thead>
                <tbody>
                    {todoList?.map(item => (
                        <TodoListChild key={item.id} item={item} />
                    ))}
                </tbody>
            </Table>
        </TableWrap>
    )
}

export default TodoList

const TableWrap = styled.div`
    overflow: hidden;
`
const Table = styled.table`
    width: 100%;
    border-collapse: collapse;
`
const Th = styled.th`
    padding: 12px 16px;
    text-align: left;
    font-size: 12px;
    color: #00000073;
    font-weight: 600;
    background: #fafafa;
    border-bottom: 1px solid #f0f0f0;
    text-transform: uppercase;
    letter-spacing: 0.05em;
`