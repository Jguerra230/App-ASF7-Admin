import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Newspaper, 
  Tv, 
  BarChart2, 
  Trophy, 
  Shield, 
  Calendar, 
  Gamepad2, 
  Settings,
  UserCog,
  Flag,
  X
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
  const { activeChampionship } = useApp();
  const location = useLocation();

  const isLinkActive = (path: string) => location.pathname.startsWith(path);

  const LinkItem = ({ to, icon: Icon, label, disabled = false }: any) => (
    <NavLink
      to={disabled ? '#' : to}
      className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 mb-1
        ${disabled ? 'opacity-40 cursor-not-allowed' : 'hover:bg-dark-800 hover:text-gold-500'}
        ${isLinkActive(to) && !disabled ? 'bg-dark-800 text-gold-500 border-l-4 border-gold-500' : 'text-gray-400'}
      `}
      onClick={(e) => {
        if (disabled) e.preventDefault();
        onClose(); // Close sidebar on mobile when link clicked
      }}
    >
      <Icon size={20} />
      <span className="font-medium text-sm">{label}</span>
    </NavLink>
  );

  return (
    <>
      {/* Mobile Overlay */}
      <div 
        className={`fixed inset-0 bg-black/80 backdrop-blur-sm z-40 md:hidden transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        onClick={onClose}
      />

      <aside className={`
        fixed inset-y-0 left-0 w-64 bg-dark-900 border-r border-dark-800 z-50 flex flex-col 
        transform transition-transform duration-300 ease-in-out
        ${isOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0
      `}>
        <div className="p-6 flex items-center justify-between border-b border-dark-800">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gold-500 rounded flex items-center justify-center text-black font-bold text-xl">
              A
            </div>
            <h1 className="text-xl font-bold tracking-wider text-white">ASF7 <span className="text-gold-500">ADMIN</span></h1>
          </div>
          <button onClick={onClose} className="md:hidden text-gray-400 hover:text-white">
            <X size={24} />
          </button>
        </div>

        <div className="p-4 flex-1 overflow-y-auto">
          {/* GLOBAL SECTION */}
          <div className="mb-8">
            <h3 className="px-4 text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Global</h3>
            <LinkItem to="/dashboard" icon={LayoutDashboard} label="Dashboard" />
            <LinkItem to="/news" icon={Newspaper} label="Notícias & Banners" />
            <LinkItem to="/tv" icon={Tv} label="ASF7 TV" />
            <LinkItem to="/polls" icon={BarChart2} label="Enquetes" />
          </div>

          {/* CHAMPIONSHIP SECTION */}
          <div className="mb-8">
            <h3 className="px-4 text-xs font-bold text-gray-500 uppercase tracking-wider mb-2 flex items-center justify-between">
              Campeonato
              {!activeChampionship && <span className="text-[10px] text-red-500">(Selecione)</span>}
            </h3>
            <div className={!activeChampionship ? 'opacity-50 pointer-events-none' : ''}>
              <LinkItem to="/teams" icon={Shield} label="Times & Elenco" />
              <LinkItem to="/games" icon={Calendar} label="Rodadas & Jogos" />
              <LinkItem to="/table" icon={Trophy} label="Classificação" />
              <LinkItem to="/fantasy" icon={Gamepad2} label="Fantasy" />
            </div>
          </div>

          {/* ADMIN SECTION */}
          <div>
            <h3 className="px-4 text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Sistema</h3>
            <LinkItem to="/championships" icon={Flag} label="Campeonatos" />
            <LinkItem to="/admins" icon={UserCog} label="Admins" />
            <LinkItem to="/settings" icon={Settings} label="Configurações" />
          </div>
        </div>

        <div className="p-4 border-t border-dark-800 text-center text-xs text-gray-600">
          v1.0.2 &copy; 2024 ASF7
        </div>
      </aside>
    </>
  );
};

export default Sidebar;