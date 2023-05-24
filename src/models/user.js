const bcrypt = require('bcryptjs');
const dbPool = require ('../config/config')


const getAllUsers = async () => {
    const sqlQuery = 'SELECT * FROM users'
    
   return dbPool.execute(sqlQuery)
}

const findByEmail = async (email) => {
  const [rows] = await dbPool.execute('SELECT * FROM users WHERE email = ?', [email]);
    return rows[0];
};

const createNewUsers = async (email,password) => {
    const hashedPassword = await bcrypt.hash(password, 10);
    const [result] = await dbPool.execute('INSERT INTO users (email, password) VALUES (?, ?)', [
      email,
      hashedPassword,
    ]);
    const id = result.insertId;
    return { id, email };
  }

const updateUsers = async (body, id) => {
    const sqlQuery = `UPDATE users 
                        SET name = '${body.name}', email = '${body.email}', password = '${body.password}' 
                        WHERE id = ${id}`
    
    return dbPool.execute(sqlQuery)
}

const deleteUsers = (id) => {
    const sqlQuery = `DELETE FROM users WHERE id = ${id}`
    
    return dbPool.execute(sqlQuery)
}

module.exports = {
    getAllUsers,
    findByEmail,
    createNewUsers,
    updateUsers,
    deleteUsers
};