import React, { useState, useEffect, useCallback } from 'react';
import Navbar from '../../components/Navbar/Navbar';
import StatsCards from '../../components/StatsCards/StatsCards';
import TaskChart from '../../components/TaskChart/TaskChart';
import SearchBar from '../../components/SearchBar/SearchBar';
import StatusFilter from '../../components/StatusFilter/StatusFilter';
import TaskList from '../../components/TaskList/TaskList';
import Modal from '../../components/Modal/Modal';
import TaskForm from '../../components/TaskForm/TaskForm';
import * as taskService from '../../services/taskService';
import { Plus } from '@phosphor-icons/react';

const Dashboard = () => {
  const [tasks, setTasks] = useState([]);
  const [stats, setStats] = useState({ total: 0, pending: 0, completed: 0 });
  const [search, setSearch] = useState('');
  const [activeFilter, setActiveFilter] = useState('all');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Modals state
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      setError('');

      // Get stats
      const statsData = await taskService.getStats();
      setStats(statsData);

      // Get tasks (mapped: 'all' shouldn't send status to API)
      const params = {};
      if (activeFilter !== 'all') {
        params.status = activeFilter;
      }
      if (search.trim()) {
        params.search = search.trim();
      }

      const tasksData = await taskService.getTasks(params);
      setTasks(tasksData);
    } catch (err) {
      setError('Ocorreu um erro ao carregar os dados. Verifique a conexão.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, [activeFilter, search]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  // Handle toggle task status
  const handleToggleStatus = async (id) => {
    try {
      await taskService.toggleTaskStatus(id);
      fetchData(); // Refresh list and stats
    } catch (err) {
      console.error(err);
      alert('Não foi possível alterar o status da tarefa.');
    }
  };

  // Handle edit click
  const handleEditClick = (task) => {
    setSelectedTask(task);
    setIsEditModalOpen(true);
  };

  // Handle delete task
  const handleDeleteTask = async (id) => {
    if (window.confirm('Tem certeza que deseja excluir esta tarefa?')) {
      try {
        await taskService.deleteTask(id);
        fetchData();
      } catch (err) {
        console.error(err);
        alert('Não foi possível excluir a tarefa.');
      }
    }
  };

  // Handle create task submission
  const handleCreateTask = async (taskData) => {
    try {
      await taskService.createTask(taskData);
      setIsCreateModalOpen(false);
      fetchData();
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || 'Erro ao criar tarefa.');
    }
  };

  // Handle edit task submission
  const handleEditTask = async (taskData) => {
    try {
      await taskService.updateTask(selectedTask.id, taskData);
      setIsEditModalOpen(false);
      setSelectedTask(null);
      fetchData();
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || 'Erro ao atualizar tarefa.');
    }
  };

  return (
    <div className="min-h-screen bg-pale-slate pb-12">
      <Navbar />

      <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-8 space-y-6">
        {error && (
          <div className="rounded-lg bg-red-50 p-4 text-sm font-semibold text-red-650 shadow border border-red-200">
            {error}
          </div>
        )}

        {/* Top metrics dashboard */}
        <StatsCards stats={stats} />

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          {/* Tasks List Section (Left/Middle columns) */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between bg-white/40 p-4 rounded-xl backdrop-blur-sm border border-white/50">
              <SearchBar search={search} setSearch={setSearch} />
              <div className="flex items-center gap-2">
                <StatusFilter activeFilter={activeFilter} setActiveFilter={setActiveFilter} />
                <button
                  onClick={() => setIsCreateModalOpen(true)}
                  className="flex items-center gap-1 rounded-lg bg-velvet-orchid px-4 py-2.5 text-sm font-bold text-white shadow hover:bg-indigo-custom transition-all duration-200"
                >
                  <Plus size={18} weight="bold" />
                  <span>Nova Tarefa</span>
                </button>
              </div>
            </div>

            {loading && tasks.length === 0 ? (
              <div className="flex h-48 items-center justify-center">
                <div className="h-8 w-8 animate-spin rounded-full border-4 border-vintage-grape border-t-transparent"></div>
              </div>
            ) : (
              <TaskList
                tasks={tasks}
                onToggleStatus={handleToggleStatus}
                onEdit={handleEditClick}
                onDelete={handleDeleteTask}
              />
            )}
          </div>

          {/* Chart Section (Right column) */}
          <div className="lg:col-span-1">
            <TaskChart stats={stats} />
          </div>
        </div>
      </main>

      {/* Create Modal */}
      <Modal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        title="Nova Tarefa"
      >
        <TaskForm onSubmit={handleCreateTask} submitLabel="Criar Tarefa" />
      </Modal>

      {/* Edit Modal */}
      <Modal
        isOpen={isEditModalOpen}
        onClose={() => {
          setIsEditModalOpen(false);
          setSelectedTask(null);
        }}
        title="Editar Tarefa"
      >
        <TaskForm
          onSubmit={handleEditTask}
          initialData={selectedTask}
          submitLabel="Atualizar Tarefa"
        />
      </Modal>
    </div>
  );
};

export default Dashboard;
