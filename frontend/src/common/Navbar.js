import React, { useState } from "react"
import { NavLink, Link } from "react-router-dom"

import Logo from "../assets/logo.svg"
import Modal from "./Modal"
import ModalLayout from "./ModalLayout"
import PostUploadForm from "./PostUploadForm"

const Navbar = () => {
  const [showModal, setShowModal] = useState(false)

  const ToggleModal = () => {
    setShowModal(prev => !prev)
  }

  const PhotoUploader = () => (
    <Modal show={showModal} onBackdropClick={ToggleModal}>
      <ModalLayout title='Upload Photo' onCancel={ToggleModal}>
        <PostUploadForm />
      </ModalLayout>
    </Modal>
  )

  return (
    <nav>
      <Link to='/' className='logo-wrapper'>
        <img className='logo' src={Logo} alt='logo' />
      </Link>
      <input type='text' className='search-bar' placeholder='Search' />
      <div className='nav-links'>
        <NavLink to='/user/1' className='nav-links__item'>
          Me
        </NavLink>
        <NavLink to='/' className='nav-links__item'>
          Discover
        </NavLink>
        <button className='btn' onClick={ToggleModal}>
          Upload
        </button>
      </div>
      <PhotoUploader />
    </nav>
  )
}

export default Navbar
