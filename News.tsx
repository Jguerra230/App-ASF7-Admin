import React, { useState } from 'react';
import { Plus, Search, Filter, Archive, Edit2, Eye, EyeOff } from 'lucide-react';
import { Button } from '../../components/ui/Button';
import { StatusBadge } from '../../components/ui/StatusBadge';
import { News } from '../../types';

// Mock Data
const MOCK_NEWS: News[] = [
  { id: '1', title: 'Final da Liga Ouro confirmada', summary: 'O grande jogo acontecerá no próximo sábado...', status: 'published', date: '2024-03-10', tags: ['Liga Ouro', 'Final'], imageUrl: 'https://picsum.photos/100/100' },
  { id: '2', title: 'Melhores da rodada #4', summary: 'Confira a seleção da rodada feita pelos especialistas...', status: 'published', date: '2024-03-08', tags: ['Destaques', 'Rodada'], imageUrl: 'https://picsum.photos/101/101' },
  { id: '3', title: 'Entrevista Exclusiva: Goleiro do Titans', summary: 'Falamos com o paredão do campeonato...', status: 'draft', date: '2024-03-12', tags: ['Entrevista'], imageUrl: 'https://picsum.photos/102/102' },
  { id: '4', title: 'Regras novas para 2023', summary: 'Arquivo antigo...', status: 'archived', date: '2023-01-01', tags: ['Regras'], imageUrl: 'https://picsum.photos/103/103' },
];

const NewsPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'active' | 'archived'>('active');

  const filteredNews = MOCK_NEWS.filter(n => 
    activeTab === 'active' 
      ? (n.status === 'published' || n.status === 'draft')
      : n.status === 'archived'
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-white">Notícias</h2>
          <p className="text-gray-400">Gerencie o conteúdo informativo do app.</p>
        </div>
        <Button onClick={() => alert('Abrir Modal Criar Notícia')}>
          <Plus size={18} />
          Nova Notícia
        </Button>
      </div>

      <div className="bg-dark-900 border border-dark-800 rounded-xl overflow-hidden">
        {/* Toolbar */}
        <div className="p-4 border-b border-dark-800 flex flex-col sm:flex-row gap-4 justify-between items-center">
          <div className="flex bg-dark-800 rounded-lg p-1">
            <button 
              onClick={() => setActiveTab('active')}
              className={`px-4 py-1.5 rounded-md text-sm font-medium transition-all ${activeTab === 'active' ? 'bg-dark-700 text-white shadow' : 'text-gray-400 hover:text-white'}`}
            >
              Ativas & Rascunhos
            </button>
            <button 
               onClick={() => setActiveTab('archived')}
               className={`px-4 py-1.5 rounded-md text-sm font-medium transition-all ${activeTab === 'archived' ? 'bg-dark-700 text-white shadow' : 'text-gray-400 hover:text-white'}`}
            >
              Arquivo
            </button>
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            <div className="relative flex-1 sm:w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={16} />
              <input 
                type="text" 
                placeholder="Buscar notícia..." 
                className="w-full bg-dark-950 border border-dark-700 rounded-lg pl-9 pr-4 py-2 text-sm text-white focus:border-gold-500 focus:outline-none"
              />
            </div>
            <button className="p-2 bg-dark-800 border border-dark-700 rounded-lg text-gray-400 hover:text-white">
              <Filter size={18} />
            </button>
          </div>
        </div>

        {/* List */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-dark-950 text-gray-400 uppercase text-xs font-semibold tracking-wider">
              <tr>
                <th className="px-6 py-4">Notícia</th>
                <th className="px-6 py-4">Tags</th>
                <th className="px-6 py-4">Data</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-right">Ações</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-dark-800">
              {filteredNews.map((news) => (
                <tr key={news.id} className="hover:bg-dark-800/50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <img src={news.imageUrl} alt="" className="w-12 h-12 rounded object-cover border border-dark-700" />
                      <div>
                        <p className="text-white font-medium line-clamp-1">{news.title}</p>
                        <p className="text-gray-500 text-xs line-clamp-1">{news.summary}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex gap-1 flex-wrap">
                      {news.tags.map(tag => (
                        <span key={tag} className="px-2 py-0.5 bg-dark-700 text-gray-300 text-[10px] rounded border border-dark-600">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-gray-400 font-mono text-xs">
                    {news.date}
                  </td>
                  <td className="px-6 py-4">
                    <StatusBadge status={news.status} />
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button className="p-1.5 text-gray-400 hover:text-white hover:bg-dark-700 rounded transition-colors" title="Editar">
                        <Edit2 size={16} />
                      </button>
                      {news.status === 'published' ? (
                         <button className="p-1.5 text-gray-400 hover:text-yellow-400 hover:bg-dark-700 rounded transition-colors" title="Despublicar">
                           <EyeOff size={16} />
                         </button>
                      ) : (
                        <button className="p-1.5 text-gray-400 hover:text-green-400 hover:bg-dark-700 rounded transition-colors" title="Publicar">
                           <Eye size={16} />
                        </button>
                      )}
                      <button className="p-1.5 text-gray-400 hover:text-red-400 hover:bg-dark-700 rounded transition-colors" title="Arquivar">
                        <Archive size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {filteredNews.length === 0 && (
                <tr>
                  <td colSpan={5} className="py-12 text-center text-gray-500">
                    Nenhuma notícia encontrada nesta categoria.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default NewsPage;