require("dotenv").config();
const express = require("express");
const app = express();
const morgan = require("morgan");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const path = require("path");
const cookieParser = require("cookie-parser");


const HostelFeaturesRouter = require("./router/hostelFeatures");
const imageRouter = require("./router/hostelpics");
const authRouter = require("./router/auth");
const roomsavailableRouter = require("./router/roomsavailable");
const hostelRouter = require("./router/hosteldetails");


mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useCreateIndex:true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("DB Connected!");
  })
  .catch((err) => {
    console.log(err);
  });
mongoose.Promise = global.Promise;


app.use(morgan("dev"));
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use("/pics", express.static(path.join(__dirname, "public")));

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  if (req.method === "OPTIONS") {
    res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET");
    return res.status(200).json({});
  }
  next();
});


app.use("/admin/hostelFeatures", HostelFeaturesRouter);
app.use("/admin/pics", imageRouter);
app.use("/admin", authRouter);
app.use("/admin/hosteldetails", hostelRouter);
app.use("/admin/RoomsAvailable", roomsavailableRouter);


app.use((req, res, next) => {
  const error = new Error("Not found");
  error.status = 404;
  next(error);
});


app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    error: {
      message: error.message,
    },
  });
});


module.exports = app;
