const { Schema, model, default: mongoose } = require("mongoose");

const pokeSchema = new Schema({
  pokemon: String,
  name: String,
  types: [String],
  habitat: String,
  description: String,
  baseStats: [Object],
  photo: String,
  profPhoto: String,
  trainer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Trainer"
  }
});

const Pokemon = model("Pokemon", pokeSchema);

module.exports = Pokemon;
