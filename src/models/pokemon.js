const dbPool = require ('../config/config')

const getAllPokemon = async () => {
    const sqlQuery = 'SELECT * FROM pokemons'
    return dbPool.execute(sqlQuery);
}

const getDetailPokemon = async (id) => {
    const sqlQuery = `SELECT * FROM pokemons WHERE id = ${id}`
        return dbPool.execute(sqlQuery);
}

const createNewPokemon = async (body) => {
    const sqlQuery = `INSERT INTO pokemons (name_pokemon, type_pokemon, ability_pokemon, desckripsi_pokemon) 
                        VALUES ('${body.name_pokemon}','${body.type_pokemon}','${body.ability_pokemon}','${body.desckripsi_pokemon}')`
    
        return dbPool.execute(sqlQuery)
}

const updatePokemon = async (body, id) => {
    const sqlQuery = `UPDATE pokemons 
                        SET name_pokemon = '${body.name_pokemon}', type_pokemon = '${body.type_pokemon}', ability_pokemon = '${body.ability_pokemon}', desckripsi_pokemon = '${body.desckripsi_pokemon}' 
                        WHERE id = ${id}`
    
    return dbPool.execute(sqlQuery)
}

const deletePokemon = async (id) => {
    const sqlQuery = `DELETE FROM pokemons WHERE id = ${id}`
    
    return dbPool.execute(sqlQuery)
}

// Section for Collection My Pokemon

const getAllMyPokemon = async () => {
    const sqlQuery = 'SELECT * FROM my_pokemons'
    return dbPool.execute(sqlQuery);
}

const addToMyPokemon = async (id_pokemons, id_user) =>{
    const [result] = await db.execute('INSERT INTO my_pokemons (id_pokemons, id_user) VALUES (?, ?)', [type, level]);
    const id = result.insertId;
    return { id, id_pokemons, id_user };
}

module.exports = {
    getAllPokemon,
    getDetailPokemon,
    createNewPokemon,
    updatePokemon,
    deletePokemon,
    //MyPokemon
    getAllMyPokemon,
    addToMyPokemon,
}