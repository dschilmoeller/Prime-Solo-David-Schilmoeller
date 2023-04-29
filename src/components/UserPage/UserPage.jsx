import React, { useEffect } from 'react';
import LogOutButton from '../LogOutButton/LogOutButton';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Button } from '@mui/material';
import { red } from '@mui/material/colors';


function UserPage() {
  // this component doesn't do much to start, just renders some user reducer info to the DOM
  const user = useSelector((store) => store.user);
  const history = useHistory();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({ type: "FETCH_MY_STOCK" })
  }, []);

  return (
    <div className="user-btn-container">
      {/* Modal buttons - convert when time allows */}
      <Button className="user-page-btn" sx={{ minWidth: 300, margin: 1 }} variant="contained" onClick={() => { history.push('/mystock/0') }}>My Stock</Button>
      <Button className="user-page-btn" sx={{ minWidth: 300, margin: 1 }} variant="contained" onClick={() => { history.push('/allitems/') }}>All Items</Button>
      <Button className="user-page-btn" sx={{ minWidth: 300, margin: 1 }} variant="contained" onClick={() => { history.push('/suppliers/0') }}>Suppliers</Button>
      <Button className="user-page-btn" sx={{ minWidth: 300, margin: 1 }} variant="contained" onClick={() => { history.push('/profile/') }}>Profile Details</Button>
      <LogOutButton className="user-page-btn" />
    </div>
  );
}

// this allows us to use <App /> in index.js
export default UserPage;
