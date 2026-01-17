import React from 'react';
import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import Layout from './components/layout/Layout';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import ChampionshipSelect from './pages/ChampionshipSelect';
import NewsPage from './pages/global/News';
import Fantasy from './pages/championship/Fantasy';
import Games from './pages/championship/Games';
import Teams from './pages/championship/Teams';
import Championships from './pages/admin/Championships';

// Placeholder components for brevity
const Placeholder = ({ title }: { title: string }) => (
  <div className="p-8 text-center text-gray-500">
    <h2 className="text-xl font-bold text-white mb-2">{title}</h2>
    <p>Funcionalidade em desenvolvimento.</p>
  </div>
);

const App: React.FC = () => {
  return (
    <AppProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          
          <Route path="/" element={<Layout />}>
            <Route index element={<Navigate to="/dashboard" replace />} />
            <Route path="select-championship" element={<ChampionshipSelect />} />
            
            {/* Global Routes */}
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="news" element={<NewsPage />} />
            <Route path="tv" element={<Placeholder title="ASF7 TV" />} />
            <Route path="polls" element={<Placeholder title="Enquetes & Votações" />} />
            
            {/* Championship Routes (Protected by Layout check) */}
            <Route path="teams" element={<Teams />} />
            <Route path="games" element={<Games />} />
            <Route path="table" element={<Placeholder title="Tabela de Classificação" />} />
            <Route path="fantasy" element={<Fantasy />} />
            
            {/* Admin Routes */}
            <Route path="championships" element={<Championships />} />
            <Route path="admins" element={<Placeholder title="Gerenciar Admins" />} />
            <Route path="settings" element={<Placeholder title="Configurações Gerais" />} />
          </Route>
        </Routes>
      </Router>
    </AppProvider>
  );
};

export default App;