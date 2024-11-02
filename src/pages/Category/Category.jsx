import React, { useState, useEffect, Fragment } from 'react'
import Box from '@mui/material/Box'
import { styled } from '@mui/material/styles'
import Paper from '@mui/material/Paper'
import Grid from '@mui/material/Grid'
import CardProductCategory from '../../components/CardProductCategory/CardProductCategory'
import { CircularProgress, Container, Typography } from '@mui/material'
import { authAPI } from '@/apis/authAPI'
import { sortProductByCategory } from '@/utils/algorithms'
import { productsAdminAPI } from '@/apis/productAdminAPI'

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
  ...theme.applyStyles('dark', {
    backgroundColor: '#1A2027'
  })
}))

export default function Category() {
  const [categories, setCategories] = useState([])

  useEffect(() => {
    const fetchCategoriesAndProducts = async () => {
      try {
        const categoryResponse = await authAPI.getCategory()
        const productResponse = await productsAdminAPI.getproductsAPI()

        const categoryList = sortProductByCategory(
          categoryResponse.data,
          productResponse.data
        )
        console.log(
          '🚀 ~ fetchCategoriesAndProducts ~ categoryList:',
          categoryList
        )

        setCategories(categoryList)
      } catch (error) {
        console.error('Lỗi khi lấy sản phẩm hoặc danh mục:', error)
      }
    }

    fetchCategoriesAndProducts()
  }, [])

  // Render sản phẩm của mỗi danh mục
  const renderProductsData = (category) =>
    category.products.map((item) => (
      <Grid item xs={12} sm={6} md={2.3} key={item.id}>
        <Item>
          <CardProductCategory product={item} />
        </Item>
      </Grid>
    ))

  // Render danh mục và các sản phẩm tương ứng
  const renderCategoriesData = () =>
    categories.map((category) => (
      <Fragment key={category.id}>
        {category.products.length > 0 && (
          <Box>
            <h1 style={{ textAlign: 'center', fontWeight: 'bold' }}>
              {category.name}
            </h1>
            <Box sx={{ flexGrow: 1 }}>
              <Grid container spacing={0.5} justifyContent="space-between">
                {renderProductsData(category)}
              </Grid>
            </Box>
          </Box>
        )}
      </Fragment>
    ))
  if (categories.length === 0) {
    return (
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          minHeight: '400px',
          justifyContent: 'center',
          alignItems: 'center'
        }}
      >
        <CircularProgress />
        <Typography>Loading .... </Typography>
      </Box>
    )
  }

  return <Container>{renderCategoriesData()}</Container>
}
