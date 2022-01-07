
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
import {googleLogin} from 'src/api/googleLogin'
import Alert from '@mui/material/Alert'
import { useEffect, useState } from 'react'
import AlertError from 'src/components/alert'
import axios from 'axios'
import { GoogleLogin } from 'react-google-login'
import Cookie from 'js-cookie'

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

const axiosApiCall = (url: any, method: any, body = {}) =>
  axios({
    method,
    url,
    data: body,
  })

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
    }).catch((err: any) => {
      setAlertdata(err.response.data.message)
    })
  }

  const onSuccess = (response: any) => {
    const access_token = response.accessToken
    axiosApiCall('http://localhost:5000/api/login/auth/google', 'get', { access_token }).then((res) => {
      const { user, token } = res.data
      Cookie.set('token', token)
      history.push('dashboard')
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
              <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Remember me"
                style={{display:'block'}}
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
              <Grid container className='item-btn'>
                <Grid item xs>
                  <Link href="#" variant="body2">
                    Forgot password?
                  </Link>
                </Grid>
                <Grid item>
                  <GoogleLogin
                    clientId={'747749520089-9uiv8cd656l7ts1lpd2s4tm0t2pdairb.apps.googleusercontent.com'}
                    buttonText="Sign up with Google"
                    onSuccess={onSuccess}
                    onFailure={() => {}}
                  />
                  <Link href="http://localhost:5000/api/login/auth/google" variant="body2">
                    {'Login with Google'}
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Grid>
      </div>
    </div>
  )
}

export default SignIn