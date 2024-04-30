const express = require("express");
const router = express();
const userAuth = require('../controller/authController')
const postData = require('../controller/postController')
// TASK: -2 Create APIs for login and registration
router.post('/createUser', userAuth.createUser);
router.post('/login', userAuth.login);

// Task 3: Create the CRUD of Post for the only authenticated user.
router.post('/createPost', postData.createPost);
router.get('/getPost', postData.findAllPost);
router.put('/updatePost/:id', postData.updateById);
router.delete('/deletePost/:id', postData.deleteById);

// Task 4: Create an API to retrieve posts using latitude and longitude.

// Task 5: Show the count of active and inactive post in the dashboard.

module.exports = router;