/* eslint-disable no-undef */
const { pool } = require('../database/database');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.getAllUsers = async (req, res) => {
    try{
        console.log("lancement de la requête des utilisateurs")
        await pool.query('Select * from utilisateur;', function(err, rows, fields) {
            if (err) throw err;
            console.log(rows);
            res.status(200).json(rows);
        });

    } catch (error) {
        console.log('err'); 
    }
}

exports.updateUser = async (req, res) => {
  const { id } = req.params; // L'identifiant de l'utilisateur à modifier
  const { nom, email, mdp, statut } = req.body; // Les nouvelles valeurs, incluant le type d'utilisateur

  try {
      // Conditionnellement hasher le mot de passe s'il est fourni
      const hashedPassword = mdp ? await bcrypt.hash(mdp, 10) : undefined;

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
    try {
      const { nom, email, mdp } = req.body;
      try {
        const result = await pool.query('SELECT * FROM utilisateur WHERE email = ?', [email]);
        if (result.length > 0) {
          return res.status(400).json({ error: 'Cet utilisateur existe déjà.' });
        }
        const hashedPassword = await bcrypt.hash(mdp, 10);
        const insertUserQuery = 'INSERT INTO utilisateur (nom, email, mdp) VALUES (?, ?, ?)';
        const insertUserValues = [nom, email, hashedPassword];
        await pool.query(insertUserQuery, insertUserValues);
        const token = jwt.sign({ email }, process.env.API_KEY, { expiresIn: '1h' });

        res.json({ token });
      } catch (error) {
        console.log(error);
        throw error;
      }
      console.log('Inscription reussie');
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Une erreur est survenue lors de l\'inscription.' });
    }
  }

exports.Login = async (req, res) => {
    try {
        const { email, mdp } = req.body;
        pool.query('SELECT * FROM utilisateur WHERE email = ?', [email], async (err, rows) => {
            if (err) {
            console.error(err);
            return res.status(500).json({ error: 'Erreur lors de la connexion à la base de données.' });
            }
            if (rows.length === 0) {
                return res.status(401).json({ error: 'Cet utilisateur non trouvé.' });
            }
    
            const user = rows[0];
            const isPasswordValid = await bcrypt.compare(mdp, user.mdp);
            if (!isPasswordValid) {
                return res.status(401).json({ error: 'Mot de passe incorrect.' });
            }
    
            const token = jwt.sign({
                userID: user.id,
                email: user.email,
                statut: user.statut
            }, process.env.API_KEY, { expiresIn: '1h' });

            res.json({ token, statut: user.statut });
        });
        
    } catch (error) {
        console.error('Erreur lors de la connexion:', error);
        res.status(500).json({ error: 'Une erreur est survenue lors de la connexion.' });
    }
}
    

