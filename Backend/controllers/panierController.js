const { pool } = require('../database/database');

exports.createPanier = async (req, res) => {
    try {
        const { id } = req.body; // Assure-toi que l'ID utilisateur est passé dans le body de la requête
        const date_creation = new Date(); // La date de création du panier
        const query = 'INSERT INTO panier (id, date_creation) VALUES (?, ?)';
        await pool.query(query, [id, date_creation]);
        res.status(201).json({ message: 'Panier créé avec succès' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Une erreur est survenue lors de la création du panier.' });
    }
};

exports.getPanierDetails = async (req, res) => {
    try {
        const { panierID } = req.params;
        const query = `
            SELECT p.panierID, dp.ID, dp.Quantité
            FROM panier p
            JOIN detail_p dp ON p.panierID = dp.panierID
            WHERE p.panierID = ?;
        `;
        const [rows, fields] = await pool.query(query, [panierID]);
        res.status(200).json(rows);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Une erreur est survenue lors de la récupération des détails du panier.' });
    }
};

exports.addProductToPanier = async (req, res) => {
    try {
        const { panierID, productID, quantite } = req.body; 
        
        if (!productID) {
            return res.status(400).json({ error: 'Le productID ne peut pas être null' });
        }
        
        const insertQuery = 'INSERT INTO detail_p (panierID, ID, Quantité) VALUES (?, ?, ?)';
        await pool.query(insertQuery, [panierID, productID, quantite]);
        res.status(201).json({ message: 'Produit ajouté au panier avec succès' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Une erreur est survenue lors de l\'ajout du produit au panier.' });
    }
};


exports.updateProductQuantity = async (req, res) => {
    try {
        const { detailID, quantite } = req.body; // detailID est l'ID dans la table detail_p
        const updateQuery = 'UPDATE detail_p SET Quantité = ? WHERE ID = ?';
        await pool.query(updateQuery, [quantite, detailID]);
        res.status(200).json({ message: 'Quantité mise à jour avec succès' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Une erreur est survenue lors de la mise à jour de la quantité.' });
    }
};

exports.removeProductFromPanier = async (req, res) => {
    try {
        const { detailID } = req.params; 
        const deleteQuery = 'DELETE FROM detail_p WHERE ID = ?';
        await pool.query(deleteQuery, [detailID]);
        res.status(200).json({ message: 'Produit retiré du panier avec succès' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Une erreur est survenue lors de la suppression du produit du panier.' });
    }
};

