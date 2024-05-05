 const express = require('express');
 const router = express.Router();
 const productController = require('../controllers/productController');
 
 // Route pour obtenir tous les produits
 router.get('/products', productController.getAllProducts);
 
 // Route pour ajouter un produit
 router.post('/products', productController.addProduct);
 
 // Route pour mettre à jour un produit
 router.put('/products/:productID', productController.updateProduct);
 
 // Route pour supprimer un produit
 router.delete('/products/:productID', productController.deleteProduct);
 
 module.exports = router;