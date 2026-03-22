import React from 'react'
import { BrowserRouter as Router , Routes , Route } from 'react-router-dom'
import Profile from './pages/Profile'
import Register from './pages/Register'
import Login from './pages/Login'
import MyGroup from './pages/MyGroup'

const App = () => {
  return (
    <Router>
      <Routes>
         <Route path='/' element={<MyGroup/>} />
         <Route path='/profile' element={<Profile/>} />
         <Route path='/register' element={<Register/>} />
         <Route path='/login' element={<Login/>} />
      </Routes>
    </Router>
  )
}

export default App