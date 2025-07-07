import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../../lib/supabase';

const AdminLogin: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        setError(error.message);
        return;
      }

      // Optionally fetch admin details to confirm role
      const { data: adminCheck, error: adminError } = await supabase
        .from('admins')
        .select('*')
        .eq('id', data.user?.id)
        .single();

      if (!adminCheck || adminError) {
        setError('Unauthorized user');
        await supabase.auth.signOut();
        return;
      }

      // Success — redirect to admin panel
      navigate('/admin');
    } catch (err) {
      setError('An unexpected error occurred');
      console.error('Login error:', err);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-forge-black py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-cool-cyan">
            Admin Login
          </h2>
        </div>
        
        <form className="mt-8 space-y-6" onSubmit={handleLogin}>
          {error && (
            <div className="bg-ember-red/10 border border-ember-red text-ember-red px-4 py-3 rounded relative" role="alert">
              <span className="block sm:inline">{error}</span>
            </div>
          )}
          
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="email-address" className="sr-only">
                Email address
              </label>
              <input
                id="email-address"
                name="email"
                type="email"
                autoComplete="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-cool-cyan/30 bg-forge-black placeholder-steel-blue text-chrome-silver rounded-t-md focus:outline-none focus:ring-cool-cyan focus:border-cool-cyan focus:z-10 sm:text-sm"
                placeholder="Email address"
              />
            </div>
            <div>
              <label htmlFor="password" className="sr-only">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-cool-cyan/30 bg-forge-black placeholder-steel-blue text-chrome-silver rounded-b-md focus:outline-none focus:ring-cool-cyan focus:border-cool-cyan focus:z-10 sm:text-sm"
                placeholder="Password"
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-cool-cyan hover:bg-cool-cyan/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cool-cyan"
            >
              Sign in
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin; 