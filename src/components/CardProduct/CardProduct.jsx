import React from 'react'
import { Card, CardMedia, Typography, Button, Box, Chip } from '@mui/material'
import { styled } from '@mui/system'
import { routes } from '@/config/routeConfig'
import { Link } from 'react-router-dom'
const HoverCard = styled(Card)(({ theme }) => ({
  position: 'relative',
  overflow: 'hidden',
  borderRadius: 16, // Bo góc đẹp
  textAlign: 'center', // Căn giữa nội dung
  width: '100%', // Chiều rộng cố định
  height: '100%', // Chiều cao tương ứng với chiều rộng
  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)', // Thêm đổ bóng nhẹ
  '&:hover .hover-image': {
    transform: 'scale(1.1)', // Zoom nhẹ hơn khi hover
  },
  '&:hover .hover-button': {
    opacity: 1, // Hiển thị nút khi hover
  },
  '&:hover .text-overlay': {
    transform: 'translate(-50%, -50%) scale(1.05)', // Di chuyển nhẹ chữ cùng với hiệu ứng zoom của hình ảnh
    backgroundColor: 'rgba(255, 255, 255, 0.7)', // Giảm nền chữ khi hover
  },
}))

const HoverCardImage = styled(CardMedia)(({ theme }) => ({
  transition: 'transform 0.3s ease', // Hiệu ứng zoom mượt mà
  width: '100%',
  height: '100%', // Hình ảnh bao phủ toàn bộ card
}))

const HoverButton = styled(Button)(({ theme }) => ({
  position: 'absolute',
  bottom: '15px',
  left: '50%',
  transform: 'translateX(-50%)', // Căn giữa nút theo chiều ngang
  opacity: 0, // Ẩn nút khi không hover
  transition: 'opacity 0.3s ease', // Hiệu ứng hiện nút khi hover
  borderRadius: 20, // Bo góc mềm mại cho nút
  backgroundColor: '#FF5722', // Màu nền nổi bật
  color: '#fff', // Màu chữ trắng
  padding: '8px 16px', // Kích thước nút lớn hơn một chút
  fontSize: '0.9rem', // Font chữ dễ đọc hơn
  '&:hover': {
    backgroundColor: '#E64A19', // Màu nền khi hover
  },
}))

const NewChip = styled(Chip)(({ theme }) => ({
  position: 'absolute',
  top: 10,
  left: 10,
  backgroundColor: '#1e88e5', // Màu xanh cho chip "Mới"
  color: '#fff',
  fontWeight: 'bold',
  zIndex: 2, // Đảm bảo chip luôn nằm trên cùng
}))

const TextOverlay = styled(Box)(({ theme }) => ({
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)', // Căn giữa nội dung theo cả hai trục
  backgroundColor: 'rgba(255, 255, 255, 0.9)', // Nền trắng bán trong suốt
  color: '#333', // Màu chữ dễ đọc
  textAlign: 'center',
  // padding: '15px 20px', // Thêm khoảng cách xung quanh chữ
  // borderRadius: '12px', // Bo góc mềm mại
  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)', // Hiệu ứng đổ bóng
  width: '100%', // Chiều rộng chiếm 80% card
  zIndex: 1, // Đảm bảo text không bị che
  transition: 'transform 0.3s ease, background-color 0.3s ease', // Thêm hiệu ứng khi hover
}))

const CardProduct = (props) => {
  return (
    <HoverCard>
      {/* Hình ảnh */}
      <HoverCardImage
        className="hover-image"
        component="img"
        image={props.image}
        alt="Hover effect image"
      />

      {/* Dòng chữ đè lên hình ảnh */}
      <TextOverlay className="text-overlay">
        <Typography variant="h6" component="div" gutterBottom>
          {props.content1}
        </Typography>
        <Typography variant="body2" color="inherit">
          {props.content}
        </Typography>
      </TextOverlay>

      {/* Nút mua hàng chỉ hiển thị khi hover */}

      <HoverButton className="hover-button" variant="contained">
        Mua ngay
      </HoverButton>
    </HoverCard>
  )
}

export default CardProduct
