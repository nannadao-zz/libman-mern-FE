import React, { useEffect, useState } from "react";
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
import BorrowSection from "../components/User Profile/borrows";
import ReturnSection from "../components/User Profile/returns";
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
  const userResponse = useSelector((state: AppState) => state.user);
  const { user } = userResponse;
  const [isEditing, setEditing] = useState(false);
  const [changeState, setChanges] = useState({
    fullName: user.fullName,
    username: user.username,
    email: user.email,
    imageUrl: user.imageUrl
  })

  useEffect(() => {
    dispatch(hideMessage());
  }, [dispatch]);

  useEffect(() => {
    dispatch(updateUser(userId));
  }, [dispatch, userId]);

  useEffect(() => {
    if (
      userResponse.message === "TokenExpiredError" ||
      userResponse.message === "No valid token. Please log in!"
    ) {
      dispatch(logout());
    } 
  }, [userResponse, dispatch]);

  const handleFullnameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setChanges({
      ...changeState,
      fullName: e.target.value
    });
    setEditing(true);
  };

  const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setChanges({
      ...changeState,
      username: e.target.value
    });
    setEditing(true);
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setChanges({
      ...changeState,
      email: e.target.value
    });
    setEditing(true);
  };

  const submitHandler = async (e: React.ChangeEvent<any>) => {
    e.preventDefault()
    await dispatch(editUser(userId, changeState));
    setEditing(false);
    dispatch(updateUser(userId));
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
              <ProfileAvatar userInfo={user} />
            </div>

            <form onSubmit={submitHandler}>
              <div className="LeftSide-Fullname">
                <InputBase
                  type="text"
                  value={changeState.fullName}
                  classes={{ input: style.fullName }}
                  onChange={handleFullnameChange}
                  required
                />
              </div>

              <div className="LeftSide-Username">
                <AlternateEmailIcon />
                <div>
                  <InputBase
                    type="text"
                    value={changeState.username}
                    onChange={handleUsernameChange}
                    required
                  />
                </div>
              </div>

              <div className="LeftSide-BasicInfo">
                <EmailIcon />
                <div>
                  <InputBase
                    type="email"
                    value={changeState.email}
                    onChange={handleEmailChange}
                    required
                  />
                </div>
              </div>

              <div
                className="LeftSide-SaveButton"
                style={{ display: isEditing ? "block" : "none" }}
              >
                <Button
                  type="submit"
                  variant="contained"
                  size="small"
                  disableElevation
                >
                  Save
                </Button>
              </div>
            </form>
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
