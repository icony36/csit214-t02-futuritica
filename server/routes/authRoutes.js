const express = require("express");
const router = express.Router();
const {logout, signin, signup} = require("../handlers/auth");
const { loginRequired, ensureCorrectRole} = require("../middleware/auth");

router.post("/signin", signin);
router.route("/logout/:id").post(loginRequired, logout);
router.route("/signup").post(loginRequired, ensureCorrectRole("admin"), signup);
router.route("/signup/dev").post(signup);

module.exports = router;