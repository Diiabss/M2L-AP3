const express = require('express');
const router = express.Router();
const panierController = require('../controllers/panierController');

router.post('/create', panierController.createPanier);
router.get('/:panierID', panierController.getPanierDetails);
router.post('/addProduct', panierController.addProductToPanier);
router.put('/updateQuantity', panierController.updateProductQuantity);
router.delete('/removeProduct/:detailID', panierController.removeProductFromPanier);

module.exports = router; 
