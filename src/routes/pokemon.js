const express = require('express');
const pokemonController = require('../controllers/pokemon.js');

const router = express.Router();

//Create --> POST
router.post('/', pokemonController.createNewPokemons);
router.post('/collection',);

//READ --> GET
router.get('/', pokemonController.getAllPokemons);
router.get('/collection',);

//READ --> GET Detail
router.get('/:id', pokemonController.getDetailPokemons);

//UPDATE --> PUT
router.put('/:id', pokemonController.updatePokemons);

//DELETE --> DELETE
router.delete('/:id', pokemonController.deletePokemons);
router.delete('/collection/:id',);




module.exports = router; 
