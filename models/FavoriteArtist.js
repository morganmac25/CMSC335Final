const mongoose = require("mongoose");

const FavoriteArtistSchema = new mongoose.Schema({
    name: String,
    spotifyId: String,
    image: String,
});

module.exports = mongoose.model("FavoriteArtist", FavoriteArtistSchema);