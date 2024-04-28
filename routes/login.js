const express = require('express');
const router = express.Router();
const loginPageController = require('../controllers/contr');


router.get('/login', loginPageController.getLogin);

router.post('/login', loginPageController.postLogin);

router.post('/logout', loginPageController.postLogout);

router.get('/signup', loginPageController.getSignup);

router.post('/signup', loginPageController.postSignup);


module.exports = router;