const express = require('express');
const router = express.Router();
const panierController = require('../controllers/panierController');

router.get('/:panierID', panierController.getPanierDetails);
router.post('/addProduct', panierController.addToCart);
router.put('/updateQuantity', panierController.updateProductQuantity);
router.delete('/delete/:produitID', panierController.removeProductFromPanier);



module.exports = router; 
