import React from 'react'
import './App.scss'
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
