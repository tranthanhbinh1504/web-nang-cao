import React, { useState } from 'react'
import { Avatar, Button, Popover } from '@mui/material'
import CustomText from '../textarea'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEllipsisH } from '@fortawesome/free-solid-svg-icons'
import './style.scss'
import { Modal } from 'react-bootstrap'

type Props = {
  avaUser?: string,
  item?:any
}
const CommentSectionItem: React.FC<Props> = ({
  item,
  avaUser,
}) => {
  const [popup, setPopup] = useState(null)
  const [editCmt, setEditCmt] = useState(false)
  const [editdata,setEditdata] = useState(item)
  const [modal, setModal] = useState(false)

  // edit comment session functionality
  const openPost = Boolean(popup)
  const idPost = openPost ? 'simple-popover' : undefined
  const openPopup = (event:any) => {
    setPopup(event.currentTarget)
  }
  const addComent = (value: string) => {
    item.content = value
    setEditCmt(false)
  }
  // action
  const editAction = () => {
    setPopup(null)
    setEditCmt(true)
  }

  const deleteAction = () => {
    setModal(true)
    setPopup(null)
  }

  const closeModal = () => {
    setModal(false)
  }

  return(
    <div className='cmnRoot_wrapper'>
      {editCmt ?
        <div className='cmnRoot_postComt'>
          <Avatar src={avaUser} ></Avatar>
          <CustomText
            initalCmt={editdata.content}
            onAction={(value : string) => addComent(value)}
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
          <Modal
            show={modal}
            onHide={closeModal}
            aria-labelledby="contained-modal-title-vcenter"
            centered
          >
            <Modal.Title className='form_header'>
              <div>Xoá bình luận</div>
            </Modal.Title>
            <Modal.Body>
              <div>Bạn có chắc chắn muốn xóa dữ liệu</div>
              <div className='form_btn'>
                <Button
                  className='form_btnAction'
                  type='submit'
                  color='success'
                  size='medium'
                  variant='contained'
                  onClick={closeModal}
                  sx={{ marginTop: 2, paddingX: 5, paddingY: 1, marginRight: 2 }}
                >
                  Cancle
                </Button>
                <Button
                  className='form_btnAction'
                  type='submit'
                  color='error'
                  size='medium'
                  variant='contained'
                  onClick={closeModal}
                  sx={{ marginTop: 2, paddingX: 5, paddingY: 1,  marginLeft: 2 }}
                >
                  Delete
                </Button>
              </div>
            </Modal.Body>
          </Modal>
        </>
      }
    </div>
  )
}
export default CommentSectionItem