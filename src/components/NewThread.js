import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { Typography, TextField, Button } from "@mui/material";

class NewThread extends Component {
  state = {
    title: "",
    content: "",
    author: "",
    redirect: false,
  };

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  handleSubmit = () => {
    const { title, author, content } = this.state;

    if (author === "") {
      alert("You must inform a name in order to create a thread!");
    } else {
      const body = {
        title: title,
        author: author,
        date: Date(),
        content: content,
        replies: [],
      };

      fetch("http://localhost:3001/threads/new-thread", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      })
        .then((response) => {
          if (response.ok) {
            this.setState({ redirect: true });
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  render() {
    const { title, content, author, redirect } = this.state;

    return (
      <>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "auto auto auto auto",
            gridTemplateRows: "auto auto auto auto",
            gridRowGap: "15px",
          }}
        >
          <Typography variant="h4" style={{ gridColumn: "1/4", gridRow: "1" }}>
            New Thread
          </Typography>

          <TextField
            size="small"
            id="outlined-basic"
            label="Title"
            style={{ gridColumn: "1/2", gridRow: "2" }}
            name="title"
            value={title}
            onChange={this.handleChange}
          />

          <TextField
            id="outlined-multiline-static"
            label="Type your thread here"
            multiline
            style={{ gridColumn: "1/4", gridRow: "3" }}
            rows={10}
            name="content"
            value={content}
            onChange={this.handleChange}
          />

          <div
            style={{
              gridColumn: "1/4",
              gridRow: "4",
              display: "flex",
              justifyContent: "space-evenly",
              justifyItems: "center",
            }}
          >
            <TextField
              id="outlined-basic"
              label="Author"
              name="author"
              value={author}
              onChange={this.handleChange}
            />
            <Button
              variant="outlined"
              style={{ color: "#373737", borderColor: "#dddddd" }}
              onClick={() => this.handleSubmit()}
            >
              Create Thread
            </Button>

            {redirect ? <Redirect to="/" /> : null}
          </div>
        </div>
      </>
    );
  }
}

export default NewThread;
