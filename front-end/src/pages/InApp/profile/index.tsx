import React, { useEffect, useState, useRef  } from 'react'
import Avatar from '@mui/material/Avatar'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import Stack from '@mui/material/Stack'
import { styled } from '@mui/material/styles'
import './style.scss'
import Grid from '@mui/material/Grid'
import ResponsiveDrawer from 'src/components/sidebar'
import {detailUser,editUser,changePassword} from 'src/api/user'
import { useForm } from 'react-hook-form'
import { InputLabel,MenuItem, Select,Collapse } from '@mui/material'
import AlertError from 'src/components/alert'
import {getDepartmentList} from 'src/api/department'
import { yupResolver } from '@hookform/resolvers/yup'
import * as Yup from 'yup'
const Input = styled('input')({
  display: 'none',
})
const uploadpicture = (
  <Stack direction="row" alignItems="center" spacing={2} sx={{justifyContent:'center'}}>
    <label htmlFor="contained-button-file">
      {/* <Input accept="image/*" id="contained-button-file" multiple type="file" /> */}
      <Avatar
        alt="Profile-image"
        sx={{ width: 300, height: 300, m:5 }}
        src="https://cdn-icons-png.flaticon.com/512/147/147144.png"
        className='img-profile'
      />
    </label>
  </Stack>
)

const formSchema = Yup.object().shape({
  password: Yup.string()
    .required('Không được bỏ trống')
    .min(8, 'Mật khẩu cần ít nhất 8 ký tự'),
  confirmpassword: Yup.string()
    .required('Không được bỏ trống')
    .oneOf([Yup.ref('password')], 'Confirm password không khớp'),
})
const Profileschema = Yup.object().shape({
  name: Yup.string(),
  username: Yup.string(),
  department: Yup.array(),
}).required()

const Profile = () => {
  const validationOpt = { resolver: yupResolver(formSchema) }
  const {register:register1, handleSubmit:handleSubmit1, formState: { errors:errors1 } } = useForm(validationOpt)
  const {register, handleSubmit,setValue, formState: { errors } } = useForm(Profileschema)
  const [selectvalueprofile, setSelectValueProfile] = useState<string[]>([])
  const [alert, setAlert] = useState(false)
  const [alertdata, setAlertdata] = useState('')
  const [userid ,setUserID] = useState<string>('')
  const [openalert, setOpenAlert] = useState(false)
  const [departmentlist, setDepartmentList] = useState<any>()
  const USER_ID = localStorage.getItem('userid') as string
  useEffect(
    () => {
      getDataProfile()
      getDataDepartment()
      setUserID(USER_ID)
    },[])

  const getDataProfile = () => {
    detailUser(USER_ID).then((data)=>{
      if(data) {
        setValue('name' ,data.name)
        setValue('username', data.username)
        let temp: string[] = []
        data.department.map((item:any) => {
          temp.push(item.departmentID)
        })
        setSelectValueProfile(temp)
      }
    })
  }

  const getDataDepartment = () => {
    getDepartmentList().then((data)=>{
      setDepartmentList(data)
    })
  }

  const onSubmit = (data:any) =>{
    const newValue = {
      name : data.name,
      username : data.username,
      department : selectvalueprofile
    }
    console.log(newValue)
    editUser(userid,newValue,{setAlertdata,setAlert}).then(()=>{
      autoAlert()
      getDataProfile()
    }).catch(err => {
      setAlertdata(err.response.data.message)
      setAlert(false)
    })
  }

  const onSubmitPassword = (data:any) =>{
    changePassword(userid,data,{setAlertdata,setAlert}).then(()=>{
      autoAlert()
      getDataProfile()
    }).catch(err => {
      setAlertdata(err.response.data.message)
      setAlert(false)
    })
  }

  const autoAlert =  () => {
    setOpenAlert(true)
    setTimeout(() => {
      setOpenAlert(false)
    }, 1000)
  }

  const handleChangeProfile = (event: any) => {
    const {
      target: { value },
    } = event
    setSelectValueProfile(
      typeof value === 'string' ? value.split(',') : value,
    )
  }



  return (
    <ResponsiveDrawer childComponent={
      <>
        <Collapse in={openalert}>
          <AlertError alertdata={alertdata} alert={alert} />
        </Collapse>
        <Box sx={{ display: 'flex',justifyContent:'center'}}>
          <Container component="main" sx={{display:'flex'}}>
            <Grid container spacing={2}>
              <Grid item xs={12} lg={4}>
                <Box>
                  {uploadpicture}
                </Box>
              </Grid>
              <Grid item xs={12} lg={8}>
                <Box
                  sx={{
                    padding:'10px'
                  }}
                >
                  <Box component="form" noValidate onSubmit={handleSubmit(onSubmit)} sx={{ mt: 1, width: { xs:'100%',lg:'70%' } }}>
                    <TextField
                      margin="normal"
                      fullWidth
                      id="name"
                      label="Full name"
                      {...register('name')}
                      autoComplete="name"
                      autoFocus
                    />
                    <TextField
                      margin="normal"
                      fullWidth
                      id="username"
                      label="Username"
                      {...register('username')}
                      autoComplete="username"
                      autoFocus
                      disabled
                    />
                    <div className='form_field'>
                      <div>
                        <InputLabel id="DepartmentProfile">Department</InputLabel>
                        <Select
                          labelId="DepartmentProfile"
                          label="departmentprofile"
                          multiple
                          fullWidth
                          onChange={handleChangeProfile}
                          value={selectvalueprofile}
                          disabled
                        >
                          {departmentlist &&
                            departmentlist.map((items:any,index:any) => (
                              <MenuItem value={items.id} key={index}>
                                {items.name}
                              </MenuItem>
                            ))
                          }
                        </Select>
                      </div>
                    </div>
                    <div className="formbtn_profile">
                      <Button
                        type="submit"
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                      >
                        Update Profile
                      </Button>
                    </div>
                  </Box>
                  <Box component="form" noValidate onSubmit={handleSubmit1(onSubmitPassword)} sx={{ mt: 1, width: { xs:'100%',lg:'70%' } }}>
                    <TextField
                      margin="normal"
                      required
                      fullWidth
                      id="password"
                      label="Password"
                      {...register1('password')}
                      autoComplete="password"
                      autoFocus
                      helperText= {errors1.password?.message}
                    />
                    <TextField
                      margin="normal"
                      required
                      fullWidth
                      {...register1('confirmpassword')}
                      label="Confirm password"
                      type="confirmpassword"
                      id="confirmpassword"
                      autoComplete="confirmpassword"
                      helperText= {errors1.confirmpassword?.message}
                    />
                    <div className="formbtn_profile">
                      <Button
                        type="submit"
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                      >
                        Update Password
                      </Button>
                    </div>
                  </Box>
                </Box>
              </Grid>
            </Grid>
          </Container>
        </Box>
      </>
    }/>
  )
}

export default Profile