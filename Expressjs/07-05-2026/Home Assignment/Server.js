// const express = require("express");
// const mongoose = require("mongoose");

// const app = express();


// app.use(express.json());


// const routes = require("./routes");

// app.use("/", routes);


// mongoose.connect("mongodb://127.0.0.1:27017/mydatabase")
//   .then(() => console.log("MongoDB Connected"))
//   .catch((err) => console.log(err));


// app.listen(3000, () => {
//   console.log("Server running on port 3000");
// });

const express = require("express");

const mongoose = require("mongoose");

const app = express();



// MIDDLEWARE

app.use(express.json());


// ROUTES

const routes = require("./routes");

app.use("/", routes);


// MONGODB CONNECTION

mongoose.connect("mongodb://127.0.0.1:27017/mydatabase")

  .then(() => {
    console.log("MongoDB Connected");
  })

  .catch((err) => {
    console.log(err);
  });


// SERVER

app.listen(3000, () => {

  console.log("Server running on port 3000");

});