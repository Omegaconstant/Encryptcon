const express = require("express");
const app = express();
const dotenv = require("dotenv");
dotenv.config();

app.use("/", require("./routes"));


require("./config/mongoConnection");



const port = process.env.PORT;

app.listen(port || 3000, () => {
    console.log("Listening on 3000..");
})