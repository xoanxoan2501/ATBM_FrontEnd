import * as React from 'react'
import PropTypes from 'prop-types'
import { userAPI } from '@/apis/UserAPI'
import Box from '@mui/material/Box'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import { toast } from 'react-toastify'
import TablePagination from '@mui/material/TablePagination'
import TableRow from '@mui/material/TableRow'

import Paper from '@mui/material/Paper'
import Checkbox from '@mui/material/Checkbox'

import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  TextField,
  Snackbar,
  CircularProgress,
  Typography,
  Alert,
} from '@mui/material'
import { useEffect } from 'react'
import { stableSort, getComparator } from '@/utils/formatters'
import EnhancedTableToolbar from './EnhancedTableToobar/EnhancedTableToobar'
import EnhancedTableHead from './EnhancedTableHead/EnhancedTableHead'
import { date } from 'zod'
import { authAPI } from '@/apis/authAPI'
const createData = (id, email, firstname, lastname, dob, roles) => {
  let newRoles = ''
  roles.map((role) => (newRoles += role + ' '))
  return { id, email, firstname, lastname, dob, roles: newRoles }
}
export default function User() {
  const [order, setOrder] = React.useState('asc')
  const [orderBy, setOrderBy] = React.useState('email')
  const [selected, setSelected] = React.useState([])
  const [page, setPage] = React.useState(0)
  const [rowsPerPage, setRowsPerPage] = React.useState(5)
  const [editUser, setEditUser] = React.useState(null)
  const [addUser, setAddUser] = React.useState({
    email: '',
    firstname: '',
    lastname: '',
    dob: '',
    roles: '',
    password: '',
  })
  const [dialogOpen, setDialogOpen] = React.useState(false)
  const [isEditing, setIsEditing] = React.useState(false)
  const [errorMessage, setErrorMessage] = React.useState('')
  const [openErrorSnackbar, setOpenErrorSnackbar] = React.useState(false)

  const [rows, setRows] = React.useState([])

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc'
    setOrder(isAsc ? 'desc' : 'asc')
    setOrderBy(property)
  }

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelected = rows.map((n) => n.id)
      setSelected(newSelected)
      return
    }
    setSelected([])
  }

  const handleClick = (event, id) => {
    const selectedIndex = selected.indexOf(id)
    let newSelected = []

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id)
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1))
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1))
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      )
    }

    setSelected(newSelected)
  }

  const handleChangePage = (event, newPage) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10))
    setPage(0)
  }

  const handleAddUser = () => {
    setDialogOpen(true)
    setIsEditing(false)
    setAddUser({
      email: '',
      firstname: '',
      lastname: '',
      dob: '',
      roles: '',
      password: '',
    })
  }

  const handleEditUser = () => {
    if (selected.length === 1) {
      const userToEdit = rows.find((row) => row.id === selected[0])
      setAddUser(userToEdit)
      setDialogOpen(true)
      setIsEditing(true)
    }
  }

  // const handleDeleteUser = async () => {
  //   try {
  //     await Promise.all(
  //       selected.map(async (userId) => {
  //         await userAPI.deleteUserAPI(userId); // Gọi API để xóa người dùng
  //       })
  //     );
  //     const newRows = rows.filter((row) => !selected.includes(row.id));
  //     setRows(newRows);
  //     setSelected([]);
  //   } catch (error) {
  //     setErrorMessage('Xóa người dùng thất bại!');
  //     setOpenErrorSnackbar(true);
  //   }
  // };

  const handleDeleteUser = async () => {
    // Hiển thị thông báo xác nhận
    const confirmDelete = window.confirm(
      'Bạn có chắc chắn muốn xóa người dùng này không?'
    )

    // Nếu người dùng chọn "Cancel", thoát khỏi hàm mà không xóa
    if (!confirmDelete) return

    try {
      // Tiến hành xóa nếu người dùng chọn "OK"
      await Promise.all(
        selected.map(async (userId) => {
          await userAPI.deleteUserAPI(userId) // Gọi API để xóa người dùng
          toast.success('Xóa thành công')
        })
      )

      // Cập nhật danh sách người dùng sau khi xóa
      const newRows = rows.filter((row) => !selected.includes(row.id))
      setRows(newRows)
      setSelected([])
    } catch (error) {
      // Hiển thị thông báo lỗi nếu xóa thất bại
      toast.success('Xóa thất bại ')
      setOpenErrorSnackbar(true)
    }
  }

  const handleSaveUser = async () => {
    // Kiểm tra các trường bắt buộc
    if (
      !addUser.email ||
      !addUser.firstname ||
      !addUser.lastname ||
      !addUser.dob ||
      !addUser.roles ||
      !addUser.password
    ) {
      setErrorMessage('Tất cả các trường đều bắt buộc!')
      setOpenErrorSnackbar(true)
      return
    }

    try {
      if (isEditing) {
        // Cập nhật người dùng
        await userAPI.updateUserAPI(addUser, addUser.id) // Gọi API để cập nhật người dùng
        const updatedRows = rows.map((row) =>
          row.id === addUser.id ? addUser : row
        )
        setRows(updatedRows)
        toast.success('Cập nhật người dùng thành công!')
      } else {
        // Thêm người dùng mới
        const newUserResponse = await userAPI.postUserAPI(addUser) // Gọi API để thêm người dùng
        setRows([...rows, newUserResponse]) // Cập nhật trạng thái với dữ liệu từ API
        toast.success('Thêm người dùng thành công!')
      }
    } catch (error) {
      const errorMessage = isEditing
        ? 'Cập nhật người dùng thất bại!'
        : 'Thêm người dùng thất bại!'
      setErrorMessage(errorMessage)
      setOpenErrorSnackbar(true)
    }

    setDialogOpen(false)
    setSelected([])
  }

  const handleCloseSnackbar = () => {
    setOpenErrorSnackbar(false)
  }

  const handleCloseDialog = () => {
    setDialogOpen(false)
  }

  const isSelected = (id) => selected.indexOf(id) !== -1

  const emptyRows =
    rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage)
  useEffect(() => {
    userAPI.getUsersAPI().then((data) => {
      setRows(
        data.data.map((user) =>
          createData(
            user.id,
            user.email,
            user.firstname,
            user.lastname,
            user.dob,
            user.roles
          )
        )
      )
    })
  }, [])

  // Kiểm tra `rows.length` để xác định xem có dữ liệu chưa
  if (rows.length === 0) {
    return (
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          minHeight: '100vh',
          width: '100vh',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <CircularProgress />
        <Typography>Loading .... </Typography>
      </Box>
    )
  }
  return (
    <Box sx={{ width: '100%' }}>
      <Paper sx={{ width: '100%', mb: 2 }}>
        <EnhancedTableToolbar
          numSelected={selected.length}
          onDelete={handleDeleteUser}
          onAdd={handleAddUser}
          onEdit={handleEditUser}
        />
        <TableContainer>
          <Table
            sx={{ minWidth: 750 }}
            aria-labelledby="tableTitle"
            size={'medium'}
          >
            <EnhancedTableHead
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              rowCount={rows.length}
            />
            <TableBody>
              {stableSort(rows, getComparator(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => {
                  const isItemSelected = isSelected(row.id)
                  const labelId = `enhanced-table-checkbox-${index}`

                  return (
                    <TableRow
                      hover
                      onClick={(event) => handleClick(event, row.id)}
                      role="checkbox"
                      aria-checked={isItemSelected}
                      tabIndex={-1}
                      key={row.id}
                      selected={isItemSelected}
                    >
                      <TableCell padding="checkbox">
                        <Checkbox
                          color="primary"
                          checked={isItemSelected}
                          inputProps={{
                            'aria-labelledby': labelId,
                          }}
                        />
                      </TableCell>
                      <TableCell
                        component="th"
                        id={labelId}
                        scope="row"
                        padding="none"
                      >
                        {row.email}
                      </TableCell>
                      <TableCell align="left">{row.firstname}</TableCell>
                      <TableCell align="left">{row.lastname}</TableCell>
                      <TableCell align="left">{row.dob}</TableCell>
                      <TableCell align="left">{row.roles}</TableCell>
                    </TableRow>
                  )
                })}
              {emptyRows > 0 && (
                <TableRow
                  style={{
                    height: 53 * emptyRows,
                  }}
                >
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>

      {/* Dialog for Add/Edit */}
      <Dialog open={dialogOpen} onClose={handleCloseDialog}>
        <DialogTitle>{isEditing ? 'Edit User' : 'Add User'}</DialogTitle>

        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Email"
            type="email"
            fullWidth
            value={addUser.email}
            onChange={(e) =>
              setAddUser((prev) => ({ ...prev, email: e.target.value }))
            }
          />
          <TextField
            margin="dense"
            label="First Name"
            fullWidth
            value={addUser.firstname}
            onChange={(e) =>
              setAddUser((prev) => ({ ...prev, firstname: e.target.value }))
            }
          />
          <TextField
            margin="dense"
            label="Last Name"
            fullWidth
            value={addUser.lastname}
            onChange={(e) =>
              setAddUser((prev) => ({ ...prev, lastname: e.target.value }))
            }
          />
          <TextField
            margin="dense"
            label="Date of Birth"
            type="date"
            fullWidth
            InputLabelProps={{ shrink: true }}
            value={addUser.dob}
            onChange={(e) =>
              setAddUser((prev) => ({ ...prev, dob: e.target.value }))
            }
          />
          <TextField
            margin="dense"
            label="Roles"
            fullWidth
            value={addUser.roles}
            onChange={(e) =>
              setAddUser((prev) => ({ ...prev, roles: e.target.value }))
            }
          />
          <TextField
            margin="dense"
            label="password"
            type="password"
            fullWidth
            value={addUser.password}
            onChange={(e) =>
              setAddUser((prev) => ({ ...prev, password: e.target.value }))
            }
          />
        </DialogContent>

        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button onClick={handleSaveUser}>Save</Button>
        </DialogActions>
      </Dialog>

      {/* Error Snackbar */}
      <Snackbar
        open={openErrorSnackbar}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
      >
        <Alert onClose={handleCloseSnackbar} severity="error">
          {errorMessage}
        </Alert>
      </Snackbar>
    </Box>
  )
}
