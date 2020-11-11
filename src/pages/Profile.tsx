import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { RouteComponentProps } from "react-router";
import { useSelector, useDispatch } from "react-redux";
import { InputBase, Button } from "@material-ui/core";
import EmailIcon from "@material-ui/icons/Email";
import AlternateEmailIcon from "@material-ui/icons/AlternateEmail";
import { makeStyles } from "@material-ui/core/styles";
import Alert from "@material-ui/lab/Alert";

import Navbar from "../components/Navbar";
import ProfileAvatar from "../components/Avatar/profile";
import { AppState, ProfileRouteInfo } from "../types";
import {
  updateUser,
  editUser,
  hideMessage,
  logout,
} from "../redux/actions/userActions";
import BorrowSection from '../components/User Profile/borrows'
import ReturnSection from '../components/User Profile/returns'
import "../style/UserProfile.css";

const useStyles = makeStyles({
  fullName: {
    fontSize: "32px",
    fontWeight: "bold",
    textAlign: "center",
  },
});

const UserProfile = ({ match }: RouteComponentProps<ProfileRouteInfo>) => {
  const userId = match.params.userId;
  const style = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();
  const userResponse = useSelector((state: AppState) => state.user);
  const { user } = userResponse;
  const [fullName, setFullname] = useState(user.fullName);
  const [email, setEmail] = useState(user.email);
  const [username, setUsername] = useState(user.username);
  const [isEditing, setEditing] = useState(false);

  useEffect(() => {
    dispatch(hideMessage())
  }, [dispatch]);

  useEffect(() => {
    dispatch(updateUser(userId));
  }, [dispatch, userId]);

  useEffect(() => {
    if (userResponse.message === "TokenExpiredError") {
      dispatch(logout());
      setTimeout(() => history.push("/login"));
    } else if (userResponse.message === "No valid token. Please log in!") {
      dispatch(logout());
      history.push("/login");
    }
  });

  const handleFullnameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFullname(e.target.value);
    setEditing(true);
  };

  const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value);
    setEditing(true);
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    setEditing(true);
  };

  const handleSave = async () => {
    await dispatch(editUser(userId, fullName, username, email));
    if (userResponse.message === "Edit Successfully!") {
      setEditing(false);
      dispatch(updateUser(userId));
      setTimeout(() => dispatch(hideMessage()), 1500)
    }
  };

  return (
    <>
      <Navbar />
      <div className="UserProfile-MainContainer">
        <div className="UserProfile-Alert">
          {userResponse.status && userResponse.message ? (
            <Alert variant="filled" severity={userResponse.status}>
              {userResponse.message}
            </Alert>
          ) : null}
        </div>
        <div className="UserProfile-Content">
          <div className="UserProfile-LeftSide">
            <div className="LeftSide-Avatar">
              <ProfileAvatar userInfo={userResponse.user} />
            </div>

            <div className="LeftSide-Fullname">
              <InputBase
                value={fullName}
                classes={{ input: style.fullName }}
                onChange={handleFullnameChange}
              />
            </div>

            <div className="LeftSide-Username">
              <AlternateEmailIcon />
              <div>
                <InputBase
                  value={username}
                  type="text"
                  onChange={handleUsernameChange}
                />
              </div>
            </div>

            <div className="LeftSide-BasicInfo">
              <EmailIcon />
              <div>
                <InputBase
                  value={email}
                  type="email"
                  onChange={handleEmailChange}
                />
              </div>
            </div>

            <div
              className="LeftSide-SaveButton"
              style={{ display: isEditing ? "block" : "none" }}
            >
              <Button
                variant="contained"
                size="small"
                disableElevation
                onClick={handleSave}
              >
                Save
              </Button>
            </div>
          </div>

          <div className="UserProfile-RightSide">
            <div className="RightSide-BorrowSection"> 
              <BorrowSection userInfo={user} />
            </div>
            <div className="RightSide-ReturnSection">
              <ReturnSection userInfo={user} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserProfile;
