import * as React from 'react';

import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';

import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import { stableSort, getComparator } from '@/utils/formatters';
import Paper from '@mui/material/Paper';
import Checkbox from '@mui/material/Checkbox';
import { categoryAdminAPI } from '@/apis/categoryAdminAPI';
import { useEffect } from 'react';
import EnhancedTableHeadCateGory from './EnhancedTableHead/EnhancedTableHead';
import EnhancedTableToolbarCateGogy from './EnhancedTableToobar/EnhancedTableToobar';
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

const createData = (id, name) => {
  let newRoles = '';

  return { id, name };
};

// const initialRows = [createData(1, 'Electronics'), createData(2, 'Furniture')];

export default function CategoryAdmin() {
  const [order, setOrder] = React.useState('asc');
  const [orderBy, setOrderBy] = React.useState('name');
  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [addCategory, setAddCategory] = React.useState({ name: '' });
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

  const handleAddCategory = () => {
    setDialogOpen(true);
    setIsEditing(false);
    setAddCategory({ name: '' });
  };

  const handleEditCategory = () => {
    if (selected.length === 1) {
      const categoryToEdit = rows.find((row) => row.id === selected[0]);
      setAddCategory(categoryToEdit);
      setDialogOpen(true);
      setIsEditing(true);
    }
  };

  const handleDeleteCategory = async () => {
    try {
      await Promise.all(
        selected.map(async (categoriesId) => {
          await categoryAdminAPI.deleteCategoryAPI(categoriesId); // Gọi API để xóa categogies
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

  const handleSaveCategory = async () => {
    // Kiểm tra các trường bắt buộc
    if (!addCategory.name) {
      setErrorMessage('Tất cả các trường đều bắt buộc!');
      setOpenErrorSnackbar(true);
      return;
    }

    try {
      if (isEditing) {
        // Cập nhật category
        await categoryAdminAPI.updateCategoryAPI(addCategory, addCategory.id); // Gọi API để cập nhật category
        const updatedRows = rows.map((row) =>
          row.id === addCategory.id ? addCategory : row
        );
        setRows(updatedRows);
      } else {
        // Thêm category
        const newCategoryResponse =
          await categoryAdminAPI.postCategoryAPI(addCategory); // Gọi API để thêm category
        const data = newCategoryResponse.data;
        setRows([...rows, data]); // Cập nhật trạng thái với dữ liệu từ API
      }
    } catch (error) {
      const errorMessage = isEditing
        ? 'Cập nhật category thành công'
        : 'Thêm category thất bại!';
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
    categoryAdminAPI.getCategoryAPI().then((data) => {
      setRows(
        data.data.map((categories) =>
          createData(categories.id, categories.name)
        )
      );
    });
  }, []);

  return (
    <Box sx={{ width: '100%' }}>
      <Paper sx={{ width: '100%', mb: 2 }}>
        <EnhancedTableToolbarCateGogy
          numSelected={selected.length}
          onDelete={handleDeleteCategory}
          onAdd={handleAddCategory}
          onEdit={handleEditCategory}
        />
        <TableContainer>
          <Table
            sx={{ minWidth: 750 }}
            aria-labelledby="tableTitle"
            size="medium"
          >
            <EnhancedTableHeadCateGory
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
        <DialogTitle>
          {isEditing ? 'Edit Category' : 'Add Category'}
        </DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Category Name"
            type="text"
            fullWidth
            value={addCategory.name}
            onChange={(event) =>
              setAddCategory({ ...addCategory, name: event.target.value })
            }
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button onClick={handleSaveCategory} color="primary">
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
