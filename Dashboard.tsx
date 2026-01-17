import React from 'react';
import { useApp } from '../context/AppContext';
import { Users, Newspaper, Gamepad2, TrendingUp, Calendar, Clock, ArrowRight, Trophy } from 'lucide-react';
import { StatusBadge } from '../components/ui/StatusBadge';
import { useNavigate } from 'react-router-dom';

const Dashboard: React.FC = () => {
  const { allChampionships } = useApp();
  const navigate = useNavigate();

  const activeChamps = allChampionships.filter(c => c.status === 'active' || c.status === 'upcoming');
  const finishedChamps = allChampionships.filter(c => c.status === 'finished');

  const StatCard = ({ title, value, sub, icon: Icon, colorClass }: any) => (
    <div className="bg-dark-900 border border-dark-800 p-6 rounded-xl relative overflow-hidden group hover:border-dark-700 transition-colors">
      <div className="flex justify-between items-start mb-4">
        <div>
          <p className="text-gray-400 text-sm font-medium uppercase tracking-wider">{title}</p>
          <h3 className="text-3xl font-bold text-white mt-1">{value}</h3>
        </div>
        <div className={`p-3 rounded-lg ${colorClass} bg-opacity-20`}>
          <Icon size={24} className={colorClass.replace('bg-', 'text-')} />
        </div>
      </div>
      <p className="text-xs text-gray-500">{sub}</p>
    </div>
  );

  const calculatePrediction = (startDate: string) => {
    // Logic: Assume 12 weeks for a league
    const start = new Date(startDate);
    const end = new Date(start);
    end.setDate(end.getDate() + (12 * 7)); // + 12 weeks
    const today = new Date();
    
    // Simple math for demo
    const diffTime = Math.abs(end.getTime() - today.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    return {
      date: end.toLocaleDateString('pt-BR'),
      weeksLeft: Math.ceil(diffDays / 7)
    };
  };

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-white">Dashboard Global</h2>
        <p className="text-gray-400">Visão geral da plataforma ASF7.</p>
      </div>

      {/* GLOBAL STATS */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard title="Usuários Ativos" value="12.5k" sub="+12% essa semana" icon={Users} colorClass="bg-blue-500 text-blue-500" />
        <StatCard title="Notícias Publicadas" value="108" sub="Total de matérias" icon={Newspaper} colorClass="bg-purple-500 text-purple-500" />
        <StatCard title="Enquetes Ativas" value="2" sub="Votações em andamento" icon={TrendingUp} colorClass="bg-green-500 text-green-500" />
        <StatCard title="Vídeos TV" value="45" sub="Jogos e highlights" icon={Gamepad2} colorClass="bg-gold-500 text-gold-500" />
      </div>

      {/* CHAMPIONSHIPS OVERVIEW */}
      <div className="mt-8">
        <div className="flex justify-between items-end mb-4">
            <div>
                <h3 className="text-xl font-bold text-white flex items-center gap-2">
                    <Calendar className="text-gold-500" size={20} />
                    Visão de Campeonatos
                </h3>
                <p className="text-gray-500 text-sm">Acompanhamento e previsões de término.</p>
            </div>
            <button 
                onClick={() => navigate('/championships')}
                className="text-sm text-gold-500 hover:text-white flex items-center gap-1"
            >
                Gerenciar todos <ArrowRight size={14} />
            </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Active Champs */}
            <div className="bg-dark-900 border border-dark-800 rounded-xl overflow-hidden">
                <div className="p-4 border-b border-dark-800 bg-dark-950/50">
                    <h4 className="text-white font-medium">Em Andamento / Agendados</h4>
                </div>
                <div className="divide-y divide-dark-800">
                    {activeChamps.map(c => {
                        const prediction = calculatePrediction(c.startDate);
                        return (
                            <div key={c.id} className="p-4 hover:bg-dark-800/30 transition-colors">
                                <div className="flex items-center justify-between mb-2">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 rounded bg-dark-700 flex items-center justify-center border border-dark-600">
                                            <span className="text-xs font-bold text-gray-400">{c.season}</span>
                                        </div>
                                        <div>
                                            <h5 className="text-white font-medium">{c.name}</h5>
                                            <div className="flex items-center gap-2 text-xs text-gray-500">
                                                <span>Início: {new Date(c.startDate).toLocaleDateString('pt-BR')}</span>
                                                <span className="w-1 h-1 rounded-full bg-gray-600"></span>
                                                <span className="uppercase">{c.format}</span>
                                            </div>
                                        </div>
                                    </div>
                                    <StatusBadge status={c.status} />
                                </div>
                                <div className="mt-3 flex items-center gap-2 text-xs bg-dark-950 p-2 rounded border border-dark-800/50">
                                    <Clock size={14} className="text-gold-500" />
                                    <span className="text-gray-400">Previsão de término:</span>
                                    <span className="text-white font-medium">{prediction.date}</span>
                                    <span className="text-gray-600">({prediction.weeksLeft} semanas)</span>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* Finished Champs */}
            <div className="bg-dark-900 border border-dark-800 rounded-xl overflow-hidden opacity-80">
                <div className="p-4 border-b border-dark-800 bg-dark-950/50">
                    <h4 className="text-gray-300 font-medium">Histórico (Encerrados)</h4>
                </div>
                <div className="divide-y divide-dark-800">
                    {finishedChamps.map(c => (
                        <div key={c.id} className="p-4 flex items-center justify-between hover:bg-dark-800/30">
                            <div className="flex items-center gap-3">
                                <div className="w-8 h-8 rounded-full bg-dark-800 flex items-center justify-center text-gray-500 grayscale">
                                    <Trophy size={14} />
                                </div>
                                <div>
                                    <h5 className="text-gray-300 font-medium">{c.name}</h5>
                                    <p className="text-xs text-gray-600">Temporada {c.season}</p>
                                </div>
                            </div>
                            <span className="text-xs text-gray-500 bg-dark-800 px-2 py-1 rounded">Arquivado</span>
                        </div>
                    ))}
                    {finishedChamps.length === 0 && (
                        <div className="p-8 text-center text-gray-500 text-sm">Nenhum campeonato finalizado.</div>
                    )}
                </div>
            </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;