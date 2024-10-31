import {
  Typography,
  Box,
  IconButton,
  TextField,
  Container,
} from '@mui/material';
import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import DenseTable from './DenseTable/DenseTable';

const Cart = () => {
  return (
    <Container>
      <Box>
        <h1>Giỏ hàng của tôi</h1>
      </Box>
      <DenseTable />
    </Container>
  );
};

export default Cart;

{
  /* <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '10px',
          borderBottom: '1px solid #ccc',
          width: '100%',
          maxHeight: '500px',
          minHeight: '500px',
          backgroundColor: '#f9f9f9',
        }}
      >
        {/* Ảnh sản phẩm và tên sản phẩm */
}
// <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
//     {/* Ảnh sản phẩm */}
//     <img
//       src="/images/iphone13.jpg" // Đường dẫn ảnh mẫu, thay bằng ảnh sản phẩm của bạn
//       alt="Product"
//       style={{ width: '60px', height: '60px', borderRadius: '5px' }}
//     />
//     {/* Tên sản phẩm */}
//     <Typography variant="h6">Iphone 13</Typography>
//   </Box>

//   {/* Số lượng */}
//   <Box
//     sx={{
//       display: 'flex',
//       alignItems: 'center',
//       gap: 1,
//     }}
//   >
//     <IconButton color="primary">
//       <RemoveIcon />
//     </IconButton>
//     <TextField
//       variant="outlined"
//       size="small"
//       defaultValue="2"
//       sx={{ width: '50px', textAlign: 'center' }}
//     />
//     <IconButton color="primary">
//       <AddIcon />
//     </IconButton>
//   </Box>

//   {/* Giá */}
//   <Box>
//     <Typography variant="h6">150,000 VND</Typography>
//   </Box>

//   {/* Nút Xóa */}
//   <Box>
//     <IconButton color="error">
//       <DeleteIcon />
//     </IconButton>
//   </Box>
// </Box> */}
