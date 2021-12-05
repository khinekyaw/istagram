import React, { useRef, useState } from "react"
import { Camera } from "lucide-react"
import { useDispatch, useSelector } from "react-redux"
import UploadStatusView from "../common/UploadStatusView"
import { ModalLayout } from "../common"
import { editProfile, editProfileActions } from "../redux/editProfile-slice"

const ProfileEditForm = props => {
  const dispatch = useDispatch()
  const { name, avatar } = props.profile
  const [inputName, setInputName] = useState(name)
  const fileInputRef = useRef()
  const [fileState, setFileState] = useState({
    image: null,
    imageUrl: null
  })
  const { status, progress } = useSelector(state => state.edit_profile)

  const backgroundStyle = {
    backgroundImage: `url('${fileState.imageUrl || avatar}')`
  }

  const onFileSelected = event => {
    if (event.target.files && event.target.files[0]) {
      setFileState({
        imageUrl: URL.createObjectURL(event.target.files[0]),
        image: event.target.files[0]
      })
    }
  }

  const selectFile = () => {
    fileInputRef.current.click()
  }

  const onInputNameChange = e => {
    setInputName(e.target.value)
  }

  const body = (
    <>
      <input
        ref={fileInputRef}
        onChange={onFileSelected}
        className='input-avatar'
        type='file'
        name='avatar'
      />
      <button
        className='pp-upload-field dash-border-secondary'
        style={backgroundStyle}
        onClick={selectFile}>
        <Camera className='icon' />
        <p className='text-secondary'>Upload</p>
      </button>
      <input
        className='name-edit-input form-text-input'
        type='text'
        placeholder='Name'
        onChange={onInputNameChange}
        value={inputName}></input>
    </>
  )

  const onSubmit = () => {
    dispatch(
      editProfile({
        name: inputName,
        avatar: fileState.image
      })
    )
  }

  const onCancel = () => {
    props.onCancel()
    dispatch(
      editProfileActions.setStatus({
        status: status !== "uploading" ? "idle" : status
      })
    )
  }

  return (
    <ModalLayout
      title='Edit Profile'
      status={status}
      onSubmit={onSubmit}
      onCancel={onCancel}
      disabled={inputName.trim().length <= 0}>
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

export default ProfileEditForm
