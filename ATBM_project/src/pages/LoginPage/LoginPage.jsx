import TextField from '@mui/material/TextField'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Link from '@mui/material/Link'
const LoginPage = () => {
  return (
    <Box>
      <Box
        sx={{
          height: '100vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center'
        }}
      >
        <Typography
          sx={{
            fontSize: '1.6rem',
            marginTop: '40px'
          }}
        >
          Đăng nhập vào tài khoản SamSung  
        </Typography>
        <Box sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: 2 ,
          marginTop: '20px'
        }}>
        <TextField
          required
          id="outlined-required"
          label="Username or Phone"
          defaultValue=""
          sx={{
            width: '480px',
            height: '56px',
            '& .MuiOutlinedInput-notchedOutline': {
              borderRadius: '12px'
            }
          }}
        />
          <TextField
            id="outlined-password-input"
            label="Password"
            type="password"
            autoComplete="current-password"
            sx={{
              width: '480px',
              height: '56px',
              '& .MuiOutlinedInput-notchedOutline': {
                borderRadius: '12px'
              }
            }}
          />
        </Box>
        <Box sx={{
            marginTop:'24px',
            textAlign: 'center'
        }}>
        <Link href="/forget-password">Bạn đã quên mật khẩu</Link>
        <Typography sx={{
            marginTop:'20px'
        }}>
            Bạn đã có Tài khoản? 
            <Link href="/register">Tạo tài khoản ngay bây giờ</Link>
        </Typography>
        </Box>
      </Box>
    </Box>
  )
}

export default LoginPage