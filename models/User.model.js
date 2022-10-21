const { Schema, model } = require("mongoose");

const trainerSchema = new Schema(
  {
    username: {
      type: String,
      trim: true,
      required: false,
      unique: true
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
  },
  {
    // this second object adds extra properties: `createdAt` and `updatedAt`    
    timestamps: true
  }
);

const Trainer = model("Trainer", trainerSchema);

module.exports = Trainer;
