import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/produits.css';

function Produits() {
  const [produits, setProduits] = useState([]);

  useEffect(() => {
    // Appel Axios pour récupérer les produits du backend
    axios.get('http://192.168.1.31:3000/api/product/products')
    .then(response => {
      console.log(response.data); 
      const produitsAvecImage = response.data.map(produit => {
        return {
          ...produit,
          image: produit.image ? `data:image/jpeg;base64,${produit.image}` : null
        };
      });
      setProduits(produitsAvecImage);
    })
    .catch(erreur => {
      console.error('Erreur lors de la récupération des produits:', erreur);
    });  
  }, []);

  const ajouterAuPanier = (produitID) => {
    console.log("Produit ID envoyé:", produitID); // Ajouter cette ligne pour déboguer

    const payload = {
        id: 1,  // Assurez-vous que cet ID utilisateur est correct et valide
        produitID: produitID,
        quantite: 1
    };

    axios.post('http://192.168.1.31:3000/api/panier/addProduct', payload)
      .then(response => {
          alert('Produit ajouté au panier!');
      })
      .catch(erreur => {
          console.error('Erreur lors de l\'ajout du produit au panier:', erreur);
      });
};


  return (
    <div className="container">
      <div className="produits">
        <h1>Produits</h1>
        <div className="galerie">
          {produits.map((produit, index) => (
            <div key={index} className="produit">
              <div className='images'>
                <img src={produit.image} alt={produit.nom_produit} />
              </div>
              <div className='prix'><p>{produit.prix}€</p></div>
              <div className='descriptions'>
                <h2>{produit.nom_produit}</h2>
                <p>{produit.description}</p>
                <button onClick={() => ajouterAuPanier(produit.produitID)}>Ajouter au panier</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div> 
  );
}

export default Produits;
