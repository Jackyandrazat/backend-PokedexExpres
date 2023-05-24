const dbPool = require('../config/config');

const loginUser = async (email) => {
  const [rows] = await dbPool.execute('SELECT * FROM users WHERE email = ?', [email]);
    return rows[0];
};

module.exports = { loginUser };
