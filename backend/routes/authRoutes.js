const express = require('express');
const router = express.Router();
const {getUser,login ,register}= require('../controllers/authController');

//auth 
const auth = require('../middelware/authMiddelware');

router.post('/register', register);
router.post('/login', login);
router.get('/user', auth,getUser);

module.exports =  router;