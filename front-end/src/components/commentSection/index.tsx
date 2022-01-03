import { Avatar, Popover } from '@mui/material'
import React, { useState } from 'react'
import CustomText from '../textarea'
import './style.scss'
import { faEllipsisH } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

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
  const [popup, setPopup] = useState(null)
  const [editCmt, setEditCmt] = useState(false)

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

  // post functionality
  const openPost = Boolean(popup)
  const idPost = openPost ? 'simple-popover' : undefined
  const openPopup = (event:any) => {
    setPopup(event.currentTarget)
  }

  // action
  const editAction = () => {
    setPopup(null)
    setEditCmt(true)
  }

  const deleteAction = () => {
    setPopup(null)
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
              <div key={key} className='cmnRoot_wrapper'>
                {editCmt ?
                  <div className='cmnRoot_postComt'>
                    <Avatar src={avaUser} ></Avatar>
                    <CustomText
                      onAction={(value: string) => addComent(value)}
                    />
                  </div> :
                  <>
                    <Avatar src={item.avaUrl} ></Avatar>
                    <div className='cmnRoot_content'>
                      <span className='cmnRoot_text_name'>{item.name}</span>
                      <span className='cmnRoot_text_display'>{item.content}</span>
                    </div>
                    <div className='cmnRoot_iconAction'>
                      <FontAwesomeIcon
                        icon={faEllipsisH}
                        onClick={openPopup}
                        style={{cursor: 'pointer'}}
                      />
                      <Popover
                        id={idPost}
                        open={openPost}
                        anchorEl={popup}
                        onClose={()=>setPopup(null)}
                        anchorOrigin={{
                          vertical: 'bottom',
                          horizontal: 'left',
                        }}
                      >
                        <div className='cmnRoot_styleAction' onClick={() => editAction()}>
                          Edit
                        </div>
                        <div className='cmnRoot_styleAction' onClick={() => deleteAction()}>
                          Delete
                        </div>
                      </Popover>
                    </div>
                  </>
                }
              </div>
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