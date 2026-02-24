import { useEffect, useState } from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { getAdminToken, clearAdminToken } from '../../lib/auth';

export default function AdminLayout() {
  const navigate = useNavigate();
  const location = useLocation();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    const token = getAdminToken();
    if (!token) {
      navigate('/login', { replace: true });
      return;
    }
    if (location.pathname === '/admin') {
      navigate('/admin/appointments', { replace: true });
    }
  }, [mounted, navigate, location.pathname]);

  const token = mounted ? getAdminToken() : null;
  if (!mounted || !token) {
    return (
      <div className="min-h-screen bg-neutral-900 flex items-center justify-center">
        <p className="text-gray-400">Loading…</p>
      </div>
    );
  }

  const nav = [
    { to: '/admin/appointments', label: 'Appointments' },
    { to: '/admin/contact', label: 'Contact' },
  ];

  return (
    <div className="min-h-screen bg-neutral-900">
      <header className="border-b border-amber-600/20 bg-black/95 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <nav className="flex items-center gap-1">
              {nav.map(({ to, label }) => (
                <Link
                  key={to}
                  to={to}
                  className={`rounded-lg px-3 py-2 text-sm font-medium transition ${
                    location.pathname === to
                      ? 'bg-amber-500/20 text-amber-500'
                      : 'text-gray-400 hover:bg-neutral-800 hover:text-white'
                  }`}
                >
                  {label}
                </Link>
              ))}
            </nav>
            <div className="flex items-center gap-2">
              <Link to="/" className="rounded-lg px-3 py-2 text-sm text-gray-400 hover:text-white transition">
                Site
              </Link>
              <button
                type="button"
                onClick={() => {
                  clearAdminToken();
                  navigate('/login', { replace: true });
                }}
                className="rounded-lg px-3 py-2 text-sm text-gray-400 hover:text-white transition"
              >
                Log out
              </button>
            </div>
          </div>
        </div>
      </header>
      <Outlet />
    </div>
  );
}
