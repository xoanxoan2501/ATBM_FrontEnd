import * as React from 'react'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'
import { Box, Button, TextField } from '@mui/material'
import useGlobalVariableContext from '@/hooks/MyProvider'

import { cloneDeep } from 'lodash'

export default function DenseTable() {
  const { cart, setCartToLocalStorage, setCart } = useGlobalVariableContext()
  const { user } = useGlobalVariableContext()
  const handleRemoveItem = (productId) => {
    const newCart = cart.filter((item) => item.product_id !== productId)
    setCartToLocalStorage(newCart)
    setCart(newCart)
  }
  const handleUpdateItem = (newQuantity, product_id) => {
    const newCart = cloneDeep(cart)

    const item = newCart.find((item) => {
      return item.product_id === product_id
    })
    item.quantity = newQuantity
    setCartToLocalStorage(newCart)
    setCart(newCart)
  }
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
          {cart.map((item) => (
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
                  inputProps={{ min: 1 }} // Đặt số lượng tối thiểu là 1
                  onChange={(e) =>
                    handleUpdateItem(e.target.value, item.product_id)
                  }
                />
              </TableCell>
              <TableCell align="right">{item.price} đ</TableCell>
              <TableCell align="right">
                <Button onClick={() => handleRemoveItem(item.product_id)}>
                  Xóa
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}
