import React, { useState } from 'react';
import { Button } from '../../components/ui/Button';
import { Plus, Calendar, MapPin, X, Save, Shield } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { Match, Player } from '../../types';

// MOCK MATCH
const MOCK_MATCH: Match = {
    id: 'm1', homeTeamId: 't1', awayTeamId: 't2', round: 4, date: '2024-10-12T19:00:00', status: 'finished', score: { home: 2, away: 1 }, location: 'Arena Gold'
};

const Games: React.FC = () => {
    const { activeChampionship } = useApp();
    const [editingMatch, setEditingMatch] = useState<Match | null>(null);

    if (!activeChampionship) return null;

    // --- VIEW: EDIT MATCH STATS ---
    if (editingMatch) {
        return (
            <div className="space-y-6 animate-fade-in">
                <div className="flex items-center justify-between">
                     <button 
                        onClick={() => setEditingMatch(null)}
                        className="text-gray-400 hover:text-white flex items-center gap-2"
                    >
                        <X size={20} /> Cancelar Edição
                    </button>
                    <div className="flex gap-2">
                        <Button variant="outline">Salvar Rascunho</Button>
                        <Button><Save size={18} /> Publicar Resultado</Button>
                    </div>
                </div>

                {/* Scoreboard Input */}
                <div className="bg-dark-900 border border-dark-800 rounded-xl p-8 flex flex-col md:flex-row items-center justify-center gap-12">
                     <div className="text-center">
                        <div className="w-20 h-20 bg-gray-800 rounded-full mx-auto mb-4 border-2 border-dark-700"></div>
                        <h2 className="text-2xl font-bold text-white">Titans FC</h2>
                     </div>
                     
                     <div className="flex items-center gap-6">
                        <input 
                            type="number" 
                            className="w-24 h-24 bg-black border border-dark-700 rounded-lg text-5xl font-bold text-center text-white focus:border-gold-500 outline-none" 
                            defaultValue={editingMatch.score.home}
                        />
                        <span className="text-4xl text-gray-600 font-light">X</span>
                        <input 
                            type="number" 
                            className="w-24 h-24 bg-black border border-dark-700 rounded-lg text-5xl font-bold text-center text-white focus:border-gold-500 outline-none" 
                            defaultValue={editingMatch.score.away}
                        />
                     </div>

                     <div className="text-center">
                        <div className="w-20 h-20 bg-gray-800 rounded-full mx-auto mb-4 border-2 border-dark-700"></div>
                        <h2 className="text-2xl font-bold text-white">Wolves</h2>
                     </div>
                </div>

                {/* Stats Editors */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Home Team Stats */}
                    <TeamStatsEditor teamName="Titans FC" />
                    {/* Away Team Stats */}
                    <TeamStatsEditor teamName="Wolves" />
                </div>
            </div>
        );
    }

    // --- VIEW: MATCH LIST ---
    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold text-white">Jogos & Rodadas</h2>
                <Button><Plus size={18} /> Novo Jogo</Button>
            </div>

            <div className="flex gap-2 overflow-x-auto pb-2 border-b border-dark-800 mb-4">
                {[1, 2, 3, 4, 5, 6].map(r => (
                    <button 
                        key={r} 
                        className={`px-4 py-2 rounded-t-lg text-sm whitespace-nowrap transition-colors ${r === 4 ? 'bg-gold-500 text-black font-bold' : 'text-gray-400 hover:text-white hover:bg-dark-800'}`}
                    >
                        Rodada {r}
                    </button>
                ))}
            </div>

            <div className="grid gap-4">
                {[1, 2, 3].map(game => (
                    <div key={game} className="bg-dark-900 border border-dark-800 rounded-xl p-4 flex flex-col md:flex-row items-center justify-between gap-4 hover:border-dark-600 transition-colors">
                        <div className="flex items-center gap-6 flex-1 justify-center md:justify-start">
                            <div className="text-center w-24">
                                <div className="w-12 h-12 bg-gray-800 rounded-full mx-auto mb-2"></div>
                                <span className="font-bold text-white block truncate">Titans FC</span>
                            </div>
                            <div className="text-center px-4 py-2 bg-dark-950 rounded border border-dark-800">
                                <span className="text-2xl font-bold text-white tracking-widest">2 x 1</span>
                                <span className="block text-[10px] text-green-500 uppercase font-bold mt-1">Finalizado</span>
                            </div>
                            <div className="text-center w-24">
                                <div className="w-12 h-12 bg-gray-800 rounded-full mx-auto mb-2"></div>
                                <span className="font-bold text-white block truncate">Wolves</span>
                            </div>
                        </div>
                        
                        <div className="flex flex-col gap-2 text-xs text-gray-500 min-w-[150px] border-t md:border-t-0 md:border-l border-dark-800 pt-4 md:pt-0 md:pl-6 text-center md:text-left">
                            <div className="flex items-center justify-center md:justify-start gap-2">
                                <Calendar size={14} />
                                12 Out, 19:00
                            </div>
                            <div className="flex items-center justify-center md:justify-start gap-2">
                                <MapPin size={14} />
                                Arena Gold
                            </div>
                            <button 
                                onClick={() => setEditingMatch(MOCK_MATCH)}
                                className="text-gold-500 hover:text-white mt-1 border border-gold-500/30 hover:bg-gold-500 hover:text-black px-3 py-1 rounded transition-all font-medium"
                            >
                                Editar Súmula
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

// Sub-component for editing player stats within a match
const TeamStatsEditor = ({ teamName }: { teamName: string }) => {
    // Mock players for the team
    const players = [
        { id: '1', name: 'João Silva', pos: 'ATA' },
        { id: '2', name: 'Pedro Meia', pos: 'MID' },
        { id: '3', name: 'Carlos GK', pos: 'GK' },
    ];

    const StatInput = ({ label, color }: { label: string, color?: string }) => (
        <div className="flex flex-col items-center">
             <span className={`text-[10px] uppercase font-bold mb-1 ${color || 'text-gray-500'}`}>{label}</span>
             <input type="number" min="0" className="w-10 bg-dark-800 border border-dark-700 rounded text-center text-white text-sm focus:border-gold-500 outline-none" placeholder="0" />
        </div>
    );

    return (
        <div className="bg-dark-900 border border-dark-800 rounded-xl overflow-hidden">
            <div className="p-3 bg-dark-950 border-b border-dark-800 font-bold text-white flex justify-between">
                <span>{teamName}</span>
                <span className="text-xs text-gray-500 uppercase font-normal">Súmula</span>
            </div>
            <div className="max-h-[400px] overflow-y-auto">
                <table className="w-full text-left text-sm">
                    <thead className="bg-dark-950 text-gray-500 text-xs">
                         <tr>
                             <th className="p-2 pl-4">Jogador</th>
                             <th className="p-2 text-center">Gols</th>
                             <th className="p-2 text-center">Assis.</th>
                             <th className="p-2 text-center">Cartões</th>
                             <th className="p-2 text-center">Scout</th>
                         </tr>
                    </thead>
                    <tbody className="divide-y divide-dark-800">
                        {players.map(p => (
                            <tr key={p.id} className="hover:bg-dark-800/30">
                                <td className="p-2 pl-4">
                                    <div className="font-medium text-white">{p.name}</div>
                                    <div className="text-[10px] text-gray-500">{p.pos}</div>
                                </td>
                                <td className="p-2"><div className="flex justify-center"><StatInput label="Gol" color="text-green-500" /></div></td>
                                <td className="p-2"><div className="flex justify-center"><StatInput label="Ass" color="text-blue-500" /></div></td>
                                <td className="p-2">
                                    <div className="flex gap-1 justify-center">
                                        <input type="number" className="w-8 bg-yellow-900/20 border border-yellow-900 rounded text-center text-yellow-500 text-sm" placeholder="Y" />
                                        <input type="number" className="w-8 bg-red-900/20 border border-red-900 rounded text-center text-red-500 text-sm" placeholder="R" />
                                    </div>
                                </td>
                                <td className="p-2">
                                    <div className="flex gap-1 justify-center">
                                        <input type="number" title="Chutes no Gol" className="w-8 bg-dark-800 border border-dark-600 rounded text-center text-white text-sm" placeholder="CG" />
                                        {p.pos === 'GK' && (
                                            <input type="number" title="Defesas" className="w-8 bg-purple-900/20 border border-purple-900 rounded text-center text-purple-400 text-sm" placeholder="DE" />
                                        )}
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Games;