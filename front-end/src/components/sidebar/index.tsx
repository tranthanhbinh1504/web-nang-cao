import * as React from 'react'
import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import CssBaseline from '@mui/material/CssBaseline'
import Divider from '@mui/material/Divider'
import Drawer from '@mui/material/Drawer'
import IconButton from '@mui/material/IconButton'
import MenuIcon from '@mui/icons-material/Menu'
import Toolbar from '@mui/material/Toolbar'
import SubMenu from '../menu'
import './style.scss'
import {SidebarData} from 'src/utils/common'
import Header from '../header'
import { useHistory } from 'react-router-dom'


const drawerWidth = 260
type Props = {
    childComponent? : any
}
const ResponsiveDrawer: React.FC<Props> = ({childComponent},props) =>{
  // eslint-disable-next-line react/prop-types
  const { window } = props
  const [mobileOpen, setMobileOpen] = React.useState(false)

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen)
  }
  const history = useHistory()

  const drawer = (
    <div>
      <Divider />
      <div className='wrapperSidebar' onClick={() => history.push('dashboard')}>
        <img
          src='https://stdportal.tdtu.edu.vn/images/LogoTDTBgWhite.png'
          className='wrapperSidebar_img'
        />
      </div>
      {/* Phan de item sidebar*/}
      {SidebarData.map((item, index) => {
        return <SubMenu item={item} key={index} />
      })}
    </div>
  )

  const container = window !== undefined ? () => window().document.body : undefined
  return (
    <Box sx={{ display: 'flex'}}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          width: { md: `calc(100% - ${drawerWidth}px)` },
          ml: { md: `${drawerWidth}px` },
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { md: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
          <Header />
        </Toolbar>
      </AppBar>
      <Box
        component="nav"
        sx={{ width: { md: drawerWidth }, flexShrink: { sm: 0 } ,zIndex:'1'}}
        aria-label="dashboard"
      >
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: 'block', sm: 'block',md:'none'},
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: 'none', sm: 'none', md: 'block' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
      <Box
        component="main"
        sx={{ flexGrow: 1, p: 3, width: { md: `calc(100% - ${drawerWidth}px)` } }}
      >
        <Toolbar />
        {/* Phan de components con */}
        {childComponent}
      </Box>
    </Box>
  )
}

export default ResponsiveDrawer
