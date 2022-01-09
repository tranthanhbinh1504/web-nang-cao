import * as React from 'react'
import Box from '@mui/material/Box'
import './style.scss'

type Props = {
  item: any
}

const NotiItem: React.FC<Props> = ({
  item
}) => {
  return (
    <div className='notification-item'>
      <Box
        sx={{
          maxWidth: 300,
          minWidth: 250,
          height: 100,
          borderLeft:'3px solid black',
          paddingLeft: '10px',
        }}
        className='box-noti'
      >
        <span className="subTitle">[{item.department}]</span>
        <span className="subTitle">-</span>
        <span className="subTitle">{item.dateTime}</span>
        <a href=""><h6 className='title'>{item.title}</h6></a>
        <div className="detail-noti">{item.content}</div>
      </Box>
      <hr/>
    </div>
  )
}

export default NotiItem
