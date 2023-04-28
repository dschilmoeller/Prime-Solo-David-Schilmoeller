import { useState, useRef, useEffect } from "react";
import { ProSidebar, Menu, MenuItem } from "react-pro-sidebar";
import "react-pro-sidebar/dist/css/styles.css";
import { Box, IconButton, Typography, useTheme } from "@mui/material";
import { HashRouter as Router, Link } from "react-router-dom";
import { useDispatch } from "react-redux";
// import { tokens } from "../../theme";
import Tooltip from "@mui/material/Tooltip";

import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";

import { Theme } from "@mui/material";

import InventoryIcon from '@mui/icons-material/Inventory';
import AllInclusiveIcon from '@mui/icons-material/AllInclusive';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';

//Function to be given props when called that determine the
//title, link, icon, and whether it is selected or not
const Item = ({ title, to, icon, selected, setSelected, collapsed }) => {
  // const theme = useTheme();
  // const colors = tokens(theme.palette.mode);

  return (
    //If title is empty mui doesn't render tooltip (no tooltip if side bar is open)
    <Tooltip title={!collapsed ? '' : title} placement="right-end">
      <MenuItem
        active={selected === title}
        // style={{ color: colors.grey[100] }}
        onClick={() => setSelected(title)}
        icon={icon}
      >
        <Typography>{title}</Typography>
        <Router>
          <Link to={to} />
        </Router>
      </MenuItem>
    </Tooltip>
  );
};

const Sidebar = () => {
  const dispatch = useDispatch();
  // const theme = useTheme();
  // const colors = tokens(theme.palette.mode);
  //collapse sidebar
  const [isCollapsed, setIsCollapsed] = useState(true);
  //show current page being viewed
  const [selected, setSelected] = useState("Dashboard");

  const ref = useRef();
  useEffect(() => {
    const handler = (event) => {
      
      if (
        (isCollapsed === false) &&
        ref.current &&
        !ref.current.contains(event.target)
      ) {
        setIsCollapsed(true);
        console.log(`Click outside`);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => {
      // Cleanup the event listener
      document.removeEventListener('mousedown', handler);
    };
  }, [isCollapsed]);

  return (
    <Box
      ref={ref}
      position="fixed"
      height="100vh"
      zIndex="100"
      // styling the pro-sidebar
      sx={{
        //   "& .pro-sidebar-inner": {
        //     // background: `${colors.primary[900]} !important`,
        //   },
        "& .pro-icon-wrapper": {
          backgroundColor: "transparent !important",
        },
        //   "& .pro-inner-item:hover": {
        //     // color: `${colors.orangeAccent[500]} !important`,
        //   },
        "& .pro-inner-item": {
          mt: "10%",
        },
        //   "& .pro-menu-item.active": {
        //     // color: `${colors.orangeAccent[500]} !important`,
        //   },
      }}
    >
      <ProSidebar collapsed={isCollapsed}>
        <Menu iconShape="square">
          {/* Logo and Menu Icon */}
          <MenuItem
            onClick={() => setIsCollapsed(!isCollapsed)}
            icon={isCollapsed ? <MenuOutlinedIcon /> : undefined}
            style={{
              // margin: "10px 0 20px 0",
              // color: colors.grey[100],
            }}
          >
            {!isCollapsed && (
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
              // ml="15px"
              >
                {/* <Typography variant="h3" color={colors.grey[100]}> */}
                Stock App
                {/* </Typography> */}
                <IconButton onClick={() => setIsCollapsed(!isCollapsed)}>
                  <MenuOutlinedIcon />
                </IconButton>
              </Box>
            )}
          </MenuItem>

          {/* User image, name, title*/}

          {/* Menu Items */}
          <Box paddingLeft={isCollapsed ? undefined : "10%"}>
            <Item
              title="My Stock"
              to="/mystock/0"
              icon={<InventoryIcon fontSize="large" />}
              selected={selected}
              setSelected={setSelected}
              collapsed={isCollapsed}
            />
            <Item
              title="All Items"
              to="/allitems"
              icon={<AllInclusiveIcon fontSize="large" />}
              selected={selected}
              setSelected={setSelected}
              collapsed={isCollapsed}
            />
            <Item
              title="Suppliers"
              to="/suppliers/0"
              icon={<LocalShippingIcon fontSize="large" />}
              selected={selected}
              setSelected={setSelected}
              collapsed={isCollapsed}
            />
            <Item
              title="My Profile"
              to="/profile"
              icon={<AccountCircleIcon fontSize="large" />}
              selected={selected}
              setSelected={setSelected}
              collapsed={isCollapsed}
            />

            <div onClick={() => { dispatch({ type: 'LOGOUT' }) }}>
              <Item
                title="Logout"
                to="/user"
                icon={<ExitToAppIcon fontSize="large" />}
                selected={selected}
                setSelected={setSelected}
                collapsed={isCollapsed}
              />
            </div>
          </Box>
        </Menu>
      </ProSidebar>
    </Box>
  );
};

export default Sidebar;