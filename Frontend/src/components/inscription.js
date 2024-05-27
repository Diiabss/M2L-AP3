import React, {useState} from "react";
import axios from "axios";
import "../styles/inscription.css";


function Inscription() {
  const [formData, setFormData] = useState({
    nom: "",
    email: "",
    mdp: ""
  })

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value
    })
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post("http://192.168.1.18:3000/api/user/inscription", formData);
      console.log('Inscription réussie',response.data);
    } catch (error) {
      console.error('Erreur lors de l\'inscription',error);
    }
  }

  return (
    <div className="container1">
    <div className="inscription">
      <h1>Inscription</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="nom">Nom</label>
          <input type="text" id="nom" name="nom" onChange={handleChange} />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input type="email" id="email" name="email" onChange={handleChange} />
        </div>
        <div className="form-group">
          <label htmlFor="motDePasse">Mot de passe</label>
          <input type="password" id="motDePasse" name="mdp" onChange={handleChange} />
        </div>
        <button type="submit" id="button">S'inscrire</button>
      </form>
    </div>
    </div>
  );
}

export default Inscription;