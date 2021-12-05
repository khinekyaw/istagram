import { useDispatch } from "react-redux"
import { userActions } from "../redux/user-slice"

const useLogout = () => {
  const dispatch = useDispatch()

  const logout = () => {
    dispatch(userActions.clearUser())
    localStorage.clear()
  }

  return logout
}

export default useLogout
