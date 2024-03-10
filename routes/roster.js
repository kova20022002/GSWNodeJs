const express = require('express');
const router = express.Router();
const rosterPageController = require('../controllers/contr')

router.get('/roster', rosterPageController.getRosterPage);


module.exports = router;