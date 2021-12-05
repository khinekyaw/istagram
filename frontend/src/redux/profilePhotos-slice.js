import { createSlice } from "@reduxjs/toolkit"
const axios = require("axios").default

const profilePhotosSlice = createSlice({
  name: "profile_posts",
  initialState: {
    user_photos_status: "idle",
    saved_photos_status: "idle",
    user_photos: null,
    saved_photos: null
  },
  reducers: {
    setProfilePhotos(state, action) {
      state.user_photos = action.payload.user_photos
    },
    setSavedPhotos(state, action) {
      state.saved_photos = action.payload.saved_photos
    }
  }
})

export const fetchProfilePhotos = (id, tab) => {
  return async (dispatch, getState) => {
    const user = getState().user

    if (user && user.key) {
      let config = {
        headers: { Authorization: `Token ${user.key}` }
      }

      const url =
        tab === "saved"
          ? `http://127.0.0.1:8000/api/v1/profiles/${id}/posts_saved/?format=json`
          : `http://127.0.0.1:8000/api/v1/?format=json&profile=${id}`
      const sendRequest = async () => {
        const response = await axios.get(url, config)

        if (!response.statusText === "OK") {
          throw new Error("Failed to load profile data.")
        }
        return response
      }

      try {
        const response = await sendRequest()
        if (tab === "saved")
          dispatch(
            profilePhotosSlice.actions.setSavedPhotos({
              saved_photos: response.data
            })
          )
        else
          dispatch(
            profilePhotosSlice.actions.setProfilePhotos({
              user_photos: response.data
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

export const profilePhotosActions = profilePhotosSlice.actions

export default profilePhotosSlice
