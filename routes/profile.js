const express = require('express');
const router = express.Router();
const mongoose = require ("mongoose");
const passport = require ("passport");


//Load Profile model 
const Profile = require("../models/Profile");
//Load user model 
//const login = require("../models/user");

//@route        Post routes/profile/account
//description   Add an account section to a post that includes the bio 
//@access       Public 
router.get('/account', (req, res)=> res.json({
    msg:'Profile/account route works'
}));

module.exports = router;