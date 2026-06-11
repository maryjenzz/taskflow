import React from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

const TaskChart = ({ stats = { pending: 0, completed: 0 } }) => {
  const data = {
    labels: ['Pendentes', 'Concluídas'],
    datasets: [
      {
        data: [stats.pending, stats.completed],
        backgroundColor: [
          '#f59e0b', // amber-500
          '#10b981', // emerald-500
        ],
        borderColor: [
          '#d97706',
          '#059669',
        ],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom',
        labels: {
          color: '#4b5563', // gray-600
          font: {
            family: 'Inter, sans-serif',
            size: 13,
          },
        },
      },
    },
  };

  const hasData = stats.pending > 0 || stats.completed > 0;

  return (
    <div className="flex flex-col items-center justify-center rounded-xl bg-white p-6 shadow-sm min-h-[300px]">
      <h4 className="text-base font-bold text-gray-700 mb-4">Progresso das Tarefas</h4>
      {hasData ? (
        <div className="relative h-56 w-56">
          <Pie data={data} options={options} />
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center h-48 text-gray-400">
          <p className="text-sm">Sem dados suficientes para gerar o gráfico</p>
        </div>
      )}
    </div>
  );
};

export default TaskChart;
