
import React, { useState } from 'react';
import { Search, Heart } from 'lucide-react';
import { prayers } from '../data/content';

const AllPrayers: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Todas');

  const categories = ['Todas', ...Array.from(new Set(prayers.map(p => p.category)))];

  const filteredPrayers = prayers.filter(prayer => {
    const matchesSearch = prayer.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         prayer.content.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'Todas' || prayer.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="text-center mb-6 sm:mb-8">
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-800 mb-2">
          Todas as Orações
        </h1>
        <p className="text-sm sm:text-base text-gray-600">Encontre a oração perfeita para cada momento</p>
      </div>

      {/* Search and Filter */}
      <div className="space-y-4 mb-8">
        <div className="relative">
          <Search size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Buscar orações..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 placeholder-gray-500"
          />
        </div>

        <div className="flex flex-wrap gap-2">
          {categories.map(category => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                selectedCategory === category
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-blue-100 hover:text-blue-700'
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {/* Prayer Cards */}
      <div className="grid gap-4 sm:gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {filteredPrayers.map(prayer => (
          <div key={prayer.id} className="prayer-card">
            <div className="flex items-start justify-between mb-4">
              <h3 className="text-xl font-bold text-gray-800">{prayer.title}</h3>
              <Heart size={20} className="text-golden-500 flex-shrink-0 ml-2" />
            </div>

            <div className="bg-gradient-to-r from-heavenly-50 to-golden-50 p-4 rounded-lg mb-4">
              <p className="font-scripture text-gray-700 leading-relaxed">
                {prayer.content}
              </p>
            </div>

            <div className="flex justify-between items-center">
              <span className="inline-block bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
                {prayer.category}
              </span>
              {prayer.timeOfDay && (
                <span className="text-sm text-gray-500 capitalize">
                  {prayer.timeOfDay === 'morning' ? 'Manhã' : 
                   prayer.timeOfDay === 'afternoon' ? 'Tarde' : 'Noite'}
                </span>
              )}
            </div>
          </div>
        ))}
      </div>

      {filteredPrayers.length === 0 && (
        <div className="text-center text-gray-500 py-12">
          <p>Nenhuma oração encontrada com os critérios selecionados.</p>
        </div>
      )}
    </div>
  );
};

export default AllPrayers;
