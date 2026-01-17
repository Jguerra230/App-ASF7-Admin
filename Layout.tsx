import React, { useState } from 'react';
import { Outlet, useLocation, Navigate } from 'react-router-dom';
import Sidebar from './Sidebar';
import Topbar from './Topbar';
import { useApp } from '../../context/AppContext';

const Layout: React.FC = () => {
  const { isAuthenticated, activeChampionship } = useApp();
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // Define routes that require an active championship
  const championshipRoutes = ['/teams', '/players', '/games', '/table', '/fantasy'];
  const isChampionshipRoute = championshipRoutes.some(route => location.pathname.startsWith(route));

  if (isChampionshipRoute && !activeChampionship) {
    return <Navigate to="/select-championship" replace />;
  }

  return (
    <div className="flex min-h-screen bg-black text-gray-200 font-sans selection:bg-gold-500 selection:text-black">
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      
      <div className="flex-1 md:ml-64 flex flex-col min-h-screen transition-all duration-300">
        <Topbar onMenuClick={() => setSidebarOpen(true)} />
        
        <main className="mt-16 p-4 md:p-8 flex-1 overflow-x-hidden w-full">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Layout;