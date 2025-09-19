import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';

const LeadMagnetSection: React.FC = () => {
  const { language } = useLanguage();
  
  return (
    <section className="py-20 bg-amber-50">
      <div className="max-w-4xl mx-auto px-4 text-center">
        <h2 className="font-serif text-4xl font-semibold mb-4 text-gray-800">
          {language === 'bg' 
            ? 'Готови сте за вашия специален ден?'
            : 'Ready for your special day?'
          }
        </h2>
        <p className="font-sans text-xl text-gray-600 mb-8">
          {language === 'bg'
            ? 'Свържете се с нас за безплатна консултация и персонализирана оферта'
            : 'Contact us for a free consultation and personalized quote'
          }
        </p>
        <div className="bg-white p-8 rounded-lg shadow-lg max-w-md mx-auto">
          <form className="space-y-4">
            <input 
              id="name"
              name="name"
              type="text" 
              placeholder={language === 'bg' ? 'Вашето име' : 'Your name'}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 font-sans"
            />
            <input 
              id="email"
              name="email"
              type="email" 
              placeholder="Email"
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 font-sans"
            />
            <input 
              id="phone"
              name="phone"
              type="tel" 
              placeholder={language === 'bg' ? 'Телефон' : 'Phone'}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 font-sans"
            />
            <textarea 
              id="message"
              name="message"
              placeholder={language === 'bg' ? 'Вашето съобщение' : 'Your message'}
              rows={4}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 font-sans"
            ></textarea>
            <button 
              type="submit"
              className="w-full bg-amber-600 text-white py-3 rounded-lg hover:bg-amber-700 transition-colors duration-200 font-sans font-medium"
            >
              {language === 'bg' ? 'Изпрати съобщение' : 'Send Message'}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default LeadMagnetSection;