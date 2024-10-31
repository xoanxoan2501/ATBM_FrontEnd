export const sortProductByCategory = (categoryList, productList) => {
  console.log('🚀 ~ sortProductByCategory ~ categoryList:', categoryList);
  console.log('🚀 ~ sortProductByCategory ~ productList:', productList);
  return categoryList.map((category) => {
    return {
      ...category,
      products: productList.map((product) => {
        if (product.category_id === category.id) return product;
      }),
    };
  });
};
