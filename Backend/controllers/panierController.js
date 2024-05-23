const { pool } = require('../database/database');

exports.getPanierDetails = async (req, res) => {
    try {
        const { panierID } = req.params;
        const query = `
            SELECT dp.ID as detailID, dp.produitID, pr.nom_produit, pr.description, pr.prix, pr.image, dp.Quantité
            FROM detail_p dp
            JOIN produit pr ON dp.produitID = pr.produitID
            WHERE dp.panierID = ?;
        `;
        const [rows, fields] = await pool.query(query, [panierID]);
        res.status(200).json(rows);
    } catch (error) {
        console.error('Récupération des détails du panier:', error);
        res.status(500).json({ error: "Erreur lors de la récupération des détails du panier." });
    }
};

exports.addToCart = async (req, res) => {
    const { id, produitID, quantite } = req.body;

    if (!id || !produitID) {
        return res.status(400).json({ error: 'ID utilisateur et ID produit sont nécessaires.' });
    }

    let connection;

    try {
        connection = await pool.getConnection();

        await connection.beginTransaction();

        // Vérifiez si un panier existe déjà pour cet utilisateur
        const [paniers] = await connection.query('SELECT panierID FROM panier WHERE id = ?', [id]);
        let panierID;

        if (paniers.length === 0) {
            // Créer un nouveau panier si aucun n'existe
            const date_creation = new Date();
            const [result] = await connection.query('INSERT INTO panier (id, date_creation) VALUES (?, ?)', [id, date_creation]);
            panierID = result.insertId;
            res.status(201).json({ message: 'Panier créé avec succès', panierID });
        } else {
            panierID = paniers[0].panierID;
        }

        // Ajouter ou mettre à jour le produit dans le panier
        const [results] = await connection.query('SELECT * FROM detail_p WHERE panierID = ? AND produitID = ?', [panierID, produitID]);
        if (results.length > 0) {
            const existing = results[0];
            const newQuantity = existing.Quantité + parseInt(quantite);
            await connection.query('UPDATE detail_p SET Quantité = ? WHERE ID = ?', [newQuantity, existing.ID]);
            res.status(200).json({ message: 'Quantité mise à jour dans le panier' });
        } else {
            await connection.query('INSERT INTO detail_p (panierID, produitID, Quantité) VALUES (?, ?, ?)', [panierID, produitID, quantite]);
            res.status(201).json({ message: 'Produit ajouté au panier' });
        }

        await connection.commit();
    } catch (error) {
        if (connection) await connection.rollback();
        console.error('Erreur lors de l\'ajout au panier:', error);
        res.status(500).json({ error: 'Erreur lors de l\'ajout/mise à jour du produit dans le panier.' });
    } finally {
        if (connection) connection.release();
    }
};

exports.updateProductQuantity = async (req, res) => {
    try {
        const { detailID, quantite } = req.body;
        const updateQuery = 'UPDATE detail_p SET Quantité = ? WHERE ID = ?';
        await pool.query(updateQuery, [quantite, detailID]);
        res.status(200).json({ message: 'Quantité mise à jour avec succès' });
    } catch (error) {
        console.error('Mise à jour de la quantité:', error);
        res.status(500).json({ error: 'Erreur lors de la mise à jour de la quantité.' });
    }
};

exports.removeProductFromPanier = async (req, res) => {
    const { produitID } = req.params;
    try {
        const deleteQuery = 'DELETE FROM detail_p WHERE produitID = ? ';
        await pool.query(deleteQuery, [produitID]);
        console.log(deleteQuery);
        res.status(200).json({ message: 'Produit retiré du panier avec succès' });
    } catch (error) {
        console.error('Erreur lors de la suppression du produit du panier:', error);
        res.status(500).json({ error: 'Erreur lors de la suppression du produit du panier.' });
    }
};




