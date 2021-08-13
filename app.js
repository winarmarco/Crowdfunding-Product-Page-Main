const express = require("express");
const ejs = require("ejs");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const path = require("path");

dotenv.config();


const port = 3000 || proceess.env.PORT;

const app = express();
app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname , "/public")));



app.get("/", (req,res) => {
    res.render("index");
});

app.listen(port, () => {
    console.log(`Connected to port ${port}`);
});