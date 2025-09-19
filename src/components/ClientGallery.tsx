import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../contexts/LanguageContext';
import { Lock, Shield, FileText, HardDrive, Check, X } from 'lucide-react';

const ClientGallery: React.FC = () => {
  const { language } = useLanguage();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loginForm, setLoginForm] = useState({ code: '', email: '' });
  const [error, setError] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Simple demo authentication
    if (loginForm.code === 'DEMO2024' && loginForm.email) {
      setIsAuthenticated(true);
      setError('');
    } else {
      setError(language === 'bg' ? 'Невалиден код или имейл' : 'Invalid code or email');
    }
  };

  const features = [
    {
      icon: Shield,
      title: language === 'bg' ? 'Сигурност' : 'Security',
      description: language === 'bg' 
        ? 'Вашите снимки са защитени с парола'
        : 'Your photos are password protected'
    },
    {
      icon: HardDrive,
      title: language === 'bg' ? 'Висококачествени файлове' : 'High Quality Files',
      description: language === 'bg'
        ? 'Изтегляне в пълна резолюция'
        : 'Download in full resolution'
    },
    {
      icon: FileText,
      title: language === 'bg' ? 'Лесно споделяне' : 'Easy Sharing',
      description: language === 'bg'
        ? 'Споделете с приятели и семейство'
        : 'Share with friends and family'
    }
  ];

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-50 pt-20">
        <div className="max-w-md mx-auto px-4 py-16">
          <motion.div
            className="bg-white rounded-lg shadow-lg p-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Lock className="w-8 h-8 text-amber-600" />
              </div>
              <h1 className="font-serif text-2xl font-semibold mb-2 text-gray-800">
                {language === 'bg' ? 'Клиентска зона' : 'Client Area'}
              </h1>
              <p className="font-sans text-gray-600">
                {language === 'bg' 
                  ? 'Въведете вашия код за достъп до снимките'
                  : 'Enter your access code to view your photos'
                }
              </p>
            </div>

            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="block font-sans text-sm font-medium text-gray-700 mb-2">
                  {language === 'bg' ? 'Код за достъп' : 'Access Code'}
                </label>
                <input
                  type="text"
                  value={loginForm.code}
                  onChange={(e) => setLoginForm({ ...loginForm, code: e.target.value })}
                  placeholder={language === 'bg' ? 'Въведете кода' : 'Enter code'}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 font-sans"
                  required
                />
              </div>
              
              <div>
                <label className="block font-sans text-sm font-medium text-gray-700 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  value={loginForm.email}
                  onChange={(e) => setLoginForm({ ...loginForm, email: e.target.value })}
                  placeholder={language === 'bg' ? 'Въведете имейла си' : 'Enter your email'}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 font-sans"
                  required
                />
              </div>

              {error && (
                <div className="flex items-center gap-2 text-red-600 text-sm">
                  <X className="w-4 h-4" />
                  {error}
                </div>
              )}

              <button
                type="submit"
                className="w-full bg-amber-600 text-white py-3 rounded-lg font-sans font-medium hover:bg-amber-700 transition-colors duration-200"
              >
                {language === 'bg' ? 'Влез' : 'Login'}
              </button>
            </form>

            <div className="mt-8 pt-6 border-t border-gray-200">
              <p className="font-sans text-sm text-gray-500 text-center mb-4">
                {language === 'bg' ? 'За демо използвайте:' : 'For demo use:'}
              </p>
              <div className="bg-gray-50 p-3 rounded text-center">
                <div className="font-sans text-sm">
                  <strong>{language === 'bg' ? 'Код:' : 'Code:'}</strong> DEMO2024<br />
                  <strong>Email:</strong> demo@example.com
                </div>
              </div>
            </div>
          </motion.div>

          <div className="mt-12 grid gap-6">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                className="flex items-center gap-4 bg-white p-4 rounded-lg shadow-sm"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <div className="w-10 h-10 bg-amber-100 rounded-lg flex items-center justify-center">
                  <feature.icon className="w-5 h-5 text-amber-600" />
                </div>
                <div>
                  <h3 className="font-sans font-medium text-gray-800">{feature.title}</h3>
                  <p className="font-sans text-sm text-gray-600">{feature.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="max-w-6xl mx-auto px-4 py-8">
        <motion.div
          className="text-center mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-center justify-center gap-2 mb-4">
            <Check className="w-6 h-6 text-green-600" />
            <h1 className="font-serif text-3xl font-semibold text-gray-800">
              {language === 'bg' ? 'Добре дошли в клиентската зона' : 'Welcome to Client Area'}
            </h1>
          </div>
          <p className="font-sans text-gray-600">
            {language === 'bg' 
              ? 'Вашите снимки са готови за изтегляне'
              : 'Your photos are ready for download'
            }
          </p>
        </motion.div>

        <div className="bg-white rounded-lg shadow-lg p-8">
          <div className="text-center">
            <h2 className="font-serif text-2xl font-semibold mb-4 text-gray-800">
              {language === 'bg' ? 'Демо галерия' : 'Demo Gallery'}
            </h2>
            <p className="font-sans text-gray-600 mb-8">
              {language === 'bg' 
                ? 'Това е демо версия на клиентската зона. В реалната версия тук ще видите вашите снимки.'
                : 'This is a demo version of the client area. In the real version you will see your photos here.'
              }
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              {[1, 2, 3, 4, 5, 6].map((item) => (
                <div key={item} className="aspect-square bg-gray-200 rounded-lg flex items-center justify-center">
                  <span className="font-sans text-gray-500">
                    {language === 'bg' ? 'Снимка' : 'Photo'} {item}
                  </span>
                </div>
              ))}
            </div>

            <button
              onClick={() => setIsAuthenticated(false)}
              className="bg-gray-600 text-white px-6 py-3 rounded-lg font-sans font-medium hover:bg-gray-700 transition-colors duration-200"
            >
              {language === 'bg' ? 'Излез' : 'Logout'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClientGallery;