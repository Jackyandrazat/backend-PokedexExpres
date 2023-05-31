const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const authModel = require('../models/auth');

const loginUsers = async (req, res) => {
  const { email, password } = req.body;

  console.log("test",email, password);

  try {
    // Cari pengguna berdasarkan email
    const user = await authModel.loginUser(email);
    console.log("user:",user);

    if (!user) {
      return res.status(404).json({ message: 'Pengguna tidak ditemukan' });
    }

    // Verifikasi kata sandi pengguna
    if (!password) {
      return res.status(400).json({ message: 'Nama pengguna dan kata sandi diperlukan' });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    console.log("test password", isPasswordValid);

    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Kata sandi tidak valid' });
    }

    // Jika verifikasi berhasil, buat token otentikasi menggunakan jsonwebtoken
    const token = jwt.sign({ userId: user.id }, 'secret-key', { expiresIn: '1h' });

    // Kirim token sebagai respons
    res.json({ token,
      id: user.id,
    });
  } catch (err) {
    console.error('Terjadi kesalahan saat melakukan login:', err);
    res.status(500).json({ message: 'Terjadi kesalahan saat melakukan login' });
  }
};

module.exports = { loginUsers };
