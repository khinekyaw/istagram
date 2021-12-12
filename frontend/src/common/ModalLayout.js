import React from "react"
import { X } from "lucide-react"

const ModalLayout = props => {
  const { status } = props

  const btnGroup = !props.hideDefaultButtons ? (
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
  ) : null

  return (
    <div className='modal-layout'>
      <div className='flex-column-sb'>
        <h4>{props.title}</h4>
        <button className='icon-button' onClick={props.onCancel}>
          <X color={"black"} />
        </button>
      </div>
      {props.children}
      {btnGroup}
    </div>
  )
}

export default ModalLayout
