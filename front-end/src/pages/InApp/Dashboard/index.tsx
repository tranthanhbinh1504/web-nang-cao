import * as React from 'react'
import Sidebar from '../../../components/Sidebar/sidebar'
import Notification from '../../../components/Notification/Notification/index'
import Box from '@mui/material/Box'
import Avatar from '@mui/material/Avatar'
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown'
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate'
import OndemandVideoIcon from '@mui/icons-material/OndemandVideo'
import FavoriteIcon from '@mui/icons-material/Favorite'
import CommentIcon from '@mui/icons-material/Comment'
import ShareIcon from '@mui/icons-material/Share'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
import './index.css'

export default function DashBoard() {

  return (
    <div className="dashboard">
      <Sidebar />
      <Box
        sx={{
          display:'flex',
          justifyItems:'center',
          width:'1000px',
          height:'20px',
          margin:'0 auto'
        }}
        className='main-box-dashboard'
      >
        <Box
          sx= {{
            width:'100%',
            height:'auto',
            mt:10
          }}
        >
          <div className="post-container cus-border">
            <div className="user-profile">
              <Avatar src="https://xaydunghoanghung.com/wp-content/uploads/2020/11/JaZBMzV14fzRI4vBWG8jymplSUGSGgimkqtJakOV.jpeg"></Avatar>
              <textarea rows={1} placeholder='What is on your mind , show it?'></textarea>
            </div>
            <div className="input-container">
              <div className="add-post-links">
                <a href=""><AddPhotoAlternateIcon className='post-links-icon'/>Add photo/video</a>
                <a href=""><OndemandVideoIcon className='post-links-icon'/>Live Video</a>              </div>
            </div>
          </div>
          <div className="socail-post-container cus-border">
            <div className="socail-post-row">
              <div className="user-profile">
                <Avatar src="https://xaydunghoanghung.com/wp-content/uploads/2020/11/JaZBMzV14fzRI4vBWG8jymplSUGSGgimkqtJakOV.jpeg"></Avatar>
                <div>
                  <p>Nguyen Tan Tai</p>
                  <span>20 - 11 -2021</span>
                </div>
              </div>
              <a href=""><KeyboardArrowDownIcon/></a>
            </div>
            <p className='socail-post-text'>
              <span>@Easy to code</span>
              Lorem ipsum dolor sit amet,
              consectetur adipisicing elit.
              Rerum quisquam sunt odit nihil
              ut quis veniam aspernatur perferendis
              adipisci aperiam perspiciatis dolor alias
              iusto pariatur, facilis libero fuga quas
              voluptate?
              <a href="">#Easy to code</a>
              <a href="">#Easy to code</a>
              <img src="https://cdn.tgdd.vn/Files/2014/12/24/592178/do-phan-giai_800x450.png" alt="post-img" />
              <div className="socail-post-row">
                <div className="activity-icon">
                  <div><FavoriteIcon className='socail-icon'/>150</div>
                  <div><CommentIcon className='socail-icon'/>20</div>
                  <div><ShareIcon className='socail-icon'/>05</div>
                </div>
                <div className="post-profile-icon">
                  <Avatar sx={{width:'20px',height:'20px'}} src="https://cdn.tgdd.vn/Files/2014/12/24/592178/do-phan-giai_800x450.png"></Avatar>
                </div>
              </div>
            </p>
            <hr />
          </div>
        </Box>
      </Box>
      <Notification />
    </div>
  )
}
