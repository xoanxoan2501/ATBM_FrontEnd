import instance from './apiConfig'
const getCategoryAPI = async () => {
  const response = await instance.get('/categories')
  return response.data
}
const updateCategoryAPI = async (data, categoriesId) => {
  // console.log('🚀 ~ updatecategoryAPI ~ categoryId:', categoryId);
  const response = await instance.put(`/categories/${categoriesId}`, data)
  return response.data
  // console.log('🚀 ~ updatecategoryAPI ~ `/categories/${categoryId}`:', `/categories/${categoryId}`);
}
const postCategoryAPI = async (data) => {
  const response = await instance.post('/categories', data)
  console.log('🚀 ~ loginAPI ~ data:', data)
  return response.data
}

const deleteCategoryAPI = async (categoriesId) => {
  const response = await instance.delete(`/categories/${categoriesId}`)
  return response.data
}

export const categoryAdminAPI = {
  getCategoryAPI,
  updateCategoryAPI,
  deleteCategoryAPI,
  postCategoryAPI
}
