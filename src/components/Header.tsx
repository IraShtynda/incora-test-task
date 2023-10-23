import React from 'react';
import { useNavigate } from 'react-router-dom';
import { AppBar, Typography, Box, IconButton } from '@mui/material';
import LogoutIcon from '@mui/icons-material/Logout';
import AccountCircle from '@mui/icons-material/AccountCircle';
import { Colors } from '../styles/theme';

type Props = {
  name: string
}

export const Header: React.FC<Props> = ({ name }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    navigate('/');
  };

  return (
    <AppBar sx={{ padding: '30px', alignItems: 'flex-end' }}>
      <Box sx={{ display: 'flex', gap: '5px',  alignItems: 'center' }}>
        <AccountCircle />
        <Typography>{name}</Typography>
        <IconButton onClick={handleLogout} sx={{ marginLeft: '16px' }}>
          <LogoutIcon sx={{color: Colors.light}}/>
        </IconButton>
      </Box>
    </AppBar>
  );
};