
import * as React from 'react'
import Avatar from '@mui/material/Avatar'
import Button from '@mui/material/Button'
import CssBaseline from '@mui/material/CssBaseline'
import TextField from '@mui/material/TextField'
import FormControlLabel from '@mui/material/FormControlLabel'
import Checkbox from '@mui/material/Checkbox'
import Link from '@mui/material/Link'
import Paper from '@mui/material/Paper'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import Footer from '../../components/footer'
import './style.scss'
import { useForm } from 'react-hook-form'
import { useHistory } from 'react-router-dom'
import { deepOrange, deepPurple } from '@mui/material/colors'
import { authLogin } from 'src/api/auth'
import Alert from '@mui/material/Alert'
import { useEffect, useState } from 'react'
import AlertError from 'src/components/alert'

const schema = yup.object().shape({
  username: yup.string()
    .required('Your name is required')
    .max(32, 'Maximum 32 characters')
    .min(8, 'Minimum 8 characters'),
  password:yup.string()
    .required('Your password is required')
    .max(32, 'Maximum 32 characters')
    .min(8, 'Minimum 8 characters')
})

// const axiosApiCall = (url: any, method: any, body = {}) =>
//   axios({
//     method,
//     url,
//     data: body,
//     headers: {'Access-Control-Allow-Origin': '*'},
//   })

const theme = createTheme()

const SignIn = () => {
  const history = useHistory()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) })

  const [alertdata,setAlertdata] = useState('')
  const onSubmit = (data: any) => {

    authLogin(data).then(()=>{
      history.push('dashboard')
      window.location.reload()
    }).catch(err => {
      setAlertdata(err.response.data.message)
    })
  }


  return (
    <div>
      <AlertError alertdata={alertdata} />
      <div className='login-page'>
        <CssBaseline />
        <Grid item xs={12}>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Avatar
              alt="TDT"
              src="https://smarttrain.edu.vn/assets/uploads/2016/05/tdt-logo.jpg"
              sx={{ width: 100, height: 100 }}
              className='avatar-img'
            />
            <Typography component="h1" variant="h5">
              Sign In
            </Typography>
            <Box component="form" noValidate onSubmit={handleSubmit(onSubmit)} sx={{ mt: 1 }}>
              <TextField
                className='Login-input'
                margin="normal"
                required
                fullWidth
                id="user"
                label="Username"
                autoComplete="user"
                autoFocus
                {...register('username')}
                helperText= {errors.user?.message}
              />
              <TextField
                className='Login-input'
                margin="normal"
                required
                fullWidth
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                {...register('password')}
                helperText= {errors.password?.message}
              />
              <Button
                className="login-btn"
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Sign In
              </Button>
            </Box>
          </Box>
        </Grid>
      </div>
    </div>
  )
}

export default SignIn