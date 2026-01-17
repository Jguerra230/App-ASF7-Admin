import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Button } from '../../components/ui/Button';
import { Plus, Users, Shield, ArrowLeft, Search, Edit2, DollarSign } from 'lucide-react';
import { Team, Player } from '../../types';

// MOCK DATA
const MOCK_TEAMS: Team[] = [
    { id: 't1', name: 'Titans FC', colors: ['#000', '#FFF'], logo: 'https://picsum.photos/60/60', coach: 'Pep Guardiola' },
    { id: 't2', name: 'Wolves United', colors: ['#F00', '#000'], logo: 'https://picsum.photos/61/61', coach: 'Jose Mourinho' },
    { id: 't3', name: 'Golden Lions', colors: ['#DAA520', '#000'], logo: 'https://picsum.photos/62/62', coach: 'Carlo Ancelotti' },
];

const MOCK_PLAYERS_DB: Player[] = [
    { id: 'p1', name: 'João Silva', position: 'ATA', teamId: 't1', price: 12.5, status: 'active', photoUrl: '', number: 9 },
    { id: 'p2', name: 'Carlos Paredão', position: 'GK', teamId: 't1', price: 8.0, status: 'active', photoUrl: '', number: 1 },
    { id: 'p3', name: 'Pedro Meia', position: 'MID', teamId: 't1', price: 10.2, status: 'injured', photoUrl: '', number: 10 },
];

const Teams: React.FC = () => {
    const { activeChampionship } = useApp();
    const [selectedTeam, setSelectedTeam] = useState<Team | null>(null);
    const [showPlayerModal, setShowPlayerModal] = useState(false);

    if (!activeChampionship) return null;

    // --- VIEW: TEAM LIST ---
    if (!selectedTeam) {
        return (
            <div className="space-y-6">
                <div className="flex justify-between items-center">
                    <div>
                        <h2 className="text-2xl font-bold text-white">Times & Elenco</h2>
                        <p className="text-gray-400">Contexto: <span className="text-gold-500">{activeChampionship.name}</span></p>
                    </div>
                    <Button onClick={() => alert('Add Team Mock')}>
                        <Plus size={18} /> Novo Time
                    </Button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {MOCK_TEAMS.map(team => (
                        <div 
                            key={team.id}
                            onClick={() => setSelectedTeam(team)}
                            className="bg-dark-900 border border-dark-800 hover:border-gold-500 hover:shadow-lg hover:shadow-gold-900/10 rounded-xl p-6 cursor-pointer transition-all group"
                        >
                            <div className="flex items-center gap-4 mb-4">
                                <img src={team.logo} alt={team.name} className="w-16 h-16 rounded-full bg-black border-2 border-dark-700 group-hover:border-gold-500 transition-colors" />
                                <div>
                                    <h3 className="text-xl font-bold text-white">{team.name}</h3>
                                    <p className="text-sm text-gray-500">Téc: {team.coach}</p>
                                </div>
                            </div>
                            <div className="border-t border-dark-800 pt-4 flex justify-between items-center text-sm text-gray-400 group-hover:text-white transition-colors">
                                <span className="flex items-center gap-2"><Users size={16} /> 12 Jogadores</span>
                                <span className="text-gold-500 text-xs uppercase font-bold tracking-wider">Gerenciar &rarr;</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        );
    }

    // --- VIEW: TEAM DETAILS & PLAYERS ---
    const teamPlayers = MOCK_PLAYERS_DB.filter(p => p.teamId === selectedTeam.id);

    return (
        <div className="space-y-8">
            <button 
                onClick={() => setSelectedTeam(null)}
                className="flex items-center gap-2 text-gray-500 hover:text-white transition-colors text-sm font-medium"
            >
                <ArrowLeft size={16} /> Voltar para lista de times
            </button>

            {/* Team Header */}
            <div className="bg-gradient-to-r from-dark-900 to-dark-800 border border-dark-700 rounded-xl p-6 flex flex-col md:flex-row items-center gap-6 relative overflow-hidden">
                <div className="absolute top-0 right-0 p-32 bg-gold-500/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
                
                <img src={selectedTeam.logo} alt={selectedTeam.name} className="w-24 h-24 rounded-full border-4 border-dark-900 shadow-xl z-10" />
                
                <div className="text-center md:text-left z-10 flex-1">
                    <h2 className="text-3xl font-bold text-white">{selectedTeam.name}</h2>
                    <div className="flex flex-wrap justify-center md:justify-start gap-4 mt-2 text-sm text-gray-400">
                        <span className="flex items-center gap-1"><Shield size={14} /> ID: {selectedTeam.id}</span>
                        <span>•</span>
                        <span>Técnico: {selectedTeam.coach}</span>
                    </div>
                </div>

                <div className="z-10 flex gap-3">
                     <Button variant="outline" size="sm"><Edit2 size={16} /> Editar Time</Button>
                </div>
            </div>

            {/* Players List */}
            <div className="bg-dark-900 border border-dark-800 rounded-xl overflow-hidden">
                <div className="p-4 border-b border-dark-800 flex justify-between items-center bg-dark-950/30">
                    <h3 className="text-lg font-bold text-white flex items-center gap-2">
                        <Users className="text-gold-500" size={20} />
                        Elenco
                    </h3>
                    <Button size="sm" onClick={() => setShowPlayerModal(true)}>
                        <Plus size={16} /> Adicionar Jogador
                    </Button>
                </div>
                
                <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm">
                        <thead className="bg-dark-950 text-gray-400 uppercase text-xs">
                            <tr>
                                <th className="p-4">#</th>
                                <th className="p-4">Nome</th>
                                <th className="p-4">Posição</th>
                                <th className="p-4">Preço (C$)</th>
                                <th className="p-4">Status</th>
                                <th className="p-4 text-right">Ações</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-dark-800">
                            {teamPlayers.map(player => (
                                <tr key={player.id} className="hover:bg-dark-800/50 transition-colors">
                                    <td className="p-4 text-gray-500 font-mono">{player.number || '-'}</td>
                                    <td className="p-4 font-medium text-white">{player.name}</td>
                                    <td className="p-4">
                                        <span className={`px-2 py-0.5 rounded text-[10px] font-bold border ${
                                            player.position === 'GK' ? 'bg-yellow-900/20 text-yellow-500 border-yellow-900' :
                                            player.position === 'DEF' ? 'bg-blue-900/20 text-blue-500 border-blue-900' :
                                            player.position === 'MID' ? 'bg-green-900/20 text-green-500 border-green-900' :
                                            'bg-red-900/20 text-red-500 border-red-900'
                                        }`}>
                                            {player.position}
                                        </span>
                                    </td>
                                    <td className="p-4 font-mono text-gold-500">{player.price.toFixed(2)}</td>
                                    <td className="p-4">
                                        <span className={`text-xs ${player.status === 'active' ? 'text-green-500' : 'text-red-500'}`}>
                                            {player.status === 'active' ? 'Apto' : 'Lesionado'}
                                        </span>
                                    </td>
                                    <td className="p-4 text-right">
                                        <button className="text-gray-400 hover:text-white"><Edit2 size={16} /></button>
                                    </td>
                                </tr>
                            ))}
                            {teamPlayers.length === 0 && (
                                <tr>
                                    <td colSpan={6} className="p-8 text-center text-gray-500">Nenhum jogador cadastrado neste time.</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Add Player Modal (Simple implementation) */}
            {showPlayerModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
                    <div className="bg-dark-900 border border-gold-500/30 w-full max-w-md rounded-xl p-6 shadow-2xl">
                        <h3 className="text-xl font-bold text-white mb-4">Novo Jogador</h3>
                        <div className="space-y-4">
                            <div>
                                <label className="block text-xs text-gray-500 mb-1">Nome Completo</label>
                                <input type="text" className="w-full bg-dark-950 border border-dark-700 rounded p-2 text-white" />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-xs text-gray-500 mb-1">Posição</label>
                                    <select className="w-full bg-dark-950 border border-dark-700 rounded p-2 text-white">
                                        <option>GK (Goleiro)</option>
                                        <option>DEF (Defesa)</option>
                                        <option>MID (Meio)</option>
                                        <option>ATA (Ataque)</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-xs text-gray-500 mb-1">Preço Inicial (C$)</label>
                                    <div className="relative">
                                        <input type="number" className="w-full bg-dark-950 border border-dark-700 rounded p-2 pl-8 text-white" defaultValue={5} />
                                        <DollarSign size={14} className="absolute left-2.5 top-3 text-gold-500" />
                                    </div>
                                </div>
                            </div>
                            <div className="pt-4 flex justify-end gap-3">
                                <Button variant="secondary" onClick={() => setShowPlayerModal(false)}>Cancelar</Button>
                                <Button onClick={() => setShowPlayerModal(false)}>Salvar Jogador</Button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Teams;