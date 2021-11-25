import React from "react"
import ReactDOM from "react-dom"

const Backdrop = props => {
  return <div onClick={props.onBackdropClick} className='backdrop'></div>
}

const ModalOverlay = props => <div className='modal'>{props.children}</div>

const Modal = props => {
  return props.show ? (
    <>
      {ReactDOM.createPortal(
        <Backdrop {...props} />,
        document.getElementById("root-backdrop")
      )}
      {ReactDOM.createPortal(
        <ModalOverlay {...props} />,
        document.getElementById("root-overlay")
      )}
    </>
  ) : null
}

export default Modal
