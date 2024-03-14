const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

router.get('/users', userController.getAllUsers);
router.post('/connexion', userController.Login);
router.post('/inscription', userController.Register);


module.exports = router;