import React, { useState } from "react"

import { PROFILES } from "../data"
import { Modal, ModalLayout } from "../common"
import ProfileEditForm from "./ProfileEditForm"

const ProfileDetails = () => {
  const { avatar, username, name } = PROFILES[0]
  const [showModal, setShowModal] = useState(false)

  const ToggleModal = () => {
    setShowModal(prev => !prev)
  }

  const modal = (
    <Modal show={showModal} onBackdropClick={ToggleModal}>
      <ModalLayout title='Edit Profile' onCancel={ToggleModal}>
        <ProfileEditForm />
      </ModalLayout>
    </Modal>
  )

  return (
    <div className='profile__top'>
      <div className='profile-picture'>
        <img src={avatar} alt='profile' />
      </div>

      <div className='profile__info'>
        <div className='profile__info__edit'>
          <h2>{username}</h2>
          <button className='btn btn--outline' onClick={ToggleModal}>
            Edit profile
          </button>
        </div>

        <p className='username'>{name}</p>
        <div className='profile__info__stats'>
          <div className='item'>
            <h2>2.3M</h2>
            <p>Likes</p>
          </div>
          <div className='item'>
            <h2>1.2M</h2>
            <p>Followers</p>
          </div>
          <div className='item'>
            <h2>734</h2>
            <p>Following</p>
          </div>
        </div>
      </div>
      {modal}
    </div>
  )
}

export default ProfileDetails
