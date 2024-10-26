import instance from './apiConfig';
const getproductsAPI = async () => {
  const response = await instance.get('/products');
  return response.data;
};

const updateproductsAPI = async (data, productsId) => {
  // console.log('🚀 ~ updateproductsAPI ~ productsId:', productsId);
  const response = await instance.put(`/products/${productsId}`, data);
  return response.data;
  // console.log('🚀 ~ updateproductsAPI ~ `/products/${productsId}`:', `/products/${productsId}`);
};
const postproductsAPI = async (data) => {
  const response = await instance.post('/products', data);
  console.log('🚀 ~ loginAPI ~ data:', data);
  return response.data;
};

const deleteproductsAPI = async (productsId) => {
  const response = await instance.delete(`/products/${productsId}`);
  return response.data;
};

export const productsAdminAPI = {
  getproductsAPI,
  updateproductsAPI,
  deleteproductsAPI,
  postproductsAPI,
};
