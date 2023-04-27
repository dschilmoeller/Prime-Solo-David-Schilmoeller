import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import LogOutButton from '../LogOutButton/LogOutButton';
import './Nav.css';
import { useSelector, useDispatch } from 'react-redux';
import MenuIcon from '@mui/icons-material/Menu';

function Nav() {
  const user = useSelector((store) => store.user);
  const dispatch = useDispatch()
  const [hamburgerBool, setHamburgerBool] = useState(false);

  const toggleBurger = () => {
    setHamburgerBool(!hamburgerBool)
  }



  return (
    <div className="nav">

      <div>
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
            <div className={`menu-nav${hamburgerBool ? ' show-menu' : ''}`} onClick={toggleBurger}>
              <MenuIcon />
            </div>

            {hamburgerBool ? (
              <>
                {/* <Link to="/home"> */}
                <h2 className="navName">Stock Ticker</h2>
                {/* </Link> */}
              
                <Link className="navLink" to="/mystock/0" onClick={toggleBurger}>
                  My Stock
                </Link>

                <Link className="navLink" to="/allitems/" onClick={toggleBurger}>
                  All Items
                </Link>

                <Link className="navLink" to="/suppliers/0" onClick={toggleBurger}>
                  Suppliers
                </Link>

                <Link className="navLink" to="/profile/" onClick={toggleBurger}>
                  Profile Details
                </Link>

                <Link className="navLink" to="/info" onClick={toggleBurger}>
                  Info Page
                </Link>

                <Link className="navLink" to="/about" onClick={toggleBurger}>
                  About
                </Link>
                <button className="navLink" onClick={() => { dispatch({ type: 'LOGOUT' }), setHamburgerBool(false)}}>Logout</button>
              </>
            ) : null}


            {/* <LogOutButton className="navLink" /> */}
          </>
        )}


      </div>
    </div>
  );
}

export default Nav;
