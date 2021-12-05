import { createSlice } from "@reduxjs/toolkit"
import { getAuthConfig } from "../utils"
const axios = require("axios").default

const profilesSlice = createSlice({
  name: "posts",
  initialState: {
    profileStatus: "idle",
    profiles: null
  },
  reducers: {
    setProfiles(state, action) {
      state.profiles = action.payload.profiles
    }
  }
})

export const fetchProfiles = () => {
  return async (dispatch, getState) => {
    const config = getAuthConfig(getState)
    if (config) {
      const sendRequest = async () => {
        const response = await axios.get(
          "http://127.0.0.1:8000/api/v1/profiles/?format=json&type=suggestion",
          config
        )

        if (!response.statusText === "OK") {
          throw new Error("Failed to load profiles data.")
        }
        return response
      }

      try {
        const response = await sendRequest()
        dispatch(profilesSlice.actions.setProfiles({ profiles: response.data }))
      } catch (error) {
        console.log(error)
      }
    } else {
      throw new Error("No permission.")
    }
  }
}

export const profilesActions = profilesSlice.actions

export default profilesSlice
