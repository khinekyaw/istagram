import { createSlice } from "@reduxjs/toolkit"
import { getAuthConfig } from "../utils"
const axios = require("axios").default

const postsSlice = createSlice({
  name: "posts",
  initialState: {
    postStatus: "idle",
    posts: null
  },
  reducers: {
    setPosts(state, action) {
      state.posts = action.payload.posts
    }
  }
})

export const fetchPosts = () => {
  return async (dispatch, getState) => {
    const config = getAuthConfig(getState)
    if (config) {
      const sendRequest = async () => {
        const response = await axios.get(
          "http://127.0.0.1:8000/api/v1/?format=json",
          config
        )

        if (!response.statusText === "OK") {
          throw new Error("Failed to load posts data.")
        }
        return response
      }

      try {
        const response = await sendRequest()
        dispatch(postsSlice.actions.setPosts({ posts: response.data }))
      } catch (error) {
        console.log(error)
      }
    } else {
      throw new Error("No permission.")
    }
  }
}

export const postsActions = postsSlice.actions

export default postsSlice
