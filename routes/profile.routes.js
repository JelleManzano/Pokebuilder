const express = require("express");
const { get } = require("mongoose");
const Trainer = require("../models/User.model");
const router = express.Router();
const { isLoggedIn } = require("../middlewares/auth.middlewares");
const axios = require("axios");

//GET /profile

router.get("/", isLoggedIn, async (req, res, next) => {
  try {
    const trainerDetails = await Trainer.findById(
      req.session.activeTrainer._id
    );
    res.render("profile/my-profile.hbs", {
      trainerDetails,
    });
  } catch (error) {
    next(error);
  }
});

router.get("/create", isLoggedIn, async (req, res, next) => {
  try {
    const pokemonDetails = await axios.get(
      `https://pokeapi.co/api/v2/pokemon?limit=151/`
    );
    const pokemonSpecies = await axios.get(
      `https://pokeapi.co/api/v2/pokemon-species?limit=151/`
    );
    res.render("profile/create-pkm.hbs", {
      pokemonDetails,
      pokemonSpecies,
    });
    console.log(pokemonDetails.data);
  } catch (error) {
    next(error);
  }
});


module.exports = router;
