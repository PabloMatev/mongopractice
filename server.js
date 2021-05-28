const express = require("express");
const connectDb = require("./config/db");

const app = express();

//Connect Db
connectDb();

app.get("/", (req, res) => res.send("Api Running"));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
