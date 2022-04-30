const express = require("express");
const router = express.Router({mergeParams: true});
const {getRooms, getRoom} = require("../handlers/room");
const {getUser, updateUser} = require("../handlers/user");
const { ensureCorrectUser} = require("../middleware/auth");


router.route("/rooms").get(getRooms);
router.route("/rooms/:id").get(getRoom);
router.route("/user/:id").get(ensureCorrectUser,getUser);
router.route("/user/:id").put(ensureCorrectUser,updateUser);

module.exports = router;