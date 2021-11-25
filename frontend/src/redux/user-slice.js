import { createSlice } from "@reduxjs/toolkit"
const axios = require("axios").default

const userSlice = createSlice({
  name: "user",
  initialState: {
    username: null,
    key: null
  },
  reducers: {}
})

export default userSlice

// http://127.0.0.1:8000/api/v1/rest-auth/login/
const key = "e85afcb93df288d878a7d8910d147f0a28208a01"
const config = {
  headers: { Authorization: `Token ${key}` }
}

export const sendLoginData = credentials => {
  return async dispatch => {
    axios
      .post("http://127.0.0.1:8000/api/v1/rest-auth/login/", credentials)
      .then(function (response) {
        // handle success
        console.log(response)
      })
      .catch(function (error) {
        // handle error
        console.log(error)
      })
  }
}
