import { createSlice } from "@reduxjs/toolkit"
const axios = require("axios").default

const profileDetailSlice = createSlice({
  name: "posts",
  initialState: {
    status: "idle",
    profile: null
  },
  reducers: {
    setProfileDetail(state, action) {
      state.profile = action.payload.profile
    }
  }
})

export const fetchProfileDetail = id => {
  return async (dispatch, getState) => {
    const user = getState().user

    if (user && user.key) {
      let config = {
        headers: { Authorization: `Token ${user.key}` }
      }

      const sendRequest = async () => {
        const response = await axios.get(
          `http://127.0.0.1:8000/api/v1/profiles/${id}/?format=json`,
          config
        )

        if (!response.statusText === "OK") {
          throw new Error("Failed to load profile data.")
        }
        return response
      }

      try {
        const response = await sendRequest()
        dispatch(
          profileDetailSlice.actions.setProfileDetail({
            profile: response.data
          })
        )
      } catch (error) {
        console.log(error)
      }
    } else {
      throw new Error("No permission.")
    }
  }
}

export const profileDetailActions = profileDetailSlice.actions

export default profileDetailSlice
