import React from 'react'
import * as RiIcons from 'react-icons/ri'
import * as IoIcons from 'react-icons/io'



export const  SidebarData = [
  {
    title: 'Trang chủ',
    path: '/dashboard',
    icon:<RiIcons.RiHome2Fill/>,
    iconClosed: <RiIcons.RiArrowDownSFill />,
    iconOpened: <RiIcons.RiArrowUpSFill />,

  },
  {

    title: 'Report',
    path: 'dashboard/reports',
    icon:<RiIcons.RiHome2Fill/>,
    iconClosed: <RiIcons.RiArrowDownSFill />,
    iconOpened: <RiIcons.RiArrowUpSFill />,

    subNav: [
      {
        title: 'Reports',
        path: 'dashboard/reports/reports1',
        icon: <IoIcons.IoIosPaper />,
        cName: 'sub-nav'
      },
      {
        title: 'Reports 2',
        path: 'dashboard/reports/reports2',
        icon: <IoIcons.IoIosPaper />,
        cName: 'sub-nav'
      },
      {
        title: 'Reports 3',
        path: 'dashboard/reports/reports3',
        icon: <IoIcons.IoIosPaper />
      }
    ]
  },
]