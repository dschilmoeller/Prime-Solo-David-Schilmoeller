import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import LogOutButton from '../LogOutButton/LogOutButton';
import './Nav.css';
import { useSelector, useDispatch} from 'react-redux';
import MenuIcon from '@mui/icons-material/Menu';
import { green } from '@mui/material/colors'
import { Button } from '@mui/material';

function Nav() {
  const user = useSelector((store) => store.user);
  const dispatch = useDispatch()
  const [hamburgerBool, setHamburgerBool] = useState(false);

  const toggleBurger = () => {
    setHamburgerBool(!hamburgerBool)
  }



  return (
    // <div className="nav">

      <div className='navbar'>
        {/* If no user is logged in, show these links */}
        {!user.id && (
          // If there's no user, show login/registration links
          <Link className="navLink" to="/login">
            Login / Register
          </Link>
        )}

        {/* If a user is logged in, show these links */}
        {user.id && (
          <>
            <div>
              <MenuIcon className="toggle" sx={{ color: green[500]}} onClick={toggleBurger} />
            </div>

            {/* {hamburgerBool ? ( */}
              <>
                {/* <Link to="/home"> */}
                <ul className={`menu-nav${hamburgerBool ? ' show-menu' : ''}`} >
                <li><a href="/user/"><h2 className="navName">Stock Ticker</h2></a></li>
                {/* </Link> */}
              
                <li><Link className="navLink" to="/mystock/0" onClick={toggleBurger}>
                  My Stock
                </Link></li>

                <li><Link className="navLink" to="/allitems/" onClick={toggleBurger}>
                  All Items
                </Link></li>

                <li><Link className="navLink" to="/suppliers/0" onClick={toggleBurger}>
                  Suppliers
                </Link></li>

                <li><Link className="navLink" to="/profile/" onClick={toggleBurger}>
                  Profile Details
                </Link></li>

                <li><Link className="navLink" to="/info" onClick={toggleBurger}>
                  Info Page
                </Link></li>

                <li><Link className="navLink" to="/about" onClick={toggleBurger}>
                  About
                </Link></li>

                <li><Link to="/user" onClick={toggleBurger}>
                <Button className="navLink" color="secondary" onClick={() => { dispatch({ type: 'LOGOUT' })}}>Logout</Button>
                </Link></li>
                </ul>
              </>
            {/* ) : null} */}
          </>
        )}


      </div>
    // </div>
  );
}

export default Nav;
