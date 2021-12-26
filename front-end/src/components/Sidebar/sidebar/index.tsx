import * as React from 'react'
import Box from '@mui/material/Box'
import Drawer from '@mui/material/Drawer'
import CssBaseline from '@mui/material/CssBaseline'
import MuiAppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
import MenuIcon from '@mui/icons-material/Menu'
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft'
import ChevronRightIcon from '@mui/icons-material/ChevronRight'
import { styled, useTheme } from '@mui/material/styles'
import SubMenu from '../submenu'
import { SidebarData } from '../sidebarData'

const drawerWidth = 330

interface StyledCustom {
  open?: boolean
}

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: 'flex-end',
}))

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })<StyledCustom>(
  ({ theme, open }) => ({
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: `-${drawerWidth}px`,
    ...(open && {
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: 0,
    }),
  }),
)

const AppBar = styled(MuiAppBar, {shouldForwardProp: (prop) => prop !== 'open'})<StyledCustom>
(({ theme, open }) => ({
  transition: theme.transitions.create(['margin', 'width'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}))

type Props = {
  childComponent? : any
}

const SideBar: React.FC<Props> = ({
  childComponent
}) => {
  const theme = useTheme()
  const [open, setOpen] = React.useState(false)

  const handleDrawerOpen = () => {
    setOpen(true)
  }

  const handleDrawerClose = () => {
    setOpen(false)
  }
  // const { window } = props
  // const [mobileOpen, setMobileOpen] = React.useState(false)

  // const handleDrawerToggle = () => {
  //   setMobileOpen(!mobileOpen)
  // }

  // const drawer = (
  //   <div >
  //     <Toolbar />
  //     <Divider />
  //     <List>
  //       <div>
  //         <IconButton className="online" size="small" sx={{ ml: 2 }}>
  //           <Avatar src="https://cdn-icons-png.flaticon.com/512/147/147144.png"></Avatar>
  //         </IconButton>
  //         <span>Tấn Tài</span>
  //       </div>

  //       {SidebarData.map((item, index) => {
  //         return <SubMenu item={item} key={index} />
  //       })}
  //     </List>
  //     <Divider />
  //   </div>
  // )

  // const container = window !== undefined ? () => window().document.body : undefined

  return (
    // <Box sx={{ display: 'flex' }}>
    //   <CssBaseline />
    //   <AppBar
    //     position="fixed"
    //     sx={{
    //       width: { sm: `calc(100% - ${drawerWidth}px)` },
    //       ml: { sm: `${drawerWidth}px` },
    //     }}
    //   >
    //     <Toolbar>
    //       <IconButton
    //         color="inherit"
    //         aria-label="open drawer"
    //         edge="start"
    //         onClick={handleDrawerToggle}
    //         sx={{ mr: 2, display: { sm: 'none' } }}
    //       >
    //         <MenuIcon />
    //       </IconButton>
    //       <Header />
    //     </Toolbar>
    //   </AppBar>
    //   <Box
    //     component="nav"
    //     sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
    //     aria-label="mailbox folders"
    //   >
    //     {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
    //     <Drawer
    //       container={container}
    //       variant="temporary"
    //       open={mobileOpen}
    //       onClose={handleDrawerToggle}
    //       ModalProps={{
    //         keepMounted: true, // Better open performance on mobile.
    //       }}
    //       sx={{
    //         display: { xs: 'block', sm: 'none' },
    //         '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
    //       }}
    //     >
    //       {drawer}
    //     </Drawer>
    //     <Drawer
    //       variant="permanent"
    //       sx={{
    //         display: { xs: 'none', sm: 'block' },
    //         '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
    //       }}
    //       open
    //     >
    //       {drawer}
    //     </Drawer>
    //   </Box>
    //   <Box
    //     component="main"
    //     sx={{ flexGrow: 1, p: 3, width: { sm: `calc(100% - ${drawerWidth}px)` } }}
    //   >
    //   </Box>
    // </Box>
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar position="fixed" open={open}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{ mr: 2, ...(open && { display: 'none' }) }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            Persistent drawer
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
          },
        }}
        variant="persistent"
        anchor="left"
        open={open}
      >
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
          </IconButton>
        </DrawerHeader>
        {/* Phan de Router*/}
        {SidebarData.map((item, index) => {
          return <SubMenu item={item} key={index} />
        })}
      </Drawer>
      <Main open={open}>
        <DrawerHeader />
        {/* Phan de dashboard */}
        {childComponent}
      </Main>
    </Box>
  )
}

export default SideBar