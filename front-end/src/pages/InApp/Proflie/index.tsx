import * as React from 'react'
import Avatar from '@mui/material/Avatar'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Container from '@mui/material/Container'
import Stack from '@mui/material/Stack'
import { styled } from '@mui/material/styles'
import Sidebar from 'src/components/Sidebar/Sidebar'
import './style.scss'
import Grid from '@mui/material/Grid'
const drawerWidth = 240
const Input = styled('input')({
  display: 'none',
})
const uploadpicture = (
  <Stack direction="row" alignItems="center" spacing={2} sx={{justifyContent:'center'}}>
    <label htmlFor="contained-button-file">
      <Input accept="image/*" id="contained-button-file" multiple type="file" />
      <Avatar
        alt="Profile-image"
        sx={{ width: 300, height: 300, m:5 }}
        src="https://cdn-icons-png.flaticon.com/512/147/147144.png"
        className='img-profile'
      />
    </label>
  </Stack>
)
const profile = (
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
          <Box component="form" noValidate sx={{ mt: 1, width: { xs:'100%',lg:'70%' } }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="name"
              label="Full name"
              name="name"
              autoComplete="name"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email"
              name="email"
              autoComplete="email"
              autoFocus
              disabled
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="department"
              label="Department"
              type="department"
              id="department"
              autoComplete="department"
              disabled
            />
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
          <Box component="form" noValidate sx={{ mt: 1, width: { xs:'100%',lg:'70%' } }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="password"
              label="Password"
              name="password"
              autoComplete="password"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="confirmpassword"
              label="Confirm password"
              type="confirmpassword"
              id="confirmpassword"
              autoComplete="confirmpassword"
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
)


const Profile = () => {
  return (
    <Sidebar childComponent={
      <>
        <Box sx={{ display: 'flex',justifyContent:'center'}}>
          <Box>
            {profile}
          </Box>
        </Box>
      </>
    }/>
  )
}

export default Profile