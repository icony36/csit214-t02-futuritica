const express = require("express");
const router = express.Router({mergeParams: true});
const {signup} = require("../handlers/auth");
const {getUsers, updateUser, deleteUser} = require("../handlers/user");

router.route("/users").get(getUsers);
router.route("/users/:id").put(updateUser);
router.route("/users/:id").delete(deleteUser);

module.exports = router;