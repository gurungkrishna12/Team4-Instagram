const express = require('express');
const router = express.Router();

//@route        Post routes/profile/account
//description   Add an account section to a post that includes the bio 
//@access       Public 
router.get('/account', (req, res)=> res.json({
    msg:'Profile/account route works'
}))


//@route        Post routes/profile/followers
//description   Add an follower section to a post 
//@access       Public 
router.get('/followers', (req, res)=> res.json({
    msg:'Profile/followers route works'
}))

//@route        Post routes/profile/following
//description   Add a folowing section to a post 
//@access       Public 
router.get('/followings', (req, res)=> res.json({
    msg:'Profile/followings route works'
}))




module.exports = router;