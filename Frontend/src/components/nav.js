import '../styles/nav.css';
import logo from '../assets/m2l.png';
import panier from '../assets/panier.png';
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Nav() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isAdmin, setIsAdmin] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        // Vérifier si un token est stocké et le statut de l'utilisateur
        const token = localStorage.getItem('token');
        const statut = localStorage.getItem('statut');
        setIsLoggedIn(!!token);
        setIsAdmin(statut === '1'); // Assumer que '1' indique un administrateur
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('statut');
        setIsLoggedIn(false);
        setIsAdmin(false);
        navigate('/');
    };

    return (
        <header>
            <div className='logo'>
                <img src={logo} alt='Logo'/>
            </div>
            <nav>
                <ul className='links'>
                    <li><Link to="/">Acceuil</Link></li>
                    {isAdmin && <li><Link to="/utilisateur">Utilisateurs</Link></li>}
                    <li><Link to="/produits">Produits</Link></li>
                    <li><Link to="/inscription">Inscription</Link></li>
                    {!isLoggedIn ? (
                        <li><Link to="/connexion">Connexion</Link></li>
                    ) : (
                        <li><Link to="/" onClick={handleLogout}> Déconnexion </Link></li>
                    )}
                    <li><Link to="/panier"><img src={panier} alt='Panier'/></Link></li>
                </ul>
            </nav>
        </header> 
    ); 
}

export default Nav;
