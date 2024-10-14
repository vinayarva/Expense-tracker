const { where } = require("sequelize");
const User = require("../models/user_model");

module.exports.userSignUp = (req, res, next) => {
  User.create(req.body)
    .then((result) => {
      res.send("user account is created");
    })
    .catch((err) => {
      res.send(true);
    });
};

module.exports.userLogin = (req, res, next) => {
  User.findOne({ where: { email: req.body.email } })
    .then((result) => {
      if (result) {
        if (result.password === req.body.password) {
          res.send("Login Successful");
        } else {
          res.send("Password is wrong, Please Enter the Right Password");
        }
      } else {
        res.send("Account not found, please create an account");
      }
    })
    .catch((err) => {
      console.error(err);
      res.status(404).send("An error occurred during login");
    });
};
