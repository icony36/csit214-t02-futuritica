const express = require("express");
const router = express.Router({mergeParams: true});
const { ensureCorrectUser} = require("../middleware/auth");
const {bookRoom, getBooking, deleteBooking, updateBooking} = require("../handlers/booking");

router.route("/booking/:id").get(getBooking);
router.route("/booking/:id").patch(bookRoom);
router.route("/booking/:id").put(ensureCorrectUser, updateBooking);
router.route("/booking/:id").delete(deleteBooking);

module.exports = router;