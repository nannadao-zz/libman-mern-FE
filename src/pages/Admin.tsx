import React from "react";
import { useHistory } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import { Paper } from "@material-ui/core";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";
import EditIcon from '@material-ui/icons/Edit';
import DeleteOutlineOutlinedIcon from '@material-ui/icons/DeleteOutlineOutlined';

import Navbar from "../components/Navbar";
import "../style/Admin.css";

const useStyle = makeStyles({
  card: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    height: '250px',
    width: '250px',
    borderRadius: '50px',
    "&:hover": {
      cursor: "pointer",
      backgroundImage: 'linear-gradient(to right bottom, #2b65d9, #7784df, #a6a7e6, #cecbec, #f2f2f2)',
      color: '#FFFFFF',
      "& $icon": {
        color: "#FFFFFF",
      },
    },
  },
  icon: {
    color: "#D9D9D9",
    fontSize: "70px",
    marginBottom: '1rem'
  },
});

const Admin = () => {
  const style = useStyle();
  const history = useHistory();

  const handleCreate = () => {
    history.push("/admin/books/create");
  };

  const handleEdit = () => {
    history.push("/admin/books/edit");
  };

  const handleDelete = () => {
    history.push("/admin/books/delete");
  };

  return (
    <>
      <Navbar />
      <div className="Admin-MainContainer">
        <div className="Admin-Card">
          <Paper
            elevation={0}
            classes={{ root: style.card }}
            onClick={handleCreate}
          >
            <AddCircleOutlineIcon classes={{ root: style.icon }} />
            <h2> CREATE </h2>
          </Paper>

          <Paper
            elevation={0}
            classes={{ root: style.card }}
            onClick={handleEdit}
          >
            <EditIcon classes={{ root: style.icon }} />
            <h2> EDIT</h2>
          </Paper>

          <Paper
            elevation={0}
            classes={{ root: style.card }}
            onClick={handleDelete}
          >
            <DeleteOutlineOutlinedIcon classes={{ root: style.icon }} />
            <h2> DELETE </h2>
          </Paper>
        </div>
      </div>
    </>
  );
};

export default Admin;
