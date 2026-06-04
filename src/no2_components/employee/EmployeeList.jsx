import React, { useEffect } from "react"
import styled from 'styled-components'
import {
    useAllGetEmployee, useDeleteEmployee
} from '../../no3_store/hooks/useEmployee'

const EmployeeList = ({ selectedId, setSelectedId }) => {

    const { data: empTable = [], isLoading ,error} = useAllGetEmployee(selectedId)
    if (isLoading) return <h3>loading...</h3>
    if (error) return <h3>{error.message}</h3>
    return (
        <Wrapper>
            {empTable.map(item => (
                <EmpButton  
                    key={item.id}
                    $active={selectedId === item.id}
                    onClick={() => setSelectedId(item.id)}
                >
                    <Avatar $active={selectedId === item.id}>
                        {item.name[0]}
                    </Avatar>
                    {item.name}
                </EmpButton>
            ))}
        </Wrapper>
    )
}

export default EmployeeList

const Wrapper = styled.div`
    display: flex;
    gap: 10px;
    margin-bottom: 20px;
    flex-wrap: wrap;
`
const EmpButton = styled.button`
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 8px 16px 8px 8px;
    border-radius: 50px;
    border: 1.5px solid ${({ $active }) => $active ? '#6366f1' : '#e2e8f0'};
    background: ${({ $active }) => $active ? '#eef2ff' : 'white'};
    color: ${({ $active }) => $active ? '#4f46e5' : '#334155'};
    cursor: pointer;
    font-weight: 500;
    font-size: 14px;
    transition: 0.2s;
    &:hover {
        border-color: #6366f1;
        background: #eef2ff;
        color: #4f46e5;
    }
`
const Avatar = styled.div`
    width: 28px;
    height: 28px;
    border-radius: 50%;
    background: ${({ $active }) => $active ? '#6366f1' : '#e2e8f0'};
    color: ${({ $active }) => $active ? 'white' : '#64748b'};
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 13px;
    font-weight: 600;
    transition: 0.2s;
`