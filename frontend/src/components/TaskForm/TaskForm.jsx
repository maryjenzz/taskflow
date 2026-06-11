import React, { useState, useEffect } from 'react';

const TaskForm = ({ onSubmit, initialData, submitLabel }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    if (initialData) {
      setTitle(initialData.title || '');
      setDescription(initialData.description || '');
      // Format YYYY-MM-DD from API ISO string or value
      if (initialData.dueDate) {
        setDueDate(initialData.dueDate.substring(0, 10));
      } else {
        setDueDate('');
      }
    } else {
      setTitle('');
      setDescription('');
      setDueDate('');
    }
    setError('');
  }, [initialData]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) {
      setError('O título é obrigatório.');
      return;
    }

    onSubmit({
      title: title.trim(),
      description: description.trim(),
      due_date: dueDate || null,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && (
        <div className="rounded-lg bg-red-50 p-3 text-sm font-medium text-red-650">
          {error}
        </div>
      )}

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Título <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Ex: Fazer compras do mês"
          className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm placeholder-gray-400 focus:border-vintage-grape focus:outline-none focus:ring-1 focus:ring-vintage-grape text-gray-900"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Descrição
        </label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Detalhes adicionais sobre a tarefa..."
          rows={3}
          className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm placeholder-gray-400 focus:border-vintage-grape focus:outline-none focus:ring-1 focus:ring-vintage-grape text-gray-900"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Data de Vencimento
        </label>
        <input
          type="date"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
          className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-vintage-grape focus:outline-none focus:ring-1 focus:ring-vintage-grape text-gray-900"
        />
      </div>

      <div className="flex justify-end gap-3 pt-2">
        <button
          type="submit"
          className="rounded-lg bg-velvet-orchid px-4 py-2 text-sm font-semibold text-white shadow hover:bg-indigo-custom transition-all duration-200"
        >
          {submitLabel || 'Salvar'}
        </button>
      </div>
    </form>
  );
};

export default TaskForm;
