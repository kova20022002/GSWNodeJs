const express = require('express');
const router = express.Router();
const freeTicketsPageController = require('../controllers/contr')

router.get('/free_tickets', freeTicketsPageController.getFreeTickets );
router.post('/free_tickets', freeTicketsPageController.postFreeTickets);



module.exports = router;