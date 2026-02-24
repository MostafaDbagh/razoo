import { Scissors } from 'lucide-react';
import { useLocation } from 'react-router-dom';

function Navigation() {
  const location = useLocation();

  return (
    <nav className="fixed w-full bg-black/95 backdrop-blur-sm z-50 border-b border-amber-600/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <a href="/" className="flex items-center space-x-2 hover:opacity-80 transition">
            <Scissors className="h-8 w-8 text-amber-500" />
            <span className="text-2xl font-bold text-white">EliteGrooming</span>
          </a>
          <div className="hidden md:flex space-x-8">
            <a href="/" className={`transition ${location.pathname === '/' ? 'text-amber-500' : 'text-gray-300 hover:text-amber-500'}`}>
              Home
            </a>
            <a href="#services" className="text-gray-300 hover:text-amber-500 transition">Services</a>
            <a href="#about" className="text-gray-300 hover:text-amber-500 transition">About</a>
            <a href="#pricing" className="text-gray-300 hover:text-amber-500 transition">Pricing</a>
            <a href="/contact" className={`transition ${location.pathname === '/contact' ? 'text-amber-500' : 'text-gray-300 hover:text-amber-500'}`}>
              Contact
            </a>
          </div>
          <a href="/contact" className="bg-amber-500 hover:bg-amber-600 text-black font-semibold px-6 py-2.5 rounded-lg transition">
            Book Now
          </a>
        </div>
      </div>
    </nav>
  );
}

export default Navigation;
