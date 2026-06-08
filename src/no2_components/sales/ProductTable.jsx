import React, { useState, useMemo } from 'react'
import { useAllGetProduct, useDeleteProduct, usePostRegisterProduct, usePutUpdateProduct } from '../../no3_store/hooks/useProduct'
import { AgGridReact } from 'ag-grid-react'
import ProductModal from './ProductModal'
import styled from 'styled-components'

const ProductTable = () => {
    const [open, setOpen] = useState(false);
    const [newProduct, setNewProduct] = useState(null);
    const { data: productList = [], isLoading, error } = useAllGetProduct();
    const registerMutation = usePostRegisterProduct();
    const updateMutation = usePutUpdateProduct();
    const DeleteMutation = useDeleteProduct();

    const handleRegister = () => {
        setNewProduct(null)
        setOpen(true)
    }

    const handleDelete = async (id) => {
        if (window.confirm("정말 삭제하시겠습니까?")) {
            await DeleteMutation.mutateAsync(id)
        }
    }

    const handleUpdate = (item) => {
        setNewProduct(item)
        setOpen(true)
    }

    const columnDefs = useMemo(() => ([
        { field: "product_name", headerName: "상품명", flex: 1 },
        { field: "color", headerName: "색상", flex: 1 },
        { field: "cost_price", headerName: "원가", flex: 1 },
        { field: "sale_price", headerName: "판매가", flex: 1 },
        { field: "category_code", headerName: "카테고리", flex: 1 },
        {
            headerName: "상품 관리",
            cellRenderer: (params) => (
                <ActionGroup>
                    <EditButton onClick={() => handleUpdate(params.data)}>수정</EditButton>
                    <DeleteButton onClick={() => handleDelete(params.data.id)}>삭제</DeleteButton>
                </ActionGroup>
            ),
            flex: 1
        },
    ]), [handleDelete, handleUpdate])

    if (isLoading) return <h3>loading</h3>
    if (error) return <h3>{error?.message}</h3>

    return (
        <>
            <TableHeader>
                <TableTitle>상품 관리</TableTitle>
                <RegisterButton onClick={handleRegister}>+ 상품 등록</RegisterButton>
            </TableHeader>
            <GridWrapper className='ag-theme-alpine'>
                <AgGridReact
                    rowData={productList}
                    columnDefs={columnDefs}
                    pagination={true}
                    paginationPageSize={25}
                    paginationPageSizeSelector={false}
                    animateRows={true}
                    getRowId={(params) => params.data.id.toString()}
                />
            </GridWrapper>
            <ProductModal
                open={open}
                setOpen={setOpen}
                initialValues={newProduct}
                onSubmit={async (productObj) => {
                    if (newProduct) {
                        await updateMutation.mutateAsync({ ...productObj, id: newProduct.id })
                    } else {
                        await registerMutation.mutateAsync(productObj)
                    }
                }}
            />
        </>
    )
}

export default ProductTable

const TableHeader = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 16px 0;
    margin-bottom: 12px;
`
const TableTitle = styled.h2`
    font-size: 20px;
    font-weight: 700;
    color: #1e293b;
    margin: 0;
`
const RegisterButton = styled.button`
    padding: 9px 18px;
    background: #7c6af7;
    color: white;
    border: none;
    border-radius: 8px;
    font-size: 14px;
    font-weight: 600;
    cursor: pointer;
    transition: 0.2s;
    &:hover { background: #6a5be0; }
`
const GridWrapper = styled.div`
    height: 800px;
    width: 100%;
`
const ActionGroup = styled.div`
    display: flex;
    gap: 6px;
    align-items: center;
    height: 100%;
`
const EditButton = styled.button`
    padding: 4px 10px;
    background: transparent;
    color: #7c6af7;
    border: 1px solid #7c6af7;
    border-radius: 6px;
    font-size: 12px;
    cursor: pointer;
    transition: 0.2s;
    &:hover { background: #7c6af7; color: white; }
`
const DeleteButton = styled.button`
    padding: 4px 10px;
    background: transparent;
    color: #f87171;
    border: 1px solid #f87171;
    border-radius: 6px;
    font-size: 12px;
    cursor: pointer;
    transition: 0.2s;
    &:hover { background: #f87171; color: white; }
`