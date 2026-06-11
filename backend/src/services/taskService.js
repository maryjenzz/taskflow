const { Op } = require('sequelize');
const Task = require('../models/Task');

const getAllTasks = async (userId, { status, search }) => {
  const where = { user_id: userId };

  if (status && (status === 'pending' || status === 'completed')) {
    where.status = status;
  }

  if (search) {
    where[Op.or] = [
      { title: { [Op.substring]: search } },
      { description: { [Op.substring]: search } },
    ];
  }

  return await Task.findAll({
    where,
    order: [
      ['due_date', 'ASC'],
      ['created_at', 'DESC'],
    ],
  });
};

const getTaskById = async (id, userId) => {
  const task = await Task.findOne({ where: { id, user_id: userId } });
  if (!task) {
    throw { status: 404, message: 'Tarefa não encontrada ou não pertence ao usuário' };
  }
  return task;
};

const createTask = async (userId, { title, description, due_date }) => {
  if (!title) {
    throw { status: 400, message: 'Título é obrigatório' };
  }

  return await Task.create({
    title,
    description,
    dueDate: due_date || null,
    status: 'pending',
    userId,
  });
};

const updateTask = async (id, userId, { title, description, due_date, status }) => {
  const task = await getTaskById(id, userId);

  if (title !== undefined) {
    if (!title) {
      throw { status: 400, message: 'Título é obrigatório' };
    }
    task.title = title;
  }

  if (description !== undefined) {
    task.description = description;
  }

  if (due_date !== undefined) {
    task.dueDate = due_date || null;
  }

  if (status !== undefined) {
    if (status !== 'pending' && status !== 'completed') {
      throw { status: 400, message: 'Status inválido. Deve ser pending ou completed' };
    }
    task.status = status;
  }

  await task.save();
  return task;
};

const updateTaskStatus = async (id, userId) => {
  const task = await getTaskById(id, userId);
  task.status = task.status === 'pending' ? 'completed' : 'pending';
  await task.save();
  return task;
};

const deleteTask = async (id, userId) => {
  const task = await getTaskById(id, userId);
  await task.destroy();
  return { message: 'Tarefa removida com sucesso' };
};

const getTaskStats = async (userId) => {
  const total = await Task.count({ where: { user_id: userId } });
  const pending = await Task.count({ where: { user_id: userId, status: 'pending' } });
  const completed = await Task.count({ where: { user_id: userId, status: 'completed' } });

  return {
    total,
    pending,
    completed,
  };
};

module.exports = {
  getAllTasks,
  getTaskById,
  createTask,
  updateTask,
  updateTaskStatus,
  deleteTask,
  getTaskStats,
};
