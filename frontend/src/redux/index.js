import { configureStore } from "@reduxjs/toolkit"
import editProfileSlice from "./editProfile-slice"

import postsSlice from "./posts-slice"
import profileDetailSlice from "./profileDetail-slice"
import profilePhotosSlice from "./profilePhotos-slice"
import profilesSlice from "./profiles-slice"
import uploadPostSlice from "./uploadPost-slice"
import userSlice from "./user-slice"

const store = configureStore({
  reducer: {
    user: userSlice.reducer,
    posts: postsSlice.reducer,
    profiles: profilesSlice.reducer,
    profileDetail: profileDetailSlice.reducer,
    profile_photos: profilePhotosSlice.reducer,
    upload_post: uploadPostSlice.reducer,
    edit_profile: editProfileSlice.reducer
  }
})

export default store
