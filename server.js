const express = require("express");
const router = express.Router();

const DOTNET_API_URL = "https://dotnet-books-api.azurewebsites.net/books";

router.get("/", async (req, res) => {
    try {
        const response = await fetch(DOTNET_API_URL);
        const data = await response.json();
        res.json(data);
    } catch (error) {
        res.status(500).json({ message: "Fel vid hämtning av böcker", error: error.message });
    }
});

router.post("/", async (req, res) => {
    try {
        const response = await fetch(DOTNET_API_URL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(req.body),
        });

        const data = await response.json();
        res.json(data);
    } catch (error) {
        res.status(500).json({ message: "Fel vid tillägg av bok", error: error.message });
    }
});

router.delete("/:id", async (req, res) => {
    try {
        const response = await fetch(`${DOTNET_API_URL}/${req.params.id}`, {
            method: "DELETE",
        });

        const data = await response.json();
        res.json(data);
    } catch (error) {
        res.status(500).json({ message: "Fel vid borttagning av bok", error: error.message });
    }
});

module.exports = router;

