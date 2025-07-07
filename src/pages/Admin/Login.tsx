import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useFakeAuth } from "../../hooks/useFakeAuth";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { login, isAuthenticated } = useFakeAuth();
  const navigate = useNavigate();

  // Redirect if already authenticated
  if (isAuthenticated) {
    navigate("/admin/dashboard");
    return null;
  }

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    
    if (!username || !password) {
      setError("Please enter both username and password");
      return;
    }

    const success = login(username, password);
    
    if (success) {
      navigate("/admin/dashboard");
    } else {
      setError("Invalid credentials. Try admin/1234");
    }
  };

  return (
    <div className="min-h-screen bg-forge-black flex flex-col justify-center items-center p-4">
      <div className="w-full max-w-md">
        <h1 className="text-3xl font-bold text-cool-cyan mb-8 text-center">Admin Login</h1>
        
        {error && (
          <div className="bg-ember-red/20 border border-ember-red text-white p-3 rounded-lg mb-4">
            {error}
          </div>
        )}
        
        <form onSubmit={handleLogin} className="space-y-4 bg-gunmetal-gray p-6 rounded-xl border border-cool-cyan/30 shadow-lg">
          <div>
            <label htmlFor="username" className="block text-chrome-silver mb-1">Username</label>
            <input 
              type="text" 
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="admin" 
              className="w-full px-4 py-2 bg-forge-black border border-cool-cyan/20 rounded text-chrome-silver focus:outline-none focus:border-cool-cyan transition" 
            />
          </div>
          
          <div>
            <label htmlFor="password" className="block text-chrome-silver mb-1">Password</label>
            <input 
              type="password" 
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••" 
              className="w-full px-4 py-2 bg-forge-black border border-cool-cyan/20 rounded text-chrome-silver focus:outline-none focus:border-cool-cyan transition" 
            />
          </div>
          
          <button 
            type="submit" 
            className="w-full bg-molten-orange text-white px-4 py-2 rounded hover:bg-ember-red transition-colors font-medium"
          >
            Login
          </button>
          
          <div className="text-xs text-chrome-silver/60 text-center mt-4">
            Use admin/1234 for demo access
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login; 