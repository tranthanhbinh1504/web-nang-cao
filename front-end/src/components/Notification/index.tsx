import * as React from 'react'
import './style.scss'
import Box from '@mui/material/Box'
import NotiItem from '../subnotification'

const  NotifiData = [

  {
    department:'Phòng đại học',
    date:'04/06/1999',
    title: 'Trang chủ',
    details: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Explicabo rerum praesentium ab ipsam beatae quidem quam, unde adipisci illo quaerat, aspernatur nemo rem porro ex cumque? Porro, quasi dicta. Consectetur!',
  },
  {
    department:'Khoa CNTT',
    date:'04/06/1999',
    title: 'Trang bìa',
    details: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Explicabo rerum praesentium ab ipsam beatae quidem quam, unde adipisci illo quaerat, aspernatur nemo rem porro ex cumque? Porro, quasi dicta. Consectetur!',
  },
  {
    department:'Khoa CNTT',
    date:'04/06/1999',
    title: 'Trang bìa',
    details: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Explicabo rerum praesentium ab ipsam beatae quidem quam, unde adipisci illo quaerat, aspernatur nemo rem porro ex cumque? Porro, quasi dicta. Consectetur!',
  },
]
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
