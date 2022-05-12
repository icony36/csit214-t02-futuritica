const express = require("express");
const router = express.Router({mergeParams: true});
const { ensureCorrectBooking } = require("../middleware/auth");
const {bookRoom, getBooking, deleteBooking, updateBooking} = require("../handlers/booking");

router.route("/booking/:id").get(getBooking);
router.route("/booking/:id").patch(bookRoom);
router.route("/booking/:id/:userId").put(ensureCorrectBooking, updateBooking);
router.route("/booking/:id").delete(deleteBooking);

module.exports = router;