import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import '../styles/panier.css';

function Panier() {
  const [articles, setArticles] = useState([]);
  const [total, setTotal] = useState(0);
  const userID = 1; // ID utilisateur fixe pour cet exemple
 
  const chargerDetailsPanier = useCallback(async () => {
    try {
      const reponse = await axios.get(`http://localhost:3000/api/panier/${userID}`);
      const articlesAvecDetails = reponse.data.map(article => ({
        ...article,
        image: article.image ? `data:image/jpeg;base64,${article.image}` : 'chemin/vers/image/par/défaut.jpg'
      }));
      setArticles(articlesAvecDetails);
      calculerTotal(articlesAvecDetails);
    } catch (erreur) {
      console.error('Erreur lors de la récupération des détails du panier:', erreur);
    }
  }, [userID]);

  useEffect(() => {
    chargerDetailsPanier();
  }, [chargerDetailsPanier]);

  const calculerTotal = (articles) => {
    const totalCalculé = articles.reduce((acc, article) => acc + (article.prix * article.Quantité), 0);
    setTotal(totalCalculé);
  };

  const supprimerDuPanier = (produitID) => {
    axios.delete(`http://localhost:3000/api/panier/delete/${produitID}`)
      .then(response => {
          alert('Produit retiré du panier!');
          // Mettre à jour l'état local pour supprimer l'article sans recharger toute la liste
          const articlesMisAJour = articles.filter(article => article.produitID !== produitID);
          setArticles(articlesMisAJour);
          calculerTotal(articlesMisAJour);
      })
      .catch(erreur => {
          console.error('Erreur lors de la suppression du produit du panier:', erreur);
      });
  };

  return (
    <div className='panier-container'>
      <h1>Panier</h1>
      <div className='liste-produits'>
        {articles.map(article => (
          <div className='panier' key={article.produitID}>
            <div className='article'>
              <img src={article.image} alt={article.nom_produit} />
            </div>
            <h2>{article.nom_produit}</h2>
            <p>{article.description}</p>
            <p>{article.prix}€</p>
            <p>Quantité: {article.Quantité}</p>
            <button onClick={() => supprimerDuPanier(article.produitID)}>Retirer du panier</button>
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
