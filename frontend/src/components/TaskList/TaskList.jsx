import React from 'react';
import TaskCard from '../TaskCard/TaskCard';
import { ClipboardText } from '@phosphor-icons/react';

const TaskList = ({ tasks = [], onToggleStatus, onEdit, onDelete }) => {
  if (tasks.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center rounded-2xl bg-white/50 border border-dashed border-gray-300 p-10 text-center">
        <ClipboardText size={48} className="text-gray-400 mb-3" />
        <h3 className="text-lg font-bold text-gray-700">Nenhuma tarefa encontrada</h3>
        <p className="text-sm text-gray-500 max-w-xs mt-1">
          Crie uma nova tarefa ou tente ajustar seus filtros de pesquisa.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {tasks.map((task) => (
        <TaskCard
          key={task.id}
          task={task}
          onToggleStatus={onToggleStatus}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
};

export default TaskList;
