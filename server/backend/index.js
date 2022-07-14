var bodyParser = require('body-parser')
const express = require("express")
const app = express()
var cors = require('cors')
const PORT = process.env.PORT || 3333


app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static('dist'));


// Handling GET / request
app.get("/", (req, res, next) => {
	res.sendFile(__dirname + "/dist/index.html")
})

// Handling GET /hello request
app.get("/hello", (req, res, next) => {
	res.json({"message":"This is the express server hello page"})
})

app.get("/dian", (req, res, next) => {
	res.json({"message":"This is the express server dian page"})
})

// Server listening to port 3000
app.listen((PORT), () => {
	console.log("RESTApi is Running on", PORT);
})
