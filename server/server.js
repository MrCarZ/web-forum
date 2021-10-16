const express = require("express");
const app = express();
const cors = require("cors");

const corsOptions = {
  origin: "http://localhost:3000",
  optionSuccessStatus: 200,
};

app.use(cors(corsOptions));
app.use(express.json());

var database = [];

app.post("/threads", (req, res) => {
  const page = req.body.page;
  res.send({
    threads: database.slice((page - 1) * 20, page * 20),
    totalThreads: database.length,
  });
});

app.post("/threads/new-thread", (req, res) => {
  database.push({ id: database.length + 1, ...req.body });
  res.sendStatus(200);
});

app.delete("/threads/:id", (req, res) => {
  const id = Number(req.params.id);
  database = database.filter((value) => {
    if (id !== value.id) {
      return value;
    }
  });
  res.sendStatus(200);
});

app.get("/threads/:id", (req, res) => {
  const id = Number(req.params.id);
  database = database.filter((value) => {
    if (id === value.id) {
      res.send(value);
    }
  });
});

app.listen(3001, () => {
  console.log("Server Online!");
});
