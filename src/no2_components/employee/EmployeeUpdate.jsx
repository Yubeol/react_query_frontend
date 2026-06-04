import React, { useEffect, useState } from 'react'
import { useGetEmployee, usePutUpdateEmployee } from '../../no3_store/hooks/useEmployee'
import { FormCard, FormTitle, Grid, Field, Label, Input, SubmitBtn } from './EmployeeRegister'
import styled from 'styled-components'

const EmployeeUpdate = ({ selectedId }) => {
    const { data: emp, isLoading, error } = useGetEmployee(selectedId)
    const [newEmp, setNewEmp] = useState(emp)

    const updateMutation = usePutUpdateEmployee()
    useEffect(() => {
        emp &&
            setNewEmp(emp)
    }, [emp])

    const handleChange = (e) => {
        const { name, value } = e.target
        setNewEmp(prev => ({ ...prev, [name]: value }))
    }
    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            await updateMutation.mutateAsync(newEmp)
            alert("직원 정보가 수정되었습니다.")
        } catch {
            alert("직원 정보 수정 실패")
        }
    }
    if (isLoading) return <h3>loading...</h3>
    if (error) return <h3>{error.message}</h3>
    if (!newEmp) return null

    return (
        <FormCard onSubmit={handleSubmit}>
            <FormTitle>직원 정보 수정</FormTitle>
            <Grid>
                <Field><Label>이름</Label><Input name="name" value={newEmp.name} onChange={handleChange} placeholder="이름" required /></Field>
                <Field><Label>이메일</Label><Input name="email" value={newEmp.email} onChange={handleChange} placeholder="이메일" required /></Field>
                <Field><Label>직무</Label><Input name="job" value={newEmp.job} onChange={handleChange} placeholder="직무" required /></Field>
                <Field><Label>급여 (만원)</Label><Input name="pay" value={newEmp.pay} onChange={handleChange} placeholder="급여" required /></Field>
            </Grid>
            <SubmitBtn $color="#0ea5e9">수정 완료</SubmitBtn>
        </FormCard>
    )
}

export default EmployeeUpdate