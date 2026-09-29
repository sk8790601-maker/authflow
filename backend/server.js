require("dotenv").config();

const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");

const app = express();

// Enable CORS for all origins (dynamically reflects the request origin)
app.use(
  cors({
    origin: true,
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS", "PATCH"],
    allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With"],
  })
);

// Respond to preflight OPTIONS requests for all routes
app.options("*", cors());

app.use(express.json());

app.get("/", (req, res) => res.send("Auth API is running"));

app.use("/api/auth", authRoutes);

const PORT = process.env.PORT || 5000;

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(` Server running on port ${PORT}`);
  });
});