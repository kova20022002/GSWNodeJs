const express = require('express');
const router = express.Router();
const indexPageController = require('../controllers/contr')

router.get('/', indexPageController.getIndexPage);


module.exports = router;