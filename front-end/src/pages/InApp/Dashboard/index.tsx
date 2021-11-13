import * as React from 'react'
import Sidebar from '../../../components/Sidebar/sidebar'
import Notification from '../../../components/Notification/Notification/index'
import Box from '@mui/material/Box'

import './index.css'

export default function DashBoard() {

  return (
    <div className="dashboard">
      <Sidebar />
      <Box
        sx={{
          display:'flex',
          justifyItems:'center',
          width:'1000px',
          height:'20px',
          margin:'0 auto'
        }}
      >
        <Box
          sx= {{
            display:'flex',
            border: 1,
            width:'1000px',
            height:'1000px'
          }}
        >
        </Box>
      </Box>
      <Notification />
      <h1>akjsdakjk</h1>
    </div>
  )
}
