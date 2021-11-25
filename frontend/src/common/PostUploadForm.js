import React from "react"
import { UploadCloud } from "lucide-react"

const PostUploadForm = () => {
  return (
    <>
      <div className='image-upload-field'>
        <UploadCloud className='icon' />
        <p>Drag an image here</p>
        <span>or</span>
        <button className='btn'>Select a file</button>
      </div>
      <input
        className='upload-photo__caption--input form-text-input'
        type='text'
        placeholder='Caption'
      />
    </>
  )
}

export default PostUploadForm
