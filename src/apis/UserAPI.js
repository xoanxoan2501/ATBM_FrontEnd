import instance from './apiConfig'
const getUsersAPI = async () => {
  const response = await instance.get('/users')
  return response.data
}
const updateUserAPI = async (data, userId) => {
  // console.log('🚀 ~ updateUserAPI ~ userId:', userId);
  const response = await instance.put(`/users/${userId}`, data)
  return response.data
  // console.log('🚀 ~ updateUserAPI ~ `/users/${userId}`:', `/users/${userId}`);
}
const postUserAPI = async (data) => {
  const response = await instance.post('/users', data)
  console.log('🚀 ~ loginAPI ~ data:', data)
  return response.data
}

const getUserAPIProfile = async () => {
  const response = await instance.get(`/users/myInfo`)
  return response.data
}

const deleteUserAPI = async (userId) => {
  const response = await instance.delete(`/users/${userId}`)
  return response.data
}

export const userAPI = {
  getUsersAPI,
  updateUserAPI,
  deleteUserAPI,
  postUserAPI,
  getUserAPIProfile,
}
