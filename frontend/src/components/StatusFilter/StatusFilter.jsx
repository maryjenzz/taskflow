import React from 'react';

const StatusFilter = ({ activeFilter, setActiveFilter }) => {
  const filters = [
    { label: 'Todas', value: 'all' },
    { label: 'Pendentes', value: 'pending' },
    { label: 'Concluídas', value: 'completed' },
  ];

  return (
    <div className="flex gap-2 bg-white p-1 rounded-lg border border-gray-350 shadow-sm">
      {filters.map((filter) => (
        <button
          key={filter.value}
          onClick={() => setActiveFilter(filter.value)}
          className={`px-4 py-1.5 rounded-md text-sm font-medium transition-all duration-200 ${
            activeFilter === filter.value
              ? 'bg-vintage-grape text-white shadow-sm'
              : 'text-gray-650 hover:bg-gray-100'
          }`}
        >
          {filter.label}
        </button>
      ))}
    </div>
  );
};

export default StatusFilter;
