import React, { useState, useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Container } from '@mui/material';

const columns = [
  { field: 'albumId', headerName: 'Album ID', width: 80 },
  { field: 'id', headerName: 'ID', width: 50 },
  { field: 'thumbnailUrl', headerName: 'Thumbnail', width: 300 },
  { field: 'title', headerName: 'Title', width: 400 },
  { field: 'url', headerName: 'URL', width: 300 }
]

const Table = () => {

  const [tableData, setTableData] = useState([])

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/photos?_limit=100")
      .then((data) => data.json())
      .then((data) => setTableData(data))
  }, [])

  console.log(tableData)

  return (
    <div>
      <Container fixed>
        <div style={{ height: 700, width: '100%' }}>
          <DataGrid
            rows={tableData}
            columns={columns}
            pageSize={20}
            rowsPerPageOptions={[20]}
          />
        </div>
      </Container>
    </div>
  )
}

export default Table;