import React from 'react';
import { useDispatch } from 'react-redux';
import { Button } from '@mui/material';

function LogOutButton(props) {
  const dispatch = useDispatch();

  return (
    <Button variant="contained"
    sx={{minWidth: 300, margin: 1}}
    
      onClick={() => dispatch({ type: 'LOGOUT' })}
    >
      Log Out
    </Button>
  );
}

export default LogOutButton;
