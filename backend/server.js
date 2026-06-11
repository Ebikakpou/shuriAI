const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();

const app = express();

// Security and Formatting Middlewares
app.use(cors());
app.use(express.json());

// Establish Cloud Atlas Connection Streams
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("Database connected smoothly to MongoDB Atlas! 🍃"))
  .catch((err) => console.error("Database connection failure:", err));

// Route Mounting Pipelines
app.use("/api/auth", require("./routes/auth"));

app.get("/", (req, res) => {
  res.send("ShuriAI Backend Server is Running Smoothly! 🚀");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`\n============================================`);
  console.log(`  ShuriAI Server listening on Port: ${PORT}  `);
  console.log(`============================================\n`);
});