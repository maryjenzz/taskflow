import React from 'react';
import { ListBullets, Clock, CheckCircle } from '@phosphor-icons/react';

const StatsCards = ({ stats = { total: 0, pending: 0, completed: 0 } }) => {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
      {/* Total Card */}
      <div className="flex items-center justify-between rounded-xl bg-white p-6 shadow-sm border-l-4 border-vintage-grape hover:shadow-md transition-all duration-300">
        <div>
          <p className="text-sm font-medium text-gray-500">Total de Tarefas</p>
          <h3 className="text-3xl font-bold text-vintage-grape mt-1">{stats.total}</h3>
        </div>
        <div className="rounded-full bg-pale-slate p-3 text-vintage-grape">
          <ListBullets size={28} />
        </div>
      </div>

      {/* Pending Card */}
      <div className="flex items-center justify-between rounded-xl bg-white p-6 shadow-sm border-l-4 border-amber-500 hover:shadow-md transition-all duration-300">
        <div>
          <p className="text-sm font-medium text-gray-500">Tarefas Pendentes</p>
          <h3 className="text-3xl font-bold text-amber-600 mt-1">{stats.pending}</h3>
        </div>
        <div className="rounded-full bg-amber-50 p-3 text-amber-500">
          <Clock size={28} />
        </div>
      </div>

      {/* Completed Card */}
      <div className="flex items-center justify-between rounded-xl bg-white p-6 shadow-sm border-l-4 border-emerald-500 hover:shadow-md transition-all duration-300">
        <div>
          <p className="text-sm font-medium text-gray-500">Tarefas Concluídas</p>
          <h3 className="text-3xl font-bold text-emerald-600 mt-1">{stats.completed}</h3>
        </div>
        <div className="rounded-full bg-emerald-50 p-3 text-emerald-500">
          <CheckCircle size={28} />
        </div>
      </div>
    </div>
  );
};

export default StatsCards;
