import React from 'react';
import monImage from '../assets/cycl.jpg';
import '../styles/accueil.css';

function Accueil() {
  return (
    <div className="accueil">
      <div className="image">
        <img src= {monImage} alt=""></img>
      </div> 
      <div className="description">
        <h1>Bienvenue sur notre site de passion du vélo en Lorraine</h1>
        <p>
          Le cyclisme est bien plus qu'un simple sport. C'est une passion qui nous unit et nous pousse à repousser nos limites.
          Avec notre site, nous souhaitons partager cette passion avec la population de la Lorraine et faire découvrir les merveilles du cyclisme.
        </p>
        <p>
          Que vous soyez un cycliste expérimenté ou que vous souhaitiez simplement vous initier à ce sport, notre site est là pour vous accompagner.
          Nous proposons des articles, des conseils, des itinéraires, des événements et bien plus encore pour vous aider à vivre pleinement votre passion pour le vélo.
        </p>
      </div>
    </div>
  );
}

export default Accueil;