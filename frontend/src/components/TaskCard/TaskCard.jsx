import React from 'react';
import { Pencil, Trash, CheckCircle, Circle, Calendar } from '@phosphor-icons/react';

const TaskCard = ({ task, onToggleStatus, onEdit, onDelete }) => {
  const isCompleted = task.status === 'completed';
  
  // Format due date to BR format: DD/MM/YYYY
  const formatDueDate = (dateString) => {
    if (!dateString) return null;
    const parts = dateString.split('-');
    if (parts.length === 3) {
      return `${parts[2]}/${parts[1]}/${parts[0]}`;
    }
    return dateString;
  };

  // Check if task is overdue (if due date is in the past and task is pending)
  const isOverdue = () => {
    if (!task.dueDate || isCompleted) return false;
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const dueDate = new Date(task.dueDate + 'T12:00:00'); // Use midday to avoid timezone shifts
    return dueDate < today;
  };

  return (
    <div className={`group relative flex flex-col justify-between rounded-xl bg-white p-5 shadow-sm hover:shadow-md transition-all duration-300 border-l-4 ${
      isCompleted ? 'border-emerald-500 bg-gray-50/50' : isOverdue() ? 'border-red-500' : 'border-thistle'
    }`}>
      <div>
        <div className="flex items-start justify-between gap-2">
          <button
            onClick={() => onToggleStatus(task.id)}
            className={`flex-shrink-0 mt-0.5 rounded-full text-lg transition-colors ${
              isCompleted ? 'text-emerald-500 hover:text-emerald-600' : 'text-gray-400 hover:text-vintage-grape'
            }`}
          >
            {isCompleted ? <CheckCircle size={22} weight="fill" /> : <Circle size={22} />}
          </button>
          
          <div className="flex-1 min-w-0">
            <h4 className={`text-base font-bold text-gray-800 break-words ${
              isCompleted ? 'line-through text-gray-400' : ''
            }`}>
              {task.title}
            </h4>
          </div>
        </div>

        {task.description && (
          <p className={`mt-2 text-sm text-gray-650 break-words line-clamp-3 ${
            isCompleted ? 'text-gray-400' : ''
          }`}>
            {task.description}
          </p>
        )}
      </div>

      <div className="mt-4 flex items-center justify-between border-t border-gray-100 pt-3">
        <div className="flex items-center gap-1.5 text-xs text-gray-500 font-medium">
          {task.dueDate ? (
            <span className={`flex items-center gap-1 ${isOverdue() ? 'text-red-650 font-semibold' : ''}`}>
              <Calendar size={15} />
              {formatDueDate(task.dueDate)}
              {isOverdue() && ' (Atrasado)'}
            </span>
          ) : (
            <span className="text-gray-400">Sem data</span>
          )}
        </div>

        <div className="flex items-center gap-1 sm:opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <button
            onClick={() => onEdit(task)}
            title="Editar tarefa"
            className="rounded p-1.5 text-gray-500 hover:bg-gray-100 hover:text-vintage-grape transition-colors"
          >
            <Pencil size={16} />
          </button>
          <button
            onClick={() => onDelete(task.id)}
            title="Excluir tarefa"
            className="rounded p-1.5 text-gray-500 hover:bg-red-50 hover:text-red-650 transition-colors"
          >
            <Trash size={16} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default TaskCard;
