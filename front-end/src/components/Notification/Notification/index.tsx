import * as React from 'react'
import './style.css'
import Box from '@mui/material/Box'
import NotiItem from '../NotificationItem/index'
import {NotifiData} from '../NotifiData'

const HighofNOtiTitle = 10

const Notification: React.FC = () => {
  return (
    <div className='notification'>
      <Box
        sx={{
          width: 300,
          height: HighofNOtiTitle,
          position:'fixed',
          right:5,
          marginBottom:'20px',
          marginTop:'70px',
        }}
      >

        <span className='Noti-title'>Thông Báo mới</span>
        <a href="/">
          <span className='Noti-alldetails'>Xem tất cả</span>
        </a>

      </Box>
      <Box
        sx={{
          width: 330,
          height: 500,
          position:'fixed',
          right:5,
          marginTop: 4 + HighofNOtiTitle,
        }}
        className='box-noti'
      >
        {NotifiData.map((item, index) => {
          return <NotiItem item={item} key={index} />
        })}
      </Box>
    </div>
  )
}

export default Notification
