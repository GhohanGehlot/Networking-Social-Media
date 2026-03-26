import { Navigate, Outlet } from 'react-router-dom'
import useAuth from '../store/useAuthStore'

const PublicRoutes = () => {

    const user = useAuth(state => state.user);

  return (
    user ? <Navigate to={"/"}/>  : <Outlet /> 
  )
}

export default PublicRoutes