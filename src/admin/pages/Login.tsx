import React, { useState } from 'react';
import type { KeyboardEvent } from 'react';
import { useNavigate } from 'react-router-dom';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  const navigate = useNavigate();
  
  const handleLogin = () => {
    setError('');
    setIsLoading(true);
    
    // Simple validation
    if (!email || !password) {
      setError('Please enter both email and password');
      setIsLoading(false);
      return;
    }
    
    setTimeout(() => {
      if (email === 'admin@jatin.dev' && password === 'forge123') {
        // Set login status in localStorage
        localStorage.setItem('admin-auth', 'true');
        navigate('/admin');
      } else {
        setError('Invalid credentials');
      }
      setIsLoading(false);
    }, 500);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleLogin();
  };

  const handleKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleLogin();
    }
  };
  
  return (
    <div className="min-h-screen bg-forge-black flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-gunmetal-gray rounded-lg shadow-lg overflow-hidden">
        <div className="p-6 sm:p-8 space-y-6">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-cool-cyan">Admin Login</h1>
            <p className="text-steel-blue mt-2">Enter your credentials to access the admin panel</p>
          </div>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <div className="p-3 bg-ember-red/10 border border-ember-red/30 rounded-lg text-ember-red text-sm">
                {error}
              </div>
            )}
            
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-chrome-silver mb-1">
                Email
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onKeyPress={handleKeyPress}
                className="w-full px-4 py-2 bg-forge-black border border-cool-cyan/30 rounded-lg text-chrome-silver focus:outline-none focus:ring-2 focus:ring-cool-cyan"
                placeholder="Enter your email"
              />
            </div>
            
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-chrome-silver mb-1">
                Password
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onKeyPress={handleKeyPress}
                className="w-full px-4 py-2 bg-forge-black border border-cool-cyan/30 rounded-lg text-chrome-silver focus:outline-none focus:ring-2 focus:ring-cool-cyan"
                placeholder="Enter your password"
              />
            </div>
            
            <div className="pt-2">
              <button
                type="submit"
                disabled={isLoading}
                className={`w-full py-3 px-4 bg-molten-orange text-white font-medium rounded-lg hover:bg-ember-red transition ${
                  isLoading ? 'opacity-70 cursor-not-allowed' : ''
                }`}
              >
                {isLoading ? (
                  <span className="flex items-center justify-center">
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Logging in...
                  </span>
                ) : 'Login'}
              </button>
            </div>
          </form>
          
          <div className="text-center text-sm text-steel-blue">
            <p>For demo: email: admin@jatin.dev, password: forge123</p>
          </div>
        </div>
        
        <div className="py-4 px-6 bg-forge-black text-center">
          <a href="/" className="text-cool-cyan hover:text-molten-orange transition">
            &larr; Back to Portfolio
          </a>
        </div>
      </div>
    </div>
  );
};

export default Login; 