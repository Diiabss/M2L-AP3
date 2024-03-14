// utilisateur.js
import '../styles/utilisateur.css';

function Utilisateur() {
    return (
        <div className="container2">
            <div className="utilisateur">
               <table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Nom</th>
                            <th>Prénom</th>
                            <th>Email</th>
                            <th>Statut</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>1</td>
                            <td>Ahmd</td>
                            <td>Abdi</td>
                            <td>aahmd@gmail.com</td>
                            <td>Admin</td>
                            <td>
                                <button className='btn1'>Modifier</button>
                                <button className='btn2'>Supprimer</button>
                            </td>
                        </tr>
                        <tr>
                            <td>3</td>
                            <td>effd</td>
                            <td>aaa</td>
                            <td>test@test.com</td>
                            <td>Utilisateur</td>
                            <td>
                                <button className='btn1'>Modifier</button>
                                <button className='btn2'>Supprimer</button>
                            </td>
                        </tr>
                        <tr>
                            <td>4</td>
                            <td>Azr</td>
                            <td>Joe</td>
                            <td>joe@yahoo.com</td>
                            <td>Utilisateur</td>
                            <td>
                                <button className='btn1'>Modifier</button>
                                <button className='btn2'>Supprimer</button>
                            </td>
                        </tr>
                        <tr>
                            <td>6</td>
                            <td>plaa</td>
                            <td>taa</td>
                            <td>oplomo@example.com</td>
                            <td>Utilisateur</td>
                            <td>
                                <button className='btn1'>Modifier</button>
                                <button className='btn2'>Supprimer</button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default Utilisateur;