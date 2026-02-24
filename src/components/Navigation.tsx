import { Scissors } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

function Navigation() {
  const location = useLocation();

  const navLinks = [
    { to: '/', label: 'Home' },
    { to: '/services', label: 'Services' },
    { to: '/style', label: 'Style' },
    { to: '/about', label: 'About' },
    { to: '/book', label: 'Book' },
    { to: '/contact', label: 'Contact' },
  ];

  return (
    <nav className="fixed w-full bg-black/95 backdrop-blur-sm z-50 border-b border-amber-600/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <Link to="/" className="flex items-center space-x-2 hover:opacity-80 transition">
            <Scissors className="h-8 w-8 text-amber-500" />
            <span className="text-2xl font-bold text-white">EliteGrooming</span>
          </Link>
          <div className="hidden md:flex space-x-8">
            {navLinks.map(({ to, label }) => (
              <Link
                key={to}
                to={to}
                className={location.pathname === to ? 'text-amber-500 transition' : 'text-gray-300 hover:text-amber-500 transition'}
              >
                {label}
              </Link>
            ))}
            <Link to="/login" className="text-gray-400 hover:text-amber-500 transition text-sm">
              Admin
            </Link>
          </div>
          <Link to="/book" className="bg-amber-500 hover:bg-amber-600 text-black font-semibold px-6 py-2.5 rounded-lg transition">
            Book Now
          </Link>
        </div>
      </div>
    </nav>
  );
}

export default Navigation;
