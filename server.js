const express = require("express");
const db = require("./config/connection");
const routes = require("./routes");
const mongoose = require("mongoose");

const PORT = process.env.PORT || 3001;
const app = express();

app.use("/api", require("./routes"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(routes);

mongoose.connect(
  process.env.MONGODB_URI || "mongodb://localhost/social-network",
  {
    useFindAndModify: false,
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

mongoose.set("useCreateIndex", true);
mongoose.set("debug", true);

db.once("open", () => {
  app.listen(PORT, () => {
    console.log(`running on Port ${PORT}!`);
  });
});
