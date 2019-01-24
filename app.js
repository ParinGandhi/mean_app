const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const cors = require("cors");
const passport = require("passport");
const mongoose = require("mongoose");

const config = require("./config/database");

const users = require("./routes/users");

mongoose.connect(config.database);
mongoose.connection.on("connected", () => {
    console.log("Connected to database: " + config.database);
});
mongoose.connection.on("error", (err) => {
    console.log("CDatabase connection error: " + err);
});

const app = express();
const port = 3500;

/** Middleware configurations */
app.use(cors());
app.use(bodyParser.json());

/** Set static folder */
app.use(express.static(path.join(__dirname, "public")));

/** Index route */
app.get("/", (req, res) => {
    res.send("Welcome to the page!");
});

app.use("/users", users)

/** Start server */
app.listen(port, () => {
    console.log("Server started on port: " + port);
});