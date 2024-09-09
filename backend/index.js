const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const todoRoute = require("./routes/todos");
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

/* MONGODB URL */
mongoose
  .connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
  useUnifiedTopology: true,
  })
  .then(() => {
    console.log("MongoDB connected successfully");
  })
  .catch((err) => {
    console.log(err);
    console.log("Unable to connect !");
  });

app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:3000",
  })
);

/* WELCOME */
app.get("/", (req, res) => {
  res.send("WELCOME TO MY TODO APP BACKEND");
});

/* ROUTES */
app.use("/todos", todoRoute);

/* LISTENING */
app.listen(PORT, "0.0.0.0", () => {
  console.log("Server running on port 5000");
});
