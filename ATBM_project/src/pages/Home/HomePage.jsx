import { BottomNavigation, Box, Container } from '@mui/material'
import React from 'react'
import Slider from '../../components/Slider/Slider'
import ProductSlider from './ProductSlider/ProductSlider'
import ProductPhone from './ProductSlider/ProductPhone'
import TVandRadio from './ProductSlider/TVandRadio/TVandRadio'

import { Typography } from '@mui/material'

export default function HomePage() {
  return (
    // * code cho phan body
    <Container>
      {/* //* phan nay cho slider */}
      <Box sx={{ marginTop: '10px' }}>
        <Slider
          url1="/images/16pro.jpg"
          url2="/images/HOME_R12_KV_Main-KV_pc.webp"
          url3="/images/galaxy.jpg"
        />
      </Box>
      {/* //* code cho phan san pham noi bat */}
      <Box
        sx={{
          textAlign: 'center',
          marginTop: '40px',
          marginBottom: '40px'
        }}
      >
        <Typography
          variant="h4"
          component="h1"
          sx={{ fontWeight: 'bold', mb: 2 }}
        >
          SẢN PHẨM NỔI BẬT
        </Typography>
        <Box>
          <ProductSlider />
        </Box>
        <Typography
          variant="h4"
          component="h1"
          sx={{ fontWeight: 'bold', mt: '40px', mb: 2 }}
        >
          MOBILE & COMPUTING
        </Typography>
        <Box>
          <ProductPhone />
        </Box>
        <Box sx={{ position: 'relative', mt: '40px' }}>
          {' '}
          <Typography
            variant="h4"
            component="h1"
            sx={{
              position: 'absolute',
              top: '20px',
              left: '50%',
              transform: 'translateX(-50%)',
              zIndex: 10,
              color: 'black',
              fontWeight: 'bold'
            }}
          >
            TV And Radio
          </Typography>
          <Box>
            <TVandRadio />
          </Box>
        </Box>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            my: 4
          }}
        ></Box>
      </Box>
    </Container>
  )
}
