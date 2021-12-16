import React, { useState } from 'react'
import Sidebar from '../../../components/Sidebar/sidebar'
import Footer from '../../../components/Footer/'
import { Modal } from 'react-bootstrap'
import { Button } from 'react-bootstrap'
import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import Select from '@mui/material/Select'
import OutlinedInput from '@mui/material/OutlinedInput'
import { useTheme } from '@mui/material/styles'
import './style.css'
import InfiniteScroll from 'react-infinite-scroll-component'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'

const drawerWidth = 240

//schema validate of Add User Modal
const schema = yup.object().shape({
  fullname: yup.string()
    .required('Your name is required')
    .max(32, 'Maximum 32 characters')
    .min(8, 'Minimum 8 characters'),
})

export default function UserAdmin() {
  //infinity scroll
  // show or hide add user modal
  const [show, setShow] = useState(false)
  const handleClose = () => setShow(false)
  const handleShow = () => setShow(true)
  //get value from Add user Form modal
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) })

  const onSubmit = (data: any) => {
    console.log(data)
  }
  // show or hide edit user modal
  const [show1, setShow1] = useState(false)
  const handleClose1 = () => setShow1(false)
  const handleShow1 = () => setShow1(true)
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
  const departments = [
    'Công Nghệ Thông Tin',
    'Kế Toán',
    'Quản trị Kinh doanh',
  ]
  const theme = useTheme()
  const [personName, setPersonName] = React.useState([])
  //multi select
  const handleChange = (event:any) => {
    const {
      target: { value },
    } = event
    setPersonName(
      // On autofill we get a the stringified value.
      typeof value === 'string' ? value.split(',') : value,
    )
  }
  function getStyles(name:any, personName:any, theme:any) {
    return {
      fontWeight:
        personName.indexOf(name) === -1
          ? theme.typography.fontWeightRegular
          : theme.typography.fontWeightMedium,
    }
  }
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
            <tr>
              <td>1</td>
              <td><a href="#">Nguyễn Tấn Tài</a></td>
              <td>tantai9991@gmail.com</td>
              <td>CNTT</td>
              <td>
                <button className="btn btn-sm btn-outline-primary btn-edit-delete" onClick={handleShow1}>Chỉnh sửa</button>
                <span>|</span>
                <button className="btn btn-sm btn-outline-danger btn-edit-delete"  onClick={handleShow2}>Xóa</button>
              </td>
            </tr>
          </tbody>
        </table>
        <p>Tổng số người dùng: <strong className="text-danger">5</strong></p>
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
              label="Full Name"
              autoComplete="fullname"
              autoFocus
              {...register('fullname')}
              helperText= {errors.fullname?.message}
            />
            {/* <TextField
              className='Login-input'
              margin="normal"
              required
              fullWidth
              id="email"
              name='email'
              label="Email"
              autoComplete="Email"
              autoFocus
            />
            <InputLabel id="demo-multiple-name-label">Department</InputLabel>
            <Select
              labelId="demo-multiple-name-label"
              id="demo-multiple-name"
              name='selecter'
              multiple
              value={personName}
              onChange={handleChange}
              input={<OutlinedInput label="Department" />}
              MenuProps={MenuProps}
              fullWidth
              required
            >
              {departments.map((department) => (
                <MenuItem
                  key={department}
                  value={department}
                  style={getStyles(department, personName, theme)}
                >
                  {department}
                </MenuItem>
              ))}
            </Select> */}
          </Box>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary">
            Save
          </Button>
        </Modal.Footer>
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
        <Modal.Body>Woohoo, you are reading this text in a modal!</Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleClose1}>
            Save Changes
          </Button>
        </Modal.Footer>
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
          <Button variant="primary" onClick={handleClose2}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  )
  return(
    <div className="user-admin">
      <Sidebar />
      <Box sx={{ display: 'flex' }}>
        <Box
          component="main"
          sx={{ flexGrow: 1, p: 3, width: { sm: `calc(100% - ${drawerWidth}px)` },marginLeft:`${drawerWidth}px`}}
          className='box-UserAdmin'
        >
          {/* <InfiniteScroll
            dataLength={items.length} //This is important field to render the next data
            next={fetchMoreData}
            hasMore={true}
            loader={<h4>Loading...</h4>}
            endMessage={
              <p style={{ textAlign: 'center' }}>
                <b>Yay! You have seen it all</b>
              </p>
            }
            // below props only if you need pull down functionality
            refreshFunction={this.refresh}
            pullDownToRefresh
            pullDownToRefreshThreshold={50}
            pullDownToRefreshContent={
              <h3 style={{ textAlign: 'center' }}>&#8595; Pull down to refresh</h3>
            }
            releaseToRefreshContent={
              <h3 style={{ textAlign: 'center' }}>&#8593; Release to refresh</h3>
            }
          >
            {userAdmin}
          </InfiniteScroll> */}
          {userAdmin}
        </Box>
      </Box>
      <Sidebar />
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