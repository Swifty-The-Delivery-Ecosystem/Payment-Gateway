const express = require('express');
const mongoose = require("mongoose");
require("dotenv").config();
const cors = require("cors");

const { PORT, NODE_ENV, MONGODB_URI } = require("./config");
const authRoutes = require("./routes/payment.route");

const app = express();

// app.use(bodyParser.json());
app.use(
  cors({
    credentials: true,
    origin: "*",
    optionsSuccessStatus: 200,
  })
);

if (NODE_ENV === "development") {
    const morgan = require("morgan");
    app.use(morgan("dev"));
}



app.use(express.json());

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