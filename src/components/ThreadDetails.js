import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import { Typography, Button } from "@mui/material";
import { Reply } from "../containers";

class ThreadDetails extends Component {
  state = {
    thread: [],
  };

  componentDidMount() {
    const id = localStorage.getItem("id");
    fetch("http://localhost:3001/threads/" + id, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
      })
      .then((data) => {
        this.setState({ thread: data });
        console.log(data);
      })
      .catch((error) => console.log(error));
  }

  render() {
    const { title, author, date, content } = this.state.thread;

    const renderReplies = (replies) => {
      return replies.map((reply) => (
        <Reply
          key={"reply-" + reply.id}
          handleDelete={this.handleDeleteButton}
          details={reply}
        />
      ));
    };

    return (
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "auto auto auto auto",
          gridTemplateRows: "auto auto auto auto",
          gridRowGap: "15px",
        }}
      >
        <Typography variant="h5" style={{ gridColumn: "1/4", gridRow: "1" }}>
          <b>{title}</b>
        </Typography>
        <Typography variant="h6" style={{ gridColumn: "1/4", gridRow: "2" }}>
          (Written by user: <b>{author}</b> at <b>{date}</b>)
        </Typography>

        <Typography variant="h6" style={{ gridColumn: "1/4", gridRow: "3/4" }}>
          {content}
        </Typography>
      </div>
    );
  }
}

export default ThreadDetails;
