const express = require('express');
const router = express.Router();
const User = require ('../models/User');
const bcrypt = require ('bcryptjs');
const gravatar = require ('gravatar');
const validateRegisterInput = require('../validation/register');

//@route        Post routes/login/register
//description   Register a user 
//@access       Public 
router.post('/register', (req, res)=> {
const {errors, isValid} =  validateRegisterInput(req.body);
if(!isValid) {
    return res.status(401).json(errors);
}

User.findOne({email:req.body.email})
.then(user => {
if (user){
    return res.status(400).json({email: 'email alredy exist!'})
} else {
    const avatar= gravatar.url(req.body.email,{
        s:'200',
        r:'pg',
        d:'mm'
    });

    const newUser = new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        avatar
    });
        
    //convert into hashed password and hash function 
    bcrypt.genSalt(10, (err, salt) => {
        if (err) throw err;
        bcrypt.hash(req.body.password, salt, (err, hash)=> {
        if (err) throw err;
            newUser.password = hash;
            newUser.save()
            .then(user => res.json(user))
            .catch(err => console.log('not conneting'))
            });
         });
        }
     })
    .catch(err => console.log(err));
});

module.exports = router;

