const { pool } = require('../database/database');
const jwt = require('jsonwebtoken');

exports.getAllProducts = async (req, res) => {
    try {
        console.log("Lancement de la requête pour tous les produits");
         await pool.query('SELECT * FROM produit;', function(err, rows, fields) {
             if (err) throw err;
             console.log(rows);
             res.status(200).json(rows);
         });
     } catch (error) {
        console.log(error);
         res.status(500).json({ error: 'Une erreur est survenue lors de la récupération des produits.' });
     }
};

exports.addProduct = async (req, res) => {
     try {
        const { nom_produit, description, prix, stock } = req.body;
         const insertProductQuery = 'INSERT INTO produit (nom_produit, description, prix, stock) VALUES (?, ?, ?, ?)';
         const insertProductValues = [nom_produit, description, prix, stock];
         await pool.query(insertProductQuery, insertProductValues);
         res.status(201).json({ message: 'Produit ajouté avec succès' });
     } catch (error) {
         console.log(error);
         res.status(500).json({ error: 'Une erreur est survenue lors de l\'ajout du produit.' });
     }
};

exports.updateProduct = async (req, res) => {
        try {
        const { nom_produit, description, prix, stock } = req.body;
        const { productID } = req.params;
        const updateProductQuery = 'UPDATE produit SET nom_produit = ?, description = ?, prix = ?, stock = ? WHERE produitID = ?';
        const updateProductValues = [nom_produit, description, prix, stock, productID];
        await pool.query(updateProductQuery, updateProductValues);
        res.status(200).json({ message: 'Produit mis à jour avec succès' });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Une erreur est survenue lors de la mise à jour du produit.' });
    }
};

exports.deleteProduct = async (req, res) => {
    try {
        const { productID } = req.params;
        const deleteProductQuery = 'DELETE FROM produit WHERE produitID = ?';
        await pool.query(deleteProductQuery, [productID]);
        res.status(200).json({ message: 'Produit supprimé avec succès' });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Une erreur est survenue lors de la suppression du produit.' });
    }
};