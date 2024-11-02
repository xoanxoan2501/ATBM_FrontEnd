import TextField from '@mui/material/TextField'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import { Link, Navigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { Button } from '@mui/material'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
import { authAPI } from '../../apis/authAPI'
import { useNavigate } from 'react-router-dom'
import useGlobalVariableContext from '@/hooks/MyProvider'
import { routes } from '@/config/routeConfig'

const LoginPage = () => {
  const { setUserToLocalStorage, user, setUser } = useGlobalVariableContext()
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  })

  const navigate = useNavigate()

  const formDataSchema = z.object({
    email: z.string().email({ message: 'Invalid email address' }),
    password: z
      .string()
      .min(6, { message: 'Password must be at least 6 characters long' }),
  })

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(formDataSchema),
  })

  const handleLogin = (data) => {
    authAPI
      .loginAPI(data)
      .then((res) => {
        const data = res.data
        console.log(data.authenticated)
        if (data.authenticated === true) {
          localStorage.setItem('accessToken', data.token)

          setUserToLocalStorage(data)
          setUser(data)
          navigate('/')
        }
        console.log('🚀 ~ authAPI.loginAPI ~ data:', data)
      })
      .catch((error) => {
        console.error('Login error:', error)
      })
  }

  if (user) {
    return <Navigate to={routes.HomePage} />
  }

  return (
    <Box>
      <Box
        sx={{
          height: '100vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Typography
          sx={{
            fontSize: '1.6rem',
            marginTop: '40px',
          }}
        >
          Đăng nhập vào tài khoản Apple
        </Typography>

        <form onSubmit={handleSubmit(handleLogin)}>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              gap: 2,
              marginTop: '20px',
            }}
          >
            <TextField
              id="outlined-required"
              label="Email"
              error={!!errors.email}
              {...register('email')}
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              sx={{
                width: '480px',
                height: '56px',
                '& .MuiOutlinedInput-notchedOutline': {
                  borderRadius: '12px',
                },
              }}
            />
            {errors.email && (
              <Typography color="red">{errors.email.message}</Typography>
            )}

            <TextField
              id="outlined"
              label="Password"
              error={!!errors.password}
              {...register('password')}
              value={formData.password}
              type="password"
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
              sx={{
                width: '480px',
                height: '56px',
                '& .MuiOutlinedInput-notchedOutline': {
                  borderRadius: '12px',
                },
              }}
            />
            {errors.password && (
              <Typography color="red">{errors.password.message}</Typography>
            )}
          </Box>

          <Box sx={{ display: 'flex', justifyContent: 'center' }}>
            <Button
              color="primary"
              type="submit"
              sx={{
                marginTop: '24px',
                backgroundColor: 'black',
                color: 'white',
                '&:hover': {
                  backgroundColor: 'grey',
                },
              }}
            >
              Đăng nhập
            </Button>
          </Box>
        </form>

        <Box sx={{ marginTop: '24px', textAlign: 'center' }}>
          <Link to={'/forgot-password'}>Bạn đã quên mật khẩu</Link>
          <Typography sx={{ marginTop: '20px' }}>
            Bạn đã có Tài khoản?
            <Link to={'/register-page'}> Tạo tài khoản ngay bây giờ</Link>
          </Typography>
        </Box>
      </Box>
    </Box>
  )
}

export default LoginPage
