const bcrypt = require("bcrypt");

const User = require("../models/user_model");

module.exports.userSignUp = (req, res, next) => {
  let userDetails = req.body;

  async function userSignIn() {
    try {
      const hash = await bcrypt.hash(userDetails.password, 10);

      userDetails["password"] = hash;

      return userDetails;
    } catch {
      console.log(err);
    }
  }
  userSignIn()
    .then((result) => {
      User.create(result)
        .then((result) => {
          res.send("user account is created");
        })
        .catch((err) => {
          res.status(401).send("User already have an account");
        });
    })
    .catch((err) => {
      console.log(err);
    });
};

module.exports.userLogin = (req, res, next) => {
  User.findOne({ where: { email: req.body.email } })
    .then((result) => {
      if (result) {
        bcrypt.compare(
          req.body.password,
          result.password,
          function (err, data) {
            if (data) {
              res.send("Login Successful");
            } else {
              res.send("Password is wrong, Please Enter the Right Password");
            }
          }
        );
      } else {
        res.send("Account not found, please create an account");
      }
    })
    .catch((err) => {
      console.error(err);
      res.status(401).send("An error occurred during login");
    });
};
