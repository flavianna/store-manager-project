const express = require('express');
const { salesController } = require('../controllers');

const router = express.Router();

router.get('/', salesController.allDeals);

router.get('/:id', salesController.getDealById);

module.exports = router;