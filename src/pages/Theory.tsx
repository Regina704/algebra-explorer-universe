
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, BookOpen, Circle, Lightbulb } from 'lucide-react';

const Theory = () => {
  const [activeSection, setActiveSection] = useState('definition');

  const sections = [
    { id: 'definition', title: 'Определения', icon: BookOpen },
    { id: 'notation', title: 'Обозначения', icon: Circle },
    { id: 'examples', title: 'Примеры', icon: Lightbulb },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      {/* Header */}
      <header className="bg-white shadow-lg">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center space-x-4">
            <Link to="/" className="text-indigo-600 hover:text-indigo-800 transition-colors">
              <ArrowLeft className="w-6 h-6" />
            </Link>
            <h1 className="text-2xl font-bold text-gray-800">Теоретические сведения</h1>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar */}
          <div className="lg:w-1/4">
            <div className="bg-white rounded-lg shadow-lg p-6 sticky top-8">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Содержание</h3>
              <nav className="space-y-2">
                {sections.map((section) => (
                  <button
                    key={section.id}
                    onClick={() => setActiveSection(section.id)}
                    className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-colors ${
                      activeSection === section.id
                        ? 'bg-indigo-100 text-indigo-700'
                        : 'text-gray-600 hover:bg-gray-100'
                    }`}
                  >
                    <section.icon className="w-5 h-5" />
                    <span>{section.title}</span>
                  </button>
                ))}
              </nav>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:w-3/4">
            <div className="bg-white rounded-lg shadow-lg p-8">
              {activeSection === 'definition' && (
                <div className="animate-fade-in">
                  <h2 className="text-3xl font-bold text-gray-800 mb-6">Основные определения</h2>
                  
                  <div className="space-y-8">
                    <div className="border-l-4 border-blue-500 pl-6">
                      <h3 className="text-xl font-semibold text-gray-800 mb-3">Множество</h3>
                      <p className="text-gray-600 mb-4">
                        <strong>Множество</strong> — это совокупность определённых и различимых между собой объектов, 
                        мыслимая как единое целое. Эти объекты называются элементами множества.
                      </p>
                      <div className="bg-blue-50 p-4 rounded-lg">
                        <p className="text-sm text-blue-800">
                          💡 <strong>Важно:</strong> Множество полностью определяется своими элементами. 
                          Порядок элементов не важен, каждый элемент входит в множество только один раз.
                        </p>
                      </div>
                    </div>

                    <div className="border-l-4 border-green-500 pl-6">
                      <h3 className="text-xl font-semibold text-gray-800 mb-3">Элемент множества</h3>
                      <p className="text-gray-600 mb-4">
                        <strong>Элемент множества</strong> — это объект, который принадлежит данному множеству.
                      </p>
                      <p className="text-gray-600 mb-4">
                        Если элемент <em>a</em> принадлежит множеству <em>A</em>, то пишут: <code className="bg-gray-100 px-2 py-1 rounded">a ∈ A</code>
                      </p>
                      <p className="text-gray-600">
                        Если элемент <em>b</em> не принадлежит множеству <em>A</em>, то пишут: <code className="bg-gray-100 px-2 py-1 rounded">b ∉ A</code>
                      </p>
                    </div>

                    <div className="border-l-4 border-purple-500 pl-6">
                      <h3 className="text-xl font-semibold text-gray-800 mb-3">Способы задания множеств</h3>
                      <div className="space-y-4">
                        <div>
                          <h4 className="font-semibold text-gray-700 mb-2">1. Перечисление элементов</h4>
                          <p className="text-gray-600 mb-2">Множество задается списком всех его элементов:</p>
                          <code className="bg-gray-100 px-3 py-2 rounded block">A = {'{1, 2, 3, 4, 5}'}</code>
                        </div>
                        <div>
                          <h4 className="font-semibold text-gray-700 mb-2">2. Описание характеристического свойства</h4>
                          <p className="text-gray-600 mb-2">Множество задается правилом или условием:</p>
                          <code className="bg-gray-100 px-3 py-2 rounded block">B = {'{x | x — четное натуральное число, x ≤ 10}'}</code>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeSection === 'notation' && (
                <div className="animate-fade-in">
                  <h2 className="text-3xl font-bold text-gray-800 mb-6">Обозначения и символы</h2>
                  
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <h3 className="text-xl font-semibold text-gray-800 mb-4">Основные символы</h3>
                      <div className="space-y-3">
                        <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                          <span className="font-mono text-lg">∈</span>
                          <span className="text-gray-600">принадлежит</span>
                        </div>
                        <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                          <span className="font-mono text-lg">∉</span>
                          <span className="text-gray-600">не принадлежит</span>
                        </div>
                        <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                          <span className="font-mono text-lg">⊂</span>
                          <span className="text-gray-600">подмножество</span>
                        </div>
                        <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                          <span className="font-mono text-lg">∅</span>
                          <span className="text-gray-600">пустое множество</span>
                        </div>
                        <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                          <span className="font-mono text-lg">∪</span>
                          <span className="text-gray-600">объединение</span>
                        </div>
                        <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                          <span className="font-mono text-lg">∩</span>
                          <span className="text-gray-600">пересечение</span>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-xl font-semibold text-gray-800 mb-4">Диаграмма Эйлера-Венна</h3>
                      <div className="bg-gray-50 p-6 rounded-lg">
                        <svg width="300" height="200" viewBox="0 0 300 200" className="mx-auto">
                          <defs>
                            <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
                              <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#e5e7eb" strokeWidth="1"/>
                            </pattern>
                          </defs>
                          <rect width="300" height="200" fill="url(#grid)" />
                          <rect x="20" y="20" width="260" height="160" fill="none" stroke="#374151" strokeWidth="2" rx="10" />
                          <circle cx="120" cy="100" r="50" fill="rgba(59, 130, 246, 0.3)" stroke="#3b82f6" strokeWidth="2" />
                          <circle cx="180" cy="100" r="50" fill="rgba(16, 185, 129, 0.3)" stroke="#10b981" strokeWidth="2" />
                          <text x="95" y="75" className="text-sm font-semibold" fill="#1f2937">A</text>
                          <text x="195" y="75" className="text-sm font-semibold" fill="#1f2937">B</text>
                          <text x="150" y="105" className="text-xs font-semibold" fill="#1f2937">A ∩ B</text>
                          <text x="30" y="40" className="text-sm font-semibold" fill="#1f2937">U</text>
                        </svg>
                        <p className="text-center text-sm text-gray-600 mt-2">
                          Диаграмма показывает два множества A и B и их пересечение
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeSection === 'examples' && (
                <div className="animate-fade-in">
                  <h2 className="text-3xl font-bold text-gray-800 mb-6">Примеры множеств</h2>
                  
                  <div className="space-y-8">
                    <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-lg">
                      <h3 className="text-xl font-semibold text-gray-800 mb-4">Пример 1: Множество цифр</h3>
                      <p className="text-gray-600 mb-3">Рассмотрим множество однозначных цифр:</p>
                      <code className="bg-white px-4 py-2 rounded block text-lg mb-4">A = {'{0, 1, 2, 3, 4, 5, 6, 7, 8, 9}'}</code>
                      <ul className="text-gray-600 space-y-1">
                        <li>• 5 ∈ A (5 принадлежит множеству A)</li>
                        <li>• 12 ∉ A (12 не принадлежит множеству A)</li>
                        <li>• |A| = 10 (мощность множества A равна 10)</li>
                      </ul>
                    </div>

                    <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-6 rounded-lg">
                      <h3 className="text-xl font-semibold text-gray-800 mb-4">Пример 2: Множество по правилу</h3>
                      <p className="text-gray-600 mb-3">Множество четных чисел от 2 до 10:</p>
                      <code className="bg-white px-4 py-2 rounded block text-lg mb-4">B = {'{x | x четное, 2 ≤ x ≤ 10}'}</code>
                      <p className="text-gray-600 mb-3">Перечислением это можно записать как:</p>
                      <code className="bg-white px-4 py-2 rounded block text-lg mb-4">B = {'{2, 4, 6, 8, 10}'}</code>
                    </div>

                    <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-6 rounded-lg">
                      <h3 className="text-xl font-semibold text-gray-800 mb-4">Пример 3: Подмножества</h3>
                      <p className="text-gray-600 mb-3">Пусть C = {'{a, b, c}'}. Тогда его подмножества:</p>
                      <div className="bg-white p-4 rounded-lg">
                        <ul className="text-gray-600 space-y-1">
                          <li>• ∅ (пустое множество)</li>
                          <li>• {'{a}'}, {'{b}'}, {'{c}'}</li>
                          <li>• {'{a, b}'}, {'{a, c}'}, {'{b, c}'}</li>
                          <li>• {'{a, b, c}'} (само множество)</li>
                        </ul>
                      </div>
                      <p className="text-gray-600 mt-3 text-sm">
                        Всего подмножеств: 2³ = 8
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Theory;
