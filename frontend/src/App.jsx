import React, { useEffect } from 'react'
import { BrowserRouter as Router , Routes , Route } from 'react-router-dom'
import Profile from './pages/Profile'
import Register from './pages/Register'
import Login from './pages/Login'
import MyGroup from './pages/MyGroup'
import useAuth from './store/useAuthStore'
import PrivateRoutes from './components/PrivateRoutes'
import PublicRoutes from './components/PublicRoutes'
import { ToastContainer, toast } from 'react-toastify';
import GroupChat from './pages/GroupChat'
import Explore from './pages/Explore'


const App = () => {

  const fetchUser = useAuth(state => state.fetchUser);
  const user = useAuth(state => state.user)


  useEffect(() => {    
       fetchUser();
       
  }, [])


  return (
    <Router>
      <Routes>
        <Route element={<PrivateRoutes/>}>
            <Route path='/' element={<MyGroup/>} />
            <Route path='/profile' element={<Profile/>} />    
            <Route path='/group/:id' element={<GroupChat/>}/> 
            <Route path='/group/explore' element={<Explore/>}/> 
        </Route>

        <Route element={<PublicRoutes/>}>
            <Route path='/login' element={<Login/>} />
            <Route path='/register' element={<Register/>} />
        </Route> 
      </Routes>
      <ToastContainer/>
    </Router>
  )
}

export default App