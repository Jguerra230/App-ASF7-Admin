import React from 'react';
import { Bell, ChevronDown, LogOut, User, Menu } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { useNavigate } from 'react-router-dom';

interface TopbarProps {
  onMenuClick: () => void;
}

const Topbar: React.FC<TopbarProps> = ({ onMenuClick }) => {
  const { activeChampionship, setActiveChampionship, allChampionships, logout } = useApp();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const handleChangeChampionship = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedId = e.target.value;
    if (selectedId === 'create') {
      navigate('/championships');
      return;
    }
    const selected = allChampionships.find(c => c.id === selectedId);
    if (selected) {
      setActiveChampionship(selected);
      navigate('/dashboard');
    }
  };

  return (
    <header className="h-16 bg-dark-900 border-b border-dark-800 flex items-center justify-between px-4 md:px-6 fixed top-0 right-0 left-0 md:left-64 z-40 transition-all duration-300">
      
      {/* Left Side: Mobile Menu & Context Selector */}
      <div className="flex items-center gap-3 md:gap-4 flex-1">
        <button 
          onClick={onMenuClick}
          className="md:hidden p-2 text-gray-400 hover:text-white"
        >
          <Menu size={24} />
        </button>

        <div className="flex items-center gap-2 bg-dark-800 rounded-lg p-1 border border-dark-700 max-w-[200px] md:max-w-none">
          <span className="text-gray-400 text-sm pl-2 hidden md:inline">Campeonato Atual:</span>
          <div className="relative flex-1">
            <select
              value={activeChampionship?.id || ''}
              onChange={handleChangeChampionship}
              className="w-full appearance-none bg-transparent text-gold-500 font-bold pl-2 pr-6 md:pr-8 py-1 focus:outline-none cursor-pointer text-sm truncate"
            >
              <option value="" disabled>Selecione...</option>
              {allChampionships.map(c => (
                <option key={c.id} value={c.id} className="bg-dark-900 text-white">
                  {c.name} ({c.season})
                </option>
              ))}
              <option disabled>──────────</option>
              <option value="create" className="text-green-500 bg-dark-900 font-normal">+ Criar Novo</option>
            </select>
            <ChevronDown size={14} className="absolute right-2 top-1/2 -translate-y-1/2 text-gold-500 pointer-events-none" />
          </div>
        </div>
      </div>

      {/* Right Actions */}
      <div className="flex items-center gap-4 md:gap-6">
        <button className="relative text-gray-400 hover:text-white transition-colors">
          <Bell size={20} />
          <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full"></span>
        </button>

        <div className="flex items-center gap-3 pl-4 md:pl-6 border-l border-dark-700">
          <div className="text-right hidden md:block">
            <p className="text-sm font-medium text-white">Admin Master</p>
            <p className="text-xs text-gold-500">Super Admin</p>
          </div>
          <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-dark-700 border border-gold-600 flex items-center justify-center text-gold-500">
            <User size={18} />
          </div>
          <button onClick={handleLogout} className="text-gray-500 hover:text-red-500 transition-colors ml-1 md:ml-2">
            <LogOut size={20} />
          </button>
        </div>
      </div>
    </header>
  );
};

export default Topbar;