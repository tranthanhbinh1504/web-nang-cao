import React, { useState } from 'react'
import Avatar from '@mui/material/Avatar'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
import CommentIcon from '@mui/icons-material/Comment'
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt'
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt'
import {Button, Popover } from '@mui/material'
import ColorizeOutlinedIcon from '@mui/icons-material/ColorizeOutlined'
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined'
import { Modal } from 'react-bootstrap'
import { useForm } from 'react-hook-form'

enum ModalActionPost {
  EDIT = 'EDIT',
  DELETE = 'DELETE',
}
// interface Postdata {
//   id :string,
//   username: string,
//   date:string,
//   post :string,
//   img : string,
//   like: string,
//   comment: [
//     {
//       userid: string,
//       content: string,
//     },
//   ]
// }
const Postdashboard = (items:any) => {
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
    <>
      <div className="socail-post-row">
        <div className="user-profile">
          <Avatar src="https://cdn-icons-png.flaticon.com/512/147/147144.png"></Avatar>
          <div>
            <p>{items.username}</p>
            <span>{items.date}</span>
          </div>
        </div>
        <div>
          <KeyboardArrowDownIcon onClick={openPopup}/>
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
      <p className='socail-post-text'>
        {items.post}
        <img src={items.img} alt="post-img" />
      </p>
      <hr />
      <div className="socail-post-row">
        <div className="activity-icon">
          {like ?
            <>
              <div onClick={()=>setLike(false)}><ThumbUpOffAltIcon className='socail-icon' fontSize='large'/>{items.like}</div>
            </>
            :
            <>
              <div onClick={()=>setLike(true)} className='like-btn'><ThumbUpAltIcon className='socail-icon' fontSize='large'/>{items.like}</div>
            </>
          }
          <div><CommentIcon className='socail-icon' fontSize='large'/>{items.comment}</div>
        </div>
        <div>
          <Avatar sx={{width:'20px',height:'20px'}} src="https://cdn.tgdd.vn/Files/2014/12/24/592178/do-phan-giai_800x450.png"></Avatar>
        </div>
      </div>
      <hr />
    </>
  )
}
export default Postdashboard