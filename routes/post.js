const {getPosts} = require('../controllers/post');
const express = require('express')
const router = express.Router();
router.get('/',getPosts)

module.exports=router;