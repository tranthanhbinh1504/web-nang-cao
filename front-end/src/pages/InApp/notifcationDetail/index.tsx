import React, { useEffect, useState }  from 'react'
import ResponsiveDrawer from 'src/components/sidebar'
import { useParams } from 'react-router-dom'
import { getNotificationDetail } from 'src/api/notification'
import './style.scss'

export interface IUserPublicProfileRouteParams {
  id: string;
}

const NotificationDetail: React.FC = () => {
  const [notificationData, setNotificationData] = useState<any>()
  const {id} = useParams<IUserPublicProfileRouteParams>()
  useEffect(() => {
    getDetail()
  }, [])

  const getDetail= () => {
    getNotificationDetail(id).then((value: any) => {
      setNotificationData(value)
    })
  }

  return (
    <ResponsiveDrawer childComponent={
      <div>
        {notificationData && notificationData
          .map((detail: any) => {
            return (
              <div key={detail.title}>
                <h1 className='newsHeader'>{detail.title}</h1>
                <p className='newsInfo'>{detail.department} | Ngày đăng {detail.date}</p>
                <p className='newsContent'>{detail.content}</p>
                <img src={detail.img}/>
              </div>
            )
          })
        }
      </div>
    }/>
  )
}

export default NotificationDetail