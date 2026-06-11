const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const register = async ({ name, email, password }) => {
  if (!name || !email || !password) {
    throw { status: 400, message: 'Todos os campos são obrigatórios' };
  }

  if (password.length < 6) {
    throw { status: 400, message: 'A senha deve ter no mínimo 6 caracteres' };
  }

  const existingUser = await User.findOne({ where: { email } });
  if (existingUser) {
    throw { status: 400, message: 'Este e-mail já está cadastrado' };
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await User.create({
    name,
    email,
    password: hashedPassword,
  });

  return { message: 'Usuário criado com sucesso' };
};

const login = async ({ email, password }) => {
  if (!email || !password) {
    throw { status: 400, message: 'E-mail e senha são obrigatórios' };
  }

  const user = await User.findOne({ where: { email } });
  if (!user) {
    throw { status: 401, message: 'E-mail ou senha incorretos' };
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    throw { status: 401, message: 'E-mail ou senha incorretos' };
  }

  const token = jwt.sign(
    { id: user.id },
    process.env.JWT_SECRET || 'taskflow_secret_key_123456789',
    { expiresIn: '7d' }
  );

  return {
    token,
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
    },
  };
};

module.exports = {
  register,
  login,
};
