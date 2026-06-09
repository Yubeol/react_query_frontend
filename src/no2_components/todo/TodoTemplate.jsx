import React from 'react'
import styled from 'styled-components'
import { MdEventNote } from 'react-icons/md'

const TodoTemplate = ({ children }) => {
    return (
        <Wrapper>
            <Header>
                <HeaderLeft>
                    <PageIcon><MdEventNote size={20} /></PageIcon>
                    <HeaderText>
                        <Title>일정 관리</Title>
                        <Subtitle>오늘의 일정을 관리하세요</Subtitle>
                    </HeaderText>
                </HeaderLeft>
            </Header>
            <Box>{children}</Box>
        </Wrapper>
    )
}

export default TodoTemplate

const Wrapper = styled.div`
    padding: 24px;
    min-height: 100vh;
    background: #f5f7fa;
`
const Header = styled.div`
    margin-bottom: 20px;
`
const HeaderLeft = styled.div`
    display: flex;
    align-items: center;
    gap: 12px;
`
const PageIcon = styled.div`
    width: 40px;
    height: 40px;
    background: #e6f4ff;
    border-radius: 8px;
    color: #1677ff;
    display: flex;
    align-items: center;
    justify-content: center;
`
const HeaderText = styled.div``
const Title = styled.h2`
    font-size: 20px;
    font-weight: 600;
    color: #000000d9;
    margin: 0 0 2px;
`
const Subtitle = styled.p`
    font-size: 13px;
    color: #00000073;
    margin: 0;
`
const Box = styled.div`
    background: white;
    border-radius: 8px;
    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.06);
    overflow: hidden;
    border: 1px solid #f0f0f0;
`