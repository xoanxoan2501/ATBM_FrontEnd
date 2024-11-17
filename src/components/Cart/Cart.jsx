import { Typography, Box, Container } from '@mui/material'

import DenseTable from './DenseTable/DenseTable'
import useGlobalVariableContext from '@/hooks/MyProvider'
import { Button } from 'react-admin'
function formatNumber(number) {
  return number.toLocaleString('vi-VN')
}

const Cart = () => {
  const { cart } = useGlobalVariableContext()
  const { user } = useGlobalVariableContext()

  const totalPrice = cart.reduce((originalPrice, item) => {
    return originalPrice + item.price * item.quantity
  }, 0)
  return (
    <Container>
      <Box sx={{ display: 'flex', justifyContent: 'center' }}>
        <h1>Giỏ hàng của tôi</h1>
      </Box>
      <DenseTable />
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'flex-end',
          marginTop: '20px',
          marginBottom: '20px',
        }}
      >
        <Typography sx={{ fontWeight: 'bold', fontSize: '1.2 rem' }}>
          Tổng tiền: {formatNumber(totalPrice)} đ{' '}
        </Typography>
      </Box>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'flex-end',
          marginTop: '20px',
          marginBottom: '20px',
        }}
      >
        <Button variant="outlined"> Thanh toán</Button>
      </Box>
    </Container>
  )
}

export default Cart
