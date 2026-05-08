// const mongoose = require("mongoose");

// const userSchema = new mongoose.Schema({
//     name: String,
//     age: Number
// });

// module.exports = mongoose.model("User", userSchema);
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({

    name: String,

    age: Number

});

module.exports = mongoose.model("User", userSchema);