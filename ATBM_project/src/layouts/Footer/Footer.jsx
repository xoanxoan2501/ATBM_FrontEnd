import * as React from 'react';
import Grid from '@mui/material/Grid';
import FormLabel from '@mui/material/FormLabel';
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography';
import { Link } from 'react-router-dom';
import { Button, TextField } from '@mui/material';

const spacing = 2;
const Footer = () => {
  return (
    <Box sx={{ backgroundColor: '#F5F5F5', padding: spacing, width: '100%' }}>
      <Grid container spacing={spacing}  justifyContent='flex-start' >
        <Grid item xs={12} md={2}>
          <FormLabel component="legend">Sản Phẩm & Dịch Vụ</FormLabel>
            <Typography variant="body2" sx={{ color: '', cursor: 'pointer' }}>
              Điện thoại thông minh
            </Typography>
            <Typography variant="body2" sx={{ color: '', cursor: 'pointer' }}>
              Máy tính bảng
            </Typography>
            <Typography variant="body2" sx={{ color: '', cursor: 'pointer' }}>
              Thiết bị âm thanh
            </Typography>
            <Typography variant="body2" sx={{ color: '', cursor: 'pointer' }}>
              Thiết bị đeo
            </Typography>
            <Typography variant="body2" sx={{ color: '', cursor: 'pointer' }}>
              Smart Switch
            </Typography>
            <Typography variant="body2" sx={{ color: '', cursor: 'pointer' }}>
              Phụ kiện
            </Typography>
            <Typography variant="body2" sx={{ color: '', cursor: 'pointer' }}>
              TVs
            </Typography>
            <Typography variant="body2" sx={{ color: '', cursor: 'pointer' }}>
              Thiết bị nghe nhìn
            </Typography>
            <Typography variant="body2" sx={{ color: '', cursor: 'pointer' }}>
              Gia dụng
            </Typography>
            <Typography variant="body2" sx={{ color: '', cursor: 'pointer' }}>
              Màn hình
            </Typography>
        </Grid>
        {/* <Grid item xs={12} md={2}>
          <FormLabel component="legend">Mua Trực Tuyến</FormLabel>
          <Typography variant="body2" sx={{ color: '', cursor: 'pointer' }}>
              Ưu đãi độc quyền
          </Typography>
          <Typography variant="body2" sx={{ color: '', cursor: 'pointer' }}>
              Cửa hàng trải nghiệm Samsung
          </Typography>
          <Typography variant="body2" sx={{ color: '', cursor: 'pointer' }}>
              Câu hỏi thường gặp 
          </Typography>
          <Typography variant="body2" sx={{ color: '', cursor: 'pointer' }}>
              Khám phá
          </Typography>
          <Typography variant="body2" sx={{ color: '', cursor: 'pointer' }}>
              Điều khoản & Điều kiện
          </Typography>
        </Grid>
        <Grid item xs={12} md={2}>
          <FormLabel component="legend">Chương trình </FormLabel>
          <Typography variant="body2" sx={{ color: '', cursor: 'pointer' }}>
              Ưu đãi sinh viên
          </Typography>
          <Typography variant="body2" sx={{ color: '', cursor: 'pointer' }}>
              Ưu đãi nhân viên đối tác
          </Typography>
          <Typography variant="body2" sx={{ color: '', cursor: 'pointer' }}>
              Ưu đãi chính phủ
          </Typography>
        </Grid> */}
        <Grid item xs={12} md={2}>
          <FormLabel component="legend">Tài khoản</FormLabel>
          <Typography variant="body2" sx={{ color: '', cursor: 'pointer' }}>
              Tài khoản của tôi 
          </Typography>
          <Typography variant="body2" sx={{ color: '', cursor: 'pointer' }}>
              Đơn hàng
          </Typography>
          <Typography variant="body2" sx={{ color: '', cursor: 'pointer' }}>
              Danh sách yêu thích 
          </Typography>
          <Typography variant="body2" sx={{ color: '', cursor: 'pointer' }}>
              Samsung Members
          </Typography>

          <FormLabel component="legend">Giới thiệu về chúng tôi</FormLabel>
          <Typography variant="body2" sx={{ color: '', cursor: 'pointer' }}>
              Thông tin về công ty 
          </Typography>
          <Typography variant="body2" sx={{ color: '', cursor: 'pointer' }}>
              Lĩnh vực kinh doanh 
          </Typography>
          <Typography variant="body2" sx={{ color: '', cursor: 'pointer' }}>
              Nhận diện thương hiệu
          </Typography>
        </Grid> 
        <Grid item xs={12} md={8} container justifyContent="center">
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: 2,
                padding: 2,
            }}
        >
            <h1>LOOKING FOR SOMETHING ELSE?</h1>
            <Box
            sx={{
              display: 'flex',
            }}>
            <Box 
            sx={{ 
              width: 500, 
              maxWidth: "100%",
              height: "50px"
              }}>
              <TextField
                fullWidth
                label="Search"
                id="fullWidth"
                sx={{
                  borderRadius: "40px", // Bo góc cho TextField
                  "& .MuiOutlinedInput-root": {
                    borderRadius: "40px", // Bo góc khi TextField đang focus
                  },
                }}
              />
            </Box>
            <Button
                variant="outlined"
                sx={{ 
                  borderColor: "black", 
                  borderRadius: "20px",
                  marginLeft: "10px",
                  marginTop: "10px",
                  backgroundColor: "#212121",
                  color: "#ffffff",
                  fontWeight: "bold",
                  
                }}>
                Search
              </Button>
            </Box>
            <Box sx={{ display: "flex", gap: 2, marginTop: "15px" }}>
              <Button
                variant="outlined"
                sx={{ borderColor: "black", borderRadius: "20px" }}
              >
                Garaxy Gplis
              </Button>
              <Button
                variant="outlined"
                sx={{ borderColor: "black", borderRadius: "20px" }}
              >
                Television{" "}
              </Button>
              <Button
                variant="outlined"
                sx={{ borderColor: "black", borderRadius: "20px" }}
              >
                Iphone 16{" "}
              </Button>
              <Button
                variant="outlined"
                sx={{ borderColor: "black", borderRadius: "20px" }}
              >
                Tai nghe{" "}
              </Button>
            </Box>
        </Box>
        </Grid>      
      </Grid>
    </Box>
  );
}

export default Footer