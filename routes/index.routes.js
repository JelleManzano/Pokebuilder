//const router = require('express').Router();
const express = require("express")
const router = express.Router()

/* GET home page */
router.get("/", (req, res, next) => {
  res.render("index");
});

//Get auth routes
const authRoutes = require("./auth.routes.js")
router.use("/auth", authRoutes)

const profileRoutes = require("./profile.routes.js")
router.use("/profile", profileRoutes)

const approutes= require("./app.routes.js")
router.use("/app", approutes)

module.exports = router;