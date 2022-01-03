import React, { useState } from 'react'
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate'
import OndemandVideoIcon from '@mui/icons-material/OndemandVideo'
import Avatar from '@mui/material/Avatar'
import {Button, Popover, TextareaAutosize } from '@mui/material'
import { Modal } from 'react-bootstrap'
import Box from '@mui/material/Box'
import IconButton from '@material-ui/core/IconButton'
import PhotoCamera from '@material-ui/icons/PhotoCamera'
import { useForm } from 'react-hook-form'
import './style.scss'
import { display } from '@mui/system'
enum ModalActionPost {
  ADD = 'ADD',
}
const AddPost:React.FC = () => {
  const [modal, setModal] = useState(false)
  const [action, setAction] = useState('')
  const [image, setImage] = useState('')
  const { register, handleSubmit,setValue, formState: { errors } } = useForm()
  const onSubmit = (data:any) =>{
    console.log(data)
    setValue('img','')
    setValue('post','')
  }
  const getBase64 = (file:any, cb:any) => {
    let reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = function () {
      cb(reader.result)
    }
    reader.onerror = function (error) {
      console.log('Error: ', error)
    }
  }
  const loadImage = (evt: any) => {
    console.log(evt.target.files)
    if (evt.target.files.length > 0) {
      setImage(URL.createObjectURL(evt.target.files[0]))
    }
  }
  const openModal = (action: string) => {
    setModal(true)
    setAction(action)
  }
  const closeModal = () => {
    setModal(false)
  }
  const modalHeader = () => {
    return (
      <Modal.Title className='form_header'>
        {action === ModalActionPost.ADD && <div>Tạo bài viết</div>}
      </Modal.Title>
    )
  }
  const modalBody = () => {
    return (
      <Modal.Body>
        {
          (action === ModalActionPost.ADD &&
          <>
            <div className="socail-post-row">
              <div className="user-profile">
                <Avatar src="https://cdn-icons-png.flaticon.com/512/147/147144.png"></Avatar>
                <div>
                  <p>Tấn Tài</p>
                </div>
              </div>
            </div>
            <Box component="form" noValidate onSubmit={handleSubmit(onSubmit)} sx={{marginTop:'10px'}}>
              <TextareaAutosize
                aria-label="empty textarea"
                placeholder="Tài ơi bạn đang nghĩ gì thế?"
                minRows={5}
                className='textarea-post'
                {...register('post')}
              />
              <div className="image-display">
                <img src={image} alt="img" style={{display:image? 'block':'none',maxHeight:'300px',maxWidth:'466px'}} />
              </div>
              <div className='file-upload'>
                <p>Thêm vào bài viết</p>
                <input accept="image/*" id="icon-button-file" type="file" onChange={(evt) => loadImage(evt)}/>
                <label htmlFor="icon-button-file">
                  <IconButton color="primary" aria-label="upload picture" component="span">
                    <PhotoCamera />
                  </IconButton>
                </label>
              </div>
              <div className='form_btn-addpost'>
                <Button
                  className='btn btn-outline-primary'
                  type="submit"
                  size='medium'
                  variant="contained"
                  fullWidth
                  onClick={closeModal}
                  sx={{ marginTop: 3, paddingX: 10, paddingY: 1 }}
                >
                  Đăng
                </Button>
              </div>
            </Box>
          </>
          )
        }
      </Modal.Body>
    )
  }
  return (
    <div className="post-container cus-border">
      <div className="user-profile">
        <Avatar src="https://cdn-icons-png.flaticon.com/512/147/147144.png"></Avatar>
        <div className="postmodal"  onClick={() => openModal(ModalActionPost.ADD)}>
          <p>What is on your mind , show it?</p>
        </div>
      </div>
      <div className="input-container">
        <div className="add-post-links">
          <a href="" onClick={() => openModal(ModalActionPost.ADD)}><AddPhotoAlternateIcon className='post-links-icon'/>Add photo/video</a>
          <a href=""><OndemandVideoIcon className='post-links-icon'/>Live Video</a>
        </div>
      </div>
      <Modal
        show={modal}
        onHide={closeModal}
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        { modalHeader() }
        { modalBody() }
      </Modal>
    </div>
  )
}
export default AddPost