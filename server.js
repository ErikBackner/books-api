
const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const fetch = require("node-fetch"); 
const booksRouter = require("./routes/books");

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;
const DOTNET_API_URL = process.env.DOTNET_API_URL;

app.use(cors({ origin: "*" })); 
app.use(express.json()); 
app.use(express.urlencoded({ extended: true }));

app.use("/books", booksRouter); 


app.get("/", async (req, res) => {
    try {
        const response = await fetch(`${DOTNET_API_URL}/books`);
        if (!response.ok) throw new Error(`HTTP-fel: ${response.status}`);
        const books = await response.json();
        res.render("index", { books }); 
    } catch (error) {
        res.status(500).json({ message: "Fel vid hämtning av böcker", error: error.message });
    }
});


app.set("view engine", "ejs"); 
app.set("views", __dirname + "/views")


app.listen(PORT, () => {
    console.log(`Server körs på port ${PORT}`);
});
