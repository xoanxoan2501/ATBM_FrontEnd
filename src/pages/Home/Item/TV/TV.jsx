import React, { useEffect, useState } from 'react'
import { styled } from '@mui/material/styles'
import Grid from '@mui/material/Grid'
import Paper from '@mui/material/Paper'
import Box from '@mui/material/Box'
import CardProduct from '../../../../components/CardProduct/CardProduct'
import { authAPI } from '@/apis/authAPI'

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}))

export default function TV() {
  const [products, setProducts] = useState([])

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const categoryIds = [
          '44dbca80-4ef2-4ad8-8946-97ec9f2e8ca3',
          '3f3f7c40-b8c8-43e2-b60c-1b18f2d33893',
          '04ebb3d0-3286-4e69-94de-73fd15f5f91d',
        ]

        let allProducts = []
        for (const categoryId of categoryIds) {
          const response = await authAPI.getProductsByCategory(categoryId)
          if (response.code === 1000) {
            allProducts = [...allProducts, ...response.data]
          }
        }

        // Chọn ngẫu nhiên 5 sản phẩm
        const randomProducts = allProducts
          .sort(() => 0.5 - Math.random())
          .slice(0, 5)

        setProducts(randomProducts)
      } catch (error) {
        console.error('Error fetching products:', error)
      }
    }

    fetchProducts()
  }, [])

  if (products.length === 0) {
    return <div>Đang tải sản phẩm...</div>
  }

  return (
    <Box sx={{ width: '100%', marginTop: '30px' }}>
      <Grid container spacing={2}>
        {/* Sản phẩm lớn bên trái */}
        <Grid container xs={6}>
          <Item sx={{ width: '98%' }}>
            <CardProduct
              image={products[0]?.image}
              label="Sale"
              content1={products[0]?.name}
              content={`Giá: ${products[0]?.price.toLocaleString('vi-VN')}đ`}
            />
          </Item>
        </Grid>
        {/* Các sản phẩm nhỏ bên phải */}
        <Grid container xs={6}>
          <Item sx={{ width: '98%' }}>
            <Box sx={{ width: '100%' }}>
              <Grid
                container
                rowSpacing={1}
                columnSpacing={{ xs: 1, sm: 2, md: 3 }}
              >
                {products.slice(1).map((product, index) => (
                  <Grid item xs={6} key={product.id}>
                    <Item>
                      <CardProduct
                        image={product.image}
                        content1={product.name}
                      />
                    </Item>
                  </Grid>
                ))}
              </Grid>
            </Box>
          </Item>
        </Grid>
      </Grid>
    </Box>
  )
}
