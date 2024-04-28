const express = require('express');
const router = express.Router();
const shopPageController = require('../controllers/contr')

router.get('/shop', shopPageController.getShopPage);

router.get('/cart', shopPageController.getCart);

router.post('/cart', shopPageController.postCart);

router.post('/cart-delete', shopPageController.postDeleteProduct);

router.post('/order', shopPageController.postOrder);

router.get('/getTotalProducts', shopPageController.getTotalProducts);

router.get('/shop/jerseys', shopPageController.getJerseysPage);

router.get('/order', shopPageController.getOrder);

router.get('/shop/sweatshirts', shopPageController.getSweatshirtsPage);

router.get('/shop/t-shirts', shopPageController.getTshirtsPage);

router.get('/shop/:id', shopPageController.getProductDetails);



module.exports = router;