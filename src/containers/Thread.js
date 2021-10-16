import React from "react";
import { Link } from "react-router-dom";
import { Typography, ListItem, IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import ReadMoreIcon from "@mui/icons-material/ReadMore";

function Thread(props) {
  const { title, replies, id } = props.details;
  const { handleDelete } = props;

  const handleDetails = (id) => {
    localStorage.setItem("id", id);
  };

  return (
    <>
      <ListItem
        secondaryAction={
          <>
            <IconButton onClick={() => handleDetails(id)}>
              <Link to={"/thread-detail/" + id} style={{ color: "#373737" }}>
                <ReadMoreIcon />
              </Link>
            </IconButton>
            <IconButton onClick={() => handleDelete(id)}>
              <DeleteIcon />
            </IconButton>
            <span style={{ color: "#373737" }}>{replies.length} replies</span>
          </>
        }
      >
        <Typography variant="h5" style={{ color: "#373737" }}>
          {title}
        </Typography>
      </ListItem>
    </>
  );
}

export default Thread;
