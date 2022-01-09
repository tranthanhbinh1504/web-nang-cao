import React, { useEffect, useState } from 'react'
import './style.scss'
import Box from '@mui/material/Box'
import NotiItem from '../subnotification'
import { notification } from 'src/api/notification'
import { useHistory } from 'react-router-dom'


const Notification: React.FC = () => {
  const [notificationData, setNotificationData] = useState<any>()
  const history = useHistory()

  useEffect(() => {
    getDataNotification()
  }, [])

  const getDataNotification = () => {
    notification().then((data) => {
      setNotificationData(data)
    })
  }

  const moveTonotifiactionPage = () => {
    history.push('notification')
  }

  return (
    <div className='noti'>
      <Box
        sx={{
          textAlign: 'center',
        }}
      >
        <span className='noti_title'>Thông Báo mới</span>
        <a onClick={() => moveTonotifiactionPage()}>
          <span className='noti_all'>Xem tất cả</span>
        </a>
      </Box>
      <Box
        sx={{
          justifyContent: 'center'
        }}
      >
        {notificationData && notificationData.slice(0, 3).map((item: any, index: any) => {
          return <NotiItem item={item} key={index} />
        })}
      </Box>
    </div>
  )
}

export default Notification
