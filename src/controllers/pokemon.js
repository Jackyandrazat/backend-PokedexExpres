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

const getAllPokemonsIdUser =  async (req, res) =>{
    // const {id_user} = req.params;
    const user = req.user;
    // console.log(req.user, 'data user')
    try {
        const [viewPokemonByid] = await pokemonModels.getMyPokemonById(user.userId);
        if (viewPokemonByid) {
            res.json({
              message: 'GET Pokemon by ID Success',
              data: viewPokemonByid
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
            data: data
        });
    } catch (error) {
        res.status(500).json({
            message: 'Server Error',
            error: error.message
        });
    }
}


//Section for My Pokemon Collection

const getAllMyPokemons =  async (req, res) =>{
    try {
        const [data] = await pokemonModels.getAllMyPokemon();
        // console.log("test", data);
        res.json({
            message: 'GET All My pokemons Success',
            data: data
        });
    } catch (error) {
        res.status(500).json({
            message: 'Server Error',
            error: error.message
        });
    }
} 

const addToMyPokemons = async (req, res) =>{
    const { id_pokemons } = req.body;
    const user = req.user
    console.log(user, 'sdasdsa')
    try {
      const userExists = await pokemonModels.findAddMypokemon(id_pokemons);
        if (userExists) {
        return res.status(409).json({ error: 'Pokemons already exists' });
        }
      const pokemon = await pokemonModels.addToMyPokemon(id_pokemons, user.userId);
      res.json({
        message: 'Add To My Pokemons Success',
        data: pokemon
      });
    } catch(error) {
      console.error('Error creating Pokemon', error);
      res.status(500).json({ error: 'Error creating Pokemon' });
      }
}

const findAddMypokemon = async (req, res) => {
    const { id_user } = req.body
    try {
        const userExists = await pokemonModels.findAddMypokemon(id_user);
        if (userExists) {
        return res.status(409).json({ error: 'Pokemons already exists' });
        }
        
    } catch (error) {
        console.error('Error creating Pokemon', error);
        res.status(500).json({ error: 'Error creating Pokemon' });
        
    }
}

const deleteMyPokemons = async (req, res) => {
    const { id } = req.params;
    try {
        await pokemonModels.deleteMyPokemon(id);
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
    deletePokemons,
    // My Pokemon
    getAllMyPokemons,
    addToMyPokemons,
    deleteMyPokemons,
    findAddMypokemon,
    getAllPokemonsIdUser

};