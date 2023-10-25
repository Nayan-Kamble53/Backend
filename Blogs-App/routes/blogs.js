const express = require('express');
const router = express.Router();

//import controllers
const {createPost, fetchAllPosts} = require('../controllers/postController');
const {likePost, unlikePost} = require('../controllers/likeController');
const {createComment} = require('../controllers/commentController');


//map with controller
router.post('/posts/create', createPost);
router.get('/posts', fetchAllPosts);
router.post('/likes/like', likePost);
router.post('/likes/unlike', unlikePost);
router.post('/comments/create', createComment);

//export
module.exports = router;