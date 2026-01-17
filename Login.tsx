import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { Button } from '../components/ui/Button';

const Login: React.FC = () => {
  const { login } = useApp();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    login();
    navigate('/select-championship');
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-dark-900 to-black z-0"></div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-gold-500/5 rounded-full blur-3xl z-0"></div>

      <div className="relative z-10 w-full max-w-md p-8 bg-dark-900/80 backdrop-blur-md border border-dark-800 rounded-2xl shadow-2xl">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-gold-500 rounded-lg mx-auto flex items-center justify-center text-3xl font-bold mb-4 shadow-lg shadow-gold-500/20">
            A
          </div>
          <h2 className="text-2xl font-bold text-white tracking-wide">ASF7 ADMIN</h2>
          <p className="text-gray-400 text-sm mt-2">Entre com suas credenciais de administrador</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-xs uppercase tracking-wider text-gold-500 font-medium mb-2">Email</label>
            <input 
              type="email" 
              value={email}
              onChange={e => setEmail(e.target.value)}
              className="w-full bg-dark-950 border border-dark-700 rounded-lg px-4 py-3 text-white focus:border-gold-500 focus:outline-none transition-colors"
              placeholder="admin@asf7.com"
            />
          </div>
          <div>
            <label className="block text-xs uppercase tracking-wider text-gold-500 font-medium mb-2">Senha</label>
            <input 
              type="password" 
              value={password}
              onChange={e => setPassword(e.target.value)}
              className="w-full bg-dark-950 border border-dark-700 rounded-lg px-4 py-3 text-white focus:border-gold-500 focus:outline-none transition-colors"
              placeholder="••••••••"
            />
          </div>

          <Button type="submit" size="lg" className="w-full">
            ENTRAR
          </Button>
        </form>

        <div className="mt-8 text-center">
          <a href="#" className="text-xs text-gray-500 hover:text-gold-500 transition-colors">Esqueceu a senha?</a>
        </div>
      </div>
    </div>
  );
};

export default Login;