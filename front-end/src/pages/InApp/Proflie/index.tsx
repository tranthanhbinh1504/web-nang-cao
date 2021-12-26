import * as React from 'react'
import Avatar from '@mui/material/Avatar'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Container from '@mui/material/Container'
import Stack from '@mui/material/Stack'
import { styled } from '@mui/material/styles'

const drawerWidth = 240
const Input = styled('input')({
  display: 'none',
})
const uploadpicture = (
  <Stack direction="row" alignItems="center" spacing={2}>
    <label htmlFor="contained-button-file">
      <Input accept="image/*" id="contained-button-file" multiple type="file" />
      <Button variant="contained" component="span">
        <Avatar
          alt="Profile-image"
          sx={{ width: 200, height: 200, m:2 }}
          src="https://cdn-icons-png.flaticon.com/512/147/147144.png"
        />
      </Button>
    </label>
  </Stack>
)
const profile = (
  <Container component="main" maxWidth="xs">
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <Typography component="h1" variant="h5">
        Profile
      </Typography>
      {uploadpicture}
      <Box component="form" noValidate sx={{ mt: 1 }}>
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
        />
        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
        >
          Update
        </Button>
      </Box>
    </Box>
  </Container>
)


const Profile = () => {
  return (
    <div>
      <Box sx={{ display: 'flex' }}>
        <Box
          component="main"
          sx={{ flexGrow: 1, p: 3, width: { sm: `calc(100% - ${drawerWidth}px)` },marginLeft:`${drawerWidth}px`}}
        >
          {profile}
        </Box>
      </Box>
    </div>
  )
}

export default Profile