import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/produits.css';

function Produits() {
  const [produits, setProduits] = useState([]);

  useEffect(() => {
    // Appel Axios pour récupérer les produits du backend
    axios.get('http://localhost:3000/api/product/products')
      .then(response => {
        setProduits(response.data); // Mettre à jour l'état avec les produits récupérés
      })
      .catch(erreur => {
        console.error('Erreur lors de la récupération des produits:', erreur);
      });
  }, []);

  const ajouterAuPanier = (idProduit) => {
    const payload = {
      panierID: 0, // Supposons un ID de panier fixé pour l'exemple
      productID: idProduit,
      quantite: 1 // Supposons l'ajout d'un produit à la fois
    };
    axios.post('http://localhost:3000/api/panier/addProduct', payload)
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
                <img src={produit.image} alt="produit"/>
              </div>
              <div className='prix'><p>{produit.prix}€</p></div>
              <div className='descriptions'>
                <h2>{produit.nom_produit}</h2>
                <p>{produit.description}</p>
                <button onClick={() => ajouterAuPanier(produit.ID)}>Ajouter au panier</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Produits;
