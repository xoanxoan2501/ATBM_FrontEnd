import instance from './apiConfig'

const registerAPI = async (data) => {
  console.log('🚀 ~ loginAPI ~ data:', data)
  const response = await instance.post('/users', data)

  return response.data
}
const loginAPI = async (data) => {
  console.log('🚀 ~ loginAPI ~ data:', data)
  const response = await instance.post('/auths/login', data)
  return response.data
}

const logoutAPI = async (token) => {
  const response = await instance.post('/auths/logout', { token })
  return response.data
}
// Hàm lấy thông tin sản phẩm với tham số id
const getDataProduct = async (id) => {
  const response = await instance.get(`/products/${id}`)
  return response.data
}

// Hàm lấy thông tin danh mục với tham số id
const getCategory = async () => {
  const response = await instance.get('/categories')
  return response.data
}
const getProductsByCategory = async (categoryId) => {
  const response = await instance.get(`/products/category/${categoryId}`)
  return response.data
}
export const authAPI = {
  registerAPI,
  loginAPI,
  getDataProduct,
  getCategory,
  getProductsByCategory,
  logoutAPI
}
