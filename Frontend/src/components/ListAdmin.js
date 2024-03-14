import React, { useState, useEffect } from 'react';
import axios from 'axios';

function AdminList() {
    const [admins, setAdmins] = useState([]);

    useEffect(() => {
        async function fetchAdmins() {
            try {
                const response = await axios.get('/api/admins');
                setAdmins(response.data.admins);
            } catch (error) {
                console.error('Error fetching admins:', error);
            }
        }

        fetchAdmins();
    }, []);

    return (
        <div>
            <h2>Liste des administrateurs</h2>
            <ul>
                {admins.map(admin => (
                    <li key={admin.id}>{admin.name}</li>
                ))}
            </ul>
        </div>
    );
}

export default AdminList;
