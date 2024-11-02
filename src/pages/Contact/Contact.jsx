import { Box, Typography, Button } from '@mui/material'
import EmailIcon from '@mui/icons-material/Email'
import PhoneIcon from '@mui/icons-material/Phone'
import LanguageIcon from '@mui/icons-material/Language'

const SupportButton = ({ icon, title, subtitle, color }) => (
  <Button
    variant="contained"
    sx={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      flexDirection: 'column',
      gap: '8px',
      backgroundColor: color,
      borderRadius: '12px',
      Width: '200px',
      height: '120px',
      padding: '16px',
      '&:hover': {
        backgroundColor: color,
        opacity: 0.9
      }
    }}
  >
    {icon}
    <Typography variant="body1" color="#fff">
      {title}
    </Typography>
    <Typography variant="caption" color="#fff">
      {subtitle}
    </Typography>
  </Button>
)

const Contact = () => {
  return (
    <Box>
      <Box
        sx={{
          textAlign: 'center',
          padding: '30px',
          margin: '5px',
          backgroundColor: '#C0C0C0'
        }}>
        <Typography variant="h4" sx={{ fontWeight: 'bold', marginTop: '20px' }}>
                            Hãy để đội ngũ tư vấn của Apple hỗ trợ bạn dù ở bất kỳ nơi đâu
        </Typography>
      </Box>

      <Box textAlign="center">
        <Typography variant="h5" gutterBottom>
                    Tổng đài tư vấn và hỗ trợ trực tuyến
        </Typography>
        <Box display="flex" justifyContent="center" gap={4} mt={2}>
          <SupportButton
            icon={<EmailIcon sx={{ fontSize: 30, color: '#fff' }} />}
            title="support@apple.vn"
            subtitle="Email"
            color="#4CAF50"
          />
          <SupportButton
            icon={<PhoneIcon sx={{ fontSize: 30, color: '#fff' }} />}
            title="1900 1000"
            subtitle="Tổng đài tư vấn"
            color="#2196F3"
          />
          <SupportButton
            icon={<LanguageIcon sx={{ fontSize: 30, color: '#fff' }} />}
            title="www.support.apple.vn"
            subtitle="Website"
            color="#FF9800"
          />
        </Box>
      </Box>
    </Box>
  )
}

export default Contact