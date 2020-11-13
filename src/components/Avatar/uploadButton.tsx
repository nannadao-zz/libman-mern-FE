import React, { useState, useEffect } from "react";
import axios from 'axios'
import { useDispatch } from 'react-redux'
import { IconButton } from "@material-ui/core";
import PhotoCameraIcon from "@material-ui/icons/PhotoCamera";

import { UserProps } from "../../types";
import { editUser, updateUser } from '../../redux/actions/userActions'
import '../../style/UserProfile.css'

const UploadButton: React.FC<UserProps> = ({ userInfo }) => {
  const dispatch = useDispatch()
  const userId = userInfo._id as string
  const [changeState, setChanges] = useState({
    fullName: userInfo.fullName,
    username: userInfo.username,
    email: userInfo.email,
    imageUrl: userInfo.imageUrl
  })

  useEffect(() => {
    const editUserAvatar = async () => {
      if (changeState.imageUrl !== userInfo.imageUrl) {
        await dispatch(editUser(userId, changeState))
        dispatch(updateUser(userId))
      }
    }
    editUserAvatar()
  }, [dispatch, changeState, userId, userInfo.imageUrl])

  const handleUpload = async (e: React.ChangeEvent<any>) => {
    const files = e.target.files
    const form = new FormData()
    form.append('file', files[0])
    form.append('upload_preset', 'libman')
    form.append('cloud_name', 'dapyxdvj5')
    const { data } = await axios.post(
      'https://api.cloudinary.com/v1_1/dapyxdvj5/image/upload',
      form
    )
    setChanges({
      ...changeState,
      imageUrl: data.secure_url
    })
  }

  return (
    <>
      <input
        type="file"
        name="file"
        placeholder="Upload an image"
        id="icon-button-file"
        className="LeftSide-UploadButton"
        onChange={handleUpload}
      />
      <label htmlFor="icon-button-file">
        <IconButton color="primary" aria-label="upload picture" component="span">
          <PhotoCameraIcon />
        </IconButton>
      </label>
    </>
  );
};

export default UploadButton;
