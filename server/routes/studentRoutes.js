const express = require("express");
const router = express.Router({mergeParams: true});
const {bookRoom} = require("../handlers/room");

router.route("/booking/:id").put(bookRoom);

module.exports = router;