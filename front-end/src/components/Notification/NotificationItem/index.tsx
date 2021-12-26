import * as React from 'react'
import Box from '@mui/material/Box'
import './style.css'

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
          width: 300,
          height: 100,
          borderLeft:'3px solid black',
          paddingLeft:'5px'
        }}
        className='box-noti'
      >
        <span className="subTitle">[{item.department}]</span>
        <span className="subTitle">-</span>
        <span className="subTitle">{item.date}</span>
        <a href=""><h6 className='title'>{item.title}</h6></a>
        <div className="detail-noti">{item.details}</div>
      </Box>
      <hr/>
    </div>
  )
}

export default NotiItem
