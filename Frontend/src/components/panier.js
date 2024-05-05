import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import '../styles/panier.css';

function Panier() {
  const [articles, setArticles] = useState([]);
  const [total, setTotal] = useState(0);

  const chargerDetailsPanier = useCallback(async () => {
    try {
      const reponse = await axios.get('http://localhost:3000/api/panier/1'); // Supposons que l'ID du panier soit 1
      setArticles(reponse.data);
      calculerTotal(reponse.data);
    } catch (erreur) {
      console.error('Erreur lors de la récupération des détails du panier:', erreur);
    }
  }, []); // Assure-toi que toutes les dépendances externes de cette fonction sont incluses ici

  useEffect(() => {
    chargerDetailsPanier();
  }, [chargerDetailsPanier]);

  const calculerTotal = (articles) => {
    const total = articles.reduce((acc, article) => acc + (article.prix * article.Quantité), 0);
    setTotal(total);
  };

  const retirerArticle = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/api/panier/removeProduct/${id}`);
      chargerDetailsPanier();  // Rafraîchir la liste après la suppression
    } catch (erreur) {
      console.error('Erreur lors de la suppression de l\'article:', erreur);
    }
  };

  return (
    <div className='panier-container'>
      <h1>Panier</h1>
      <div className='liste-produits'>
        {articles.map(article => (
          <div className='panier' key={article.ID}>
            <div className='article'>
              <img src={article.image || 'chemin/vers/image/par/défaut.jpg'} alt='Produit' />
            </div>
            <h2>{article.nom_produit}</h2>
            <p>{article.description}</p>
            <p>{article.prix}€</p>
            <p>Quantité: {article.Quantité}</p>
            <button onClick={() => retirerArticle(article.ID)}>Supprimer</button>
          </div>
        ))}
        <div className='total'>
          <p>Total à payer : {total}€</p>
          <button>Passer la commande</button>
        </div>
      </div>
    </div>
  );
}

export default Panier;
