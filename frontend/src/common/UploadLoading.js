import React from "react"

const UploadLoading = () => {
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
        <div className='progress-bar__progress'></div>
      </div>
    </div>
  )
}

export default UploadLoading
