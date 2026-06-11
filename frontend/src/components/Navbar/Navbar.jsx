import React from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { SignOut, ListChecks } from '@phosphor-icons/react';

const Navbar = () => {
  const { user, logout } = useAuth();

  return (
    <nav className="bg-vintage-grape text-white shadow-md">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <ListChecks size={32} className="text-thistle animate-pulse" />
            <span className="text-xl font-bold tracking-wider">TaskFlow</span>
          </div>
          {user && (
            <div className="flex items-center gap-4">
              <span className="text-sm font-medium text-pale-slate sm:text-base">
                Olá, <span className="text-white font-semibold">{user.name}</span>
              </span>
              <button
                onClick={logout}
                className="flex items-center gap-1 rounded bg-velvet-orchid px-3 py-1.5 text-sm font-medium hover:bg-indigo-custom transition-all duration-300 shadow-sm"
              >
                <SignOut size={18} />
                <span className="hidden sm:inline">Sair</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
