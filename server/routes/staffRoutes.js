const express = require("express");
const router = express.Router({mergeParams: true});
const {createRoom, updateRoom, deleteRoom, launchRoom} = require("../handlers/room");


router.route("/room").post(createRoom);
router.route("/room/:id").put(updateRoom);
router.route("/room/:id/launch").put(launchRoom);
router.route("/room/:id").delete(deleteRoom);

module.exports = router;