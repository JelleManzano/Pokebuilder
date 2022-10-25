const express = require("express");
const router = express.Router();
const Pokemon = require("../models/pokemon.model");
const axios = require("axios");
const { isLoggedIn } = require("../middlewares/auth.middlewares");
const Trainer = require("../models/User.model");

router.get("/pokedex", async (req, res, next) => {
  try {
    const pokemonList = await axios.get(
      `https://pokeapi.co/api/v2/pokemon?limit=151`
    );

    res.render("app/pokedex.hbs", {
      pokemonList,
    });
    console.log(pokemonList.data);
  } catch (error) {
    next(error);
  }
});

router.get("/pokedex/:pokeIndex", async (req, res, next) => {
  let { pokeIndex } = req.params;
  try {
    const pokemonDetails = await axios.get(
      `https://pokeapi.co/api/v2/pokemon/${pokeIndex}`
    );
    const pokemonSpecies = await axios.get(
      `https://pokeapi.co/api/v2/pokemon-species/${pokeIndex}`
    );
    const pokemonChain = await axios.get(
      pokemonSpecies.data.evolution_chain.url
    );
    let pokemonMinus;
    if (parseInt(pokeIndex) > 1) {
      pokemonMinus = await axios.get(
        `https://pokeapi.co/api/v2/pokemon/${parseInt(pokeIndex) - 1}`
      );
    }
    const pokemonContinue = await axios.get(
      `https://pokeapi.co/api/v2/pokemon/${parseInt(pokeIndex) + 1}`
    );

    res.render("app/poke-details.hbs", {
      pokemonDetails,
      pokemonSpecies,
      pokemonChain,
      pokemonMinus,
      pokemonContinue,
    });
  } catch (error) {
    next(error);
  }
});

//get de la comunidad
router.get("/community", isLoggedIn, async (req, res, next) => {
  try {
    const trainerNames = await Trainer.find();
    res.render("app/community.hbs", {
      trainerNames,
    });
  } catch (error) {
    next(error);
  }
});
router.get("/community/:id", isLoggedIn, async (req,res,next) => {
  const {id} = req.params
  try {
    const trainerDetails = await Trainer.findById(id)
    const pokeTeam = await Pokemon.find({trainer: id})
    res.render("app/trainer-details.hbs", {
      trainerDetails,
      pokeTeam
    })
    
  } catch (error) {
    next(error)
  }
})

//get de la pokedex de la comunidad y sus detalles
router.get("/community-pokedex", isLoggedIn, async (req, res, next) => {
  try {
    const communityDex = await Pokemon.find().populate("trainer");
    res.render("app/community-pokedex.hbs", {
      communityDex,
    });
  } catch (error) {
    next(error);
  }
});

router.get("/community-pokedex/:id", isLoggedIn, async (req, res, next) => {
  const { id } = req.params;
  try {
    const commPokeDetails = await Pokemon.findById(id);
    res.render("app/community-pkm-details.hbs", {
      commPokeDetails,
    });
  } catch (error) {
    next(error);
  }
});


module.exports = router;
