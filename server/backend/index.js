const express = require("express");
const app = express();
var cors = require("cors");
require('dotenv').config({path: './.env'});


app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("dist"));


const PORT = process.env.PORT || 3333;

// Route Setup
const apiRoute = require("./routes/api/route");

app.use((req, res, next) => {
  if(req.url.substring(0, 4) !== '/api'){
	return res.sendFile(__dirname + "/dist/index.html");
  }
  next();
});

app.use("/api/v1", apiRoute);


// Server listening to port 3000
app.listen(PORT, () => {
  console.log("REST API is Running on", PORT);
});
