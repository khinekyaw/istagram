import { useSelector } from "react-redux"
import { Navigate, useLocation } from "react-router"

const RequireAuth = props => {
  const location = useLocation()
  const user = useSelector(state => state.user.username)

  return user ? (
    props.children
  ) : (
    <Navigate to='/login' replace state={{ path: location.pathname }} />
  )
}

export default RequireAuth
