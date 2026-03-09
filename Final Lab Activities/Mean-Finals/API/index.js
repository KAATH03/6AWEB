const express = require("express");
const { MongoClient } = require("mongodb");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

const CONNECTION_STRING = "mongodb://127.0.0.1:27017";
const DATABASENAME = "MyDb";

let database = null;

async function startServer() {
  try {
    const client = new MongoClient(CONNECTION_STRING);
    await client.connect();

    database = client.db(DATABASENAME);
    console.log("Connected to MongoDB");
    console.log("Database:", DATABASENAME);

    app.listen(5038, () => {
      console.log("Server running at http://localhost:5038");
    });
  } catch (error) {
    console.error("MongoDB connection failed:", error);
  }
}

startServer();

/* GET ALL BOOKS */
app.get("/api/books/GetBooks", async (req, res) => {
  try {
    const books = await database.collection("Books").find({}).toArray();
    res.json(books);
  } catch (error) {
    console.error("GetBooks error:", error);
    res.status(500).json({ error: "Failed to fetch books" });
  }
});

/* ADD BOOK */
app.post("/api/books/AddBook", async (req, res) => {
  try {
    const newBook = {
      id: Date.now().toString(),
      title: req.body.title,
      desc: req.body.description,
      price: Number(req.body.price),
      author: req.body.author,
      category: req.body.category,
      publisher: req.body.publisher,
      yearPublished: req.body.yearPublished
    };

    await database.collection("Books").insertOne(newBook);
    res.json({ message: "Book added successfully" });
  } catch (error) {
    console.error("AddBook error:", error);
    res.status(500).json({ error: "Failed to add book" });
  }
});

/* UPDATE BOOK */
app.put("/api/books/UpdateBook/:id", async (req, res) => {
  try {
    const id = req.params.id;

    await database.collection("Books").updateOne(
      { id: id },
      {
        $set: {
          title: req.body.title,
          desc: req.body.description,
          price: Number(req.body.price),
          author: req.body.author,
          category: req.body.category,
          publisher: req.body.publisher,
          yearPublished: req.body.yearPublished
        }
      }
    );

    res.json({ message: "Book updated successfully" });
  } catch (error) {
    console.error("UpdateBook error:", error);
    res.status(500).json({ error: "Failed to update book" });
  }
});

/* DELETE BOOK */
app.delete("/api/books/DeleteBook/:id", async (req, res) => {
  try {
    const id = req.params.id;

    await database.collection("Books").deleteOne({ id: id });
    res.json({ message: "Book deleted successfully" });
  } catch (error) {
    console.error("DeleteBook error:", error);
    res.status(500).json({ error: "Failed to delete book" });
  }
});