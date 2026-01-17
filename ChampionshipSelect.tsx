import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { Plus, Trophy, Calendar, ArrowRight } from 'lucide-react';
import { StatusBadge } from '../components/ui/StatusBadge';

const ChampionshipSelect: React.FC = () => {
  const { allChampionships, setActiveChampionship } = useApp();
  const navigate = useNavigate();

  const handleSelect = (champ: any) => {
    setActiveChampionship(champ);
    navigate('/dashboard');
  };

  const handleCreate = () => {
    navigate('/championships');
  };

  return (
    <div className="min-h-screen bg-black p-8 relative">
      <div className="max-w-6xl mx-auto">
        <div className="mb-10 text-center md:text-left border-b border-dark-800 pb-6 flex justify-between items-end">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">Selecione o Campeonato</h1>
            <p className="text-gray-400">Escolha o contexto que deseja gerenciar hoje.</p>
          </div>
          <button 
            onClick={handleCreate}
            className="hidden md:flex items-center gap-2 bg-dark-800 hover:bg-dark-700 text-gold-500 border border-dark-700 px-4 py-2 rounded-lg transition-all"
          >
            <Plus size={18} />
            Criar Novo
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Create Card (Mobile/Grid visible) */}
          <div 
            onClick={handleCreate}
            className="group border-2 border-dashed border-dark-700 hover:border-gold-500/50 bg-dark-900/50 rounded-xl p-8 flex flex-col items-center justify-center cursor-pointer transition-all min-h-[200px]"
          >
            <div className="w-16 h-16 rounded-full bg-dark-800 flex items-center justify-center mb-4 group-hover:bg-dark-700 transition-colors">
              <Plus size={32} className="text-gray-500 group-hover:text-gold-500" />
            </div>
            <h3 className="text-lg font-medium text-gray-300 group-hover:text-white">Criar Campeonato</h3>
          </div>

          {allChampionships.map((champ) => (
            <div 
              key={champ.id}
              onClick={() => handleSelect(champ)}
              className="group relative bg-dark-900 border border-dark-800 rounded-xl p-6 hover:border-gold-500 hover:shadow-xl hover:shadow-gold-900/10 cursor-pointer transition-all duration-300 overflow-hidden"
            >
              <div className="absolute top-0 right-0 p-4 opacity-50 group-hover:opacity-100 transition-opacity">
                <StatusBadge status={champ.status} />
              </div>

              <div className="flex items-center gap-4 mb-6">
                <div className="w-14 h-14 bg-dark-800 rounded-lg border border-dark-700 flex items-center justify-center">
                  <Trophy size={24} className="text-gold-500" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white group-hover:text-gold-500 transition-colors">{champ.name}</h3>
                  <div className="flex items-center gap-2 text-sm text-gray-500 mt-1">
                    <Calendar size={14} />
                    <span>Temporada {champ.season}</span>
                  </div>
                </div>
              </div>

              <div className="mt-4 pt-4 border-t border-dark-800 flex items-center justify-between text-sm">
                <span className="text-gray-400 group-hover:text-white transition-colors">Gerenciar contexto</span>
                <ArrowRight size={18} className="text-dark-600 group-hover:text-gold-500 transform group-hover:translate-x-1 transition-all" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ChampionshipSelect;