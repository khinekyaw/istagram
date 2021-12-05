import React, { useState } from "react"
import { useSelector } from "react-redux"
import { NavLink, Link } from "react-router-dom"

import Logo from "../assets/logo.svg"
import LogoutButton from "./LogoutButton"
import Modal from "./Modal"
import PostUploadForm from "./PostUploadForm"

const Navbar = () => {
  const [showModal, setShowModal] = useState(false)
  const user = useSelector(state => state.user.username)

  const ToggleModal = () => {
    setShowModal(prev => !prev)
  }

  const PhotoUploader = () => (
    <Modal show={showModal} onBackdropClick={ToggleModal}>
      <PostUploadForm onCancel={ToggleModal} />
    </Modal>
  )

  const navLinks = user ? (
    <>
      <NavLink to='/user/1' className='nav-links__item'>
        Me
      </NavLink>
      <NavLink to='/' className='nav-links__item'>
        Discover
      </NavLink>
      <button className='btn' onClick={ToggleModal}>
        Upload
      </button>
      <LogoutButton />
    </>
  ) : (
    <>
      <NavLink to='/register' className='nav-links__item'>
        Register
      </NavLink>
      <NavLink to='/login' className='nav-links__item'>
        Login
      </NavLink>
    </>
  )

  return (
    <nav>
      <Link to='/' className='logo-wrapper'>
        <img className='logo' src={Logo} alt='logo' />
      </Link>
      <input type='text' className='search-bar' placeholder='Search' />
      <div className='nav-links'>{navLinks}</div>
      <PhotoUploader />
    </nav>
  )
}

export default Navbar
