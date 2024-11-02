import * as React from 'react'

import Box from '@mui/material/Box'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TablePagination from '@mui/material/TablePagination'
import TableRow from '@mui/material/TableRow'
import { categoryAdminAPI } from '@/apis/categoryAdminAPI'
import Paper from '@mui/material/Paper'
import Checkbox from '@mui/material/Checkbox'
import { productsAdminAPI } from '@/apis/productAdminAPI'
import { useEffect } from 'react'
import EnhancedTableHeadProduct from './EnhancedTableHeadProdcut/EnhancedTableHeadProduct'
import EnhancedTableToolbarProduct from './EnhancedTableToolbarProduct/EnhancedTableToolbarProduct'
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  TextField,
  Snackbar,
  Alert,
  CircularProgress,
  Typography
} from '@mui/material'
import { toast } from 'react-toastify'

const createData = (
  id,
  name,
  description,
  price,
  quantity,
  image,
  category_id
) => {
  let newRoles = ''

  return {
    id,
    name,
    description,
    price,
    quantity,
    image,
    category_id
  }
}

// const initialRows = [createData(1, 'Electronics'), createData(2, 'Furniture')];

export default function ProductAdmin() {
  const [order, setOrder] = React.useState('asc')
  const [orderBy, setOrderBy] = React.useState('name')
  const [selected, setSelected] = React.useState([])
  const [page, setPage] = React.useState(0)
  const [rowsPerPage, setRowsPerPage] = React.useState(5)
  const [addProduct, setAddProduct] = React.useState({ name: '' })
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

  const handleAddProduct = () => {
    setDialogOpen(true)
    setIsEditing(false)
    setAddProduct({
      name: '',
      id: '',
      description: '',
      price: '',
      quantity: '',
      image: '',
      category_id: ''
    })
  }

  const handleEditProduct = () => {
    if (selected.length === 1) {
      const ProductToEdit = rows.find((row) => row.id === selected[0])
      setAddProduct(ProductToEdit)
      setDialogOpen(true)
      setIsEditing(true)
    }
  }

  const handleDeleteProduct = async () => {
    const confirmDelete = window.confirm(
      'Bạn có chắc chắn muốn sản phẩm  này không?'
    )
    if (!confirmDelete) return
    try {
      await Promise.all(
        selected.map(async (products) => {
          await productsAdminAPI.deleteproductsAPI(products) // Gọi API để xóa product
          toast.success('Xóa thành công ')
        })
      )
      const newRows = rows.filter((row) => !selected.includes(row.id))
      setRows(newRows)
      setSelected([])
    } catch (error) {
      toast.success('Xóa thất bại ')
      setOpenErrorSnackbar(true)
    }
  }

  const handleSaveProduct = async () => {
    // Kiểm tra các trường bắt buộc
    if (
      !addProduct.name ||
      !addProduct.price ||
      !addProduct.category_id ||
      !addProduct.description ||
      !addProduct.image ||
      !addProduct.quantity
    ) {
      setErrorMessage('Tất cả các trường đều bắt buộc!')
      setOpenErrorSnackbar(true)
      return
    }

    try {
      // Kiểm tra sự tồn tại của category_id
      const categoryExists = await productsAdminAPI.checkCategoryExists(
        addProduct.category_id
      ) // Gọi API để kiểm tra
      if (!categoryExists) {
        setErrorMessage('Category không tồn tại!')
        setOpenErrorSnackbar(true)
        return
      }

      if (isEditing) {
        // Cập nhật Product
        await productsAdminAPI.updateproductsAPI(addProduct, addProduct.id) // Gọi API để cập nhật sản phẩm
        const updatedRows = rows.map((row) =>
          row.id === addProduct.id ? addProduct : row
        )
        setRows(updatedRows)
      } else {
        // Thêm Product
        const response = await productsAdminAPI.postproductsAPI(addProduct) // Gọi API để thêm sản phẩm

        const data = response.data

        setRows([...rows, data]) // Cập nhật trạng thái với dữ liệu từ API
        toast.success('Add new product successfully!')
      }
    } catch (error) {
      const errorMessage = isEditing
        ? 'Cập nhật Product thất bại!'
        : 'Thêm Product thất bại!'
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
    productsAdminAPI.getproductsAPI().then((data) => {
      setRows(
        data.data.map((products) =>
          createData(
            products.id,
            products.name,
            products.quantity,
            products.description,
            products.price,
            products.image,
            products.category_id
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
          alignItems: 'center'
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
        <EnhancedTableToolbarProduct
          numSelected={selected.length}
          onDelete={handleDeleteProduct}
          onAdd={handleAddProduct}
          onEdit={handleEditProduct}
        />
        <TableContainer>
          <Table
            sx={{ minWidth: 750 }}
            aria-labelledby="tableTitle"
            size="medium"
          >
            <EnhancedTableHeadProduct
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              rowCount={rows.length}
            />
            <TableBody>
              {rows
                .slice()
                .sort(
                  (a, b) =>
                    (a[orderBy] < b[orderBy] ? -1 : 1) *
                    (order === 'desc' ? -1 : 1)
                )
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
                          inputProps={{ 'aria-labelledby': labelId }}
                        />
                      </TableCell>
                      {/* <TableCell
                        component="th"
                        id={labelId}
                        scope="row"
                        padding="none"
                        align="right"
                      >
                        {row.id}
                      </TableCell> */}
                      <TableCell>{row.name}</TableCell>
                      <TableCell>{row.description}</TableCell>
                      <TableCell>{row.price}</TableCell>
                      <TableCell>{row.quantity}</TableCell>
                      <TableCell>
                        <img
                          style={{ width: '100px', height: 'auto' }}
                          src={row.image}
                        />
                      </TableCell>
                      {/* <TableCell>{row.category_id}</TableCell> */}
                    </TableRow>
                  )
                })}
              {emptyRows > 0 && (
                <TableRow style={{ height: 53 * emptyRows }}>
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
          onPageChange={(event, newPage) => setPage(newPage)}
          onRowsPerPageChange={(event) =>
            setRowsPerPage(parseInt(event.target.value, 10))
          }
        />
      </Paper>
      <Dialog open={dialogOpen} onClose={handleCloseDialog}>
        <DialogTitle>{isEditing ? 'Edit Product' : 'Add Product'}</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Product Name"
            type="text"
            fullWidth
            value={addProduct.name}
            onChange={(event) =>
              setAddProduct({ ...addProduct, name: event.target.value })
            }
          />
          <TextField
            autoFocus
            margin="dense"
            label="description"
            type="text"
            fullWidth
            value={addProduct.description}
            onChange={(event) =>
              setAddProduct({
                ...addProduct,
                description: event.target.value
              })
            }
          />
          <TextField
            autoFocus
            margin="dense"
            label="price"
            type="text"
            fullWidth
            value={addProduct.price}
            onChange={(event) =>
              setAddProduct({ ...addProduct, price: event.target.value })
            }
          />
          <TextField
            autoFocus
            margin="dense"
            label="quantity"
            type="text"
            fullWidth
            value={addProduct.quantity}
            onChange={(event) =>
              setAddProduct({ ...addProduct, quantity: event.target.value })
            }
          />
          <TextField
            autoFocus
            margin="dense"
            label="image"
            type="text"
            fullWidth
            value={addProduct.image}
            onChange={(event) =>
              setAddProduct({ ...addProduct, image: event.target.value })
            }
          />
          <TextField
            autoFocus
            margin="dense"
            label="category_id"
            type="text"
            fullWidth
            value={addProduct.category_id}
            onChange={(event) =>
              setAddProduct({
                ...addProduct,
                category_id: event.target.value
              })
            }
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button onClick={handleSaveProduct} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
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
