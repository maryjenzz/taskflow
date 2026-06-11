import React from 'react';
import { MagnifyingGlass } from '@phosphor-icons/react';

const SearchBar = ({ search, setSearch }) => {
  return (
    <div className="relative flex-1">
      <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
        <MagnifyingGlass size={20} className="text-gray-400" />
      </div>
      <input
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Pesquisar por título ou descrição..."
        className="block w-full rounded-lg border border-gray-300 bg-white py-2.5 pl-10 pr-3 text-sm placeholder-gray-400 text-gray-900 focus:border-vintage-grape focus:outline-none focus:ring-1 focus:ring-vintage-grape shadow-sm transition-colors duration-200"
      />
    </div>
  );
};

export default SearchBar;
