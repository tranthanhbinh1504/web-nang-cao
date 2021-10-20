import "./header.css";
import * as React from "react";
import Avatar from "@mui/material/Avatar";
import MenuItem from "@mui/material/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import Divider from "@mui/material/Divider";
import Settings from "@mui/icons-material/Settings";
import Logout from "@mui/icons-material/Logout";
import { menuStyle } from '../../utils/common';

export const Header = () => {
  const [item, setItem] = React.useState(null);
  const open = Boolean(item);
  const handleClick = (event: any) => {
    setItem(event.currentTarget);
  };
  const handleClose = () => {
    setItem(null);
  };

  return (
    <div>
      <nav>
        <div className="nav-left">
          <a href="/">
            <img
              className="logo"
              src="https://smarttrain.edu.vn/assets/uploads/2016/05/tdt-logo.jpg"
              alt="LogoTDT"
            />
            <p>Tôn Đức Thắng University</p>
          </a>
        </div>
        <div className="nav-right">
          <IconButton
            className="online"
            onClick={handleClick}
            size="small"
            sx={{ ml: 2 }}
          >
            <Avatar src="https://xaydunghoanghung.com/wp-content/uploads/2020/11/JaZBMzV14fzRI4vBWG8jymplSUGSGgimkqtJakOV.jpeg"></Avatar>
          </IconButton>

          <Menu
            anchorEl={item}
            open={open}
            onClose={handleClose}
            onClick={handleClose}
            PaperProps={menuStyle}
            transformOrigin={{ horizontal: "right", vertical: "top" }}
            anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
          >
            <MenuItem>
              {/* <Link to="/about">About</Link> */}
              <Avatar /> Profile
            </MenuItem>
            <Divider />
            <MenuItem>
              <ListItemIcon>
                <Settings fontSize="small" />
              </ListItemIcon>
              Settings
            </MenuItem>
            <MenuItem>
              <ListItemIcon>
                <Logout fontSize="small" />
              </ListItemIcon>
              Logout
            </MenuItem>
          </Menu>
        </div>
      </nav>
    </div>
  );
}

