import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';

const WhatsAppButton = () => {
  const { language } = useLanguage();
  const message = language === 'bg' 
    ? 'Здравейте! Интересувам се от вашите услуги за сватбена фотография.'
    : 'Hello! I am interested in your wedding photography services.';
  
  return (
    <a 
      href={`https://wa.me/359888888888?text=${encodeURIComponent(message)}`}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-8 right-8 bg-green-500 text-white p-4 rounded-full shadow-lg hover:bg-green-600 transition z-50 animate-pulse"
      title={language === 'bg' ? 'Свържете се с нас в WhatsApp' : 'Contact us on WhatsApp'}
    >
      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.149-.67.149-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/>
      </svg>
    </a>
  );
};

export default WhatsAppButton;