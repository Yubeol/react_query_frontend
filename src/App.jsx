import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import HomePage from './no1_pages/HomePage'
import TodoPage from './no1_pages/TodoPage'
import EmployeePage from './no1_pages/EmployeePage'
import SiderBar from './no2_components/layout/SiderBar'
import HeaderBar from './no2_components/layout/HeaderBar'
import LoginPage from './no1_pages/user/LoginPage'
import RegisterPage from './no1_pages/user/RegisterPage'
import styled from 'styled-components'
// import { Provider } from 'react-redux'
import store from './no3_store'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

const queryClient = new QueryClient();

function App() {
  return (
    <BrowserRouter>
        <QueryClientProvider client={queryClient}>
          <Container>
            <HeaderBar />
            <BodyLayout>
              <SiderBar />
              <PageContainer>
                <Routes>
                  <Route path="/login" element={<LoginPage />} />
                  <Route path="/register" element={<RegisterPage />} />
                  <Route path="/" element={<HomePage />} />
                  <Route path="/todo" element={<TodoPage />} />
                  <Route path="/employee" element={<EmployeePage />} />
                </Routes>
              </PageContainer>
            </BodyLayout>
          </Container>
        </QueryClientProvider>
    </BrowserRouter>
  )
}

export default App

const Container = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`

const BodyLayout = styled.div`
  display: flex;
  flex: 1;
`

const PageContainer = styled.main`
  flex: 1;
  padding: 24px;
  background: #f1f5f9;
`