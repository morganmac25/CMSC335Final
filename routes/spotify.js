const express = require('express');
const router = express.Router();

const client_id = process.env.CLIENT_ID; 
const client_secret = process.env.CLIENT_SECRET;

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

router.get("/search", async (req, res) => {
    const q = req.query.q;
    if (!q || q.trim() === "") {
        return res.redirect("/?error=invalid");
    }

    const token = await getToken();

    const response = await fetch(`https://api.spotify.com/v1/search?q=${encodeURIComponent(q)}&type=artist&limit=3`, {
        headers: { "Authorization": `Bearer ${token.access_token}` }
    });

    const data = await response.json();

    const artists = data.artists.items.map(a => ({
        id: a.id,
        name: a.name,
        image: a.images[0] ? a.images[0].url : null
    }));

    res.render("search-results", { artists });
});

module.exports = router;
