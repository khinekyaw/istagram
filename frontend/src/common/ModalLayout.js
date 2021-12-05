import React from "react"
import { X } from "lucide-react"

const ModalLayout = props => {
  const { status } = props

  return (
    <div className='modal-layout'>
      <div className='flex-column-sb'>
        <p>{props.title}</p>
        <button className='icon-button' onClick={props.onCancel}>
          <X color={"black"} />
        </button>
      </div>
      {props.children}
      <div className='submit-button-group'>
        <button onClick={props.onCancel} className='btn btn--outline'>
          Cancel
        </button>
        <button
          disabled={props.disabled}
          onClick={status !== "idle" ? props.onCancel : props.onSubmit}
          className='btn'>
          {status !== "idle" ? "OK" : "Submit"}
        </button>
      </div>
    </div>
  )
}

export default ModalLayout
