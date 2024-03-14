import React from 'react';
import '../styles/panier.css';
import velo from '../assets/velo.jpg';

function Panier() {
  return (
    <div className='panier-container'>
      <h1>Panier</h1>
      <div className='liste-produits'>
        <div className='panier'>
          <div className='article'>
            <img src={velo} alt='Velo' />
          </div>
            <h2>Speedy</h2>
            <p>Vélo de course</p>
            <p>499€</p>  
            <button>Supprimer</button>
        </div>
      <div className='total'>
        <p>Total à payer : 499€</p>
        <button>Passer la commande</button>
      </div>
    </div>
    </div>
  );
}

export default Panier;