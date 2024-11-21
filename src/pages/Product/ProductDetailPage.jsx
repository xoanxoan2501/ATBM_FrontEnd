import React, { useEffect, useState } from 'react'
import {
  Container,
  Paper,
  Grid,
  Box,
  Typography,
  CircularProgress,
  Button,
} from '@mui/material'
import { makeStyles } from '@mui/styles'
import Slider from '../../components/Slider/Slider'
import { productsAdminAPI } from '@/apis/productAdminAPI'
import { useParams, useNavigate } from 'react-router-dom'
import { formatNumber } from '@/utils/formatters'
import { toast } from 'react-toastify'
import { cloneDeep } from 'lodash'
import useGlobalVariableContext from '@/hooks/MyProvider'

const useStyles = makeStyles(() => ({
  left: {
    width: '50%',
    '@media (max-width: 960px)': {
      width: '100%',
    },
  },
  right: {
    flex: '1 1 0',
    padding: '20px',
  },
  quantityBox: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    marginTop: '10px',
    '& span': {
      cursor: 'pointer',
      padding: '10px',
      border: '1px solid #ccc',
      borderRadius: '5px',
      textAlign: 'center',
      width: '30px',
      height: '30px',
      lineHeight: '30px',
      userSelect: 'none',
      transition: 'background-color 0.3s',
      '&:hover': {
        backgroundColor: '#f0f0f0',
      },
    },
    '& input': {
      width: '50px',
      textAlign: 'center',
      border: '1px solid #ccc',
      borderRadius: '5px',
      padding: '5px',
    },
  },
  description: {
    marginTop: '20px',
    padding: '20px',
    background: '#f9f9f9',
    borderRadius: '10px',
  },
}))

const ProductDetailPage = () => {
  const classes = useStyles()
  const [product, setProduct] = useState(null)
  const [quantity, setQuantity] = useState(1) // Default quantity is 1
  const { productId } = useParams()
  const { cart, setCartToLocalStorage, setCart, user } =
    useGlobalVariableContext()
  const navigate = useNavigate()

  useEffect(() => {
    productsAdminAPI.getProductDetail(productId).then((response) => {
      setProduct(response.data)
    })
  }, [productId])

  const handleQuantityChange = (type) => {
    setQuantity((prevQuantity) =>
      type === 'increment' ? prevQuantity + 1 : Math.max(1, prevQuantity - 1)
    )
  }

  const handleAddToCart = () => {
    if (!user) {
      toast.error('Bạn cần đăng nhập để thêm sản phẩm vào giỏ hàng!')
      navigate('/login')
      return
    }

    const newItem = {
      product_id: product.id,
      product_name: product.name,
      product_image: product.image,
      quantity,
      price: product.price,
    }

    const newCart = cloneDeep(cart)
    const existedItem = newCart.find(
      (item) => item.product_id === newItem.product_id
    )

    if (existedItem) {
      existedItem.quantity += quantity
    } else {
      newCart.push(newItem)
    }

    setCartToLocalStorage(newCart)
    setCart(newCart)
    toast.success('Thêm sản phẩm vào giỏ hàng thành công!')
  }

  if (!product) {
    return (
      <Box
        sx={{
          width: '100%',
          height: '400px',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'column',
        }}
      >
        <CircularProgress />
        <Typography sx={{ marginTop: '10px' }}>Đang load dữ liệu...</Typography>
      </Box>
    )
  }

  return (
    <Box>
      <Container maxWidth="lg">
        <Paper elevation={3} sx={{ padding: '20px', borderRadius: '10px' }}>
          <Grid container spacing={4}>
            {/* Left Section */}
            <Grid item className={classes.left}>
              <Box position="relative">
                <Slider product={product} />
              </Box>
            </Grid>

            {/* Right Section */}
            <Grid item className={classes.right}>
              <Box>
                <Typography
                  variant="h3"
                  sx={{ fontWeight: 'bold', marginBottom: '20px' }}
                >
                  {product.name}
                </Typography>

                <Typography
                  variant="h5"
                  sx={{ color: '#1976d2', marginBottom: '10px' }}
                >
                  Giá tiền: {formatNumber(product.price)} VNĐ
                </Typography>

                <Typography variant="h6" sx={{ marginBottom: '20px' }}>
                  Số lượng tồn kho: {product.quantity}
                </Typography>

                <Typography variant="h6">Số lượng:</Typography>
                <Box className={classes.quantityBox}>
                  <span onClick={() => handleQuantityChange('decrement')}>
                    -
                  </span>
                  <input type="text" value={quantity} readOnly />
                  <span onClick={() => handleQuantityChange('increment')}>
                    +
                  </span>
                </Box>
                <Box className={classes.description}>
                  <Typography
                    variant="h5"
                    sx={{ fontWeight: 'bold', marginBottom: '10px' }}
                  >
                    Mô tả sản phẩm:
                  </Typography>
                  <Typography>{product.description}</Typography>
                </Box>
                <Button
                  onClick={handleAddToCart}
                  variant="contained"
                  sx={{
                    marginTop: '20px',
                    backgroundColor: '#1976d2',
                    '&:hover': { backgroundColor: '#155fa0' },
                  }}
                >
                  Thêm vào giỏ hàng
                </Button>
              </Box>
            </Grid>
          </Grid>
        </Paper>

        {/* Description */}
      </Container>
    </Box>
  )
}

export default ProductDetailPage
