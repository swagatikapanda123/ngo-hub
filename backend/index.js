const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");
const session = require("express-session");
const passport = require("passport");
const cookieParser = require("cookie-parser");
const ngoRoute = require("./routes/ngo.route.js");

const {
  MONGO_USER,
  MONGO_PASS,
  MONGO_IP,
  MONGO_PORT,
  MONGO_DB,
  NODE_ENV,
  HAS_SRV,
} = require("./config/config");

let mongoUrl = `mongodb://${MONGO_IP}:${MONGO_PORT}/${MONGO_DB}`; // local mongo

if (NODE_ENV !== "development" || (MONGO_USER !== "" && MONGO_PASS !== "")) {
  mongoUrl = `mongodb+srv://${MONGO_USER}:${MONGO_PASS}@cluster0.57rqk.mongodb.net/${MONGO_DB}?retryWrites=true&w=majority`;
}

mongoose
  .connect(mongoUrl)
  .then(() => {
    console.log("Connected to Database");
  })
  .catch((err) => {
    console.log("Not Connected to Database ERROR! ", err);
  });

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(session({ secret: "session secret key" }));

app.use(passport.initialize());
app.use(passport.session());
app.use(cookieParser());

app.use(cors());

app.use("/api/ngo", ngoRoute);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}.....`);
});
