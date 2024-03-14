import '../styles/nav.css'
import logo from '../assets/m2l.png'
import { Link } from 'react-router-dom'
import React from 'react';
import panier from '../assets/panier.png'
import conn from '../assets/connexion.png'

function Nav() {
    return (
    <header>
        <div className='logo'>
            <img src={logo}  alt='Logo'/>
        </div>
        <nav>
                <ul className='links'>
                <li><Link to="/">Acceuil</Link></li>
                <li><Link to="/utilisateur" >Utilisateurs</Link></li>
                <li><Link to="/produits" >Produits</Link></li>
                <li><Link to="/inscription" >Inscription</Link></li>
                <li><Link to="/connexion" ><img src={conn}  alt='Connexion'/></Link></li>
                <li><Link to="/panier" ><img src={panier}  alt='Panier'/></Link></li>
                </ul>
        </nav>
    </header> 
    ) 
}

export default Nav 