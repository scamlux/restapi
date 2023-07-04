import express from "express";

import mongoose from "mongoose";

import router from "./router.js";

import fileUpload from "express-fileupload";

const port = 5000;

const DB_URL = "mongodb://127.0.0.1:27017/";

const app = express();

app.use(express.json());
app.use(fileUpload({}));
app.use(express.static("static"));
app.use("/api", router);

async function startApp(req, res) {
  try {
    await mongoose.connect(DB_URL, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    });
    app.listen(port, () => {
      console.log("SERVER listening on port " + port);
    });
  } catch (error) {
    console.log(error);
  }
}
startApp();
