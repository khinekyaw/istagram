import React from "react"

const UploadLoading = ({ progress }) => {
  const progressStyle = {
    width: progress + "%"
  }
  return (
    <div className='upload-loading'>
      <div className='lds-ellipsis'>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
      <p>Uploading</p>
      <div className='progress-bar'>
        <div className='progress-bar__progress' style={progressStyle}></div>
      </div>
    </div>
  )
}

export default UploadLoading
