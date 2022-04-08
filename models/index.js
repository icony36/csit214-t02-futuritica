const mongoose = require("mongoose");

// config for mongoose
mongoose.set("debug", true);
mongoose.Promise = Promise;
// connect database
mongoose.connect("mongodb://localhost:27017/csit214", {
    keepAlive: true,
})

module.exports.User = require("./user");
module.exports.Room = require("./room");