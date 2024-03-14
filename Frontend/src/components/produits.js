import React from 'react';
import '../styles/produits.css';

function Produits() {
  const velo = require('../assets/velo.jpg');
  const tenue = require('../assets/tenue.jpg');
  const casque = require('../assets/casque.jpg');
  const lunette = require('../assets/lunettes.jpg');
  const gourde = require('../assets/gourde.jpg');
  const lumiere = require('../assets/eclairage.jpg');

  return (
    <div className="container">
    <div className="produits">
      <h1>Produits</h1>
      <div className="galerie">
        <div className="produit">
          <div className='images'>
            <img src={velo} alt="Velo"/>
          </div>
          <div className='prix'><p>499€</p></div>
          <div className='descriptions'>
              <h2>Speedy</h2>
              <p>Vélo de course.</p>
              <p>Performance, confort, exploration.</p>
              <button>Ajouter au panier</button>
          </div>
        </div>
        <div className="produit">
          <div className='images'>
            <img src={tenue} alt="Tenue"/>
          </div>
          <div className='prix'><p>119.99€</p></div>
          <div className='descriptions'>
              <h2>TxC</h2>
              <p>Tenue de sport.</p>
              <p>Style, confort, securité.</p>
              <button>Ajouter au panier</button>
          </div>
        </div>
        <div className="produit">
          <div className='images'>
            <img src={casque} alt="Casque"/>
          </div>
          <div className='prix'><p>89.99€</p></div>
          <div className='descriptions'>
              <h2>Gird</h2>
              <p>Casque de cyclisme. </p>
              <p>Sécurité, légèreté, ventilation. </p>
              <button>Ajouter au panier</button>
          </div>
        </div>
        <div className="produit">
          <div className='images'>
            <img src={lunette} alt="Lunette"/>
          </div>
          <div className='prix'><p>49.99€</p></div>
          <div className='descriptions'>
              <h2>Van</h2>
              <p>Lunettes. </p> 
              <p>Protection UV, clarté, confort. </p>
              <button>Ajouter au panier</button>
          </div>
        </div>
        <div className="produit">
          <div className='images'>
            <img src={gourde} alt="Gourde" id='gourde'/>
          </div>
          <div className='prix'><p>9.99€</p></div>
          <div className='descriptions'>
              <h2>R750</h2>
              <p>Gourde en plastique. </p>
              <p>Hydratation, praticité, durabilité. </p>
              <button>Ajouter au panier</button>
          </div>
        </div>
        <div className="produit">
          <div className='images'>
            <img src={lumiere} alt="Lumière"/>
          </div>
          <div className='prix'><p>39.99€</p></div>
          <div className='descriptions'>
              <h2>VLP</h2>
              <p>Lumière avant et arrière. </p>
              <p>Visibilité, sécurité, luminosité. </p>
              <button>Ajouter au panier</button>
          </div>
        </div>
      </div>
    </div>
  </div>
  );
}

export default Produits;