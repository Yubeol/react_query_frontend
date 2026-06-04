import React from 'react'
import styled from 'styled-components'

const TodoTemplate = ({ children }) => {
    return (
        <Wrapper>
            <Header>
                <Title>📋 일정 관리</Title>
                <Subtitle>오늘의 일정을 관리하세요</Subtitle>
            </Header>
            <Box>{children}</Box>
        </Wrapper>
    )
}

export default TodoTemplate

const Wrapper = styled.div`
    padding: 32px;
    background: #F5F7FB;
    min-height: 100vh;
`
const Header = styled.div`
    margin-bottom: 24px;
`
const Title = styled.h2`
    font-size: 22px;
    font-weight: 700;
    color: #1e293b;
    margin: 0 0 4px;
`
const Subtitle = styled.p`
    font-size: 14px;
    color: #94a3b8;
    margin: 0;
`
const Box = styled.div`
    background: white;
    border-radius: 20px;
    box-shadow: 0 2px 12px rgba(0, 0, 0, 0.06);
    overflow: hidden;
    border: 1px solid #e2e8f0;
`