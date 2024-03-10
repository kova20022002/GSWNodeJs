const express = require('express');
const router = express.Router();
const shopPageController = require('../controllers/contr')

router.get('/shop', shopPageController.getShopPage);

router.get('/shop/jerseys', shopPageController.getJerseysPage);

router.get('/shop/sweatshirts', shopPageController.getSweatshirtsPage);

router.get('/shop/t-shirts', shopPageController.getTshirtsPage);

router.get('/shop/:id', shopPageController.getProductDetails);




module.exports = router;