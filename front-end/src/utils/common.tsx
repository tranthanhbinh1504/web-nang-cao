import React from 'react'
import * as RiIcons from 'react-icons/ri'
import * as IoIcons from 'react-icons/io'

export const menuStyle = {
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
      content: '',
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
}

export const  SidebarData = [
  {
    title: 'Trang chủ',
    path: '/dashboard',
    icon:<RiIcons.RiHome2Fill/>,
    iconClosed: <RiIcons.RiArrowDownSFill />,
    iconOpened: <RiIcons.RiArrowUpSFill />,

  },
  {
    title: 'Notification',
    path: '/notification',
    icon:<RiIcons.RiHome2Fill/>,
    iconClosed: <RiIcons.RiArrowDownSFill />,
    iconOpened: <RiIcons.RiArrowUpSFill />,

  },
  {
    title: 'User',
    path: '/listuser',
    icon:<RiIcons.RiHome2Fill/>,
    iconClosed: <RiIcons.RiArrowDownSFill />,
    iconOpened: <RiIcons.RiArrowUpSFill />,

  },
]