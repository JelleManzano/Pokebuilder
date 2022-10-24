const express = require("express");
const { get } = require("mongoose");
const Trainer = require("../models/User.model");
const router = express.Router()
const {isLoggedIn} = require("../middlewares/auth.middlewares")

//GET /profile

router.get("/", isLoggedIn, async (req, res, next) => {
    try {
        const trainerDetails = await Trainer.findById(req.session.activeTrainer._id)
        res.render("profile/my-profile.hbs", {
            trainerDetails
        })
    } catch (error) {
        next(error)
    }
})

module.exports = router;