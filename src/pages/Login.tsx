import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginAdmin } from '../lib/api';
import { setAdminToken } from '../lib/auth';

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      const res = await loginAdmin(email.trim(), password);
      if (res.success && res.token) {
        setAdminToken(res.token);
        navigate('/admin/appointments', { replace: true });
        return;
      }
      setError(res.error ?? 'Login failed.');
    } catch {
      setError('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 flex items-center justify-center">
        <div className="w-full max-w-sm">
          <div className="bg-neutral-800 border border-amber-500/20 rounded-2xl p-8">
            <h1 className="text-2xl font-bold text-white text-center">Admin login</h1>
            <p className="mt-1 text-sm text-gray-400 text-center">Sign in to manage appointments and contacts.</p>
            <form onSubmit={handleSubmit} className="mt-6 space-y-4">
              {error && (
                <div className="rounded-lg border border-red-500/50 bg-red-500/10 px-3 py-2 text-sm text-red-400">
                  {error}
                </div>
              )}
              <div>
                <label className="block text-white font-medium mb-2">Email</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full bg-neutral-900 border border-amber-500/20 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-amber-500"
                  placeholder="admin@example.com"
                />
              </div>
              <div>
                <label className="block text-white font-medium mb-2">Password</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full bg-neutral-900 border border-amber-500/20 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-amber-500"
                />
              </div>
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-amber-500 hover:bg-amber-600 disabled:bg-gray-600 text-black font-semibold py-3 rounded-lg transition"
              >
                {loading ? 'Signing in…' : 'Sign in'}
              </button>
            </form>
            <p className="mt-6 text-center">
              <a href="/" className="text-sm text-gray-400 hover:text-amber-500">← Back to site</a>
            </p>
          </div>
        </div>
      </div>
  );
}
