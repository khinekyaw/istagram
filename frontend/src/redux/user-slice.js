import { createSlice } from "@reduxjs/toolkit"
const axios = require("axios").default

const INITIAL_USER_STATE = JSON.parse(localStorage.getItem("user")) || {
  username: null,
  key: null,
  profile: null
}

const userSlice = createSlice({
  name: "user",
  initialState: INITIAL_USER_STATE,
  reducers: {
    setUser(state, action) {
      state.username = action.payload.username
      state.key = action.payload.key
      state.profile = action.payload.profile
    },
    clearUser(state) {
      state.username = null
      state.key = null
      state.profile = null
    }
  }
})

export const login = ({ data, onSucceed }) => {
  return async dispatch => {
    const sendRequest = () => {
      const login_link = "http://127.0.0.1:8000/api/v1/rest-auth/login/"
      const response = axios.post(login_link, data)

      if (!response.statusText === "OK") {
        throw new Error("Something want wrong.")
      }
      return response
    }

    const sendRequestProfile = token => {
      const login_link = "http://127.0.0.1:8000/api/v1/profiles/user"
      let config = {
        headers: { Authorization: `Token ${token}` }
      }
      const response = axios.get(login_link, config)

      if (!response.statusText === "OK") {
        throw new Error("Something want wrong.")
      }
      return response
    }

    try {
      const response = await sendRequest()
      const login_data = JSON.parse(response.config.data)
      const profile = await sendRequestProfile(response.data.key)

      const user = {
        username: login_data.username,
        key: response.data.key,
        profile: profile.data
      }
      console.log("login: ", user)
      dispatch(userSlice.actions.setUser(user))
      localStorage.setItem("user", JSON.stringify(user))
      onSucceed()
    } catch (error) {
      console.log(error)
    }
  }
}

export const register = ({ data, onSucceed }) => {
  return async dispatch => {
    axios
      .post("http://127.0.0.1:8000/api/v1/rest-auth/register/", data)
      .then(function (response) {
        // handle success
        onSucceed()
      })
      .catch(function (error) {
        // handle error
        console.log(error)
      })
  }
}

export const userActions = userSlice.actions

export default userSlice
