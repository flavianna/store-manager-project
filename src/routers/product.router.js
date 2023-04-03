const express = require('express');
const productController = require('../controllers/product.controller');

const router = express.Router();

router.get('/', productController.findAll);
router.get('/:id', productController.getById);
router.post('/', productController.insert);
router.put('/:id', productController.update);

module.exports = router;