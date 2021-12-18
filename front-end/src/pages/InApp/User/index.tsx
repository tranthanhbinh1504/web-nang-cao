import React, { useState } from 'react'
import Footer from '../../../components/Footer/'
import { Modal } from 'react-bootstrap'
import Button from '@mui/material/Button'
import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'
import { useTheme } from '@mui/material/styles'
import './style.css'
import InfiniteScroll from 'react-infinite-scroll-component'
import { useForm,Controller } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import Select from '@mui/material/Select'
const drawerWidth = 240

//schema validate of Add User Modal
interface AddUserModal {
  fullname: string
  email: string
  department: string
}

const schema = yup.object({
  fullname: yup.string().required(),
  email: yup.string().required(),
  department: yup.string().required(),
}).required()

const Userdata = [
  {
    // id: '1',
    fullname: 'Nguyễn Tấn Tài',
    email: 'tantai9991@gmail.com',
    department: 'CNTT,KTPM',
  },
  {
    // id: '2',
    fullname: 'Nguyễn Khải',
    email: 'tantai9991@gmail.com',
    department: 'CNTT,KTPM',
  },
  {
    // id: '3',
    fullname: 'Nguyễn abc',
    email: 'khai@gmail.com',
    department: 'CNTT,KTPM',
  },
  {
    // id: '4',
    fullname: 'Nguyễn xst',
    email: 'tantai9991@gmail.com',
    department: 'CNTT,KTPM',
  },
]
export default function UserAdmin() {
  //infinity scroll
  // show or hide add user modal
  const [show, setShow] = useState(false)
  const handleClose = () => setShow(false)
  const handleShow = () => setShow(true)
  //get value from Add user Form modal
  const { register, handleSubmit,setValue, formState: { errors } } = useForm<AddUserModal>({
    resolver: yupResolver(schema)
  })
  const onSubmit = (data: AddUserModal) =>{
    console.log(data)
    Userdata.push(data)
  }
  const [age, setAge] = React.useState('')
  const handleChange = (event:any) => {
    setAge(event.target.value)
  }
  //get department value from Form Add User Modal
  // show or hide edit user modal
  const [show1, setShow1] = useState(false)
  const handleClose1 = () => setShow1(false)
  const handleShow1 = (user:any) => {
    setValue('fullname',user.fullname)
    console.log(user)
    setShow1(true)
  }
  // show or hide delete user modal
  const [show2, setShow2] = useState(false)
  const handleClose2 = () => setShow2(false)
  const handleShow2 = () => setShow2(true)
  //set select department in add user modal
  const ITEM_HEIGHT = 48
  const ITEM_PADDING_TOP = 8
  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        width: 250,
      },
    },
  }
  const theme = useTheme()
  const userAdmin = (
    <div>
      <div className="container useradmin">
        <h4 className="my-5 text-primary text-center text-uppercase">Danh sách người dùng</h4>
        <button className="btn btn-success btn-sm my-4" onClick={handleShow}>Thêm người dùng</button>
        <p>Chọn một người dùng để xem chi tiết</p>
        <table className="table table-striped border user-table">
          <thead>
            <tr>
              <th>STT</th>
              <th>Họ và tên</th>
              <th>Email</th>
              <th>Khoa</th>
              <th>Thao tác</th>
            </tr>
          </thead>
          <tbody>
            {Userdata.map((user,index) => {
              return(
                <tr key={index+1}>
                  <td>{index+1}</td>
                  <td><a href="#">{user.fullname}</a></td>
                  <td>{user.email}</td>
                  <td>{user.department}</td>
                  <td>
                    <button className="btn btn-sm btn-outline-primary btn-edit-delete" onClick={()=>handleShow1(user)}>Chỉnh sửa</button>
                    <span>|</span>
                    <button className="btn btn-sm btn-outline-danger btn-edit-delete"  onClick={handleShow2}>Xóa</button>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
        <p>Tổng số người dùng: <strong className="text-danger">{Userdata.length}</strong></p>
      </div>
      {/* add MOdal */}
      <Modal
        show={show}
        onHide={handleClose}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Thêm người dùng mới</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Box component="form" noValidate onSubmit={handleSubmit(onSubmit)} sx={{ mt: 1 }}>
            <TextField
              className='Login-input'
              margin="normal"
              required
              fullWidth
              id="fullname"
              label="FullName"
              autoComplete="fullname"
              autoFocus
              {...register('fullname')}
              helperText= {errors.fullname?.message}
            />
            <TextField
              className='Login-input'
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email"
              autoComplete="Email"
              autoFocus
              {...register('email')}
              helperText= {errors.email?.message}
            />
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Department</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="department"
                label="Department"
                fullWidth
                required
                {...register('department')}
                onChange={handleChange}
              >
                <MenuItem value={'CNTT'}>Công Nghệ Thông Tin</MenuItem>
                <MenuItem value={'CNTT1'}>Công Nghệ Thông Tin</MenuItem>
                <MenuItem value={'CNTT2'}>Công Nghệ Thông Tin</MenuItem>
              </Select>
            </FormControl>
            <Button
              className="login-btn"
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              onClick={handleClose}
            >
                Save
            </Button>
          </Box>
        </Modal.Body>
      </Modal>

      {/* edit Modal */}
      <Modal
        show={show1}
        onHide={handleClose1}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Chỉnh sửa người dùng</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Box component="form" noValidate onSubmit={handleSubmit(onSubmit)} sx={{ mt: 1 }}>
            <TextField
              className='Login-input'
              margin="normal"
              required
              fullWidth
              id="fullname"
              label="FullName"
              autoComplete="fullname"
              autoFocus
              {...register('fullname')}
              helperText= {errors.fullname?.message}
            />
            <Button
              className="login-btn"
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              onClick={handleClose1}
            >
                Save Changes
            </Button>
          </Box>
        </Modal.Body>
      </Modal>
      {/* delete Modal */}
      <Modal
        show={show2}
        onHide={handleClose2}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Xóa người dùng</Modal.Title>
        </Modal.Header>
        <Modal.Body>Bạn có chắc chắn muốn xóa <strong>Nguyễn Tấn Tài</strong></Modal.Body>
        <Modal.Footer>
          <Button onClick={handleClose2}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  )
  return(
    <div className="user-admin">
      <Box sx={{ display: 'flex' }}>
        <Box
          component="main"
          sx={{ flexGrow: 1, p: 3, width: { sm: `calc(100% - ${drawerWidth}px)` },marginLeft:`${drawerWidth}px`}}
          className='box-UserAdmin'
        >
          {userAdmin}
        </Box>
      </Box>
      <Box sx={{ display: 'flex' }}>
        <Box
          component="main"
          sx={{ flexGrow: 1, p: 3, width: { sm: `calc(100% - ${drawerWidth}px)` },marginLeft:`${drawerWidth}px`}}
          className='box-UserAdmin'
        >
          <Footer />
        </Box>
      </Box>
    </div>
  )
}