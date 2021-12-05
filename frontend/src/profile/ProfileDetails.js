import React, { useEffect, useState } from "react"

import { Modal } from "../common"
import ProfileEditForm from "./ProfileEditForm"
import { useDispatch, useSelector } from "react-redux"
import { fetchProfileDetail } from "../redux/profileDetail-slice"
import Loading from "../common/Loading"
import Avatar from "../common/Avatar"

const ProfileDetails = props => {
  const dispatch = useDispatch()
  const { routeId } = props
  const [showModal, setShowModal] = useState(false)
  const profileDetail = useSelector(state => state.profileDetail)
  const user = useSelector(state => state.user)
  const { profile } = profileDetail

  let [followers, following] = [0, 0]
  if (profile) {
    followers = profile.followers.length
    following = profile.followers.length
  }

  const ToggleModal = () => {
    setShowModal(prev => !prev)
  }

  useEffect(() => {
    dispatch(fetchProfileDetail(routeId))
  }, [routeId, dispatch])

  const modal = (
    <Modal show={showModal} onBackdropClick={ToggleModal}>
      <ProfileEditForm profile={profile} onCancel={ToggleModal} />
    </Modal>
  )

  const actionButton =
    profile && user.username === profile.username ? (
      <button className='btn btn--outline' onClick={ToggleModal}>
        Edit profile
      </button>
    ) : (
      <button className='btn'>Follow</button>
    )

  return profile ? (
    <div className='profile__top'>
      <Avatar className='profile-picture' src={profile.avatar} alt='profile' />
      <div className='profile__info'>
        <div className='profile__info__edit'>
          <h2>{profile.username}</h2>
          {actionButton}
        </div>
        <p className='username'>{profile.name}</p>
        <div className='profile__info__stats'>
          <div className='item'>
            <h2>2.3M</h2>
            <p>Likes</p>
          </div>
          <div className='item'>
            <h2>{followers}</h2>
            <p>Followers</p>
          </div>
          <div className='item'>
            <h2>{following}</h2>
            <p>Following</p>
          </div>
        </div>
      </div>
      {modal}
    </div>
  ) : (
    <Loading />
  )
}

export default ProfileDetails
