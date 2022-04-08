const express = require("express");
const router = express.Router({mergeParams: true});
const {getRooms, getRoom} = require("../handlers/room");
const {getUser} = require("../handlers/user");
const { ensureCorrectUser} = require("../middleware/auth");

router.route("/rooms").get(getRooms);
router.route("/rooms/:id").get(getRoom);
router.route("/:id").get(ensureCorrectUser,getUser);

module.exports = router;