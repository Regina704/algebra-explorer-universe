
import { Link } from 'react-router-dom';
import { Book, Brain, History, Settings, Calculator, Users } from 'lucide-react';

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      {/* Header */}
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
              <Link to="/admin" className="text-gray-600 hover:text-indigo-600 transition-colors">Админ</Link>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto text-center">
          <h2 className="text-5xl font-bold text-gray-800 mb-6 animate-fade-in">
            Множество. Элемент множества
          </h2>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto animate-fade-in">
            Изучайте основы теории множеств для 8 класса с интерактивными материалами, 
            задачами и тестами. Погрузитесь в мир математической логики!
          </p>
          <div className="flex flex-wrap justify-center gap-4 animate-fade-in">
            <Link to="/theory" className="bg-indigo-600 text-white px-8 py-3 rounded-lg hover:bg-indigo-700 transition-colors hover-scale">
              Начать обучение
            </Link>
            <Link to="/tests" className="bg-white text-indigo-600 border-2 border-indigo-600 px-8 py-3 rounded-lg hover:bg-indigo-50 transition-colors hover-scale">
              Пройти тест
            </Link>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <h3 className="text-3xl font-bold text-center text-gray-800 mb-12">Разделы курса</h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Theory Card */}
            <Link to="/theory" className="group">
              <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4 group-hover:bg-blue-200 transition-colors">
                  <Book className="w-6 h-6 text-blue-600" />
                </div>
                <h4 className="text-xl font-semibold text-gray-800 mb-2">Теория</h4>
                <p className="text-gray-600">Подробные объяснения, определения и примеры с диаграммами Эйлера-Венна</p>
              </div>
            </Link>

            {/* Problems Card */}
            <Link to="/problems" className="group">
              <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4 group-hover:bg-green-200 transition-colors">
                  <Brain className="w-6 h-6 text-green-600" />
                </div>
                <h4 className="text-xl font-semibold text-gray-800 mb-2">Задачи</h4>
                <p className="text-gray-600">Типовые задачи с подробными пошаговыми решениями</p>
              </div>
            </Link>

            {/* Tests Card */}
            <Link to="/tests" className="group">
              <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4 group-hover:bg-purple-200 transition-colors">
                  <Users className="w-6 h-6 text-purple-600" />
                </div>
                <h4 className="text-xl font-semibold text-gray-800 mb-2">Тесты</h4>
                <p className="text-gray-600">Интерактивные тесты для проверки знаний и самоконтроля</p>
              </div>
            </Link>

            {/* History Card */}
            <Link to="/history" className="group">
              <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
                <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mb-4 group-hover:bg-orange-200 transition-colors">
                  <History className="w-6 h-6 text-orange-600" />
                </div>
                <h4 className="text-xl font-semibold text-gray-800 mb-2">История</h4>
                <p className="text-gray-600">Увлекательная история развития теории множеств</p>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 px-4 bg-white">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-indigo-600 mb-2">15+</div>
              <div className="text-gray-600">Теоретических разделов</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-green-600 mb-2">25+</div>
              <div className="text-gray-600">Задач с решениями</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-purple-600 mb-2">10+</div>
              <div className="text-gray-600">Интерактивных тестов</div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-8 px-4">
        <div className="container mx-auto text-center">
          <div className="flex items-center justify-center space-x-3 mb-4">
            <Calculator className="w-6 h-6" />
            <span className="text-xl font-semibold">АлгебраТеория</span>
          </div>
          <p className="text-gray-400">Образовательная платформа по математике для 8 класса</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
