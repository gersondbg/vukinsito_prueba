import { Link, useLocation } from 'react-router-dom';
import { Home, Search, LayoutDashboard, Shield, User, Menu, X } from 'lucide-react';
import type { UserRole } from '../App';
import { useState } from 'react';

interface HeaderProps {
  userRole: UserRole;
  setUserRole: (role: UserRole) => void;
}

export function Header({ userRole, setUserRole }: HeaderProps) {
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const isActive = (path: string) => location.pathname === path;

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
              <span className="text-white">V</span>
            </div>
            <span className="text-xl text-gray-900">VUKINSITO</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-6">
            <Link
              to="/"
              className={`flex items-center gap-2 ${
                isActive('/') ? 'text-blue-600' : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <Home className="w-5 h-5" />
              <span>Inicio</span>
            </Link>
            <Link
              to="/search"
              className={`flex items-center gap-2 ${
                isActive('/search') ? 'text-blue-600' : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <Search className="w-5 h-5" />
              <span>Buscar</span>
            </Link>
            {userRole === 'owner' && (
              <Link
                to="/dashboard"
                className={`flex items-center gap-2 ${
                  isActive('/dashboard') ? 'text-blue-600' : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                <LayoutDashboard className="w-5 h-5" />
                <span>Mi Dashboard</span>
              </Link>
            )}
            {userRole === 'admin' && (
              <Link
                to="/admin"
                className={`flex items-center gap-2 ${
                  isActive('/admin') ? 'text-blue-600' : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                <Shield className="w-5 h-5" />
                <span>Admin</span>
              </Link>
            )}
          </nav>

          <div className="flex items-center gap-4">
            <select
              value={userRole}
              onChange={(e) => setUserRole(e.target.value as UserRole)}
              className="px-3 py-2 border border-gray-300 rounded-lg text-sm"
            >
              <option value="guest">Huésped</option>
              <option value="owner">Propietario</option>
              <option value="admin">Administrador</option>
            </select>
            <button className="hidden sm:flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
              <User className="w-5 h-5" />
              <span className="hidden sm:inline">Cuenta</span>
            </button>
            
            {/* Mobile menu button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-gray-600"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-200">
            <nav className="flex flex-col gap-4">
              <Link
                to="/"
                onClick={() => setMobileMenuOpen(false)}
                className={`flex items-center gap-2 ${
                  isActive('/') ? 'text-blue-600' : 'text-gray-600'
                }`}
              >
                <Home className="w-5 h-5" />
                <span>Inicio</span>
              </Link>
              <Link
                to="/search"
                onClick={() => setMobileMenuOpen(false)}
                className={`flex items-center gap-2 ${
                  isActive('/search') ? 'text-blue-600' : 'text-gray-600'
                }`}
              >
                <Search className="w-5 h-5" />
                <span>Buscar</span>
              </Link>
              {userRole === 'owner' && (
                <Link
                  to="/dashboard"
                  onClick={() => setMobileMenuOpen(false)}
                  className={`flex items-center gap-2 ${
                    isActive('/dashboard') ? 'text-blue-600' : 'text-gray-600'
                  }`}
                >
                  <LayoutDashboard className="w-5 h-5" />
                  <span>Mi Dashboard</span>
                </Link>
              )}
              {userRole === 'admin' && (
                <Link
                  to="/admin"
                  onClick={() => setMobileMenuOpen(false)}
                  className={`flex items-center gap-2 ${
                    isActive('/admin') ? 'text-blue-600' : 'text-gray-600'
                  }`}
                >
                  <Shield className="w-5 h-5" />
                  <span>Admin</span>
                </Link>
              )}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}