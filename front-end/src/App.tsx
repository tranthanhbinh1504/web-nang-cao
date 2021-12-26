import React from 'react'
import './App.css'
import SideBar from './components/Sidebar/sidebar'
import RootRouter from './routes/index'


const App: React.FC = () => {
  return (
    <div className="App">
      {/* <SideBar /> */}
      <RootRouter />
    </div>
  )
}

export default App
