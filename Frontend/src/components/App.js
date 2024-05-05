import { Route, Routes } from 'react-router-dom';
import '../styles/App.css';
import Nav from './nav'
import Accueil from './accueil';
import Produits from './produits';
import Inscription from './inscription';
import Connexion from './connexion';
import Panier from './panier';
import Admin from './admin';


function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Nav /> 
      </header>
      <Routes>
        <Route path="/" element={<Accueil />} />
        <Route path="/Admin" element={<Admin />} />
        <Route path="/Produits" element={<Produits />} />
        <Route path="/Inscription" element={<Inscription />} />
        <Route path="/Connexion" element={<Connexion />} />
        <Route path="/Panier" element={<Panier />} />
      </Routes>
    </div>
  );
}

export default App;
