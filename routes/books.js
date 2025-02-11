

const express = require("express");
const fetch = require("node-fetch");
const router = express.Router();
require("dotenv").config();

const DOTNET_API_URL = process.env.DOTNET_API_URL;

router.get("/", async (req, res) => {
    try {
        const response = await fetch(`${DOTNET_API_URL}/books`);
        if (!response.ok) throw new Error(`HTTP-fel: ${response.status}`);
        const books = await response.json();
        res.json(books);
    } catch (error) {
        res.status(500).json({ message: "Fel vid hämtning av böcker", error: error.message });
    }
});

router.post("/", async (req, res) => {
    try {
        const response = await fetch(`${DOTNET_API_URL}/book`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(req.body),
        });

        if (!response.ok) throw new Error(`HTTP-fel: ${response.status}`);
        const data = await response.json();
        res.status(201).json(data);
    } catch (error) {
        res.status(500).json({ message: "Fel vid tillägg av bok", error: error.message });
    }
});

router.delete("/:id", async (req, res) => {
    try {
        const response = await fetch(`${DOTNET_API_URL}/book/${req.params.id}`, { method: "DELETE" });

        if (!response.ok) throw new Error(`HTTP-fel: ${response.status}`);
        const data = await response.json();
        res.json(data);
    } catch (error) {
        res.status(500).json({ message: "Fel vid borttagning av bok", error: error.message });
    }
});

module.exports = router;
