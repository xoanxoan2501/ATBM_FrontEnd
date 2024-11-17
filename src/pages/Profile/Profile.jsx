import React, { useState, useEffect } from 'react'
import {
  Box,
  Container,
  Typography,
  TextField,
  Button,
  Grid,
  InputAdornment,
  CircularProgress,
} from '@mui/material'
import {
  Edit as EditIcon,
  Phone as PhoneIcon,
  Event as EventIcon,
  AccountCircle,
} from '@mui/icons-material'
import { userAPI } from '@/apis/UserAPI'

export default function Profile() {
  const [isEditing, setIsEditing] = useState(false)
  const [userInfo, setUserInfo] = useState(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  // console.log(userInfo)
  useEffect(() => {
    const fetchUserProfile = async () => {
      setLoading(true)
      try {
        const response = await userAPI.getUserAPIProfile()
        console.log('Data from API:', response) // Kiểm tra dữ liệu trả về từ API
        setUserInfo(response.data) // Gán dữ liệu từ API vào state
      } catch (error) {
        console.error('Error fetching user profile:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchUserProfile()
  }, [])

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setUserInfo({ ...userInfo, [name]: value })
    console.log(e.target)
  }

  const handleSave = async () => {
    setSaving(true)
    try {
      await userAPI.updateUserAPI(userInfo, userInfo.id)
      setIsEditing(false)
    } catch (error) {
      console.error('Error updating profile:', error)
    } finally {
      setSaving(false)
    }
  }

  if (loading) {
    return (
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh',
        }}
      >
        <CircularProgress />
      </Box>
    )
  }

  if (!userInfo) {
    return (
      <Box sx={{ textAlign: 'center', marginTop: '20px' }}>
        <Typography variant="h6" color="error">
          Không tải được thông tin người dùng.
        </Typography>
      </Box>
    )
  }

  return (
    <Container
      sx={{
        backgroundColor: '#f5f5f5',
        padding: 4,
        borderRadius: 2,
        maxWidth: '800px',
        margin: '0 auto',
      }}
    >
      <Typography variant="h4" textAlign="center" gutterBottom>
        Thông tin tài khoản
      </Typography>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: 2,
          padding: 2,
          backgroundColor: 'white',
          borderRadius: 2,
          boxShadow: 1,
        }}
      >
        {/* First Name */}
        <TextField
          label="Họ"
          variant="standard"
          name="firstName"
          value={userInfo.firstname || ''}
          onChange={(e) => {
            setUserInfo({ ...userInfo, firstname: e.target.value })
          }}
          InputProps={{
            readOnly: !isEditing,
            startAdornment: (
              <InputAdornment position="start">
                <AccountCircle />
              </InputAdornment>
            ),
          }}
          fullWidth
        />

        {/* Last Name */}
        <TextField
          label="Tên"
          variant="standard"
          name="lastName"
          value={userInfo.lastname || ''}
          onChange={(e) => {
            setUserInfo({ ...userInfo, lastname: e.target.value })
          }}
          InputProps={{
            readOnly: !isEditing,
            startAdornment: (
              <InputAdornment position="start">
                <AccountCircle />
              </InputAdornment>
            ),
          }}
          fullWidth
        />

        {/* Email */}
        <TextField
          label="Email"
          variant="standard"
          name="email"
          value={userInfo.email || ''}
          disabled={true}
          InputProps={{
            readOnly: !isEditing,
          }}
          fullWidth
        />

        {/* Ngày sinh */}
        <TextField
          label="Ngày sinh"
          variant="standard"
          name="birthDate"
          value={userInfo.dob || ''}
          disabled={true}
          InputProps={{
            readOnly: !isEditing,
            startAdornment: (
              <InputAdornment position="start">
                <EventIcon />
              </InputAdornment>
            ),
          }}
          fullWidth
        />
        <TextField
          type="password"
          label="Mật khẩu "
          variant="standard"
          name="mật khẩu"
          value={userInfo.password || ''}
          onChange={(e) => {
            setUserInfo({ ...userInfo, password: e.target.value })
          }}
          InputProps={{
            readOnly: !isEditing,
            startAdornment: (
              <InputAdornment position="start">
                <EventIcon />
              </InputAdornment>
            ),
          }}
          fullWidth
        />
      </Box>

      <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: 3 }}>
        <Button
          variant="contained"
          color={isEditing ? 'primary' : 'secondary'}
          onClick={() => (isEditing ? handleSave() : setIsEditing(true))}
          disabled={saving}
        >
          {saving ? (
            <CircularProgress size={24} color="inherit" />
          ) : isEditing ? (
            'Lưu'
          ) : (
            'Chỉnh sửa'
          )}
        </Button>
      </Box>
    </Container>
  )
}
