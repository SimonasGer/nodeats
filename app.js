const express = require("express");
const repairmanRouter = require("./routes/repairmanRoutes");
const userRoutes = require("./routes/userRoutes");
const serviceRoutes = require("./routes/serviceRoutes");
const app = express();

// MIDDLEWARE:
app.use(express.json()); // be sito postman negali postinti ir logina undefined



app.use("/api/v1/repairmen", repairmanRouter);
app.use("/api/v1/users", userRoutes);
app.use("/api/v1/services", serviceRoutes);


module.exports = app;


