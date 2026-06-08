import React, { useMemo } from 'react'
import { useAllGetProduct } from '../../no3_store/hooks/useProduct'
import { AgGridReact } from 'ag-grid-react'

const ProductTable = () => {

    const {data: productList=[], isLoading, error} = useAllGetProduct();
    console.log("product")

    const columnDefs = useMemo(()=>(
        [
        {field: "product_name", headerName: "상품명", flex:1},
        {field: "color", headerName: "색상", flex:1},
        {field: "cost_price", headerName: "원가", flex:1},
        {field: "sale_price", headerName: "판매가", flex:1},
        {field: "category_code", headerName: "카테고리", flex:1},
    ]
),[])

    if(isLoading) return <h3>loading</h3>
    if(error) return <h3>{error?.message}</h3>

  return (
    <div className='ag-theme-alpine' style={{height:"600px", width:"100%"}}>
      <AgGridReact
      rowData={productList}
      columnDefs={columnDefs}
      pagination={true}
      paginationPageSize={25}
      animateRows={true}
      getRowId = {(params) => params.data.id.toString()}
      />
    </div>
  )
}

export default ProductTable
