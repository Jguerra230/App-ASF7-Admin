import React, { useState } from 'react';
import { Button } from '../../components/ui/Button';
import { Plus, Edit2, Calendar, Layout } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { StatusBadge } from '../../components/ui/StatusBadge';
import { Championship } from '../../types';

const Championships: React.FC = () => {
    const { allChampionships } = useApp();
    const [isCreating, setIsCreating] = useState(false);

    // Mock Form State
    const [formData, setFormData] = useState<Partial<Championship>>({
        name: '',
        season: new Date().getFullYear().toString(),
        status: 'upcoming',
        format: 'league',
        startDate: '',
        config: { groups: 1, qualifiersPerGroup: 2 }
    });

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h2 className="text-2xl font-bold text-white">Gerenciar Campeonatos</h2>
                    <p className="text-gray-400">Crie e configure os contextos de competição.</p>
                </div>
                <Button onClick={() => setIsCreating(!isCreating)}>
                    {isCreating ? 'Cancelar' : <><Plus size={18} /> Novo Campeonato</>}
                </Button>
            </div>

            {isCreating && (
                <div className="bg-dark-900 border border-gold-500/30 p-6 rounded-xl animate-fade-in shadow-2xl shadow-gold-900/10">
                    <h3 className="text-lg font-bold text-white mb-6 border-b border-dark-800 pb-2">Configurar Novo Campeonato</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-xs uppercase tracking-wider text-gray-500 mb-1">Nome do Evento</label>
                            <input 
                                type="text" 
                                className="w-full bg-dark-950 border border-dark-700 rounded p-2 text-white focus:border-gold-500 focus:outline-none"
                                placeholder="Ex: Liga Ouro Inverno"
                                value={formData.name}
                                onChange={e => setFormData({...formData, name: e.target.value})}
                            />
                        </div>
                        <div>
                            <label className="block text-xs uppercase tracking-wider text-gray-500 mb-1">Temporada</label>
                            <input 
                                type="text" 
                                className="w-full bg-dark-950 border border-dark-700 rounded p-2 text-white focus:border-gold-500 focus:outline-none"
                                value={formData.season}
                                onChange={e => setFormData({...formData, season: e.target.value})}
                            />
                        </div>
                        
                        <div>
                            <label className="block text-xs uppercase tracking-wider text-gray-500 mb-1">Formato de Disputa</label>
                            <div className="relative">
                                <select 
                                    className="w-full bg-dark-950 border border-dark-700 rounded p-2 text-white focus:border-gold-500 focus:outline-none appearance-none"
                                    value={formData.format}
                                    onChange={e => setFormData({...formData, format: e.target.value as any})}
                                >
                                    <option value="league">Pontos Corridos (Liga)</option>
                                    <option value="knockout">Mata-Mata (Copa)</option>
                                    <option value="hybrid">Fase de Grupos + Mata-Mata</option>
                                </select>
                                <Layout size={16} className="absolute right-3 top-3 text-gray-500 pointer-events-none" />
                            </div>
                        </div>

                        <div>
                            <label className="block text-xs uppercase tracking-wider text-gray-500 mb-1">Data de Início</label>
                            <div className="relative">
                                <input 
                                    type="date" 
                                    className="w-full bg-dark-950 border border-dark-700 rounded p-2 text-white focus:border-gold-500 focus:outline-none"
                                    value={formData.startDate}
                                    onChange={e => setFormData({...formData, startDate: e.target.value})}
                                />
                                <Calendar size={16} className="absolute right-3 top-3 text-gray-500 pointer-events-none" />
                            </div>
                        </div>
                    </div>

                    {/* Conditional Fields based on Format */}
                    {(formData.format === 'hybrid' || formData.format === 'league') && (
                         <div className="mt-6 p-4 bg-dark-950 rounded border border-dark-800">
                            <h4 className="text-sm font-bold text-gold-500 mb-4">Parâmetros do Formato</h4>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <div>
                                    <label className="block text-xs text-gray-500 mb-1">Qtd. Grupos</label>
                                    <input type="number" className="w-full bg-dark-900 border border-dark-700 rounded p-2 text-white" defaultValue={1} />
                                </div>
                                <div>
                                    <label className="block text-xs text-gray-500 mb-1">Classificam p/ Grupo</label>
                                    <input type="number" className="w-full bg-dark-900 border border-dark-700 rounded p-2 text-white" defaultValue={2} />
                                </div>
                                <div>
                                    <label className="block text-xs text-gray-500 mb-1">Total Times</label>
                                    <input type="number" className="w-full bg-dark-900 border border-dark-700 rounded p-2 text-white" placeholder="Auto" />
                                </div>
                            </div>
                         </div>
                    )}

                    <div className="mt-6 flex justify-end gap-3">
                        <Button variant="secondary" onClick={() => setIsCreating(false)}>Cancelar</Button>
                        <Button onClick={() => alert('Mock: Salvo no backend')}>Salvar Campeonato</Button>
                    </div>
                </div>
            )}

            <div className="grid gap-4">
                {allChampionships.map(c => (
                    <div key={c.id} className="bg-dark-900 border border-dark-800 p-4 rounded-xl flex items-center justify-between hover:border-gold-500/50 transition-colors">
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 bg-dark-800 rounded flex items-center justify-center">
                                <span className="font-bold text-gray-500">{c.season}</span>
                            </div>
                            <div>
                                <h3 className="font-bold text-white">{c.name}</h3>
                                <div className="flex items-center gap-2 text-xs text-gray-500">
                                    <span className="uppercase">{c.format === 'hybrid' ? 'Misto' : c.format === 'league' ? 'Liga' : 'Copa'}</span>
                                    <span>•</span>
                                    <span>Início: {c.startDate}</span>
                                </div>
                            </div>
                        </div>
                        <div className="flex items-center gap-4">
                            <StatusBadge status={c.status} />
                            <button className="p-2 text-gray-400 hover:text-white bg-dark-800 rounded-lg transition-colors">
                                <Edit2 size={18} />
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Championships;