const express = require('express');
const path = require("path");
require("dotenv").config({
   path: path.resolve(__dirname, ".env"),
});
const mongoose = require("mongoose");

const app = express();

mongoose.connect(process.env.MONGO_CONNECTION_STRING)
    .then(() => console.log("Mongo connected"))
    .catch(err => console.error(err));

app.set('views', './templates');
app.set('view engine', 'ejs');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));
app.use("/spotify", require("./routes/spotify"));
app.use("/favorites", require("./routes/favorites"));

app.get("/", (req, res) => {
    res.render("index", { error: req.query.error || null });
});

const server = app.listen(3000, () => {
    console.log("web server started and running at http://localhost:3000");
});

