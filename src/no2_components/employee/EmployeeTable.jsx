import React from 'react'
import styled from 'styled-components'
import { useGetEmployee } from '../../no3_store/hooks/useEmployee'

const LABELS = { id: 'ID', name: '이름', email: '이메일', job: '직무', pay: '급여' }

const EmployeeTable = ({selectedId}) => {
    const { data: emp, isLoading, error } = useGetEmployee(selectedId)
    if(isLoading) return <h3>loading...</h3>
    if(error) return <h3>{error.message}</h3>
    return (
        <TableWrap>
            <Table>
                <thead>
                    <tr>
                        {emp && Object.keys(emp).map(key => (
                            <Th key={key}>{LABELS[key] || key}</Th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        {emp && Object.entries(emp).map(([key, value]) => (
                            <Td key={key}>
                                {key === 'pay' ? `${Number(value).toLocaleString()}만원` : value}
                            </Td>
                        ))}
                    </tr>
                </tbody>
            </Table>
        </TableWrap>
    )
}

export default EmployeeTable

const TableWrap = styled.div`
    border-radius: 12px;
    overflow: hidden;
    border: 1px solid #e2e8f0;
    margin-bottom: 20px;
`
const Table = styled.table`
    width: 100%;
    border-collapse: collapse;
`
const Th = styled.th`
    padding: 12px 16px;
    text-align: left;
    font-size: 12px;
    color: #64748b;
    font-weight: 600;
    background: #f8fafc;
    border-bottom: 1px solid #e2e8f0;
    text-transform: uppercase;
    letter-spacing: 0.05em;
`
const Td = styled.td`
    padding: 14px 16px;
    font-size: 14px;
    color: #1e293b;
    border-bottom: 1px solid #f1f5f9;
    &:last-child { color: #6366f1; font-weight: 600; }
`