import { createSlice } from "@reduxjs/toolkit"
const axios = require("axios").default

const editProfileSlice = createSlice({
  name: "edit_profile",
  initialState: {
    status: "idle",
    progress: 0
  },
  reducers: {
    setStatus(state, action) {
      state.status = action.payload.status
    },
    setProgress(state, action) {
      state.progress = action.payload.progress
    }
  }
})

export const editProfile = data => {
  return async (dispatch, getState) => {
    const onProgress = e => {
      dispatch(
        editProfileActions.setProgress({
          progress: Math.round((e.loaded / e.total) * 100)
        })
      )
    }
    const user = getState().user
    const config = {
      headers: {
        Authorization: `Token ${user.key}`,
        "content-type": "multipart/form-data"
      },
      onUploadProgress: onProgress
    }
    let form_data = new FormData()
    if (data.avatar) form_data.append("avatar", data.avatar, data.avatar.name)
    form_data.append("name", data.name)
    // console.log(user)
    let url = `http://127.0.0.1:8000/api/v1/profiles/${user.profile.id}/`

    if (config) {
      const sendRequest = async () => {
        const response = await axios.put(url, form_data, config)
        if (!response.statusText === "OK") {
          throw new Error("Failed to load posts data.")
        }
        return response
      }

      try {
        dispatch(editProfileActions.setStatus({ status: "uploading" }))
        await sendRequest()
        dispatch(editProfileActions.setStatus({ status: "finished" }))
      } catch (error) {
        dispatch(editProfileActions.setStatus({ status: "error" }))
      }
    } else {
      throw new Error("No permission.")
    }
  }
}

export const editProfileActions = editProfileSlice.actions

export default editProfileSlice
