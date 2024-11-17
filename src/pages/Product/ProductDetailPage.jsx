import React, { useEffect, useState } from 'react'
import {
  Container,
  Paper,
  Grid,
  Box,
  Typography,
  CircularProgress,
} from '@mui/material'
import { makeStyles } from '@mui/styles'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Pagination } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import './style.css'
import Slider from '../../components/Slider/Slider'
import HeaderNavigation from './HeaderNavigation/HeaderNavigation'
import { productsAdminAPI } from '@/apis/productAdminAPI'
import { useParams, useNavigate } from 'react-router-dom'
import { date } from 'zod'
import { formatNumber } from '@/utils/formatters'

const useStyles = makeStyles((theme) => ({
  left: {
    width: '50%',
  },
  right: {
    flex: '1 1 0',
  },
}))

const ProductDetailPage = () => {
  const classes = useStyles()
  const [product, setProduct] = useState(null)
  const [quantity, setQuantity] = useState(0)
  const { productId } = useParams()
  const navigate = useNavigate()

  useEffect(() => {
    productsAdminAPI.getProductDetail(productId).then((response) => {
      setProduct(response.data)
    })
  }, [productId])
  const handleQuantityChange = (type) => {
    setQuantity((prevQuantity) =>
      type === 'increment' ? prevQuantity + 1 : Math.max(0, prevQuantity - 1)
    )
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
        <Typography>Đang load dữ liệu ... </Typography>
      </Box>
    )
  }
  return (
    <>
      <Box>
        <Container maxWidth="lg">
          <Paper elevation={0}>
            <Grid container spacing={2}>
              <Grid item className={classes.left}>
                <Box position="relative">
                  <Slider product={product} />
                </Box>
              </Grid>

              <Grid item className={classes.right}>
                <Box>
                  <Typography variant="h3">{product.name}</Typography>

                  <Box>
                    <Typography variant="h4">
                      Giá tiền: {formatNumber(product.price)}
                    </Typography>
                  </Box>
                  <Box>
                    <Typography variant="h4">
                      Số lượng tồn kho : {product.quantity}
                    </Typography>
                  </Box>
                  <Box>
                    <Typography variant="h4">Số lượng</Typography>
                    <Box className="quantity-box">
                      <span
                        className="down"
                        onClick={() => handleQuantityChange('decrement')}
                      >
                        -
                      </span>
                      <input type="text" value={quantity} readOnly />
                      <span
                        className="up"
                        onClick={() => handleQuantityChange('increment')}
                      >
                        +
                      </span>
                    </Box>
                  </Box>
                </Box>
              </Grid>
            </Grid>
          </Paper>
          <Box className="dis">
            <Typography>{product.description}</Typography>
          </Box>
        </Container>
      </Box>
    </>
  )
}

export default ProductDetailPage
