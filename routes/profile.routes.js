const express = require("express");
const Trainer = require("../models/User.model");
const router = express.Router();
const { isLoggedIn } = require("../middlewares/auth.middlewares");
const axios = require("axios");
const Pokemon = require("../models/pokemon.model");

//GET /profile

router.get("/", isLoggedIn, async (req, res, next) => {
  try {
    const trainerDetails = await Trainer.findById(
      req.session.activeTrainer._id
    );

    const dbPokemon = await Pokemon.find({
      trainer: req.session.activeTrainer._id,
    });

    res.render("profile/my-profile.hbs", {
      trainerDetails,
      dbPokemon: dbPokemon[0],
    });
    console.log(dbPokemon[0].photo);
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
    const pokemonTypes = await axios.get(
      "https://pokeapi.co/api/v2/type?limit=18"
    );
    const pokemonHabitat = await axios.get(
      "https://pokeapi.co/api/v2/pokemon-habitat/"
    );
    res.render("profile/create-pkm.hbs", {
      pokemonDetails,
      pokemonSpecies,
      pokemonTypes,
      pokemonHabitat,
    });
  } catch (error) {
    next(error);
  }
});

router.post("/create", isLoggedIn, async (req, res, next) => {
  const { pokemon, name, types, habitat, description, trainer } = req.body;
  try {
    const pokemonDetails = await axios.get(
      `https://pokeapi.co/api/v2/pokemon/${pokemon}/`
    );
    const newPokemon = await Pokemon.create({
      pokemon,
      name,
      types,
      habitat,
      description,
      baseStats: pokemonDetails.data.stats,
      photo: pokemonDetails.data.sprites.front_default,
      trainer: req.session.activeTrainer,
    });
    res.redirect("/profile");
  } catch (error) {
    next(error);
  }
});

module.exports = router;
