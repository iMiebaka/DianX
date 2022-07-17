const express = require("express");
const app = express();
var cors = require("cors");
const server = require("http").createServer(app);
const io = require("socket.io")(server, {
  cors: {
    origin: "*",
    methods: ["*"],
  },
});

const { execSync } = require("child_process");
require("dotenv").config({ path: "./.env" });

// const output = execSync("hostname -I", { encoding: "utf-8" });
// console.log(output.split(" "));

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("dist"));
app.use(express.static("media"));

const PORT = process.env.PORT || 3333;

// Route Setup
const apiRoute = require("./routes/api/route");

app.use((req, res, next) => {
  if (req.url.substring(0, 4) !== "/api") {
    return res.sendFile(__dirname + "/dist");
  }
  next();
});

app.use("/api/v1", apiRoute);

io.on("connection", () => {
  /* … */
});

// Server listening to port 3000
app.listen(PORT, () => {
  console.log("REST API is Running on", PORT);
});
