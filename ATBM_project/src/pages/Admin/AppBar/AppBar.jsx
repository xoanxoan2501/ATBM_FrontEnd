import * as React from 'react';
import ListSubheader from '@mui/material/ListSubheader';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';

import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import WidgetsIcon from '@mui/icons-material/Widgets';
import CategoryIcon from '@mui/icons-material/Category';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

import { Box } from '@mui/material';
import { Link } from 'react-router-dom';
import { routes } from '@/config/routeConfig';

export default function AppBar() {
  const [open, setOpen] = React.useState(true);

  const handleClick = () => {
    setOpen(!open);
  };

  return (
    <Box 
    sx={{ 
      display: 'flex', 
      alignItems: 'center',
      justifyContent: 'center',    
      height: '100vh',             
      bgcolor: '#E3E3E3', 
      width: '15%',
      borderRadius: 2,              
        
    }}>
      <List
        sx={{ width: '100%', maxWidth: 250,bgcolor: 'transparent' }}
        component="nav"
        aria-labelledby="nested-list-subheader"
        subheader={
          <ListSubheader
            component="div"
            id="nested-list-subheader"
          ></ListSubheader>
        }
      >
        <ListItemButton>
          <Link
            to={routes.HomePage}
            style={{
              display: 'flex',
              alignItems: 'center',
              color: 'black',
              textDecoration: 'none',
            }}
          >
            <ListItemIcon>
              <ArrowBackIcon />
            </ListItemIcon>
            <ListItemText primary="Quay lai" />
          </Link>
        </ListItemButton>
        <ListItemButton>
          <Link
            to={routes.AdminUser}
            style={{
              display: 'flex',
              alignItems: 'center',
              color: 'black',
              textDecoration: 'none',
            }}
          >
            <ListItemIcon>
              <AccountCircleIcon />
            </ListItemIcon>
            <ListItemText primary="User" />
          </Link>
        </ListItemButton>
        <Link
          to={routes.AdminProduct}
          style={{
            display: 'flex',
            alignItems: 'center',
            color: 'black',
            textDecoration: 'none',
          }}
        >
          <ListItemButton>
            <ListItemIcon>
              <WidgetsIcon />
            </ListItemIcon>
            <ListItemText primary="Product" />
          </ListItemButton>
        </Link>
        <Link
          to={routes.AdminCategory}
          style={{
            display: 'flex',
            alignItems: 'center',
            color: 'black',
            textDecoration: 'none',
          }}
        >
          <ListItemButton onClick={handleClick}>
            <ListItemIcon>
              <CategoryIcon />
            </ListItemIcon>
            <ListItemText primary="Category" />
          </ListItemButton>
        </Link>
      </List>
    </Box>
  );
}
