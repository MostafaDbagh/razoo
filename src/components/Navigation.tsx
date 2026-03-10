import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { getAdminToken } from '../lib/auth';

function Navigation() {
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);
  const isAdmin = !!getAdminToken();

  const navLinks = [
    { to: '/', label: 'Home' },
    { to: '/style', label: 'Style' },
    { to: '/about', label: 'About' },
    { to: '/book', label: 'Book' },
    { to: '/contact', label: 'Contact' },
  ];

  return (
    <nav className="fixed w-full bg-black z-50 border-b border-amber-600/20 md:bg-black/95 md:backdrop-blur-sm">
      <div className="max-w-9xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <Link to="/" className="flex items-center h-16 w-[190px] overflow-hidden hover:opacity-90 transition">
            <img src="/logo.png" alt="Barber2Door VIP Home Service" className="w-full h-full object-cover" />
          </Link>
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map(({ to, label }) => (
              <Link
                key={to}
                to={to}
                className={location.pathname === to ? 'text-amber-500 transition' : 'text-gray-300 hover:text-amber-500 transition'}
              >
                {label}
              </Link>
            ))}
            {isAdmin ? (
              <Link to="/admin/appointments" className="text-amber-500 hover:text-amber-400 transition text-sm font-medium">
                Dashboard
              </Link>
            ) : (
              <Link to="/login" className="text-gray-400 hover:text-amber-500 transition text-sm">
                Admin
              </Link>
            )}
            <Link to="/book" className="bg-amber-500 hover:bg-amber-600 text-black font-semibold px-6 py-2.5 rounded-lg transition">
              Book Now
            </Link>
          </div>
          <div className="flex md:hidden items-center gap-2">
            {location.pathname !== '/' && (
              <Link to="/book" className="bg-amber-500 hover:bg-amber-600 text-black font-semibold px-4 py-2 rounded-lg transition text-sm">
                Book Now
              </Link>
            )}
            <button
              type="button"
              onClick={() => setMobileOpen(!mobileOpen)}
              className="p-2 text-gray-300 hover:text-amber-500 transition"
              aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
            >
              {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>
      {mobileOpen && (
        <div className="md:hidden absolute top-20 left-0 right-0 bg-black border-b border-amber-600/20 py-4 px-4">
          <div className="flex flex-col space-y-1">
            {navLinks.map(({ to, label }) => (
              <Link
                key={to}
                to={to}
                onClick={() => setMobileOpen(false)}
                className={`block py-3 px-4 rounded-lg transition ${location.pathname === to ? 'text-amber-500 bg-amber-500/10' : 'text-gray-300 hover:text-amber-500 hover:bg-amber-500/5'}`}
              >
                {label}
              </Link>
            ))}
            {isAdmin ? (
              <Link
                to="/admin/appointments"
                onClick={() => setMobileOpen(false)}
                className="block py-3 px-4 rounded-lg text-amber-500 hover:bg-amber-500/5 transition font-medium"
              >
                Dashboard
              </Link>
            ) : (
              <Link
                to="/login"
                onClick={() => setMobileOpen(false)}
                className="block py-3 px-4 rounded-lg text-gray-400 hover:text-amber-500 hover:bg-amber-500/5 transition"
              >
                Admin
              </Link>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}

export default Navigation;
