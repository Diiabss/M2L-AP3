const requete = require('supertest');
const app = require('../server');

describe('Test user GET', () => {
    it('Affichage de tous les utilisateurs', async () => {
        const reponse = await requete(app).get('/api/user/users');
        expect(reponse.status).toEqual(200);
    });
})

describe('Test user POST connexion', () => {
    it('Connexion d\'un utilisateur', async () => {
        const reponse = await requete(app).post('/api/user/connexion').send({ email: 'moi@moi.fr', mdp: 'moi' });
        expect(reponse.status).toEqual(200);
    });
})

describe('Test user POST inscription', () => {
    it('Inscription d\'un utilisateur', async () => {
        const reponse = await requete(app).post('/api/user/inscription').send({ nom: 'test', email: 'test@test.fr', mdp: 'test' });
        expect(reponse.status).toEqual(200);
    });
})

