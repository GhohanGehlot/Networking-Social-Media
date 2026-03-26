import { Navigate, Outlet } from 'react-router-dom'
import useAuth from '../store/useAuthStore'

const PrivateRoutes = () => {

    const user = useAuth(state => state.user);

  return (
    user ? <Outlet/> : <Navigate to={"/login"} />
  )
}

export default PrivateRoutes