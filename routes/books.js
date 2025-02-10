const express = require("express");
const router = express.Router();
const fetch = require("node-fetch");

const DOTNET_API_URL = process.env.DOTNET_API_URL || "http://localhost:5104/books";

router.get("/", async (req, res) => {
    try {
        const response = await fetch(DOTNET_API_URL);
        const data = await response.json();
        res.json(data);
    } catch (error) {
        res.status(500).json({ message: "Error fetching books", error: error.message });
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
        res.status(500).json({ message: "Error adding book", error: error.message });
    }
});

router.delete("/:id", async (req, res) => {
    try {
        const response = await fetch(`${DOTNET_API_URL}/${req.params.id}`, { method: "DELETE" });
        const data = await response.json();
        res.json(data);
    } catch (error) {
        res.status(500).json({ message: "Error deleting book", error: error.message });
    }
});

module.exports = router;
