const express = require("express");
const router = express.Router();
const Trainer = require("../models/User.model");
const bcrypt = require("bcrypt");

//get /auth
router.get("/", (req, res, next) => {
  res.render("auth/sign-login.hbs");
});

//post /auth/signup
router.post("/", async (req, res, next) => {
  const { username, email, password1, password2 } = req.body;
  //cannot leave an empty field check
  if (username === "" || email === "" || password1 === "" || password2 === "") {
    res.render("auth/sign-login.hbs", {
      errorMessage: "All fields need to be filled",
    });
    return;
  }
  //Both passwords are the same check
  if (password1 !== password2 || password2 !== password2) {
    res.render("auth/sign-login.hbs", {
      errorMessage: "Please make sure both passwords are the same",
    });
    return;
  }
  //Password requirement check
  const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/gm;
  if (passwordRegex.test(password1) === false) {
    res.render("auth/sign-login.hbs", {
      errorMessage:
        "The password should contain 8 characters, one uppercase letter and a number or special character",
    });
    return;
  }
  //valid email check
  const emailRegex =
    /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/g;
  if (emailRegex.test(email) === false) {
    res.render("auth/sign-login.hbs", {
      errorMessage: "The e-mails needs to be a valid direction",
    });
    return;
  }
  const validTrainer = await Trainer.findOne({ username: username });
  if (validTrainer !== null) {
    res.render("auth/sign-login.hbs", {
      errorMessage: "The trainer name is already in use",
    });
  }
  const validEmail = await Trainer.findOne({ email: email });
  if (validEmail !== null) {
    res.render("auth/sign-login.hbs", {
      errorMessage: "That e-mail is already in use",
    });
  }
  try {


    const salt = await bcrypt.genSalt(12);
    const hashPassword = await bcrypt.hash(password1, salt);

    const newTrainer = {
      username: username,
      email: email,
      password1: hashPassword,
    };
    await Trainer.create(newTrainer);
    //pruebas, redirect a  home
    res.redirect("/");
  } catch (error) {
    next(error);
  }
});

module.exports = router;
