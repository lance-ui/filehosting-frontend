import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../hooks/AuthContext';
import { Home, User, FileText, BookOpen } from 'lucide-react';

const Navigation = () => {
  const { user } = useAuth();
  const location = useLocation();

  const navItems = [
    { path: '/', label: 'Home', icon: Home },
    { path: '/auth', label: 'Auth', icon: User, hideIfLoggedIn: true },
    { path: '/dashboard', label: 'Dashboard', icon: FileText, requireAuth: true },
    { path: '/docs', label: 'Docs', icon: BookOpen },
  ];

  return (
    <nav className="bg-white shadow-sm border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">
              <Link to="/" className="text-xl font-bold text-blue-600">
                Lance UI
              </Link>
            </div>
            <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
              {navItems.map(({ path, label, icon: Icon, hideIfLoggedIn, requireAuth }) => {
                if (hideIfLoggedIn && user) return null;
                if (requireAuth && !user) return null;
                return (
                  <Link
                    key={path}
                    to={path}
                    className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium ${
                      location.pathname === path
                        ? 'border-blue-500 text-gray-900'
                        : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
                    }`}
                  >
                    <Icon className="w-4 h-4 mr-1" />
                    {label}
                  </Link>
                );
              })}
            </div>
          </div>
          {user && (
            <div className="flex items-center">
              <span className="text-sm text-gray-700">Welcome, {user.username}</span>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
