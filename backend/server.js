const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();



// ROUTES (IMPORTANT)
const authRoutes = require("./routes/authRoutes");
const taskRoutes = require("./routes/taskRoutes");

app.use("/api/tasks", require("./routes/taskRoutes"));
app.use(cors());
app.use(express.json());
// use routes
app.use("/api/auth", authRoutes);

// test route
app.get("/", (req, res) => {
  res.send("Backend is running");
});

// database connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB error:", err));

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
