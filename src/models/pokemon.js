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

module.exports = {
    getAllPokemon,
    getDetailPokemon,
    createNewPokemon,
    updatePokemon,
    deletePokemon
}