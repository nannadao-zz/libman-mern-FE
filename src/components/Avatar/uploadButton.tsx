import React, { useState } from "react";
import axios from 'axios'
import { IconButton } from "@material-ui/core";
import PhotoCameraIcon from "@material-ui/icons/PhotoCamera";

import {
  updateUser,
  editUser,
} from "../../redux/actions/userActions";
import { UserProps } from "../../types";
import '../../style/UserProfile.css'

const UploadButton: React.FC<UserProps> = ({ userInfo }) => {
  const [image, setImage] = useState('')

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
    setImage(data.secure_url)
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
