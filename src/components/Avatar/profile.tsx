import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Avatar, Badge } from '@material-ui/core'

import { UserProps } from '../../types'
import UploadButton from './uploadButton'

const useStyles = makeStyles({
  avatar: {
    height: "120px",
    width: '120px'
  }
});

const ProfileAvatar: React.FC<UserProps> = ({ userInfo }) => {
  const style = useStyles()
  return (
   
     <Badge 
      overlap="circle"
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'right'
      }}
      badgeContent={<UploadButton userInfo={userInfo} />}
      >
      <Avatar
        src={userInfo.imageUrl}
        classes={{root: style.avatar}}
      />
     </Badge>
   
  )
};

export default ProfileAvatar;
