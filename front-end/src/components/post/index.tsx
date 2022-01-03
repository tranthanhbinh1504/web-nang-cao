import React, { useState } from 'react'
import Avatar from '@mui/material/Avatar'
import {Button, Popover } from '@mui/material'
import ColorizeOutlinedIcon from '@mui/icons-material/ColorizeOutlined'
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined'
import { Modal } from 'react-bootstrap'
import { useForm } from 'react-hook-form'
import './style.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEllipsisV } from '@fortawesome/free-solid-svg-icons'
import { faThumbsUp, faCommentAlt } from '@fortawesome/free-regular-svg-icons'

enum ModalActionPost {
  EDIT = 'EDIT',
  DELETE = 'DELETE',
}

interface Props {
  name?: string
  date?: string,
  content?: string,
  avaImgUrl?: string,
  contentImgUrl?: string,
  numLike?: number,
  numCmt?: number,
  childComment?: any,
  onActionLike?: () => void
  onActionCmt?: () => void
}

const Post: React.FC<Props> = (
  {
    name,
    date,
    content,
    avaImgUrl,
    contentImgUrl,
    numLike = 0,
    numCmt,
    childComment,
    onActionLike,
    onActionCmt
  }) => {
  const [modal, setModal] = useState(false)
  const [action, setAction] = useState('')
  const { register, handleSubmit,setValue, formState: { errors } } = useForm()
  const onSubmit = (data:any) =>{
    console.log(data)
  }

  const [popup, setPopup] = React.useState(null)
  const openPopup = (event:any) => {
    setPopup(event.currentTarget)
  }

  const [like,setLike] = useState(false)
  const openPost = Boolean(popup)
  const idPost = openPost ? 'simple-popover' : undefined

  const openModal = (action: string, data?: any) => {
    setModal(true)
    setAction(action)
    setPopup(null)
  }

  const closeModal = () => {
    setModal(false)
  }

  const modalHeader = () => {
    return (
      <Modal.Title className='form_header'>
        {action === ModalActionPost.EDIT && <div>Chỉnh sửa bài viết</div>}
        {action === ModalActionPost.DELETE && <div>Xoá bài viết</div>}
      </Modal.Title>
    )
  }
  const modalBody = () => {
    return (
      <Modal.Body>
        {
          (action === ModalActionPost.EDIT) &&
          <>
          </>
        }
        { action === ModalActionPost.DELETE &&
          <>
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
          </>
        }
      </Modal.Body>
    )
  }
  return(
    <div className='root'>

      <div className='avatar'>
        <Avatar src={avaImgUrl}></Avatar>
        <div className='avatar_wrapper'>
          <div className='avatar_title'>{name}</div>
          <div className='avatar_date'>{date}</div>
        </div>
        <div className='avatar_edit'>
          <FontAwesomeIcon icon={faEllipsisV} onClick={openPopup} style={{cursor: 'pointer'}}/>
          <Popover
            id={idPost}
            open={openPost}
            anchorEl={popup}
            onClose={()=>setPopup(null)}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'left',
            }}
            className='postpopup'
          >
            <div className='postpopup-item'>
              <ColorizeOutlinedIcon />
              <span onClick={() => openModal(ModalActionPost.EDIT)}>Chỉnh sửa bài viết</span>
            </div>
            <div className='postpopup-item'>
              <DeleteOutlinedIcon />
              <span onClick={() => openModal(ModalActionPost.DELETE)}>Xóa bài viết</span>
            </div>
          </Popover>
        </div>
      </div>

      <div className='content'>
        {content}
      </div>
      { contentImgUrl && <img className='contentImg' src={contentImgUrl} />}

      <div className='reaction'>
        <div className='reaction_action' onClick={() => onActionLike}>
          <FontAwesomeIcon
            icon={faThumbsUp}
            color='black'
          />
          <span className='reaction_num_likes'>{numLike}</span>
        </div>
        <div className='reaction_action' onClick={() => onActionCmt}>
          <span className='reaction_num_cmts'>{numCmt}</span>
          <span>comments</span>
        </div>
      </div>

      <div className='boardReact'>
        <div className='boardReact_wrapper_action' onClick={() => onActionLike}>
          <span>
            <FontAwesomeIcon
              icon={faThumbsUp}
              color='black'
            />
          </span>
          <span className='boardReact_action'>Like</span>
        </div>
        <div className='boardReact_wrapper_action' onClick={() => onActionCmt}>
          <span>
            <FontAwesomeIcon
              icon={faCommentAlt}
              color='black'
            />
          </span>
          <span className='boardReact_action'>Comment</span>
        </div>
      </div>

      <div className='comment'>
        {childComment}
      </div>


    </div>
  )
}
export default Post