import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import HomePage from './no1_pages/HomePage'
import TodoPage from './no1_pages/TodoPage'
import EmployeePage from './no1_pages/EmployeePage'
import SiderBar from './no2_components/layout/SiderBar'
import HeaderBar from './no2_components/layout/HeaderBar'
import styled from 'styled-components'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import ProductPage from './no1_pages/sales/ProductPage' 
import 'ag-grid-community/styles/ag-grid.css'
import 'ag-grid-community/styles/ag-theme-alpine.css'
import { ModuleRegistry, AllCommunityModule } from 'ag-grid-community'
import SalesPage from './no1_pages/sales/SalesPage'
ModuleRegistry.registerModules([AllCommunityModule])


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
                  <Route path="/" element={<HomePage />} />
                  <Route path="/todo" element={<TodoPage />} />
                  <Route path="/employee" element={<EmployeePage />} />
                  <Route path="/product" element={<ProductPage />} />
                  <Route path="/sales" element={<SalesPage />} />
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