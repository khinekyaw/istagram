import React from "react"
import { X } from "lucide-react"

const ModalLayout = props => {
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
        <button disabled className='btn'>
          Submit
        </button>
      </div>
    </div>
  )
}

export default ModalLayout
