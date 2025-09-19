import React from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../contexts/LanguageContext';
import { Phone, Mail, MapPin, Instagram, Facebook } from 'lucide-react';

const ContactSection: React.FC = () => {
  const { language } = useLanguage();

  const contactInfo = [
    {
      icon: Phone,
      label: language === 'bg' ? 'Телефон' : 'Phone',
      value: '+359 888 123 456',
      href: 'tel:+359888123456'
    },
    {
      icon: Mail,
      label: 'Email',
      value: 'info@evermoreweddings.bg',
      href: 'mailto:info@evermoreweddings.bg'
    },
    {
      icon: MapPin,
      label: language === 'bg' ? 'Локация' : 'Location',
      value: language === 'bg' ? 'Плевен, България' : 'Pleven, Bulgaria',
      href: '#'
    }
  ];

  const socialLinks = [
    {
      icon: Instagram,
      label: 'Instagram',
      href: 'https://instagram.com/evermoreweddings'
    },
    {
      icon: Facebook,
      label: 'Facebook',
      href: 'https://facebook.com/evermoreweddings'
    }
  ];

  return (
    <section id="contact" className="py-20 bg-gray-900 text-white">
      <div className="max-w-6xl mx-auto px-4">
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="font-serif text-4xl font-semibold mb-4">
            {language === 'bg' ? 'Свържете се с нас' : 'Get in Touch'}
          </h2>
          <p className="font-sans text-xl text-gray-300">
            {language === 'bg' 
              ? 'Готови сме да създадем магията на вашия специален ден'
              : 'Ready to create the magic of your special day'
            }
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <form className="space-y-6">
              <div className="grid md:grid-cols-2 gap-4">
                <input
                  type="text"
                  placeholder={language === 'bg' ? 'Име' : 'Name'}
                  className="w-full p-4 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 text-white font-sans"
                />
                <input
                  type="email"
                  placeholder="Email"
                  className="w-full p-4 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 text-white font-sans"
                />
              </div>
              <input
                type="tel"
                placeholder={language === 'bg' ? 'Телефон' : 'Phone'}
                className="w-full p-4 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 text-white font-sans"
              />
              <input
                type="date"
                placeholder={language === 'bg' ? 'Дата на сватбата' : 'Wedding Date'}
                className="w-full p-4 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 text-white font-sans"
              />
              <textarea
                rows={4}
                placeholder={language === 'bg' ? 'Разкажете ни за вашата сватба...' : 'Tell us about your wedding...'}
                className="w-full p-4 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 text-white font-sans"
              ></textarea>
              <button
                type="submit"
                className="w-full bg-amber-600 text-white py-4 rounded-lg font-sans font-medium hover:bg-amber-700 transition-colors duration-200"
              >
                {language === 'bg' ? 'Изпрати съобщение' : 'Send Message'}
              </button>
            </form>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <div>
              <h3 className="font-serif text-2xl font-semibold mb-6">
                {language === 'bg' ? 'Информация за контакт' : 'Contact Information'}
              </h3>
              <div className="space-y-4">
                {contactInfo.map((item, index) => (
                  <a
                    key={index}
                    href={item.href}
                    className="flex items-center gap-4 text-gray-300 hover:text-amber-500 transition-colors duration-200"
                  >
                    <div className="w-12 h-12 bg-gray-800 rounded-lg flex items-center justify-center">
                      <item.icon className="w-6 h-6" />
                    </div>
                    <div>
                      <div className="font-sans text-sm text-gray-400">{item.label}</div>
                      <div className="font-sans">{item.value}</div>
                    </div>
                  </a>
                ))}
              </div>
            </div>

            <div>
              <h3 className="font-serif text-2xl font-semibold mb-6">
                {language === 'bg' ? 'Последвайте ни' : 'Follow Us'}
              </h3>
              <div className="flex gap-4">
                {socialLinks.map((social, index) => (
                  <a
                    key={index}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-12 h-12 bg-gray-800 rounded-lg flex items-center justify-center text-gray-300 hover:text-amber-500 hover:bg-gray-700 transition-all duration-200"
                    aria-label={social.label}
                  >
                    <social.icon className="w-6 h-6" />
                  </a>
                ))}
              </div>
            </div>

            <div className="bg-gray-800 p-6 rounded-lg">
              <h4 className="font-serif text-lg font-semibold mb-3">
                {language === 'bg' ? 'Работно време' : 'Working Hours'}
              </h4>
              <div className="font-sans text-gray-300 space-y-1">
                <div className="flex justify-between">
                  <span>{language === 'bg' ? 'Понеделник - Петък' : 'Monday - Friday'}</span>
                  <span>9:00 - 18:00</span>
                </div>
                <div className="flex justify-between">
                  <span>{language === 'bg' ? 'Събота' : 'Saturday'}</span>
                  <span>10:00 - 16:00</span>
                </div>
                <div className="flex justify-between">
                  <span>{language === 'bg' ? 'Неделя' : 'Sunday'}</span>
                  <span>{language === 'bg' ? 'По договаряне' : 'By appointment'}</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;