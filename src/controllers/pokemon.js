const pokemonModels = require('../models/pokemon')


const getAllPokemons =  async (req, res) =>{
    try {
        const [data] = await pokemonModels.getAllPokemon();
        // console.log("test" , data);
        res.json({
            message: 'GET All pokemons Success',
            data: data
        });
    } catch (error) {
        res.status(500).json({
            message: 'Server Error',
            error: error.message
        });
    }
}

const getDetailPokemons = async (req, res) => {
    const {id} = req.params;
    try {
        const [pokemon] = await pokemonModels.getDetailPokemon(id);
        if (pokemon) {
            res.json({
              message: 'GET Pokemon by ID Success',
              data: pokemon
            });
          } else {
            res.status(404).json({
              message: 'Pokemon not found'
            });
          }
    } catch (error) {
        res.status(500).json({
            message: 'Server Error',
            error: error.message
        });
    }    

}

const createNewPokemons = async (req, res) => {
    const bodyPayload = req.body;
    
    // if (!body.name_pokemon || !body.type_pokemon || !body.ability_pokemon || !body.desckripsi_pokemon ) {
    //     return res.status(400).json({
    //         message: 'Please fill all fields',
    //         error: 'Please fill all fields',
    //         data : null
    //     })
    // }
    try {
        await pokemonModels.createNewPokemon(bodyPayload);
        res.status(201).json({
            message: 'Create New Pokemons Success',
            // Mengirimkan data dummy berdasarkan request body
            data: bodyPayload
        });
    } catch (error) {
        res.status(500).json({
            message: 'Server Error',
            error: error.message
        });
    }
}

const updatePokemons = async (req, res) => {
    const {id} = req.params;
    const {body} = req;

    try {
        await pokemonModels.updatePokemon(body, id);
        res.json({
            message: 'Update Pokemon Success',
            data:{
                id: id,
                ...body //spread operator
            }
        });
    } catch (error) {
        res.status(500).json({
            message: 'Server Error',
            error: error.message
        });
    }    

}

const deletePokemons = async (req, res) => {
    const { id } = req.params;
    try {
        await pokemonModels.deletePokemon(id);
        res.json({
            message: 'Delete Pokemon Success',
            data: null
        });
    } catch (error) {
        res.status(500).json({
            message: 'Server Error',
            error: error.message
        });
    }
}

module.exports = {
    getAllPokemons,
    getDetailPokemons,
    createNewPokemons,
    updatePokemons,
    deletePokemons
};