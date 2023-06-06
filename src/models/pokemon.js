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
    const sqlQuery = `INSERT INTO pokemons (name_pokemon, type_pokemon, ability_pokemon, desckripsi_pokemon, avatar_url) 
                        VALUES ('${body.name_pokemon}','${body.type_pokemon}','${body.ability_pokemon}','${body.desckripsi_pokemon}','${body.avatar_url}')`
    
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
    const sqlQuery = `SELECT my_pokemons.id, pokemons.id pokemons_id , pokemons.name_pokemon, pokemons.type_pokemon, pokemons.ability_pokemon, pokemons.desckripsi_pokemon, 
    pokemons.avatar_url FROM my_pokemons JOIN pokemons ON my_pokemons.id_pokemons = pokemons.id`
    return dbPool.execute(sqlQuery);
}

const getMyPokemonById = async (id_user) => {
    console.log(id_user, 'idddddd')
    const sqlQuery = `SELECT my_pokemons.id, users.id AS id_user, pokemons.id AS pokemons_id, pokemons.name_pokemon, pokemons.type_pokemon, 
    pokemons.ability_pokemon, pokemons.desckripsi_pokemon, pokemons.avatar_url 
    FROM my_pokemons 
    JOIN pokemons ON my_pokemons.id_pokemons = pokemons.id JOIN users ON my_pokemons.id_user = users.id
    WHERE my_pokemons.id_user = ?`; // Menambahkan klausa WHERE dengan menggunakan placeholder ?
  
    return dbPool.execute(sqlQuery, [id_user]); // Menggunakan parameter id pada array sebagai nilai placeholder
  };
  

const addToMyPokemon = async (id_pokemons, id_user) =>{
    const [result] = await dbPool.execute('INSERT INTO my_pokemons (id_pokemons, id_user) VALUES (?, ?)', [id_pokemons, id_user]);
    const id = result.insertId;
    return { id, id_pokemons, id_user };
}

const deleteMyPokemon = async (id) =>{
    const sqlQuery = `DELETE FROM my_pokemons where id = ${id}`
    return dbPool.execute(sqlQuery);
}

const findAddMypokemon = async (id_pokemons) => {
    const [rows] = await dbPool.execute('SELECT * FROM my_pokemons WHERE id_pokemons = ?', [id_pokemons]);
    return rows[0];
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
    deleteMyPokemon,
    findAddMypokemon,
    getMyPokemonById
}