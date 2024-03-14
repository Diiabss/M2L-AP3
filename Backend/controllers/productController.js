const db = require('../database/database');

exports.getAllProducts = async (req, res) => {
    try{
        console.log("lancement de la requête d'affichage")
        const rows = await db.pool.query('Select * from products');
        console.log(rows);
        res.status(200).json(rows);
    } catch (error) {
        console.log('err');
    }
}; 

exports.NombreProduit = async (req, res) => {
    try{
        console.log("lancement de la requête d'affichage")
        const rows = await db.pool.query('Select count(*) from products');
        console.log(rows);
        res.status(200).json(rows);
    } catch (error) {
        console.log('err');
    }
}