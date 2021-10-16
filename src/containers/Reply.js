import React from "react";
import { Typography, ListItem, IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

function Reply(props) {
  const { author, content, date, id } = props.details;
  const handleDelete = props;
  return (
    <ListItem
      secondaryAction={
        <>
          <IconButton onClick={() => handleDelete(id)}>
            <DeleteIcon />
          </IconButton>
        </>
      }
    >
      <Typography variant="h5" style={{ color: "#373737" }}>
        {author}:
      </Typography>
      <span>
        {content} - {date}
      </span>
    </ListItem>
  );
}

export default Reply;
