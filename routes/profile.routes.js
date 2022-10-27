const express = require("express");
const Trainer = require("../models/User.model");
const router = express.Router();
const { isLoggedIn } = require("../middlewares/auth.middlewares");
const axios = require("axios");
const Pokemon = require("../models/pokemon.model");
const { capitalize } = require("../utils/capitalize");

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
      dbPokemon,
    });
  } catch (error) {
    next(error);
  }
});

//get create a pokemon
router.get("/create", isLoggedIn, async (req, res, next) => {
  try {
    const dbPokemon = await Pokemon.find({
      trainer: req.session.activeTrainer._id,
    });

    if (dbPokemon.length >= 6) {
      res.redirect("/profile");
    }
    const pokemonDetails = await axios.get(
      `https://pokeapi.co/api/v2/pokemon?limit=151/`
    );
    const pokemonTypes = await axios.get(
      "https://pokeapi.co/api/v2/type?limit=18"
    );
    const pokemonHabitat = await axios.get(
      "https://pokeapi.co/api/v2/pokemon-habitat/"
    );
    res.render("profile/create-pkm.hbs", {
      pokemonDetails,
      pokemonTypes,
      pokemonHabitat,
    });
  } catch (error) {
    next(error);
  }
});

//POST on create a pokemon
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

//get on update a pokemon created by a trainer
router.get("/update-pokemon/:idPkm", isLoggedIn, async (req, res, next) => {
  const { idPkm } = req.params;
  try {
    const pokemonDetails = await axios.get(
      `https://pokeapi.co/api/v2/pokemon?limit=151/`
    );
    const pokemonTypes = await axios.get(
      "https://pokeapi.co/api/v2/type?limit=18"
    );
    const pokemonHabitat = await axios.get(
      "https://pokeapi.co/api/v2/pokemon-habitat/"
    );
    const pokeUpdate = await Pokemon.findById(idPkm);
    res.render("profile/update-pokemon.hbs", {
      pokeUpdate,
      pokemonDetails,
      pokemonTypes,
      pokemonHabitat,
    });
  
  } catch (error) {
    next(error);
  }
});

//post of the data of the updated pokemon
router.post("/update-pokemon/:idPkm", async (req, res, next) => {
  const { idPkm } = req.params;
  const { pokemon, name, types, habitat, description } = req.body;

  try {
    const pokemonDetails = await axios.get(
      `https://pokeapi.co/api/v2/pokemon/${pokemon}/`
    );
    const changePkm = await Pokemon.findByIdAndUpdate(idPkm, {
      pokemon,
      name,
      types,
      habitat,
      description,
      photo: pokemonDetails.data.sprites.front_default,
    });
    res.redirect("/profile");
  } catch (error) {
    next(error);
  }
});

//post to delete a pokemon
router.post("/delete/:idPkm", async (req, res, next) => {
  const { idPkm } = req.params;
  try {
    const deletePkm = await Pokemon.findByIdAndDelete(idPkm);
    res.redirect("/profile");
  } catch (error) {
    next(error);
  }
});

//get on updating the profile
router.get("/update-profile/:id", async (req, res, next) => {
  const { id } = req.params;
  try {
    const trainerUpdate = await Trainer.findById(id);
    res.render("profile/update-profile.hbs", {
      trainerUpdate,
    });
    console.log(trainerUpdate);
  } catch (error) {
    next(error);
  }
});
//post on updated profile properties
router.post("/update-profile/:id", async (req, res, next) => {
  const { id } = req.params;
  const { username, email, avatar, village } = req.body;
  try {
    const trainerUpdate = await Trainer.findByIdAndUpdate(id, {
      username,
      email,
      avatar,
      village,
    });
    res.redirect("/profile");
  } catch (error) {
    next(error);
  }
});
//post to delete a profile
router.post("/update-profile/:id/delete", async (req, res, next) => {
  const { id } = req.params;
  try {
    const deleteProfile = await Trainer.findByIdAndDelete(id);
    req.session.destroy(() => {
      res.redirect("/");
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
