import React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';

const Header = () => {
  return (
    <div>
      <AppBar>
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Blue People - Test
          </Typography>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }} style={{textAlign: 'right'}}>
           Arturo Martínez
          </Typography>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default Header;
