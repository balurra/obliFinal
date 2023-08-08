import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'

const PrivateRoute = ({ children, redirectTo }) => {
  const user = useSelector(state => state.user.userLogged)
  if (user) {
    return children
  } else {
    return <Navigate to={redirectTo} />
  }
}

export default PrivateRoute
