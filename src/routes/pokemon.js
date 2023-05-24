const express = require('express');
const pokemonController = require('../controllers/pokemon.js');

const router = express.Router();

//Create --> POST
router.post('/', pokemonController.createNewPokemons);

//READ --> GET
router.get('/', pokemonController.getAllPokemons);

//READ --> GET Detail
router.get('/:id', pokemonController.getDetailPokemons);

//UPDATE --> PUT
router.put('/:id', pokemonController.updatePokemons);

//DELETE --> DELETE
router.delete('/:id', pokemonController.deletePokemons);




module.exports = router; 
