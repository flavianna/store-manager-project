const express = require('express');
const productController = require('../controllers/product.controller');

const router = express.Router();

router.get('/', productController.findAll);
router.get('/:id', productController.getById);
router.post('/', productController.insert);

module.exports = router;