import * as React from 'react'
import Box from '@mui/material/Box'
import './style.css'


function NotiItem({item}:any) {
  return (
    <div className='notification-item'>

      <Box
        sx={{
          width: 300,
          height: 130,
          borderLeft:'3px solid black',
          paddingLeft:'5px'
        }}
      >
        <span className="subTitle">[{item.department}]</span>
        <span className="subTitle">-</span>
        <span className="subTitle">{item.date}</span>
        <h6>{item.title}</h6>
        <div className="detail-noti">{item.details}</div>
      </Box>
      <hr/>
    </div>
  )
}

export default NotiItem
