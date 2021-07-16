const express = require('express');
const router = express.Router();

//@route        Post routes/post/comment
//description   Add comments to post
//@access       Public 
router.get('/comment', (req, res)=> res.json({
    msg:'Post/comment route works'
}))

//@route        Post routes/post/share
//description   Add share to post
//@access       Public 
router.get('/share', (req, res)=> res.json({
    msg:'Post/share route works'
}))

//@route        Post routes/post/likes
//description   Add likes to post
//@access       Public 
router.get('/likes', (req, res)=> res.json({
    msg:'Post/likes route works'
}))


module.exports = router;