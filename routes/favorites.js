const express = require("express");
const router = express.Router();
const Favorite = require("../models/FavoriteArtist.js");

router.post("/add", async (req, res) => {
    const { name, spotifyId, image } = req.body;

    await Favorite.create({ name, spotifyId, image });
    res.redirect("/favorites");
});

router.get("/", async (req, res) => {
    const favorites = await Favorite.find();
    res.render("favorites", { favorites });
});

router.post("/clear", async (req, res) => {
    await Favorite.deleteMany({});
    res.redirect("/favorites");
});

module.exports = router;