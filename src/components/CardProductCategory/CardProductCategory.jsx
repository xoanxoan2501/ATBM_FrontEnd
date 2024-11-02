import * as React from 'react'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import CardActionArea from '@mui/material/CardActionArea'
import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'
import useGlobalVariableContext from '@/hooks/MyProvider'
import { toast } from 'react-toastify'
import { cloneDeep } from 'lodash'
import { routes } from '@/config/routeConfig'
export default function CardProductCategory({ product }) {
  const { cart, setCartToLocalStorage, setCart } = useGlobalVariableContext()
  const { user } = useGlobalVariableContext()
  const handleAddToCart = () => {
    const newItem = {
      product_id: product.id,
      product_name: product.name,
      product_image: product.image,
      quantity: 1,
      price: product.price
    }
    const newCart = cloneDeep(cart)
    // Kiểm tra user có tồn tại không
    if (!user) {
      toast.error('Bạn cần đăng nhập để thêm sản phẩm vào giỏ hàng!')
      routes.LoginPage
    }

    // Kiểm tra sản phẩm đã tồn tại trong giỏ hàng chưa
    const existedItem = newCart.find(
      (item) => item.product_id === newItem.product_id
    )
    if (existedItem) {
      existedItem.quantity += 1
      setCartToLocalStorage(newCart)
      setCart(newCart)
      toast.success('Thêm sản phẩm thành công ! ')
      return
    } else {
      setCartToLocalStorage([...newCart, newItem])
      setCart([...newCart, newItem])
      toast.success('Thêm sản phẩm thành công ! ')
    }
  }
  return (
    <Card
      sx={{
        maxWidth: '100%',
        backgroundColor: '#f7f7f7',
        height: '100%',
        borderRadius: '15px',
        padding: '10px'
      }}
    >
      <CardActionArea>
        <CardMedia
          component="img"
          image={product.url}
          alt="Product Image"
          sx={{ height: '300px', objectFit: 'contain' }} // Adjusting image height
        />
        <CardContent>
          {/* Product Information */}
          <Typography
            gutterBottom
            variant="h6"
            component="div"
            sx={{
              display: 'block', // Ensure it's block-level for ellipsis
              width: '100%', // Make it take up full available width
              fontWeight: 'bold',
              textAlign: 'center', // Center text
              overflow: 'hidden', // Hide overflow
              whiteSpace: 'nowrap', // Keep the text in one line
              textOverflow: 'ellipsis' // Add ellipsis at the end of overflowed content
            }}
          >
            {product.content}
          </Typography>

          <Typography
            variant="body2"
            sx={{ textAlign: 'center', color: 'gray', marginBottom: '10px' }}
          >
            {product.color}
          </Typography>

          {/* Capacity Information */}
          <Grid
            container
            spacing={2}
            sx={{ textAlign: 'center', marginBottom: '10px' }}
          >
            <Grid item xs={6}>
              <Typography variant="body2">{product.type1}</Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="body2">{product.type2}</Typography>
            </Grid>
          </Grid>

          {/* Price Information */}
          <Box sx={{ textAlign: 'center' }}>
            <Typography
              variant="body2"
              sx={{ color: 'gray', marginBottom: '15px' }}
            >
              {product.salePrice}
            </Typography>
          </Box>

          {/* Buy Now Button */}
          <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center' }}>
            <Button
              onClick={handleAddToCart}
              variant="contained"
              color="primary"
              sx={{
                backgroundColor: 'black',
                color: 'white',
                borderRadius: '20px',
                padding: '10px 20px'
              }}
            >
              Thêm vào giỏ hàng
            </Button>
          </Grid>
        </CardContent>
      </CardActionArea>
    </Card>
  )
}
