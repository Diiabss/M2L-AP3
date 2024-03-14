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
        await pool.query('SELECT * FROM utilisateur WHERE email = ?', [email], async function(err, rows, fields) {
            if (err) throw err;            
            if (rows.length === 0) {
              return res.status(401).json({ error: 'Cet utilisateur non trouvé.' });
          } 
          const user = rows[0];
  
          const isPasswordValid = await bcrypt.compare(mdp, user.mdp);
          if (!isPasswordValid) {
              return res.status(401).json({ error: 'Mot de passe incorrect.' });
          }
          const token = jwt.sign({ email }, process.env.API_KEY, { expiresIn: '1h' });
          res.json({ token }); 
        });
        console.log('Connexion reussie');
        
    } catch {
        res.status(500).json({ error: 'Une erreur est survenue lors de la connexion.' });
    }
}

exports.AdminUser = async (req, res) => {
    try{
        const rows = await db.pool.query('Select * from utilisateur where type_utilisateur = "admin";');
        res.status(200).json(rows);
    } catch (error) {
        console.log('err');
    }
}