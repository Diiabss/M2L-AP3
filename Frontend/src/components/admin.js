import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/utilisateur.css';

function Admin() {
    const [utilisateurs, setUtilisateurs] = useState([]);
    const [products, setProducts] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentUser, setCurrentUser] = useState(null);
    const [currentProduct, setCurrentProduct] = useState({ nom_produit: '', description: '', prix: '', stock: '' });
    const [isProductModalOpen, setIsProductModalOpen] = useState(false);

    useEffect(() => {
        fetchUtilisateurs();
        fetchProducts();
    }, []);

    const fetchUtilisateurs = async () => {
        try {
            const response = await axios.get('http://192.168.1.18:3000/api/user/users');
            setUtilisateurs(response.data);
        } catch (error) {
            console.error('Erreur lors de la récupération des utilisateurs:', error);
        }
    };

    const fetchProducts = async () => {
        try {
            const response = await axios.get('http://192.168.1.18:3000/api/product/products');
            setProducts(response.data);
        } catch (error) {
            console.error('Erreur lors de la récupération des produits:', error);
        }
    };

    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://192.168.1.18:3000/api/user/delete/${id}`);
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
            await axios.put(`http://192.168.1.18:3000/api/user/update/${id}`, {
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

    const handleAddProduct = async (event) => {
        event.preventDefault();
        try {
            await axios.post('http://192.168.1.18:3000/api/product/products', currentProduct);
            fetchProducts();
            setCurrentProduct({ nom_produit: '', description: '', prix: '', stock: '' });
        } catch (error) {
            console.error("Erreur lors de l'ajout du produit:", error);
        }
    };

    const handleUpdateProduct = (product) => {
        setCurrentProduct(product);
        setIsProductModalOpen(true);
    };

    const handleSaveChangesProduct = async () => {
        try {
            const { id, nom_produit, description, prix, stock } = currentProduct;
            await axios.put(`http://192.168.1.18:3000/api/product/products/${id}`, {
                nom_produit,
                description,
                prix,
                stock
            });
            fetchProducts();
            setIsProductModalOpen(false);
        } catch (error) {
            console.error('Erreur lors de la mise à jour du produit:', error);
        }
    };

    const handleDeleteProduct = async (id) => {
        try {
            await axios.delete(`http://192.168.1.18:3000/api/product/products/${id}`);
            fetchProducts();
        } catch (error) {
            console.error('Erreur lors de la suppression du produit:', error);
        }
    };

    const handleChangeProduct = (e) => {
        const { name, value } = e.target;
        setCurrentProduct(prev => ({ ...prev, [name]: value }));
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
                    </div>
                )}
            </div>

            <div className="gestion-produits">
                <h1>Gestion des produits</h1>
                <table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Nom</th>
                            <th>Description</th>
                            <th>Prix</th>
                            <th>Stock</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.map(product => (
                            <tr key={product.produitID}>
                                <td>{product.produitID}</td>
                                <td>{product.nom_produit}</td>
                                <td>{product.description}</td>
                                <td>{product.prix}</td>
                                <td>{product.stock}</td>
                                <td>
                                    <button className='btn1' onClick={() => handleUpdateProduct(product)}>Modifier</button>
                                    <button className='btn2' onClick={() => handleDeleteProduct(product.produitID)}>Supprimer</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                {isProductModalOpen && (
                    <div className="modal">
                        <div className="modal-content">
                            <span className="close" onClick={() => setIsProductModalOpen(false)}>&times;</span>
                            <form onSubmit={handleSaveChangesProduct}>
                                <div className="form-groupAdmin">
                                    <label htmlFor="nom_produit">Nom du produit:</label>
                                    <input type="text" id="nom_produit" name="nom_produit" placeholder="Entrez le nom du produit" value={currentProduct.nom_produit} 
                                    onChange={handleChangeProduct} 
                                    required />
                                </div>
                                <div className="form-groupAdmin">
                                    <label htmlFor="description">Description:</label>
                                    <input type="text" id="description" name="description" placeholder="Description du produit" value={currentProduct.description} 
                                    onChange={handleChangeProduct} required />
                                </div>
                                <div className="form-groupAdmin">
                                    <label htmlFor="prix">Prix (€):</label>
                                    <input type="number" id="prix" name="prix" placeholder="Prix en euros" value={currentProduct.prix} 
                                        onChange={handleChangeProduct} required min="0"/>
                                </div>
                                <div className="form-groupAdmin">
                                    <label htmlFor="stock">Stock:</label>
                                    <input type="number" id="stock" name="stock" placeholder="Quantité en stock" value={currentProduct.stock} 
                                        onChange={handleChangeProduct}  required min="0"/>
                                </div>
                                <button type="submit" style={{ width: '30%' }}>Mettre à jour</button>
                            </form>
                        </div>
                    </div>
                )}
                <form onSubmit={handleAddProduct}>
                    <input type="text" placeholder="Nom du produit" name="nom_produit" value={currentProduct.nom_produit} onChange={handleChangeProduct} required />
                    <input type="text" placeholder="Description" name="description" value={currentProduct.description} onChange={handleChangeProduct} required />
                    <input type="number" placeholder="Prix" name="prix" value={currentProduct.prix} onChange={handleChangeProduct} required />
                    <input type="number" placeholder="Stock" name="stock" value={currentProduct.stock} onChange={handleChangeProduct} required />
                    <button type="submit">Ajouter Produit</button>
                </form>
            </div>
        </div>
    );
}

export default Admin;
