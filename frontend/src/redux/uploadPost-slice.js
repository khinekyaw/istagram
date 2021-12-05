import { createSlice } from "@reduxjs/toolkit"
const axios = require("axios").default

const uploadPostSlice = createSlice({
  name: "upload_post",
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

export const uploadPost = data => {
  return async (dispatch, getState) => {
    const onProgress = e => {
      dispatch(
        uploadPostActions.setProgress({
          progress: Math.round((e.loaded / e.total) * 100)
        })
      )
    }

    const config = {
      headers: {
        Authorization: `Token ${getState().user.key}`,
        "content-type": "multipart/form-data"
      },
      onUploadProgress: onProgress
    }
    let form_data = new FormData()
    form_data.append("image", data.image, data.image.name)
    form_data.append("caption", data.caption)
    let url = "http://127.0.0.1:8000/api/v1/"

    if (config) {
      const sendRequest = async () => {
        const response = await axios.post(url, form_data, config)
        if (!response.statusText === "OK") {
          throw new Error("Failed to load posts data.")
        }
        return response
      }

      try {
        dispatch(uploadPostActions.setStatus({ status: "uploading" }))
        await sendRequest()
        dispatch(uploadPostActions.setStatus({ status: "finished" }))
      } catch (error) {
        dispatch(uploadPostActions.setStatus({ status: "error" }))
      }
    } else {
      throw new Error("No permission.")
    }
  }
}

export const uploadPostActions = uploadPostSlice.actions

export default uploadPostSlice
