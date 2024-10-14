const  User =  require("../models/user_model")


module.exports.userSignUp = (req,res,next)=>{
    User.create(req.body).then((result) => {
        res.send("user account is created")
    }).catch((err) => {
        res.status(400).send("Already have an account on email");
    });
}