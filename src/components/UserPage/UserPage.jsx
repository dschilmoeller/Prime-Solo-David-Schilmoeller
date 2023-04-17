import React from 'react';
import LogOutButton from '../LogOutButton/LogOutButton';
import {useSelector} from 'react-redux';
import { useHistory } from 'react-router-dom'

function UserPage() {
  // this component doesn't do much to start, just renders some user reducer info to the DOM
  const user = useSelector((store) => store.user);
  const history = useHistory();

  return (
    <div className="container">
      {/* Modal buttons - convert when time allows */}
      <button className="btn" onClick={()=> {history.push('/mystock')}}>My Stock</button>
      <button className="btn" onClick={()=> {history.push('/allitems')}}>All Items</button>
      <button className="btn" onClick={()=> {history.push('/suppliers')}}>Suppliers</button>
      <button className="btn" onClick={()=> {history.push('/')}}>Profile Details</button>
      <LogOutButton className="btn" />
    </div>
  );
}

// this allows us to use <App /> in index.js
export default UserPage;
