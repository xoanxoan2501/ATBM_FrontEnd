import React, { useEffect, useState } from 'react'
import { Container, Paper, Grid, Box, Typography } from '@mui/material'
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

const useStyles = makeStyles((theme) => ({
  left: {
    width: '50%'
  },
  right: {
    flex: '1 1 0'
  }
}))

const MobileDetail = () => {
  const classes = useStyles()
  const [product, setProduct] = useState(null)
  const [quantity, setQuantity] = useState(0)
  const { id: productId } = useParams()
  const navigate = useNavigate()

  useEffect(() => {
    productsAdminAPI.getproductsAPI().then((data) => {
      const productFound = data.data.find((product) => product.id === productId)
      if (productFound) {
        setProduct(productFound)
      } else {
        navigate('/not-found')
      }
    })
  }, [productId, navigate])
  const handleQuantityChange = (type) => {
    setQuantity((prevQuantity) =>
      type === 'increment' ? prevQuantity + 1 : Math.max(0, prevQuantity - 1)
    )
  }

  return (
    <>
      <HeaderNavigation />
      <Box>
        <Container maxWidth="lg">
          <Paper elevation={0}>
            <Grid container spacing={2}>
              <Grid item className={classes.left}>
                <Box position="relative">
                  <Slider
                    url1="/images/image-removebg-preview-12.png"
                    url2="/images/image-removebg-preview-12.png"
                    url3="/images/image-removebg-preview-12.png"
                  />
                </Box>
              </Grid>

              <Grid item className={classes.right}>
                <Box>
                  <Typography variant="h2">IPHONE 13</Typography>
                  <Box className='dis'>
                    <Typography>- Thanh toán trước ưu đãi đến 8% tối đa 1 triệu</Typography>
                    <Typography>- Màn hình Super Retina XDR</Typography>
                    <Typography>- Hệ thống camera kép 12MP: Camera Chính và Ultra Wide</Typography>
                    <Typography>- Chip A15 Bionic</Typography>
                  </Box>
                  <Typography variant="h4">Màu sắc</Typography>
                  <ul>
                    {['pink', 'green', 'black', 'white', 'blue'].map((color) => (
                      <li key={color} className='color-item' id={color}></li>
                    ))}
                  </ul>
                  <Box>
                    <Typography variant="h4">Giá tiền</Typography>
                    <Box className="price-box">
                      <Typography variant="h6">150,000 VND</Typography>
                    </Box>
                  </Box>
                  <Box>
                    <Typography variant="h4">Số lượng</Typography>
                    <Box className="quantity-box">
                      <span className="down" onClick={() => handleQuantityChange('decrement')}>-</span>
                      <input type="text" value={quantity} readOnly />
                      <span className="up" onClick={() => handleQuantityChange('increment')}>+</span>
                    </Box>
                  </Box>

                </Box>
              </Grid>
            </Grid>
          </Paper>
        </Container>
      </Box>
    </>
  )
}

export default MobileDetail
