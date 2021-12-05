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
    },
    editLike(state, action) {
      const { payload } = action
      state.posts = state.posts.map(post => {
        if (post.id === payload.post_id) {
          return {
            ...post,
            users_like:
              payload.action === "like"
                ? [...post.users_like, payload.user_id]
                : post.users_like.filter(i => i !== payload.user_id)
          }
        } else return post
      })
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

export const likePost = (id, action) => {
  return async (dispatch, getState) => {
    const user = getState().user

    const sendRequest = async () => {
      const config = {
        headers: { Authorization: `Token ${user.key}` }
      }
      const response = await axios.get(
        `http://127.0.0.1:8000/api/v1/${id}/likes?action=${action}`,
        config
      )

      if (!response.statusText === "OK") {
        throw new Error("Failed to like post.")
      }
      return response
    }

    // update UI state
    dispatch(
      postsActions.editLike({
        user_id: user.profile.id,
        post_id: id,
        action
      })
    )
    try {
      await sendRequest()
    } catch (error) {
      // Redo action if Request fail.
      dispatch(
        postsActions.editLike({
          user_id: user.profile.id,
          post_id: id,
          action: action === "like" ? "" : "like"
        })
      )
      console.log(error)
    }
  }
}

export const postsActions = postsSlice.actions

export default postsSlice
