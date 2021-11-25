import React from "react"
import { Camera } from "lucide-react"

const ProfileEditForm = () => {
  return (
    <>
      <button className='pp-upload-field dash-border-secondary'>
        <Camera className='icon' />
        <p className='text-secondary'>Upload</p>
      </button>
      <input
        className='name-edit-input form-text-input'
        type='text'
        placeholder='Name'></input>
    </>
  )
}

export default ProfileEditForm
