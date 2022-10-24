const express = require("express")
const router = express.Router()
const Pokemon = require("../models/pokemon.model")
const axios = require("axios")

router.get("/pokedex", async (req, res, next) => {
    
        try {
            const pokemonList = await axios.get(`https://pokeapi.co/api/v2/pokemon?limit=151`)
            console.log(pokemonList.data.results);
            res.render("app/pokedex.hbs", {
                pokemonList
            })
            console.log(pokemonList.data.results.url);
        } catch (error) {
            next(error)
        }
})



module.exports = router;