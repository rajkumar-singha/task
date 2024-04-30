const express = require("express");
const router = express();
const userAuth = require('../controller/authController')
const postData = require('../controller/postController')
const middlewares = require('../middleware/index')
// TASK: -2 Create APIs for login and registration
router.post('/user', userAuth.createUser);
router.post('/login', userAuth.login);

// Task 3: Create the CRUD of Post for the only authenticated user.
router.post('/post', middlewares.auth.token, postData.createPost);
router.get('/post', postData.findAllPost);
router.put('/post/:id', postData.updateById);
router.delete('/post/:id', postData.deleteById);

// Task 4: Create an API to retrieve posts using latitude and longitude.

// Task 5: Show the count of active and inactive post in the dashboard.

module.exports = router;