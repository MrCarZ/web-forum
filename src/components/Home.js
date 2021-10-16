import React, { Component } from "react";
import { Thread } from "../containers";
import { Link } from "react-router-dom";
import { Pagination, Typography, Button, List } from "@mui/material";

class Home extends Component {
  state = {
    page: 1,
    totalThreads: 0,
    threads: [],
  };

  componentDidMount() {
    const { page } = this.state;
    fetch("http://localhost:3001/threads", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ page: page }),
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
      })
      .then((data) => {
        this.setState({
          threads: data.threads,
          totalThreads: data.totalThreads,
        });
        console.log(this.state.threads);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  handleDeleteButton = (id) => {
    const { threads } = this.state;

    const newThreads = threads.filter((value) => value.id !== id);

    fetch("http://localhost:3001/threads/" + id, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (response.ok) {
          this.setState({ threads: newThreads });
        }
      })
      .catch((error) => console.log(error));
  };

  handlePageChange = (page) => {
    this.setState({ page: page });
  };

  render() {
    const { threads, totalThreads } = this.state;
    const totalPages = parseInt(totalThreads / 20 + 1);

    
    const renderThreads = (threads) => {
      return threads.map((thread) => (
        <Thread
          key={"thread-" + thread.id}
          handleDelete={this.handleDeleteButton}
          details={thread}
        />
      ));
    };

    return (
      <div
        style={{
          marginTop: "10px",
          display: "grid",
          gridTemplateColumns: "auto auto auto auto",
          gridTemplateRows: "auto auto auto auto",
          gridRowGap: "15px",
        }}
      >
        <div
          style={{
            gridColumn: "1/4",
            gridRow: "1",
            display: "flex",
            justifyContent: "space-evenly",
          }}
        >
          <Typography variant="h4"> Web Forum </Typography>
          <Link to="/new-thread">
            <Button
              variant="outlined"
              style={{ color: "#373737", borderColor: "#dddddd" }}
            >
              New Thread
            </Button>
          </Link>
        </div>

        <div style={{ gridColumn: "1/4", gridRow: "2/4"}}>
          <List key={1}>{renderThreads(threads)}</List>
          <Pagination
            style={{textAlign:"center"}}
            count={totalPages}
            onChange={(event, page) => this.handlePageChange(page)}
          />
        </div>
      </div>
    );
  }
}

export default Home;
