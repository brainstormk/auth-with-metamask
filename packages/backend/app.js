const express = require("express");
const mongoose = require("mongoose");
const config = require("./config");

const path = require("path");
const app = express();

const route = require("./routes");
const { processAddress } = require("./utils");

app.use(express.static(path.join(__dirname, "public")));
app.use(express.json({ limit: "500mb" }));
app.use(express.urlencoded({ limit: "500mb", extended: true, parameterLimit: 50000 }));
app.use(express.json({ type: "application/vnd.api+json" })); // parse application/vnd.api+json as json
app.set("view engine", "ejs");
app.set("json spaces", 2);

app.use(processAddress);
app.use("/", route);

mongoose.connect(
  config.mongoUri,
  {
    useNewUrlParser: true,
    // useFindAndModify: false,
    // useCreateIndex: true,
    // useUnifiedTopology: true,
  },
  function (err, cb) {
    if (err) {
      console.log("http server db error", err);
      return;
    }
    app.listen(config.port || 5000, function () {
      console.log(`Server is runing on ${config.port || 5000}`);
    });
  }
);
