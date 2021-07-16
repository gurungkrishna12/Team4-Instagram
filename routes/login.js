const express = require('express');
const router = express.Router();

//@route        Post routes/login/register
//description   Register a user 
//@access       Public 
router.get('/register', (req, res)=> res.json({
    msg:'User route works'
}))

module.exports = router;

