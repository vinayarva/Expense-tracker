const express = require("express");
const Controller = require("../Controller/controllers");

const Routes = express.Router();


Routes.post("/user/signUp", Controller.userSignUp)




module.exports = Routes;
