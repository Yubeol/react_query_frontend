import React, { useState } from 'react'
import EmployeeList from '../no2_components/employee/EmployeeList'
import EmployeeTable from '../no2_components/employee/EmployeeTable'
import EmployeeRegister from '../no2_components/employee/EmployeeRegister'
import EmployeeUpdate from '../no2_components/employee/EmployeeUpdate'
import styled from 'styled-components'
import { MdPersonAdd, MdEdit, MdDeleteOutline, MdPeople } from 'react-icons/md'
import { useAllGetEmployee, useDeleteEmployee 
} from '../no3_store/hooks/useEmployee'

const EmployeePage = () => {
    const [selectedId, setSelectedId] = useState("");
    const deleteMutation = useDeleteEmployee();
    const [mode, setMode] = useState('')
    const { data: empTable = [] } = useAllGetEmployee()
    const handleDelete = async () => {
        if (!selectedId) {
            alert("삭제할 직원을 선택하세요");
            return
        }
        try {
            await deleteMutation.mutateAsync(selectedId)
            alert("직원 정보가 삭제되었습니다.")
            setSelectedId(null)
        } catch (error) {
            alert("직원 삭제 실패")
        }
    }

    return (
        <PageWrapper>
            <PageHeader>
                <HeaderLeft>
                    <PageIcon><MdPeople size={22} /></PageIcon>
                    <HeaderText>
                        <PageTitle>Employee Management</PageTitle>
                        <PageSubtitle>직원 정보를 관리하세요 · 총 {empTable.length}명</PageSubtitle>
                    </HeaderText>
                </HeaderLeft>
                <ActionGroup>
                    <ActionBtn
                        $variant="register"
                        $active={mode === 'register'}
                        onClick={() => setMode('register')}
                    >
                        <MdPersonAdd size={16} />
                        Add Employee
                    </ActionBtn>
                    <ActionBtn
                        $variant="update"
                        $active={mode === 'update'}
                        onClick={() => setMode('update')}
                    >
                        <MdEdit size={16} />
                        Edit
                    </ActionBtn>
                    <ActionBtn
                        $variant="delete"
                        $active={mode === 'delete'}
                        onClick={() => setMode('delete')}
                    >
                        <MdDeleteOutline size={16} />
                        Delete
                    </ActionBtn>
                </ActionGroup>
            </PageHeader>

            <ContentCard>
                <CardSection>
                    <SectionLabel>직원 선택</SectionLabel>
                    <EmployeeList selectedId={selectedId}
                        setSelectedId={setSelectedId} />
                </CardSection>
                <Divider />
                <EmployeeTable selectedId={selectedId}/>
            </ContentCard>

            {mode === 'register' && (
                <FormSection>
                    <EmployeeRegister />
                </FormSection>
            )}
            {mode === 'update' && (
                <FormSection>
                    <EmployeeUpdate
                        selectedId={selectedId}
                    />
                </FormSection>
            )}
            {mode === 'delete' && (
                <DeleteCard>
                    <DeleteIcon><MdDeleteOutline size={20} /></DeleteIcon>
                    <DeleteText>
                        <DeleteTitle>직원 삭제</DeleteTitle>
                        <DeleteDesc>선택한 직원 정보가 영구적으로 삭제됩니다.</DeleteDesc>
                    </DeleteText>
                    <DeleteConfirmBtn onClick={handleDelete}>삭제 확인</DeleteConfirmBtn>
                </DeleteCard>
            )}
        </PageWrapper>
    )
}

export default EmployeePage

const PageWrapper = styled.div`
    padding: 32px 36px;
    max-width: 1000px;
    min-height: 100vh;
    background: #f8fafc;
`
const PageHeader = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 28px;
    flex-wrap: wrap;
    gap: 16px;
`
const HeaderLeft = styled.div`
    display: flex;
    align-items: center;
    gap: 14px;
`
const PageIcon = styled.div`
    width: 44px;
    height: 44px;
    border-radius: 12px;
    background: linear-gradient(135deg, #6366f1, #818cf8);
    color: white;
    display: flex;
    align-items: center;
    justify-content: center;
`
const HeaderText = styled.div``
const PageTitle = styled.h1`
    font-size: 22px;
    font-weight: 700;
    color: #0f172a;
    margin: 0 0 2px;
    letter-spacing: -0.3px;
`
const PageSubtitle = styled.p`
    font-size: 13px;
    color: #94a3b8;
    margin: 0;
`
const ActionGroup = styled.div`
    display: flex;
    gap: 8px;
`
const ActionBtn = styled.button`
    display: flex;
    align-items: center;
    gap: 6px;
    padding: 9px 16px;
    border-radius: 10px;
    font-size: 13px;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.2s;
    border: 1.5px solid;

    ${({ $variant, $active }) => {
        if ($variant === 'register') return `
            background: ${$active ? '#6366f1' : 'white'};
            color: ${$active ? 'white' : '#6366f1'};
            border-color: ${$active ? '#6366f1' : '#e0e7ff'};
            &:hover { background: #6366f1; color: white; border-color: #6366f1; }
        `
        if ($variant === 'update') return `
            background: ${$active ? '#0ea5e9' : 'white'};
            color: ${$active ? 'white' : '#0ea5e9'};
            border-color: ${$active ? '#0ea5e9' : '#e0f2fe'};
            &:hover { background: #0ea5e9; color: white; border-color: #0ea5e9; }
        `
        if ($variant === 'delete') return `
            background: ${$active ? '#ef4444' : 'white'};
            color: ${$active ? 'white' : '#ef4444'};
            border-color: ${$active ? '#ef4444' : '#fee2e2'};
            &:hover { background: #ef4444; color: white; border-color: #ef4444; }
        `
    }}
`
const ContentCard = styled.div`
    background: white;
    border-radius: 16px;
    border: 1px solid #e2e8f0;
    box-shadow: 0 1px 4px rgba(0,0,0,0.04);
    overflow: hidden;
    margin-bottom: 20px;
`
const CardSection = styled.div`
    padding: 20px 24px 16px;
`
const SectionLabel = styled.p`
    font-size: 11px;
    font-weight: 700;
    color: #94a3b8;
    text-transform: uppercase;
    letter-spacing: 0.08em;
    margin: 0 0 12px;
`
const Divider = styled.div`
    height: 1px;
    background: #f1f5f9;
`
const FormSection = styled.div`
    margin-top: 4px;
`
const DeleteCard = styled.div`
    display: flex;
    align-items: center;
    gap: 16px;
    padding: 20px 24px;
    background: white;
    border: 1.5px solid #fee2e2;
    border-radius: 16px;
    margin-top: 4px;
`
const DeleteIcon = styled.div`
    width: 40px;
    height: 40px;
    border-radius: 10px;
    background: #fef2f2;
    color: #ef4444;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
`
const DeleteText = styled.div`flex: 1;`
const DeleteTitle = styled.p`
    font-size: 14px;
    font-weight: 600;
    color: #0f172a;
    margin: 0 0 2px;
`
const DeleteDesc = styled.p`
    font-size: 13px;
    color: #94a3b8;
    margin: 0;
`
const DeleteConfirmBtn = styled.button`
    padding: 9px 20px;
    border-radius: 10px;
    background: #ef4444;
    color: white;
    border: none;
    font-size: 13px;
    font-weight: 600;
    cursor: pointer;
    transition: 0.2s;
    &:hover { background: #dc2626; }
`