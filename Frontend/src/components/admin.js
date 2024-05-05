import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/utilisateur.css';

function Admin() {
    const [utilisateurs, setUtilisateurs] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentUser, setCurrentUser] = useState(null);

    useEffect(() => {
        fetchUtilisateurs();
    }, []);

    const fetchUtilisateurs = async () => {
        try {
            const response = await axios.get('http://localhost:3000/api/user/users');
            setUtilisateurs(response.data);
        } catch (error) {
            console.error('Erreur lors de la récupération des utilisateurs:', error);
        }
    };

    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:3000/api/user/delete/${id}`);
            fetchUtilisateurs();  // Rafraîchir la liste après la suppression
        } catch (error) {
            console.error('Erreur lors de la suppression de l\'utilisateur:', error);
        }
    };

    const handleUpdate = (user) => {
        setCurrentUser(user);
        setIsModalOpen(true);
    };

    const handleSaveChanges = async () => {
        try {
            const { id, nom, email, statut } = currentUser;
            await axios.put(`http://localhost:3000/api/user/update/${id}`, {
                nom,
                email,
                statut
            });
            fetchUtilisateurs();
            setIsModalOpen(false);
        } catch (error) {
            console.error('Erreur lors de la mise à jour de l\'utilisateur:', error);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setCurrentUser(prev => ({ ...prev, [name]: value }));
    };

    return (
        <div className="container2">
            <div className="utilisateur">
            <h1>Liste des utilisateurs</h1>
               <table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Nom</th>
                            <th>Email</th>
                            <th>Statut</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {utilisateurs.map(user => (
                            <tr key={user.id}>
                                <td>{user.id}</td>
                                <td>{user.nom}</td>
                                <td>{user.email}</td>
                                <td>{user.statut === 1 ? 'Admin' : 'Utilisateur'}</td>
                                <td>
                                    <button className='btn1' onClick={() => handleUpdate(user)}>Modifier</button>
                                    <button className='btn2' onClick={() => handleDelete(user.id)}>Supprimer</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                {isModalOpen && (
                    <div className="modal">
                    <div className="modal-content">
                    <span className="close" onClick={() => setIsModalOpen(false)}>&times;</span>
                    <form>
                        <label>Nom: <input type="text" name="nom" value={currentUser.nom} onChange={handleChange} /></label>
                        <label>Email: <input type="email" name="email" value={currentUser.email} onChange={handleChange} /></label>
                        <label>Statut: 
                        <select name="statut" value={currentUser.statut} onChange={handleChange}>
                            <option value="1">Admin</option>
                            <option value="0">Utilisateur</option>
                        </select>
                    </label>
                    <button type="button" onClick={handleSaveChanges}>Enregistrer les modifications</button>
                </form>
            </div>

            <div className="gestion-produits">
                <h2>Gestion des produits</h2>
                
            </div>
        </div>
    )}
    </div>
    </div>
);
}

export default Admin;
