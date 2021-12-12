import React, { useRef, useState } from "react"
import { UploadCloud } from "lucide-react"
import ModalLayout from "./ModalLayout"
import { useDispatch, useSelector } from "react-redux"
import { uploadPost, uploadPostActions } from "../redux/uploadPost-slice"

import UploadStatusView from "./UploadStatusView"

const PostUploadForm = props => {
  const fileInputRef = useRef()
  const dispatch = useDispatch()
  const [fileState, setFileState] = useState({
    image: null,
    imageUrl: null
  })
  const [caption, setCaption] = useState("")
  const { status, progress } = useSelector(state => state.upload_post)

  const fieldStyle = {
    backgroundImage: `url('${fileState.imageUrl}')`
  }

  const selectFile = () => {
    fileInputRef.current.click()
  }

  const onCaptionChange = e => {
    setCaption(e.target.value)
  }

  const onFileSelected = event => {
    if (event.target.files && event.target.files[0]) {
      setFileState({
        imageUrl: URL.createObjectURL(event.target.files[0]),
        image: event.target.files[0]
      })
    }
  }

  const onSubmit = () => {
    dispatch(
      uploadPost({
        caption: caption,
        image: fileState.image
      })
    )
  }

  const onCancel = () => {
    props.onCancel()
    dispatch(
      uploadPostActions.setStatus({
        status: status !== "uploading" ? "idle" : status
      })
    )
  }

  let body = (
    <>
      <div className='image-upload-field' style={fieldStyle}>
        <UploadCloud className='icon' />
        <p>Drag an image here</p>
        <span>or</span>
        <input
          ref={fileInputRef}
          onChange={onFileSelected}
          className='input-photo'
          type='file'
          name='photo'
        />
        <button className='btn' onClick={selectFile}>
          Select a file
        </button>
      </div>
      <input
        className='upload-photo__caption--input form-text-input'
        type='text'
        placeholder='Caption'
        onChange={onCaptionChange}
        value={caption}
      />
    </>
  )

  return (
    <ModalLayout
      title='Upload Photo'
      status={status}
      onSubmit={onSubmit}
      onCancel={onCancel}
      disabled={!fileState.image}>
      <UploadStatusView
        status={status}
        uploadProgress={progress}
        views={{
          onIdleView: body,
          onErrorView: "Upload Failed!",
          onSucceedView: "Upload Complete"
        }}
      />
    </ModalLayout>
  )
}

export default PostUploadForm
