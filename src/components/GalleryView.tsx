import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';

const GalleryView: React.FC = () => {
  const { language } = useLanguage();

  return (
    <div className="min-h-screen bg-white pt-20">
      <div className="max-w-6xl mx-auto px-4 py-16">
        <div className="text-center">
          <h1 className="font-serif text-4xl font-semibold mb-4 text-gray-800">
            {language === 'bg' ? 'Галерия' : 'Gallery'}
          </h1>
          <p className="font-sans text-xl text-gray-600">
            {language === 'bg' 
              ? 'Скоро тук ще можете да видите нашите най-добри работи'
              : 'Soon you will be able to see our best work here'
            }
          </p>
        </div>
      </div>
    </div>
  );
};

export default GalleryView;