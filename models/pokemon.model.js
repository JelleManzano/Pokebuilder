const { Schema, model } = require("mongoose");

const pokeSchema = new Schema({
  pokemon: String,
  name: String,
  types: [String],
  habitat: String,
  description: String,
  baseStats: [Object],
  photo: String,
  profPhoto: String,
  trainer: String
});

const Pokemon = model("Pokemon", pokeSchema);

module.exports = Pokemon;
