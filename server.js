require('dotenv').config();

const express = require("express");
const mongoose = require("mongoose");
const routes = require("./routes");
const app = express();

const PORT = process.env.PORT || 3001;

// Define middleware here
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Serve up static assets (usually on heroku)
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}

// Add routes, both API and view
app.use(routes);

// Connect to the Mongo DB
const uri = process.env.MONGODB_URI;

mongoose.connect(uri, {
  useFindAndModify: false,
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true
});

try {
  const connection = mongoose.connection;
  // console.log(connection);
  connection.once("open", () => {
    console.log("mongoDB database connection established successfully");
  })
} catch (err) {
  console.error(err)
}

// const connection = mongoose.connection;
// connection.once("open", () => {
//   console.log("mongoDB database connection established successfully");
// }).then(() => {
//   console.log('connected to MongoDB');
// }).catch((error) => {
//   console.error("error connecting to mongoDB: ", error.message)
// })

// Start the API server
app.listen(PORT, function () {
  console.log(`API Server now listening on PORT ${PORT}`);
});
