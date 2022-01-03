import React from 'react'
import './style.scss'
import Avatar from '@mui/material/Avatar'
import MenuItem from '@mui/material/MenuItem'
import ListItemIcon from '@mui/material/ListItemIcon'
import IconButton from '@mui/material/IconButton'
import Menu from '@mui/material/Menu'
import Divider from '@mui/material/Divider'
import Settings from '@mui/icons-material/Settings'
import Logout from '@mui/icons-material/Logout'
import { useHistory } from 'react-router-dom'

function Header() {
  const history = useHistory()
  const [anchorEl, setAnchorEl] = React.useState(null)
  const open = Boolean(anchorEl)
  const handleClick = (event: any) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }

  const logOut = () => {
    history.push('/')
    localStorage.removeItem('token')
    window.location.reload()
  }
  return (
    <div className='header-component'>
      <nav>
        <div className="nav-left">
          <a href="/">
            <img className="logo" src="https://smarttrain.edu.vn/assets/uploads/2016/05/tdt-logo.jpg" alt="LogoTDT" />
            <p>Tôn Đức Thắng University</p>
          </a>
        </div>
        <div className="nav-right">
          <IconButton className="online" onClick={handleClick} size="small" sx={{ ml: 2 }}>
            <Avatar src="https://cdn-icons-png.flaticon.com/512/147/147144.png"></Avatar>
          </IconButton>

          <Menu
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            onClick={handleClose}
            PaperProps={{
              elevation: 0,
              sx: {
                overflow: 'visible',
                filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                mt: 1.5,
                '& .MuiAvatar-root': {
                  width: 32,
                  height: 32,
                  ml: -0.5,
                  mr: 1,
                },
                '&:before': {
                  content: '""',
                  display: 'block',
                  position: 'absolute',
                  top: 0,
                  right: 14,
                  width: 10,
                  height: 10,
                  bgcolor: 'background.paper',
                  transform: 'translateY(-50%) rotate(45deg)',
                  zIndex: 0,
                },
              },
            }}
            transformOrigin={{ horizontal: 'right', vertical: 'top' }}
            anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
          >
            <MenuItem>
              <Avatar /><a href="/profile" className='btn-profile'>Profile</a>
            </MenuItem>
            <Divider />
            <MenuItem onClick={logOut} className='btn-logout'>
              <ListItemIcon>
                <Logout fontSize="small" />
              </ListItemIcon>
                  Logout
            </MenuItem>
          </Menu>
        </div>
      </nav>
    </div>
  )
}
export default Header
