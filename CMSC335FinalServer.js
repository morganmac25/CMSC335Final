const express = require('express');
const path = require("path");
require("dotenv").config({
   path: path.resolve(__dirname, ".env"),
});
const { MongoClient } = require('mongodb');

const app = express();
app.set('views', './templates');
app.set('view engine', 'ejs');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const uri = process.env.MONGO_CONNECTION_STRING;
const client = new MongoClient(uri);
let db;
const client_id = process.env.CLIENT_ID; 
const client_secret = process.env.CLIENT_SECRET;

(async () => {
    await client.connect();
    db = client.db("CMSC335Final");
})();

const server = app.listen(3000, () => {
    console.log("web server started and running at http://localhost:3000");
});

app.get('/', (req, res) => {
    res.render("index");
});

async function getToken() {
    const response = await fetch('https://accounts.spotify.com/api/token', {
        method: 'POST',
        body: new URLSearchParams({
            'grant_type': 'client_credentials',
        }),
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': 'Basic ' + (Buffer.from(client_id + ':' + client_secret).toString('base64')),
        },
    });

    return await response.json();
}