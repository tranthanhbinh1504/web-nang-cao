
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
import Footer from '../../components/Footer/footer'
import './index.css'
import { useForm } from 'react-hook-form'
import { useHistory } from 'react-router-dom'


const schema = yup.object().shape({
  user: yup.string()
    .required('Your name is required')
    .max(32, 'Maximum 32 characters')
    .min(8, 'Minimum 8 characters'),
  password:yup.string()
    .required('Your password is required')
    .max(32, 'Maximum 32 characters')
    .min(8, 'Minimum 8 characters')
})

const theme = createTheme()

export default function SignIn() {
  const history = useHistory()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) })

  const onSubmit = (data: any) => {
    console.log(data)
    history.push('dashboard')
  }

  return (
    <ThemeProvider theme={theme}>
      <Grid container component="main" sx={{ height: '90vh' }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage: 'url(https://media-exp1.licdn.com/dms/image/C561BAQEXozIk9eT0-Q/company-background_10000/0/1621321144655?e=2159024400&v=beta&t=Iohif0y0ZrWODJH1Jzbh-5z28FpyHXb1funeo5nY-hM)',
            backgroundRepeat: 'no-repeat',
            backgroundColor: (t) =>
              t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
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
                {...register('user')}
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
                  <Link href="#" variant="body2">
                    {'Don\'t have an account? Sign Up'}
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </Box>

          <Grid
            sx={{
              my: 8,
              mx: 4,
              display: 'flex',
              alignItems: 'center',
            }}
          >
            <Grid item xs={12} sm={6}>

              <Avatar
                alt="TDT"
                src="https://smarttrain.edu.vn/assets/uploads/2016/05/tdt-logo.jpg"
                sx={{ width: 30, height: 30 }}
                className='avatar-img'
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <a href="/" className='email-btn'>
                <p>Login with student email</p>
              </a>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <Footer />
    </ThemeProvider>
  )
}
