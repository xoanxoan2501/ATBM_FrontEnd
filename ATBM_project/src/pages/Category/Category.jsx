import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import CardProductCategory from '../../components/CardProductCategory/CardProductCategory';
import { Container } from '@mui/material';
import { authAPI } from '@/apis/authAPI';
import { sortProductByCategory } from '@/utils/algorithms';
import { productsAdminAPI } from '@/apis/productAdminAPI';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
  ...theme.applyStyles('dark', {
    backgroundColor: '#1A2027',
  }),
}));

export default function Category() {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategoriesAndProducts = async () => {
      try {
        // const categoryResponse = await authAPI.getCategory();
        // const newdataCategory = categoryResponse.data;
        // console.log(
        //   '🚀 ~ fetchCategoriesAndProducts ~ categoryResponse:',
        //   categoryResponse
        // );

        // setCategories(newdataCategory); // Lưu dữ liệu danh mục vào state

        // // Gọi API lấy sản phẩm cho từng danh mục
        // const productsData = {};

        // cateogry.id
        /**
         * [{
         *   id: category_id,
         * name: category_name,
         * productList: []
         * }, {}, {}]
         */
        // for (const category of newdataCategory) {
        //   const products = await authAPI.getProductsByCategory(category.id);
        //   const newDateProduct = products.data;
        //   productsData[category.id] = newDateProduct; // Lưu sản phẩm theo từng categoryId
        //   console.log(
        //     '🚀 ~ fetchCategoriesAndProducts ~ newdataCategory:',
        //     newdataCategory
        //   );
        // }
        // setProductsByCategory(productsData); // Lưu toàn bộ dữ liệu sản phẩm theo danh mục vào state
        const categoryResponse = await authAPI.getCategory();
        const productResponse = await productsAdminAPI.getproductsAPI();

        const categoryList = sortProductByCategory(
          categoryResponse.data,
          productResponse.data
        );
        console.log(
          '🚀 ~ fetchCategoriesAndProducts ~ categoryList:',
          categoryList
        );

        setCategories(categoryList);
      } catch (error) {
        console.error('Lỗi khi lấy sản phẩm hoặc danh mục:', error);
      }
    };

    fetchCategoriesAndProducts();
  }, []);

  // Render sản phẩm của mỗi danh mục
  // const renderProductsData = (category) =>
  //   (productsByCategory[category.id] || []).map((item) => (
  //     <Grid item xs={12} sm={6} md={2.3} key={item.id}>
  //       <Item>
  //         <CardProductCategory
  //           url={item.image}
  //           content={item.name}
  //           // color={item.color}
  //           salePrice={item.price}
  //           // price={item.price}
  //         />
  //       </Item>
  //     </Grid>
  //   ));

  // Render danh mục và các sản phẩm tương ứng
  const renderCategoriesData = () =>
    categories.map((category) => (
      <Box key={category.id}>
        <h1 style={{ textAlign: 'center', fontWeight: 'bold' }}>
          {category.name}
        </h1>
        <Box sx={{ flexGrow: 1 }}>
          <Grid container spacing={0.5} justifyContent="space-between">
            {/* {renderProductsData(category)} */}
          </Grid>
        </Box>
      </Box>
    ));

  return <Container>{renderCategoriesData()}</Container>;
}
