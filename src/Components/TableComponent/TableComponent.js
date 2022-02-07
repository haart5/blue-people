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
import Button from '@mui/material/Button';

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
  const [title, setTitle] = useState();
  const [updateId, setUpdateId] = useState(true);
  const [aux, setAux] = useState(true);

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/photos?_limit=100")
      .then((data) => data.json())
      .then((data) => {
        data.map((e) => {
          e.actions = e.id;
          e.fakeId = e.id;
          e.fakeAlbumId = e.albumId;
          return e;
        });
        setRows(data);
      })
  }, [])

  useEffect(() => {
    let interval;
    if (updateId === true) {
      interval = setInterval(() => {
        let newRow = rows;
        for (let i = 0; i < newRow.length; i++) {
          const e = newRow[i];
          e.fakeId = Math.floor(Math.random() * 1000000 + 1);
          e.fakeAlbumId = Math.floor(Math.random() * 1000000 + 1);
        }
        setRows(newRow);
        setAux(!aux);
      }, 2000);
    } else {
      clearInterval(interval);
    }
    return () => {
      clearInterval(interval);
    };
  });

  const changeUpdateId = () => {
    setUpdateId(!updateId);
  }

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const editRow = (e) => {
    let element = e.target.value;
    let editButton = document.getElementById('edit-' + element);
    let doneButton = document.getElementById('done-' + element);
    let textTitle = document.getElementById('text-' + element);
    let inputTitle = document.getElementById('input-' + element);

    editButton.style.display = 'none';
    doneButton.style.display = '';
    textTitle.style.display = 'none';
    inputTitle.style.display = '';

    setTitle(inputTitle.value);

    return 0;
  }

  const updateTitle = (e) => {
    e.preventDefault();

    let element = parseInt(e.target.value);
    let editButton = document.getElementById('edit-' + element);
    let doneButton = document.getElementById('done-' + element);
    let textTitle = document.getElementById('text-' + element);
    let inputTitle = document.getElementById('input-' + element);

    let newRows = rows;
    let objIndex = 0;

    let filtered = newRows.filter((value, index) => {
      if (value.id === element) {
        objIndex = index;
        newRows[objIndex].title = title;
      }
      return newRows;
    });

    editButton.style.display = '';
    doneButton.style.display = 'none';
    textTitle.style.display = '';
    inputTitle.style.display = 'none';

    setRows(filtered);

  }

  const inputHandler = (e) => {
    setTitle(e.target.value);
  }

  const deleteRow = (e) => {
    e.preventDefault();
    let eTarget = parseInt(e.target.value);
    let newRows = rows;

    var filtered = newRows.filter(value => {
      return value.id !== eTarget;
    });

    setRows(filtered);
  }

  return (
    <div style={{ paddingTop: '100px' }} onClick={() => changeUpdateId()}>
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
                    .map((row, index) => {
                      return (
                        <TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
                          <TableCell component="th" scope="row">
                            {row.fakeAlbumId}
                          </TableCell>
                          <TableCell align="left">
                            {row.fakeId}
                          </TableCell>
                          <TableCell align="left">
                            <input
                              style={{
                                width: '500px',
                                display: 'none',
                                fontFamily: 'roboto',
                                fontSize: '14px'
                              }}
                              id={'input-' + row.id}
                              defaultValue={row.title}
                              onChange={inputHandler}
                            />
                            <p id={'text-' + row.id}>{row.title}</p>
                          </TableCell>
                          <TableCell align="left">
                            <Button variant="contained" style={{ marginRight: '10px' }} id={'edit-' + row.id} value={row.actions} onClick={editRow}>Edit</Button>
                            <Button variant="contained" style={{ marginRight: '10px', display: 'none' }} id={'done-' + row.id} value={row.actions} onClick={updateTitle}>Done</Button>
                            <Button variant="contained" style={{ marginRight: '10px' }} id={'remove-' + row.id} value={row.actions} onClick={deleteRow}>Remove</Button>
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