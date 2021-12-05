import { useDispatch, useSelector } from "react-redux"
const axios = require("axios").default

import { userActions } from "../redux/user-slice"

const useAuth = () => {
  const dispatch = useDispatch()
  const user = useSelector(state => state.user)

  const login = credentials => {
    return axios.post(
      "http://127.0.0.1:8000/api/v1/rest-auth/login/",
      credentials
    )
  }

  return {
    authed: user.username,
    login
  }
}

export default useAuth
