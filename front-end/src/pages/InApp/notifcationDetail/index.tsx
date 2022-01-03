import React from 'react'
import ResponsiveDrawer from 'src/components/sidebar'
import './style.scss'

const content = [{
  title: 'Thông báo A',
  content: 'Bài thi kết thúc môn các học phần tiếng Anh thực hiện theo đúng quy định của đề cương chi tiết, gồm có đánh giá 2 kỹ năng Listenning và Reading. Trong đó: Tổ chức thi nghe trực tuyến qua phần mềm Zoom/Google Meet; GV phụ trách lớp coi thi và chấm thi (GVTG và GVCH)',
  department: 'Khoa CNTT',
  date: '01/01/2022',
}]

const NotificationDetail = () => {
  return (
    <ResponsiveDrawer childComponent={
      <div>
        {content
          .map((detail) => {
            return (
              <div key={detail.title}>
                <h1 className='newsHeader'>{detail.title}</h1>
                <p className='newsInfo'>{detail.department} | Ngày đăng {detail.date}</p>
                <p className='newsContent'>{detail.content}</p>
              </div>
            )
          })
        }
      </div>
    }/>
  )
}

export default NotificationDetail