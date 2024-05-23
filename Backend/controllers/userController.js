/* eslint-disable no-undef */
const { pool } = require('../database/database');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.getAllUsers = async (req, res) => {
    try {
        console.log("lancement de la requête des utilisateurs");
        const [rows] = await pool.query('SELECT * FROM utilisateur;');
        console.log(rows);
        res.status(200).json(rows);
    } catch (error) {
        console.error('Erreur lors de la requête des utilisateurs:', error);
        res.status(500).json({ error: 'Une erreur est survenue lors de la récupération des utilisateurs.' });
    }
}


exports.updateUser = async (req, res) => {
    const { id } = req.params;
    const { nom, email, mdp, statut } = req.body;

    try {
        const hashedPassword = mdp ? await bcrypt.hash(mdp, 10) : null;  // Utilise null pour s'assurer que COALESCE fonctionne correctement.

        const updateQuery = `
            UPDATE utilisateur
            SET 
                nom = COALESCE(?, nom),
                email = COALESCE(?, email),
                mdp = COALESCE(?, mdp),
                statut = COALESCE(?, statut)
            WHERE id = ?;
        `;
        await pool.query(updateQuery, [nom, email, hashedPassword, statut, id]);
        res.status(200).json({ message: 'Utilisateur mis à jour avec succès' });
    } catch (error) {
        console.error('Erreur lors de la mise à jour de l\'utilisateur:', error);
        res.status(500).json({ error: 'Une erreur est survenue lors de la mise à jour de l\'utilisateur.' });
    }
};


exports.deleteUser = async (req, res) => {
  const { id } = req.params; // L'identifiant de l'utilisateur à supprimer

  try {
      const deleteQuery = 'DELETE FROM utilisateur WHERE id = ?';
      await pool.query(deleteQuery, [id]);
      res.status(200).json({ message: 'Utilisateur supprimé avec succès' });
  } catch (error) {
      console.error('Erreur lors de la suppression de l\'utilisateur:', error);
      res.status(500).json({ error: 'Une erreur est survenue lors de la suppression de l\'utilisateur.' });
  }
};

exports.Register = async (req, res) => {
    const { nom, email, mdp } = req.body;
    try {
        // Vérifier si l'utilisateur existe déjà
        const [users] = await pool.query('SELECT * FROM utilisateur WHERE email = ?', [email]);
        if (users.length > 0) {
            return res.status(400).json({ error: 'Cet utilisateur existe déjà.' });
        }

        // Hasher le mot de passe
        const hashedPassword = await bcrypt.hash(mdp, 10);

        // Insérer le nouvel utilisateur
        const insertUserQuery = 'INSERT INTO utilisateur (nom, email, mdp) VALUES (?, ?, ?)';
        const insertUserValues = [nom, email, hashedPassword];
        await pool.query(insertUserQuery, insertUserValues);

        // Créer et envoyer le token
        const token = jwt.sign({ email }, process.env.API_KEY, { expiresIn: '1h' });
        res.json({ token });

        console.log('Inscription réussie');
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Une erreur est survenue lors de l\'inscription.' });
    }
}


exports.Login = async (req, res) => {
    const { email, mdp } = req.body;
    try {
        // Récupérer l'utilisateur par email
        const [users] = await pool.query('SELECT * FROM utilisateur WHERE email = ?', [email]);
        if (users.length === 0) {
            return res.status(401).json({ error: 'Cet utilisateur non trouvé.' });
        }

        const user = users[0];

        // Vérifier le mot de passe
        const isPasswordValid = await bcrypt.compare(mdp, user.mdp);
        if (!isPasswordValid) {
            return res.status(401).json({ error: 'Mot de passe incorrect.' });
        }

        // Créer et envoyer le token
        const token = jwt.sign({
            userID: user.id,
            email: user.email,
            statut: user.statut
        }, process.env.API_KEY, { expiresIn: '1h' });

        res.json({ token, statut: user.statut });
    } catch (error) {
        console.error('Erreur lors de la connexion:', error);
        res.status(500).json({ error: 'Une erreur est survenue lors de la connexion.' });
    }
}

    

