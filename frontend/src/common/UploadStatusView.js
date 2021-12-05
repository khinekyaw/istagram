import { CheckCircle } from "lucide-react"
import React from "react"
import UploadLoading from "./UploadLoading"

const UploadStatusView = props => {
  const { status, uploadProgress, views } = props
  let body = views.onIdleView
  const { onSucceedView, onErrorView } = views

  if (status === "uploading") {
    body = <UploadLoading progress={uploadProgress} />
  } else if (status === "finished") {
    body = (
      <div className='upload-loading__succeed'>
        <CheckCircle className='icon' />
        <p>{onSucceedView}</p>
      </div>
    )
  } else if (status === "error") {
    body = <p>{onErrorView}</p>
  }

  return body
}

export default UploadStatusView
