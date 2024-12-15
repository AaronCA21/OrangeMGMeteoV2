const express = require("express");
const app = express();
const PORT = 3000;

const url = "https://www.orange.mg/api/pratique/meteo/locations";

app.get("/api/locations", async (req, res) => {
    try {
        const fetch = await import("node-fetch"); // Import dynamique
        const response = await fetch.default(url);
        const data = await response.json();
        res.json(data);
    } catch (error) {
        res.status(500).send("Erreur lors de la récupération des données météo.");
    }
});

app.listen(PORT, () => {
    console.log(`Serveur backend démarré sur http://localhost:${PORT}`);
});
