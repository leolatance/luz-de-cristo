
import React, { useState, useEffect } from 'react';
import { Sun, Cloud, Moon } from 'lucide-react';
import { getCurrentTimeOfDay, getPrayerByTimeOfDay } from '../data/content';

const DailyPrayers: React.FC = () => {
  const [currentTime, setCurrentTime] = useState(getCurrentTimeOfDay());
  const [currentPrayer, setCurrentPrayer] = useState(getPrayerByTimeOfDay(currentTime));

  useEffect(() => {
    const interval = setInterval(() => {
      const newTime = getCurrentTimeOfDay();
      setCurrentTime(newTime);
      setCurrentPrayer(getPrayerByTimeOfDay(newTime));
    }, 60000); // Check every minute

    return () => clearInterval(interval);
  }, []);

  const timeIcons = {
    morning: Sun,
    afternoon: Cloud,
    evening: Moon
  };

  const timeLabels = {
    morning: 'Manhã',
    afternoon: 'Tarde',
    evening: 'Noite'
  };

  const timeGreetings = {
    morning: 'Bom dia! Que este novo dia seja abençoado.',
    afternoon: 'Boa tarde! Que Deus renove suas forças.',
    evening: 'Boa noite! Que você tenha um descanso tranquilo.'
  };

  const Icon = timeIcons[currentTime];

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="text-center mb-6 sm:mb-8">
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-800 mb-2">
          Orações do Dia
        </h1>
        <p className="text-sm sm:text-base text-gray-600">{timeGreetings[currentTime]}</p>
      </div>

      {currentPrayer && (
        <div className="prayer-card max-w-2xl mx-auto">
          <div className="flex items-center justify-center mb-6">
            <div className="w-20 h-20 bg-gradient-to-br from-golden-400 to-golden-600 rounded-full flex items-center justify-center">
              <Icon size={32} className="text-white" />
            </div>
          </div>

          <h2 className="text-2xl font-bold text-center text-gray-800 mb-4">
            Oração da {timeLabels[currentTime]}
          </h2>

          <div className="bg-gradient-to-r from-heavenly-50 to-golden-50 p-6 rounded-xl mb-6">
            <p className="font-scripture text-lg text-gray-700 leading-relaxed text-center">
              {currentPrayer.content}
            </p>
          </div>

          <div className="text-center">
            <span className="inline-block bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-sm font-medium">
              {currentPrayer.category}
            </span>
          </div>
        </div>
      )}

      <div className="text-center text-gray-500 text-sm">
        <p>A oração muda automaticamente conforme o horário do dia</p>
      </div>
    </div>
  );
};

export default DailyPrayers;
