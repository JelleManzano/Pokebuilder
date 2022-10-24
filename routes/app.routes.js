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

router.get("/pokedex/:pokeIndex", async(req, res, next) => {
    let {pokeIndex} = req.params
    try {
        const pokemonDetails = await axios.get(`https://pokeapi.co/api/v2/pokemon/${pokeIndex}`)
        const pokemonSpecies = await axios.get(`https://pokeapi.co/api/v2/pokemon-species/${pokeIndex}`)
        const pokemonChain = await axios.get(`https://pokeapi.co/api/v2/evolution-chain/`)
        const pokemonMinus = await axios.get(`https://pokeapi.co/api/v2/pokemon/${parseFloat(pokeIndex) - 1}`)
        const pokemonContinue = await axios.get(`https://pokeapi.co/api/v2/pokemon/${parseFloat(pokeIndex) + 1}`)

        
        res.render("app/poke-details.hbs", {
            pokemonDetails,
            pokemonSpecies,
            pokemonChain,
            pokemonMinus,
            pokemonContinue
        })
        console.log(pokemonContinue.data.id)
    } catch (error) {
        next(error)
    }
})



module.exports = router;