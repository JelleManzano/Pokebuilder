const express = require("express");
const router = express.Router();
const Pokemon = require("../models/pokemon.model");
const axios = require("axios");

router.get("/pokedex", async (req, res, next) => {
    
  try {
    const pokemonList = await axios.get(
      `https://pokeapi.co/api/v2/pokemon?limit=151`
    );
    res.render("app/pokedex.hbs", {
      pokemonList,
    });
    console.log(pokemonList.data.results[0].url);
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
    const pokemonChain = await axios.get(pokemonSpecies.data.evolution_chain.url)
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

module.exports = router;
