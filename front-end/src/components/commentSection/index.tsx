import { Avatar } from '@mui/material'
import React, { useState } from 'react'
import CustomText from '../textarea'
import './style.scss'
import CommentSectionItem from 'src/components/commentSectionItem'

type Props = {
  listComments?: any,
  createComments?: () => void,
  avaUser?: string
}

const CommentSection: React.FC<Props> = ({
  listComments,
  createComments,
  avaUser
}) => {
  const loadCmt = listComments.length
  const [actCmt, setActCmt] = useState(listComments.length > 1 ? true : false)
  const [data, setData] = useState(listComments)

  const loadingComment = () => {
    setActCmt(false)
  }

  const addComent = (value: string) => {
    setActCmt(false)
    let newCmt = [...data]
    newCmt.push({
      avaUrl: 'https://cdn-icons-png.flaticon.com/512/147/147144.png',
      name: 'Thu Nguyen',
      content: value
    })
    setData(newCmt)
  }

  return (
    <div className='cmnRoot'>
      { actCmt ?
        <div className='cmnRoot_allCmt' onClick={() => loadingComment()}>
          View all comments
        </div> :
        <div>
          {data && data.map((item: any, key: number) => {
            return (
              <CommentSectionItem
                key={key}
                avaUser={avaUser}
                item={item} />
            )
          })}
        </div>
      }
      <div className='cmnRoot_postComt'>
        <Avatar src={avaUser} ></Avatar>
        <CustomText
          onAction={(value: string) => addComent(value)}
        />
      </div>
    </div>
  )
}

export default CommentSection