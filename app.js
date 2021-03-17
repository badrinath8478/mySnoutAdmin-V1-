const express = require("express");
const app = express();
const morgan = require("morgan");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");





const HostelFeaturesRouter = require("./router/hostelFeatures");
const locationRouter = require("./router/hostelLocation");
const imageRouter = require("./router/hostelpics");
const authRouter = require("./router/auth");
const roomsavailableRouter = require("./router/roomsavailable");
const hostelRouter = require("./router/hosteldetails");




mongoose.connect("mongodb+srv://badrinath:badrinath@cluster0.zmvsr.mongodb.net/mysnout?retryWrites=true&w=majority",
{ useNewUrlParser: true,
   useUnifiedTopology: true })
   .then(() => console.log('DB Connected!'))
   .catch(err => {console.log( err)});
mongoose.Promise = global.Promise;



app.use(morgan("dev"));
app.use('/uploads',express.static('uploads'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(__dirname + '/public'));



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



app.use("/hostelFeatures"  ,HostelFeaturesRouter);
app.use("/pics"  ,imageRouter);
app.use("/location"  ,locationRouter);
app.use("/signup" , authRouter);
app.use("/hosteldetails" , hostelRouter);
app.use("/RoomsAvailable" , roomsavailableRouter);





app.use((req, res, next) => {
   const error = new Error("Not found");
   error.status = 404;
   next(error);
});
 
app.use((error, req, res, next) => {
   res.status(error.status || 500);
   res.json({
     error: {
       message: error.message
     }
   });
});

module.exports = app;




