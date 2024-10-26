import * as React from 'react';

import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';

import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';

import Paper from '@mui/material/Paper';
import Checkbox from '@mui/material/Checkbox';
import { productsAdminAPI } from '@/apis/productAdminAPI';
import { useEffect } from 'react';
import EnhancedTableHeadProduct from './EnhancedTableHeadProdcut/EnhancedTableHeadProduct';
import EnhancedTableToolbarProduct from './EnhancedTableToolbarProduct/EnhancedTableToolbarProduct';
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  TextField,
  Snackbar,
  Alert,
} from '@mui/material';

const createData = (
  id,
  name,
  description,
  price,
  quantity,
  image,
  Product_id
) => {
  let newRoles = '';

  return {
    id,
    name,
    id,
    name,
    description,
    price,
    quantity,
    image,
    Product_id,
  };
};

// const initialRows = [createData(1, 'Electronics'), createData(2, 'Furniture')];

export default function ProductAdmin() {
  const [order, setOrder] = React.useState('asc');
  const [orderBy, setOrderBy] = React.useState('name');
  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [addProduct, setAddProduct] = React.useState({ name: '' });
  const [dialogOpen, setDialogOpen] = React.useState(false);
  const [isEditing, setIsEditing] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState('');
  const [openErrorSnackbar, setOpenErrorSnackbar] = React.useState(false);

  const [rows, setRows] = React.useState([]);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelected = rows.map((n) => n.id);
      setSelected(newSelected);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, id) => {
    const selectedIndex = selected.indexOf(id);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }

    setSelected(newSelected);
  };

  const handleAddProduct = () => {
    setDialogOpen(true);
    setIsEditing(false);
    setAddProduct({
      name: '',
      id: '',
      name: '',
      description: '',
      price: '',
      quantity: '',
      image: '',
      Product_id: '',
    });
  };

  const handleEditProduct = () => {
    if (selected.length === 1) {
      const ProductToEdit = rows.find((row) => row.id === selected[0]);
      setAddProduct(ProductToEdit);
      setDialogOpen(true);
      setIsEditing(true);
    }
  };

  const handleDeleteProduct = async () => {
    try {
      await Promise.all(
        selected.map(async (products) => {
          await ProductsAdminAPI.deleteProductAPI(products); // Gọi API để xóa product
        })
      );
      const newRows = rows.filter((row) => !selected.includes(row.id));
      setRows(newRows);
      setSelected([]);
    } catch (error) {
      setErrorMessage('Xóa thất bại!');
      setOpenErrorSnackbar(true);
    }
  };

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
      setErrorMessage('Tất cả các trường đều bắt buộc!');
      setOpenErrorSnackbar(true);
      return;
    }

    try {
      if (isEditing) {
        // Cập nhật Product
        await productsAdminAPI.updateProductAPI(addProduct, addProduct.id); // Gọi API để cập nhật người dùng
        const updatedRows = rows.map((row) =>
          row.id === addProduct.id ? addProduct : row
        );
        setRows(updatedRows);
      } else {
        // Thêm Product
        const newProductResponse = await postProductAPI(addProduct); // Gọi API để thêm người dùng
        setRows([...rows, newProductResponse]); // Cập nhật trạng thái với dữ liệu từ API
      }
    } catch (error) {
      const errorMessage = isEditing
        ? 'Cập nhật Product thành công'
        : 'Thêm Product thất bại!';
      setErrorMessage(errorMessage);
      setOpenErrorSnackbar(true);
    }

    setDialogOpen(false);
    setSelected([]);
  };

  const handleCloseSnackbar = () => {
    setOpenErrorSnackbar(false);
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
  };

  const isSelected = (id) => selected.indexOf(id) !== -1;

  const emptyRows =
    rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);

  useEffect(() => {
    productsAdminAPI.getproductsAPI().then((data) => {
      setRows(
        data.data.map((products) =>
          createData(
            products.id,
            products.name,
            products.quantity,
            products.description,
            products.price
          )
        )
      );
    });
  }, []);

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
                  const isItemSelected = isSelected(row.id);
                  const labelId = `enhanced-table-checkbox-${index}`;

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
                      <TableCell
                        component="th"
                        id={labelId}
                        scope="row"
                        padding="none"
                        align="right"
                      >
                        {row.id}
                      </TableCell>
                      <TableCell>{row.name}</TableCell>
                    </TableRow>
                  );
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
              setAddProduct({ ...addProduct, description: event.target.value })
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
              setAddProduct({ ...addProduct, category_id: event.target.value })
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
  );
}
