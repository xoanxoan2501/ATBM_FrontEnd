import * as React from "react";
import {
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  Toolbar,
  Typography,
  Checkbox,
  IconButton,
  Tooltip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  TextField,
  Snackbar,
  Alert,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import PropTypes from "prop-types";

// Simplified row creation function
function createData(id, name) {
  return { id, name };
}

// Initial rows based on id and name only
const initialRows = [
  createData(1, "iphone"),
  createData(2, "television"),
  createData(3, "airpod"),
];

export default function Category() {
  const [rows, setRows] = React.useState(initialRows);
  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [dialogOpen, setDialogOpen] = React.useState(false);
  const [isEditing, setIsEditing] = React.useState(false);
  const [addProduct, setAddProduct] = React.useState({ id: "", name: "" });
  const [openErrorSnackbar, setOpenErrorSnackbar] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState("");

  const handleAddProduct = () => {
    setDialogOpen(true);
    setIsEditing(false);
    setAddProduct({ id: rows.length + 1, name: "" });
  };

  const handleEditProduct = () => {
    if (selected.length === 1) {
      const productToEdit = rows.find((row) => row.id === selected[0]);
      setAddProduct(productToEdit);
      setDialogOpen(true);
      setIsEditing(true);
    }
  };

  const handleDeleteProduct = () => {
    const newRows = rows.filter((row) => !selected.includes(row.id));
    setRows(newRows);
    setSelected([]);
  };

  const handleSaveProduct = () => {
    if (!addProduct.name) {
      setErrorMessage("Name field is required!");
      setOpenErrorSnackbar(true);
      return;
    }

    if (isEditing) {
      const updatedRows = rows.map((row) =>
        row.id === addProduct.id ? addProduct : row
      );
      setRows(updatedRows);
    } else {
      const newProduct = {
        ...addProduct,
        id: rows.length + 1,
      };
      setRows([...rows, newProduct]);
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

  return (
    <Box sx={{ width: "100%" }}>
      <Paper sx={{ width: "100%", mb: 2 }}>
        <Toolbar>
          <Typography variant="h6" id="tableTitle" component="div">
            Product Management
          </Typography>
          <Tooltip title="Add">
            <IconButton onClick={handleAddProduct}>
              <AddIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Edit">
            <IconButton
              onClick={handleEditProduct}
              disabled={selected.length !== 1}
            >
              <EditIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Delete">
            <IconButton onClick={handleDeleteProduct}>
              <DeleteIcon />
            </IconButton>
          </Tooltip>
        </Toolbar>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell padding="checkbox">
                  <Checkbox
                    color="primary"
                    indeterminate={
                      selected.length > 0 && selected.length < rows.length
                    }
                    checked={rows.length > 0 && selected.length === rows.length}
                    onChange={(e) =>
                      setSelected(e.target.checked ? rows.map((n) => n.id) : [])
                    }
                  />
                </TableCell>
                <TableCell>Name</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row) => (
                  <TableRow
                    hover
                    key={row.id}
                    selected={selected.includes(row.id)}
                    onClick={() => setSelected([row.id])}
                  >
                    <TableCell padding="checkbox">
                      <Checkbox
                        color="primary"
                        checked={selected.includes(row.id)}
                      />
                    </TableCell>
                    <TableCell>{row.name}</TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={(e, newPage) => setPage(newPage)}
          onRowsPerPageChange={(e) =>
            setRowsPerPage(parseInt(e.target.value, 10))
          }
        />
      </Paper>

      <Dialog open={dialogOpen} onClose={handleCloseDialog}>
        <DialogTitle>{isEditing ? "Edit Product" : "Add Product"}</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Product Name"
            fullWidth
            value={addProduct.name}
            onChange={(e) =>
              setAddProduct((prev) => ({ ...prev, name: e.target.value }))
            }
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button onClick={handleSaveProduct}>Save</Button>
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
