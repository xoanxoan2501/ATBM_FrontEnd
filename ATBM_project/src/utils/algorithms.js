export const sortProductByCategory = (categoryList, productList) => {
  return categoryList.map((category) => {
    const newCategory = {
      ...category,
      products: productList.filter(
        (product) => product.category_id === category.id
      ),
    };
    return newCategory;
  });
};

export const saveToLocalStorage = (key, value) => {
  localStorage.setItem(key, JSON.stringify(value));
};

export const getFormLocalStorage = (key) => {
  return JSON.parse(localStorage.getItem(key));
};
