const express = require('express');
const mongoose = require("mongoose");
const cors = require('cors');
require("dotenv").config();

const { PORT, NODE_ENV, MONGODB_URI } = require("./config");
const authRoutes = require("./routes/payment.route");

const app = express();

if (NODE_ENV === "development") {
    const morgan = require("morgan");
    app.use(morgan("dev"));
}

app.use(express.json());
app.use(function (req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  // res.setHeader("Access-Control-Allow-Credentials", true);
  next();
});

app.get("/", (req, res) => {
    res.status(200).json({
      type: "success",
      message: "server is up and running",
      data: null,
    });
  });

app.use("/payment", authRoutes);

async function main() {
    try {
        console.log(MONGODB_URI)
        await mongoose.connect(MONGODB_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    });
  
        console.log("database connected");
  
        app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
    }catch (error) {
        console.log(error);
        process.exit(1);
    }
  }
  
  main();