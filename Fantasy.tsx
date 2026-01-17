import React, { useState } from 'react';
import { Save, RefreshCw, AlertTriangle, PlayCircle, StopCircle, DollarSign } from 'lucide-react';
import { Button } from '../../components/ui/Button';
import { Player } from '../../types';
import { useApp } from '../../context/AppContext';

// Mock Players for Pricing
const MOCK_PLAYERS: Player[] = [
  { id: '1', name: 'João Silva', position: 'ATA', teamId: 't1', price: 12.5, status: 'active', photoUrl: '' },
  { id: '2', name: 'Carlos Paredão', position: 'GK', teamId: 't1', price: 8.0, status: 'active', photoUrl: '' },
  { id: '3', name: 'Pedro Meia', position: 'MID', teamId: 't2', price: 10.2, status: 'injured', photoUrl: '' },
];

const Fantasy: React.FC = () => {
  const { activeChampionship } = useApp();
  const [activeTab, setActiveTab] = useState('round');

  if (!activeChampionship) return <div>Erro: Nenhum campeonato selecionado.</div>;

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-white">Fantasy Game</h2>
          <p className="text-gray-400">Contexto: <span className="text-gold-500">{activeChampionship.name}</span></p>
        </div>
        <div className="flex items-center gap-2">
           <span className="flex items-center gap-2 px-3 py-1 rounded bg-green-900/20 text-green-500 border border-green-900 text-xs font-bold uppercase">
             <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
             Mercado Aberto
           </span>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b border-dark-800 flex gap-6 overflow-x-auto whitespace-nowrap pb-1 scrollbar-hide">
        {[
            { id: 'round', label: 'Rodada & Status' },
            { id: 'prices', label: 'Precificação' },
            { id: 'scoring', label: 'Pontuação' },
            { id: 'rules', label: 'Regras' }
        ].map(tab => (
            <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`pb-3 text-sm font-medium transition-all relative ${
                    activeTab === tab.id ? 'text-gold-500' : 'text-gray-500 hover:text-gray-300'
                }`}
            >
                {tab.label}
                {activeTab === tab.id && <span className="absolute bottom-0 left-0 w-full h-0.5 bg-gold-500"></span>}
            </button>
        ))}
      </div>

      <div className="bg-dark-900 border border-dark-800 rounded-xl p-6">
        
        {/* ROUND STATUS CONTENT */}
        {activeTab === 'round' && (
            <div className="space-y-8">
                <div className="flex flex-col md:flex-row items-center gap-6 p-6 bg-dark-950 rounded-lg border border-dark-800 text-center md:text-left">
                    <div className="text-center">
                        <p className="text-gray-500 text-sm mb-1">Rodada Atual</p>
                        <h3 className="text-4xl font-bold text-white">#04</h3>
                    </div>
                    <div className="h-px w-full md:w-px md:h-12 bg-dark-800"></div>
                    <div className="flex-1 w-full">
                        <p className="text-gray-400 text-sm mb-2">Fechamento do mercado: <strong>14/10 às 15:30</strong></p>
                        <div className="w-full bg-dark-800 rounded-full h-2">
                            <div className="bg-green-500 h-2 rounded-full" style={{ width: '75%' }}></div>
                        </div>
                    </div>
                    <div>
                        <Button variant="danger" size="sm">
                            <StopCircle size={16} /> Fechar Mercado
                        </Button>
                    </div>
                </div>
            </div>
        )}

        {/* PRICING CONTENT */}
        {activeTab === 'prices' && (
            <div>
                <div className="flex justify-between items-center mb-6">
                    <h3 className="text-white font-bold">Precificação dos Jogadores</h3>
                    <Button variant="outline" size="sm">
                        <RefreshCw size={16} /> Recalcular Variação
                    </Button>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm">
                        <thead className="bg-dark-950 text-gray-400 uppercase text-xs">
                            <tr>
                                <th className="p-3">Jogador</th>
                                <th className="p-3">Posição</th>
                                <th className="p-3">Status</th>
                                <th className="p-3">Preço Atual (C$)</th>
                                <th className="p-3 text-right">Ação</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-dark-800">
                            {MOCK_PLAYERS.map(p => (
                                <tr key={p.id}>
                                    <td className="p-3 text-white font-medium">{p.name}</td>
                                    <td className="p-3 text-gray-400">{p.position}</td>
                                    <td className="p-3"><span className="text-xs text-gray-500 bg-dark-800 px-2 py-1 rounded border border-dark-700">{p.status}</span></td>
                                    <td className="p-3">
                                        <div className="flex items-center gap-2">
                                            <input type="number" defaultValue={p.price} className="w-20 bg-dark-950 border border-dark-700 rounded px-2 py-1 text-white text-right" />
                                        </div>
                                    </td>
                                    <td className="p-3 text-right">
                                        <button className="text-gold-500 hover:text-white"><Save size={16} /></button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        )}

        {/* SCORING CONTENT */}
        {activeTab === 'scoring' && (
            <div className="max-w-2xl">
                <div className="flex items-center gap-2 mb-6 p-4 bg-yellow-900/20 border border-yellow-900/50 rounded text-yellow-500 text-sm">
                    <AlertTriangle size={18} />
                    As alterações aqui impactam o processamento da rodada atual.
                </div>
                <h3 className="text-white font-bold mb-4">Pontuação por Ação</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {['Gol', 'Assistência', 'Defesa Difícil', 'Roubada de Bola', 'Cartão Amarelo', 'Cartão Vermelho'].map((action) => (
                        <div key={action} className="flex justify-between items-center p-3 bg-dark-950 rounded border border-dark-800">
                            <span className="text-gray-300">{action}</span>
                            <input 
                                type="number" 
                                className="w-20 bg-dark-800 border border-dark-700 rounded text-white px-2 py-1 text-right focus:border-gold-500 outline-none" 
                                defaultValue={action.includes('Cartão') ? -2 : 5}
                            />
                        </div>
                    ))}
                </div>
                <div className="mt-6">
                    <Button>Salvar Pontuações</Button>
                </div>
            </div>
        )}
      </div>
    </div>
  );
};

export default Fantasy;