const { Schema, model } = require("mongoose");

const pokeSchema = new Schema({
  name: String,
  type: [String],
  pokeindex: Number,
  weight: String,
  height: String,
  color: String,
  form: String,
  habitat: String,
  description: String,
  evolution: Number, //pokeindex
  prevolution: Number,
  //sugMove: requerir modelo movimientos
  baseStats: {
    hp: Number,
    attack: Number,
    defense: Number,
    specAtt: Number,
    specDef: Number,
    speed: Number,
  },
  photo: String,
  profPhoto: String,
});

const Pokemon = model("Pokemon", pokeSchema);

module.exports = Pokemon;
