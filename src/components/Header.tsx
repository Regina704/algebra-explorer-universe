
import { Link } from 'react-router-dom';
import { Calculator, User, LogOut } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';

export function Header() {
  const { user, profile, signOut, isAdmin } = useAuth();

  return (
    <header className="bg-white shadow-lg">
      <div className="container mx-auto px-4 py-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Calculator className="w-8 h-8 text-indigo-600" />
            <h1 className="text-2xl font-bold text-gray-800">АлгебраТеория</h1>
          </div>
          
          <nav className="hidden md:flex space-x-6">
            <Link to="/theory" className="text-gray-600 hover:text-indigo-600 transition-colors">Теория</Link>
            <Link to="/problems" className="text-gray-600 hover:text-indigo-600 transition-colors">Задачи</Link>
            <Link to="/tests" className="text-gray-600 hover:text-indigo-600 transition-colors">Тесты</Link>
            <Link to="/history" className="text-gray-600 hover:text-indigo-600 transition-colors">История</Link>
            {isAdmin && (
              <Link to="/admin" className="text-gray-600 hover:text-indigo-600 transition-colors">Админ</Link>
            )}
          </nav>

          <div className="flex items-center space-x-4">
            {user ? (
              <div className="flex items-center space-x-3">
                <div className="flex items-center space-x-2">
                  <User className="w-4 h-4 text-gray-600" />
                  <span className="text-sm text-gray-600">{profile?.full_name || profile?.email}</span>
                  {isAdmin && <span className="bg-red-100 text-red-800 text-xs px-2 py-1 rounded">Админ</span>}
                </div>
                <Button
                  onClick={signOut}
                  variant="outline"
                  size="sm"
                  className="flex items-center space-x-2"
                >
                  <LogOut className="w-4 h-4" />
                  <span>Выйти</span>
                </Button>
              </div>
            ) : (
              <Link to="/auth">
                <Button variant="outline" className="flex items-center space-x-2">
                  <User className="w-4 h-4" />
                  <span>Войти</span>
                </Button>
              </Link>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
