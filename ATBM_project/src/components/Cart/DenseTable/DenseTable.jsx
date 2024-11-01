import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Box, Button, TextField } from '@mui/material';
import useGlobalVariableContext from '@/hooks/MyProvider';

export default function DenseTable() {
  const { cart, setCart } = useGlobalVariableContext();
  const { user } = useGlobalVariableContext();

  // Lọc giỏ hàng của người dùng hiện tại
  const userCart = cart.find((userCart) => userCart.userId === user.id);
  const items = userCart ? userCart.items : [];

  // Hàm xóa sản phẩm khỏi giỏ hàng
  const handleDelete = (id) => {
    const updatedItems = items.filter((item) => item.id !== id);
    const updatedCart = cart.map((userCart) =>
      userCart.userId === user.id
        ? { ...userCart, items: updatedItems }
        : userCart
    );
    setCart(updatedCart);
  };

  // Hàm cập nhật số lượng sản phẩm
  const handleQuantityChange = (id, newQuantity) => {
    if (newQuantity < 1) return; // Không cho phép số lượng nhỏ hơn 1
    const updatedItems = items.map((item) =>
      item.id === id ? { ...item, quantity: newQuantity } : item
    );
    const updatedCart = cart.map((userCart) =>
      userCart.userId === user.id
        ? { ...userCart, items: updatedItems }
        : userCart
    );
    setCart(updatedCart);
  };

  return (
    <TableContainer
      component={Paper}
      sx={{
        maxHeight: '500px',
      }}
    >
      <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            <TableCell>Sản phẩm</TableCell>
            <TableCell align="right">Số lượng</TableCell>
            <TableCell align="right">Đơn giá</TableCell>
            <TableCell align="right">Hành động</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {items.map((item) => (
            <TableRow
              key={item.id}
              sx={{
                '&:last-child td, &:last-child th': { border: 0 },
              }}
            >
              <TableCell
                component="th"
                scope="row"
                sx={{ display: 'flex', alignItems: 'center' }}
              >
                <Box>
                  <img
                    style={{ height: '60px' }}
                    src={item.product_image}
                    alt={item.product_name}
                  />
                </Box>
                <Box>{item.product_name}</Box>
              </TableCell>
              <TableCell align="right">
                <TextField
                  type="number"
                  value={item.quantity}
                  onChange={(e) =>
                    handleQuantityChange(item.id, Number(e.target.value))
                  }
                  inputProps={{ min: 1 }} // Đặt số lượng tối thiểu là 1
                />
              </TableCell>
              <TableCell align="right">{item.price} đ</TableCell>
              <TableCell align="right">
                <Button onClick={() => handleDelete(item.id)} color="error">
                  Xóa
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}