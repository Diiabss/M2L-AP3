import React, { useState } from 'react';
import axios from 'axios';
import '../styles/connexion.css';

function Connexion() {
  const [email, setEmail] = useState('');
  const [mdp, setMotDePasse] = useState('');


  const handleChangeEmail = (event) => {
    setEmail(event.target.value);
  };

  const handleChangeMotDePasse = (event) => {
    setMotDePasse(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post("http://localhost:3000/api/user/connexion", {
        email: email,
        mdp: mdp
      });

      console.log('Connexion réussie', response.data);
      
    } catch (error) {
      console.error('Erreur lors de la connexion', error);
      
    }
  };

  return (
    <div className="container1">
      <div className="connexion">
        <h1>Connexion</h1> 
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input type="email" id="email" value={email} onChange={handleChangeEmail} />
          </div>
          <div className="form-group">
            <label htmlFor="motDePasse">Mot de passe</label>
            <input type="password" id="motDePasse" value={mdp} onChange={handleChangeMotDePasse} />
          </div>
          <button type="submit">Se connecter</button>
        </form>
      </div>
    </div>
  );
}

export default Connexion;
