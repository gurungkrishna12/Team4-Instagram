const express = require('express');
const router = express.Router();

//@route        Post routes/inbox/direct
//description   Display message inbox 
//@access       Public 
router.get('/direct', (req, res)=> res.json({
    msg:'inbox/direct route works'
}))

//@route        Post routes/inbox/new
//description   Display new message box
//@access       Public 
router.get('/new', (req, res)=> res.json({
    msg:'inbox/new route works'
}))

module.exports = router;