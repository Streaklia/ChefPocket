import React, { useState } from 'react';
import { Lock } from 'lucide-react';

interface LoginProps {
  onLogin: () => void;
}

const Login: React.FC<LoginProps> = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (username.toLowerCase() === 'taha' && password === 'taha') {
      onLogin();
    } else {
      setError('Invalid credentials');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white px-6">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <div className="bg-brand-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
            <Lock className="text-brand-600" size={28} />
          </div>
          <h2 className="text-2xl font-bold text-gray-900">Admin Login</h2>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="block w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-brand-500 focus:border-brand-500 outline-none"
            placeholder="Username"
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="block w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-brand-500 focus:border-brand-500 outline-none"
            placeholder="Password"
          />
          
          {error && <p className="text-red-500 text-sm text-center">{error}</p>}

          <button
            type="submit"
            className="w-full py-4 bg-brand-600 text-white rounded-xl font-bold shadow-lg shadow-brand-200"
          >
            Sign In
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;