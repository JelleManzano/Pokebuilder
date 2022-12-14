const { Schema, model } = require("mongoose");

const trainerSchema = new Schema(
  {
    username: {
      type: String,
      trim: true,
      required: false,
      unique: true,
      lowercase: true
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true
    },
    password1: {
      type: String,
      required: true
    },
   password2: {
    type: String,
   },
   avatar: {
    type: String,
   },
   badges: {
    type: [String],
   },
   village: {
    type: String,
   },
  },
  {
    // this second object adds extra properties: `createdAt` and `updatedAt`    
    timestamps: true
  }
);

const Trainer = model("Trainer", trainerSchema);

module.exports = Trainer;
