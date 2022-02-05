import React, { useState, useEffect } from 'react';
import { Container } from '@mui/material';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import { Button } from '@mui/material';

export default function TableComponent() {

  const columns = [
    { id: 'albumId', label: 'Album ID', minWidth: 80 },
    { id: 'id', label: 'ID', minWidth: 80 },
    { id: 'title', label: 'Title', minWidth: 600 },
    { id: 'actions', label: 'Actions', minWidth: 300 }
  ];

  const [rows, setRows] = useState([]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(20);

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/photos?_limit=100")
      .then((data) => data.json())
      .then((data) => {
        data.map((e) => {
          e.actions = e.id;
          return e;
        });
        setRows(data);
      })
  }, [])

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const getRowId = (e) => {
    e.preventDefault();
    console.log(e.target.value);
  }

  return (
    <div style={{ paddingTop: '100px' }}>
      <Container fixed>
        <div style={{ height: 700, width: '100%' }}>
          <Paper sx={{ width: '100%', overflow: 'hidden' }}>
            <TableContainer sx={{ maxHeight: 440 }}>
              <Table stickyHeader aria-label="sticky table">
                <TableHead>
                  <TableRow>
                    {columns.map((column) => (
                      <TableCell
                        key={column.id}
                        style={{ minWidth: column.minWidth }}
                      >
                        {column.label}
                      </TableCell>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {rows
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((row) => {
                      return (
                        <TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
                          <TableCell component="th" scope="row">
                            {row.albumId}
                          </TableCell>
                          <TableCell align="left">
                            {row.id}
                          </TableCell>
                          <TableCell align="left">
                            {row.title}
                          </TableCell>
                          <TableCell align="left">
                            <Button variant="contained" style={{ marginRight: '10px' }} key={'edit-' + row.id} value={row.actions} onClick={getRowId}>Edit</Button>
                            <Button variant="contained" style={{ marginRight: '10px' }} key={'remove-' + row.id} value={row.actions}>Remove</Button>
                          </TableCell>
                        </TableRow>
                      );
                    })}
                </TableBody>
              </Table>
            </TableContainer>
            <TablePagination
              rowsPerPageOptions={[20, 50, 100]}
              component="div"
              count={rows.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </Paper>
        </div>
      </Container>

    </div>

  );
}