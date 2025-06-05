
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Settings, User, Lock, Plus, Edit, Trash2, Save } from 'lucide-react';

interface ContentItem {
  id: number;
  type: 'theory' | 'problem' | 'test';
  title: string;
  content: string;
  lastModified: string;
}

const Admin = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loginData, setLoginData] = useState({ username: '', password: '' });
  const [activeSection, setActiveSection] = useState('overview');
  const [contentItems, setContentItems] = useState<ContentItem[]>([
    {
      id: 1,
      type: 'theory',
      title: 'Определение множества',
      content: 'Множество — это совокупность определённых и различимых между собой объектов...',
      lastModified: '2024-01-15'
    },
    {
      id: 2,
      type: 'problem',
      title: 'Принадлежность элементов',
      content: 'Дано множество A = {2, 4, 6, 8, 10}. Определите...',
      lastModified: '2024-01-14'
    },
    {
      id: 3,
      type: 'test',
      title: 'Тест по основам теории множеств',
      content: 'Что такое множество? a) Совокупность различных элементов...',
      lastModified: '2024-01-13'
    }
  ]);
  const [editingItem, setEditingItem] = useState<ContentItem | null>(null);
  const [newItem, setNewItem] = useState({ type: 'theory', title: '', content: '' });

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Простая проверка (в реальном приложении нужна серверная аутентификация)
    if (loginData.username === 'admin' && loginData.password === 'admin123') {
      setIsAuthenticated(true);
    } else {
      alert('Неверный логин или пароль');
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setLoginData({ username: '', password: '' });
    setActiveSection('overview');
  };

  const handleSaveItem = () => {
    if (editingItem) {
      setContentItems(items => 
        items.map(item => 
          item.id === editingItem.id 
            ? { ...editingItem, lastModified: new Date().toISOString().split('T')[0] }
            : item
        )
      );
      setEditingItem(null);
    }
  };

  const handleAddItem = () => {
    if (newItem.title && newItem.content) {
      const item: ContentItem = {
        id: Math.max(...contentItems.map(i => i.id)) + 1,
        type: newItem.type as 'theory' | 'problem' | 'test',
        title: newItem.title,
        content: newItem.content,
        lastModified: new Date().toISOString().split('T')[0]
      };
      setContentItems([...contentItems, item]);
      setNewItem({ type: 'theory', title: '', content: '' });
    }
  };

  const handleDeleteItem = (id: number) => {
    if (confirm('Вы уверены, что хотите удалить этот элемент?')) {
      setContentItems(items => items.filter(item => item.id !== id));
    }
  };

  const getTypeLabel = (type: string) => {
    switch (type) {
      case 'theory': return 'Теория';
      case 'problem': return 'Задача';
      case 'test': return 'Тест';
      default: return type;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'theory': return 'bg-blue-100 text-blue-800';
      case 'problem': return 'bg-green-100 text-green-800';
      case 'test': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex items-center justify-center">
        <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-md">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Lock className="w-8 h-8 text-indigo-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">Админ-панель</h2>
            <p className="text-gray-600">Войдите для управления контентом</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Логин
              </label>
              <input
                type="text"
                value={loginData.username}
                onChange={(e) => setLoginData({...loginData, username: e.target.value})}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="Введите логин"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Пароль
              </label>
              <input
                type="password"
                value={loginData.password}
                onChange={(e) => setLoginData({...loginData, password: e.target.value})}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="Введите пароль"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full bg-indigo-600 text-white py-3 rounded-lg hover:bg-indigo-700 transition-colors"
            >
              Войти
            </button>
          </form>

          <div className="mt-6 p-4 bg-blue-50 rounded-lg">
            <p className="text-sm text-blue-800">
              <strong>Демо-доступ:</strong><br />
              Логин: admin<br />
              Пароль: admin123
            </p>
          </div>

          <div className="mt-6 text-center">
            <Link to="/" className="text-indigo-600 hover:text-indigo-800 transition-colors">
              ← Вернуться на главную
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      {/* Header */}
      <header className="bg-white shadow-lg">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link to="/" className="text-indigo-600 hover:text-indigo-800 transition-colors">
                <ArrowLeft className="w-6 h-6" />
              </Link>
              <Settings className="w-8 h-8 text-indigo-600" />
              <h1 className="text-2xl font-bold text-gray-800">Админ-панель</h1>
            </div>
            <button
              onClick={handleLogout}
              className="flex items-center space-x-2 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors"
            >
              <User className="w-4 h-4" />
              <span>Выйти</span>
            </button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar */}
          <div className="lg:w-1/4">
            <div className="bg-white rounded-lg shadow-lg p-6 sticky top-8">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Разделы</h3>
              <nav className="space-y-2">
                {[
                  { id: 'overview', title: 'Обзор', icon: '📊' },
                  { id: 'content', title: 'Контент', icon: '📝' },
                  { id: 'add', title: 'Добавить', icon: '➕' },
                ].map((section) => (
                  <button
                    key={section.id}
                    onClick={() => setActiveSection(section.id)}
                    className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-colors ${
                      activeSection === section.id
                        ? 'bg-indigo-100 text-indigo-700'
                        : 'text-gray-600 hover:bg-gray-100'
                    }`}
                  >
                    <span>{section.icon}</span>
                    <span>{section.title}</span>
                  </button>
                ))}
              </nav>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:w-3/4">
            {activeSection === 'overview' && (
              <div className="space-y-6">
                <div className="bg-white rounded-lg shadow-lg p-8">
                  <h2 className="text-3xl font-bold text-gray-800 mb-6">Обзор системы</h2>
                  
                  <div className="grid md:grid-cols-3 gap-6 mb-8">
                    <div className="bg-blue-50 p-6 rounded-lg text-center">
                      <div className="text-3xl font-bold text-blue-600 mb-2">
                        {contentItems.filter(item => item.type === 'theory').length}
                      </div>
                      <div className="text-blue-800">Теоретических разделов</div>
                    </div>
                    <div className="bg-green-50 p-6 rounded-lg text-center">
                      <div className="text-3xl font-bold text-green-600 mb-2">
                        {contentItems.filter(item => item.type === 'problem').length}
                      </div>
                      <div className="text-green-800">Задач</div>
                    </div>
                    <div className="bg-purple-50 p-6 rounded-lg text-center">
                      <div className="text-3xl font-bold text-purple-600 mb-2">
                        {contentItems.filter(item => item.type === 'test').length}
                      </div>
                      <div className="text-purple-800">Тестов</div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h3 className="text-xl font-semibold text-gray-800">Последние изменения</h3>
                    {contentItems
                      .sort((a, b) => new Date(b.lastModified).getTime() - new Date(a.lastModified).getTime())
                      .slice(0, 3)
                      .map(item => (
                        <div key={item.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                          <div className="flex items-center space-x-3">
                            <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getTypeColor(item.type)}`}>
                              {getTypeLabel(item.type)}
                            </span>
                            <span className="font-medium text-gray-800">{item.title}</span>
                          </div>
                          <span className="text-sm text-gray-500">{item.lastModified}</span>
                        </div>
                      ))}
                  </div>
                </div>
              </div>
            )}

            {activeSection === 'content' && (
              <div className="bg-white rounded-lg shadow-lg p-8">
                <h2 className="text-3xl font-bold text-gray-800 mb-6">Управление контентом</h2>
                
                <div className="space-y-4">
                  {contentItems.map(item => (
                    <div key={item.id} className="border rounded-lg p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center space-x-3">
                          <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getTypeColor(item.type)}`}>
                            {getTypeLabel(item.type)}
                          </span>
                          <h3 className="text-lg font-semibold text-gray-800">{item.title}</h3>
                        </div>
                        <div className="flex space-x-2">
                          <button
                            onClick={() => setEditingItem(item)}
                            className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                          >
                            <Edit className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleDeleteItem(item.id)}
                            className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                      
                      {editingItem?.id === item.id ? (
                        <div className="space-y-4">
                          <input
                            type="text"
                            value={editingItem.title}
                            onChange={(e) => setEditingItem({...editingItem, title: e.target.value})}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                          />
                          <textarea
                            value={editingItem.content}
                            onChange={(e) => setEditingItem({...editingItem, content: e.target.value})}
                            rows={6}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                          />
                          <div className="flex space-x-3">
                            <button
                              onClick={handleSaveItem}
                              className="flex items-center space-x-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
                            >
                              <Save className="w-4 h-4" />
                              <span>Сохранить</span>
                            </button>
                            <button
                              onClick={() => setEditingItem(null)}
                              className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                            >
                              Отмена
                            </button>
                          </div>
                        </div>
                      ) : (
                        <div>
                          <p className="text-gray-600 mb-2">{item.content.slice(0, 150)}...</p>
                          <p className="text-sm text-gray-500">Изменено: {item.lastModified}</p>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeSection === 'add' && (
              <div className="bg-white rounded-lg shadow-lg p-8">
                <h2 className="text-3xl font-bold text-gray-800 mb-6">Добавить новый контент</h2>
                
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Тип контента
                    </label>
                    <select
                      value={newItem.type}
                      onChange={(e) => setNewItem({...newItem, type: e.target.value})}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                    >
                      <option value="theory">Теория</option>
                      <option value="problem">Задача</option>
                      <option value="test">Тест</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Заголовок
                    </label>
                    <input
                      type="text"
                      value={newItem.title}
                      onChange={(e) => setNewItem({...newItem, title: e.target.value})}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                      placeholder="Введите заголовок"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Содержание
                    </label>
                    <textarea
                      value={newItem.content}
                      onChange={(e) => setNewItem({...newItem, content: e.target.value})}
                      rows={8}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                      placeholder="Введите содержание"
                    />
                  </div>

                  <button
                    onClick={handleAddItem}
                    className="flex items-center space-x-2 bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 transition-colors"
                  >
                    <Plus className="w-5 h-5" />
                    <span>Добавить контент</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Admin;
