import React from 'react';
import Typography from '@mui/material/Typography';
import Toolbar from '@mui/material/Toolbar';
import Box from '@mui/material/Box';
import AppBar from '@mui/material/AppBar';
import IconButton from '@mui/material/IconButton';
import CssBaseline from '@mui/material/CssBaseline';
import { BsNewspaper } from "react-icons/bs";
import './Navbar.css';
const Navbar = () => {
  return (
    <div className='header'>
    <Box  style={{ marginTop: '70px' }}>
      <CssBaseline />
      <AppBar style={{height:'60px'}}>
        <div className="AppBar"  style={{textAlign:"center",   textShadow:'4px 4px #2b2a29'}}>
          <Toolbar>
            <Typography variant="h5" noWrap component="div" color="white" style={{padding:'5px'}}>
              <IconButton style={{ fontSize: '120%' }}>  <BsNewspaper /></IconButton>
              Leyla's News
            </Typography>
          </Toolbar>
        </div>
      </AppBar>
    </Box>
    </div>
  );
};

export default Navbar;
