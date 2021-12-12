import React, { useState } from "react"
import { MoreHorizontal } from "lucide-react"
import { useDispatch, useSelector } from "react-redux"
import axios from "axios"
import { postsActions } from "../redux/posts-slice"
import Modal from "../common/Modal"

const DeleteModal = props => {
  return (
    <Modal show={props.show} onBackdropClick={props.onToggle}>
      <div className='confirm-delete'>
        <h4>Are you sure!</h4>
        <p>Are you sure want to delete this post?</p>
        <div>
          <button onClick={props.onToggle} className='btn btn--outline'>
            Cancel
          </button>
          <button onClick={props.onDelete} className='btn btn--danger'>
            Delete
          </button>
        </div>
      </div>
    </Modal>
  )
}

const MoreOptions = props => {
  const dispatch = useDispatch()
  const { id, profile: profileId, users_save } = props
  const { profile } = useSelector(state => state.user)
  const authToken = useSelector(state => state.user.key)
  const saved = users_save.includes(profile.id)
  const [showDeleteModal, setShowDeleteModal] = useState(false)

  const toggleModal = () => {
    setShowDeleteModal(state => !state)
  }

  const onDelete = () => {
    deletePost()
    toggleModal()
  }

  const deletePost = async () => {
    try {
      await axios.delete(`http://127.0.0.1:8000/api/v1/${id}/`, {
        headers: { Authorization: `Token ${authToken}` }
      })
      console.log("Deleted")
    } catch (error) {}
  }

  const editSavePost = async action => {
    try {
      await axios.get(
        `http://127.0.0.1:8000/api/v1/${id}/save?action=${action}`,
        {
          headers: { Authorization: `Token ${authToken}` }
        }
      )
      dispatch(
        postsActions.editSave({
          post_id: id,
          user_id: profile.id,
          action
        })
      )
    } catch (error) {}
  }

  const saveButton = (
    <div onMouseDown={() => editSavePost(saved ? "remove" : "save")}>
      {saved ? "Unsave" : "Save"}
    </div>
  )

  const optionsButtons =
    profile.id === profileId ? (
      <div onMouseDown={toggleModal}>Delete</div>
    ) : (
      saveButton
    )

  return (
    <div className='more-options'>
      <button id='options-btn' className='icon-button'>
        <MoreHorizontal color='black' />
      </button>
      <div id='options-div' className='options'>
        {optionsButtons}
      </div>
      <DeleteModal
        show={showDeleteModal}
        onToggle={toggleModal}
        onDelete={onDelete}
      />
    </div>
  )
}

export default MoreOptions
