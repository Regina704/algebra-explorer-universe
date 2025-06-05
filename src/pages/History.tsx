
import { Link } from 'react-router-dom';
import { ArrowLeft, History as HistoryIcon, User, Calendar, Lightbulb } from 'lucide-react';

const History = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      {/* Header */}
      <header className="bg-white shadow-lg">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center space-x-4">
            <Link to="/" className="text-indigo-600 hover:text-indigo-800 transition-colors">
              <ArrowLeft className="w-6 h-6" />
            </Link>
            <HistoryIcon className="w-8 h-8 text-orange-600" />
            <h1 className="text-2xl font-bold text-gray-800">История теории множеств</h1>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Hero Section */}
          <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
            <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
              Увлекательная история развития теории множеств
            </h2>
            <p className="text-lg text-gray-600 text-center max-w-3xl mx-auto">
              Познакомьтесь с удивительной историей одного из важнейших разделов математики, 
              который изменил наше понимание бесконечности и основ математики.
            </p>
          </div>

          {/* Timeline */}
          <div className="space-y-8">
            {/* Georg Cantor */}
            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
              <div className="md:flex">
                <div className="md:w-1/3 bg-gradient-to-br from-blue-500 to-indigo-600 p-8 text-white">
                  <div className="text-center">
                    <div className="w-24 h-24 bg-white bg-opacity-20 rounded-full flex items-center justify-center mx-auto mb-4">
                      <User className="w-12 h-12" />
                    </div>
                    <h3 className="text-2xl font-bold mb-2">Георг Кантор</h3>
                    <div className="flex items-center justify-center space-x-2 mb-4">
                      <Calendar className="w-4 h-4" />
                      <span>1845-1918</span>
                    </div>
                    <p className="text-sm opacity-90">Основатель теории множеств</p>
                  </div>
                </div>
                <div className="md:w-2/3 p-8">
                  <h4 className="text-xl font-semibold text-gray-800 mb-4">Создатель теории множеств</h4>
                  <div className="space-y-4 text-gray-600">
                    <p>
                      <strong>Георг Кантор</strong> — немецкий математик, создавший теорию множеств в конце XIX века. 
                      Его работы произвели революцию в математике и философии.
                    </p>
                    <div className="bg-blue-50 p-4 rounded-lg">
                      <h5 className="font-semibold text-blue-800 mb-2">Ключевые достижения:</h5>
                      <ul className="space-y-1 text-blue-700">
                        <li>• Определил понятие множества как "совокупности объектов"</li>
                        <li>• Разработал теорию бесконечных множеств</li>
                        <li>• Доказал, что существуют разные "размеры" бесконечности</li>
                        <li>• Создал диагональный метод доказательства</li>
                      </ul>
                    </div>
                    <blockquote className="border-l-4 border-indigo-500 pl-4 italic text-gray-700">
                      "Сущность математики заключается в её свободе"
                      <footer className="text-sm text-gray-500 mt-1">— Георг Кантор</footer>
                    </blockquote>
                  </div>
                </div>
              </div>
            </div>

            {/* Development Timeline */}
            <div className="bg-white rounded-lg shadow-lg p-8">
              <h3 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
                <Calendar className="w-6 h-6 mr-3 text-orange-600" />
                Хронология развития
              </h3>
              
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-20 text-right">
                    <span className="text-sm font-semibold text-indigo-600">1874 год</span>
                  </div>
                  <div className="flex-shrink-0 w-4 h-4 bg-indigo-600 rounded-full mt-1"></div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-gray-800">Первая публикация</h4>
                    <p className="text-gray-600">Кантор публикует первую работу о множествах, доказывая несчётность действительных чисел.</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-20 text-right">
                    <span className="text-sm font-semibold text-green-600">1878 год</span>
                  </div>
                  <div className="flex-shrink-0 w-4 h-4 bg-green-600 rounded-full mt-1"></div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-gray-800">Гипотеза континуума</h4>
                    <p className="text-gray-600">Формулировка знаменитой гипотезы континуума о мощности множества действительных чисел.</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-20 text-right">
                    <span className="text-sm font-semibold text-purple-600">1895-1897</span>
                  </div>
                  <div className="flex-shrink-0 w-4 h-4 bg-purple-600 rounded-full mt-1"></div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-gray-800">Трансфинитные числа</h4>
                    <p className="text-gray-600">Разработка теории трансфинитных (бесконечных) чисел и ординалов.</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-20 text-right">
                    <span className="text-sm font-semibold text-red-600">1900 год</span>
                  </div>
                  <div className="flex-shrink-0 w-4 h-4 bg-red-600 rounded-full mt-1"></div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-gray-800">Парадоксы множеств</h4>
                    <p className="text-gray-600">Обнаружение парадоксов в наивной теории множеств (парадокс Рассела и др.).</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-20 text-right">
                    <span className="text-sm font-semibold text-blue-600">1908 год</span>
                  </div>
                  <div className="flex-shrink-0 w-4 h-4 bg-blue-600 rounded-full mt-1"></div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-gray-800">Аксиоматическая теория</h4>
                    <p className="text-gray-600">Цермело создаёт первую аксиоматическую систему для теории множеств.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Interesting Facts */}
            <div className="bg-white rounded-lg shadow-lg p-8">
              <h3 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
                <Lightbulb className="w-6 h-6 mr-3 text-yellow-600" />
                Интересные факты
              </h3>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-yellow-50 p-6 rounded-lg">
                  <h4 className="font-semibold text-yellow-800 mb-3">🏨 Парадокс Гильберта</h4>
                  <p className="text-yellow-700 text-sm">
                    Знаменитый мысленный эксперимент с бесконечным отелем демонстрирует 
                    удивительные свойства бесконечных множеств.
                  </p>
                </div>
                
                <div className="bg-green-50 p-6 rounded-lg">
                  <h4 className="font-semibold text-green-800 mb-3">♾️ Размеры бесконечности</h4>
                  <p className="text-green-700 text-sm">
                    Кантор доказал, что существует бесконечно много различных "размеров" 
                    бесконечности — разных мощностей множеств.
                  </p>
                </div>
                
                <div className="bg-blue-50 p-6 rounded-lg">
                  <h4 className="font-semibold text-blue-800 mb-3">🎭 Диаграммы Венна</h4>
                  <p className="text-blue-700 text-sm">
                    Джон Венн в 1880 году предложил графический способ представления 
                    множеств, который мы используем до сих пор.
                  </p>
                </div>
                
                <div className="bg-purple-50 p-6 rounded-lg">
                  <h4 className="font-semibold text-purple-800 mb-3">🏛️ Влияние на науку</h4>
                  <p className="text-purple-700 text-sm">
                    Теория множеств стала основой современной математики и повлияла 
                    на логику, философию и информатику.
                  </p>
                </div>
              </div>
            </div>

            {/* Modern Applications */}
            <div className="bg-white rounded-lg shadow-lg p-8">
              <h3 className="text-2xl font-bold text-gray-800 mb-6">Современные применения</h3>
              
              <div className="grid md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl">💻</span>
                  </div>
                  <h4 className="font-semibold text-gray-800 mb-2">Информатика</h4>
                  <p className="text-gray-600 text-sm">
                    Базы данных, алгоритмы поиска, структуры данных
                  </p>
                </div>
                
                <div className="text-center">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl">🧬</span>
                  </div>
                  <h4 className="font-semibold text-gray-800 mb-2">Биология</h4>
                  <p className="text-gray-600 text-sm">
                    Классификация видов, генетические исследования
                  </p>
                </div>
                
                <div className="text-center">
                  <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl">📊</span>
                  </div>
                  <h4 className="font-semibold text-gray-800 mb-2">Статистика</h4>
                  <p className="text-gray-600 text-sm">
                    Теория вероятностей, анализ данных
                  </p>
                </div>
              </div>
            </div>

            {/* Quote */}
            <div className="bg-gradient-to-r from-indigo-500 to-purple-600 rounded-lg shadow-lg p-8 text-white text-center">
              <blockquote className="text-xl italic mb-4">
                "В математике искусство ставить вопросы важнее, чем искусство их решать."
              </blockquote>
              <footer className="text-indigo-200">— Георг Кантор</footer>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default History;
