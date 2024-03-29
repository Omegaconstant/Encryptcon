const express = require("express");
const router = express.Router();
const cors = require("cors");
const app = express();

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(router);

const predictController = require("../controller/predictController");

// router.use("/auth", require("./auth"));
// router.use("/user", require("./user"));
router.post("/predict", predictController.pred);

module.exports = app;
