const express = require('express');
const pokemonController = require('../controllers/pokemon.js');

// const auth = require('../middleware/authMiddleware.js');
const authenticateToken = require('../middleware/authMiddleware');


const router = express.Router();

//Create --> POST
router.post('/', authenticateToken, pokemonController.createNewPokemons);
router.post('/collection', authenticateToken, pokemonController.addToMyPokemons);

//READ --> GET
router.get('/', authenticateToken, pokemonController.getAllPokemons);
// router.get('/collection',pokemonController.getAllMyPokemons);
router.get('/collection',authenticateToken, pokemonController.getAllPokemonsIdUser);

//READ --> GET Detail
router.get('/:id', pokemonController.getDetailPokemons);

//UPDATE --> PUT
router.put('/:id', pokemonController.updatePokemons);

//DELETE --> DELETE
router.delete('/:id', pokemonController.deletePokemons);
router.delete('/collection/:id',pokemonController.deleteMyPokemons);




module.exports = router; 
