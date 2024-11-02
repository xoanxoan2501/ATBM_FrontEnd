import Cart from '../../components/Cart/Cart'
import { Box, Typography } from '@mui/material'
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace'
import LocalMallIcon from '@mui/icons-material/LocalMall'

const ShoppingCart = () => {
  return (
    <>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '15px',
          borderBottom: '1px solid #ccc',
          cursor: 'pointer'
        }}>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center'
          }}>
          <KeyboardBackspaceIcon />
          <Typography>Continue Shopping</Typography>
        </Box>
        <LocalMallIcon />
      </Box>
      <Cart />
    </>
  )
}

export default ShoppingCart