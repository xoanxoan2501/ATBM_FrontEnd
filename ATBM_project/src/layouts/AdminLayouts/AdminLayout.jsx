import React, { Children } from 'react';
import AppBar from '@/pages/Admin/AppBar/AppBar';

import { Box } from '@mui/material';
const AdminLayout = ({ children }) => {
  return (
    <Box sx={{ display: 'flex' }}>
      <AppBar />
      {children}
    </Box>
  );
};
export default AdminLayout;
