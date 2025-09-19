import React, { Suspense } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { LanguageProvider, useLanguage } from './contexts/LanguageContext';
import SEOHead from './components/SEOHead';
import FAQSection from './components/FAQSection';
import ContactSection from './components/ContactSection';
import WhatsAppButton from './components/WhatsAppButton';
import ClientGallery from './components/ClientGallery';
import PublicGallery from './components/PublicGallery';
import LeadMagnetSection from './components/LeadMagnetSection';
import { Camera, Heart, Star, Users, Award, Phone, Mail, Instagram, Facebook, ArrowRight, Shield, FileText, HardDrive, Check, Lock, X, ChevronLeft, ChevronRight } from 'lucide-react';

// Mobile Sticky Bottom Bar Component
const MobileStickyBar = () => {
  const { language } = useLanguage();
  const [isVisible, setIsVisible] = React.useState(true);
  const [lastScrollY, setLastScrollY] = React.useState(0);

  React.useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      // Show/hide based on scroll direction
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        // Scrolling down & past 100px - hide
        setIsVisible(false);
      } else {
        // Scrolling up or at top - show
        setIsVisible(true);
      }
      
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  return (
    <motion.div
      className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg z-40"
      initial={{ y: 0 }}
      animate={{ y: isVisible ? 0 : 100 }}
      transition={{ duration: 0.3, ease: 'easeInOut' }}
    >
      <div className="flex gap-3 p-4 max-w-sm mx-auto">
        <a
          href="#pricing"
          className="flex-1 bg-amber-600 text-white text-center py-3 px-4 rounded-lg font-medium hover:bg-amber-700 transition-colors"
        >
          {language === 'bg' ? 'Вижте цените' : 'View Pricing'}
        </a>
        <a
          href="#contact"
          className="flex-1 border-2 border-amber-600 text-amber-600 text-center py-3 px-4 rounded-lg font-medium hover:bg-amber-600 hover:text-white transition-colors"
        >
          {language === 'bg' ? 'Резервирай дата' : 'Book Date'}
        </a>
      </div>
    </motion.div>
  );
};
// Navigation Component
const Navigation = () => {
  const { language, toggleLanguage } = useLanguage();
  const navigate = useNavigate();

  const navLinks = [
    { key: 'home', href: '/', label: language === 'bg' ? 'Начало' : 'Home' },
    { key: 'gallery', href: '/gallery', label: language === 'bg' ? 'Галерия' : 'Gallery' },
    { key: 'pricing', href: '#pricing', label: language === 'bg' ? 'Пакети и цени' : 'Packages & Pricing' },
    { key: 'about', href: '#about', label: language === 'bg' ? 'За нас' : 'About' },
    { key: 'contact', href: '#contact', label: language === 'bg' ? 'Контакти' : 'Contact' },
    { key: 'client', href: '/client-gallery', label: language === 'bg' ? 'Клиентска зона' : 'Client Area' }
  ];

  return (
    <nav className="fixed top-0 w-full bg-white/95 backdrop-blur-md shadow-sm z-50">
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-3 md:py-4">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <div 
            className="text-2xl md:text-3xl font-light cursor-pointer text-gray-800" 
            style={{fontFamily: 'Cormorant Garamond, serif'}}
            onClick={() => navigate('/')}
          >
            Evermore Weddings
          </div>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            <ul className="flex space-x-6 lg:space-x-8 text-gray-600 text-sm tracking-wider">
              {navLinks.map((link) => (
                <li key={link.key}>
                  {link.href.startsWith('#') ? (
                    <a href={link.href} className="hover:text-amber-600 transition">
                      {link.label}
                    </a>
                  ) : (
                    <button 
                      onClick={() => navigate(link.href)}
                      className="hover:text-amber-600 transition"
                    >
                      {link.label}
                    </button>
                  )}
                </li>
              ))}
            </ul>
            
            {/* Language Toggle */}
            <div className="flex items-center gap-2 text-sm border border-amber-600 rounded-lg px-3 py-1">
              <button 
                onClick={() => language !== 'bg' && toggleLanguage()} 
                className={`transition px-2 py-1 rounded ${language === 'bg' ? 'text-amber-600 font-medium bg-amber-50' : 'text-gray-400 hover:text-gray-600'}`}
              >
                БГ
              </button>
              <span className="text-gray-300">|</span>
              <button 
                onClick={() => language !== 'en' && toggleLanguage()}
                className={`transition px-2 py-1 rounded ${language === 'en' ? 'text-amber-600 font-medium bg-amber-50' : 'text-gray-400 hover:text-gray-600'}`}
              >
                EN
              </button>
            </div>
            
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center gap-3">
            <div className="flex items-center gap-1 text-xs border border-amber-600 rounded px-2 py-1">
              <button 
                onClick={() => language !== 'bg' && toggleLanguage()} 
                className={`transition ${language === 'bg' ? 'text-amber-600 font-medium' : 'text-gray-400'}`}
              >
                БГ
              </button>
              <span className="text-gray-300">|</span>
              <button 
                onClick={() => language !== 'en' && toggleLanguage()}
                className={`transition ${language === 'en' ? 'text-amber-600 font-medium' : 'text-gray-400'}`}
              >
                EN
              </button>
            </div>
            
            <button className="p-2 text-gray-600 hover:text-amber-600 transition">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

// Hero Section
const HeroSection = () => {
  const { language } = useLanguage();
  
  return (
    <section id="home" className="relative h-screen bg-gradient-to-br from-gray-900 to-gray-800">
      <div className="absolute inset-0">
        <img 
          src="https://images.unsplash.com/photo-1519741497674-611481863552?w=1920&h=1080&fit=crop&auto=format&fm=webp&q=85" 
          alt={language === 'bg' ? 'Професионална сватбена фотография - младоженци в романтична обстановка' : 'Professional wedding photography - couple in romantic setting'}
          className="w-full h-full object-cover opacity-60"
          loading="eager"
          fetchPriority="high"
        />
      </div>
      <div className="relative h-full flex items-center justify-center">
        <div className="text-center text-white max-w-4xl px-4">
          <h1 className="text-4xl md:text-6xl lg:text-8xl font-light mb-6 leading-tight" 
              style={{fontFamily: 'Cormorant Garamond, serif'}}>
            {language === 'bg' ? 'Вашата любов, уловена завинаги' : 'Your Love, Captured Forever'}
          </h1>
          <p className="text-lg md:text-xl mb-8 max-w-2xl mx-auto">
            {language === 'bg' 
              ? 'Професионален екип от 5 души за най-важния ден във вашия живот'
              : 'Professional team of 5 for the most important day of your life'}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="#pricing" className="bg-amber-600 text-white px-8 py-4 text-lg hover:bg-amber-700 transition rounded-lg">
              {language === 'bg' ? 'Вижте цените' : 'View Pricing'}
            </a>
            <button 
              onClick={() => window.location.href = '/client-gallery'}
              className="border-2 border-white text-white px-8 py-4 text-lg hover:bg-white hover:text-black transition rounded-lg"
            >
              {language === 'bg' ? 'Клиентска галерия' : 'Client Gallery'}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

// Pricing Section
const PricingSection = () => {
  const { language } = useLanguage();
  
  const packagesData = {
    bg: [
      {
        name: "Wedding Package 1",
        price: "1170",
        currency: "лв",
        originalEuro: "600€",
        features: [
          "1 сватбен фотограф",
          "До 10 часа покритие",
          "Неограничен брой снимки",
          "Доставка до 60 дни",
          "USB флаш памет или облачен линк",
          "15 снимки 10x15см подарък",
          "Официален договор"
        ]
      },
      {
        name: "Wedding Package 2",
        price: "1370",
        currency: "лв",
        originalEuro: "700€",
        features: [
          "1 сватбен фотограф",
          "Целодневно покритие",
          "Неограничен брой снимки",
          "USB в стилна дървена кутийка",
          "30 снимки 10x15см",
          "Луксозна фотокнига 25x25см",
          "2 принта 30x40см",
          "Доставка до 60 работни дни",
          "Официален договор"
        ]
      },
      {
        name: "Wedding Package 4",
        price: "1900",
        currency: "лв",
        originalEuro: "970€",
        features: [
          "2 сватбени фотографи",
          "Целодневно покритие",
          "Неограничен брой снимки",
          "USB в стилна дървена кутийка",
          "30 снимки 13x18см",
          "Следсватбена фотосесия подарък",
          "Доставка до 60 работни дни",
          "Официален договор"
        ]
      },
      {
        name: "Video Package",
        price: "1370",
        currency: "лв",
        originalEuro: "700€",
        isVideo: true,
        features: [
          "Видеограф за целия ден",
          "Full HD качество",
          "USB в стилна кутийка",
          "Облачен линк за споделяне",
          "Доставка до 60 работни дни",
          "Официален договор"
        ]
      },
      {
        name: "Combo (Photo + Video)",
        price: "2740",
        currency: "лв",
        originalEuro: "1400€",
        isCombo: true,
        featured: true,
        features: [
          "Фотограф + Видеограф",
          "До 12 часа покритие",
          "Неограничен брой снимки",
          "Full HD видео",
          "USB в стилна кутийка",
          "15 снимки + A4 принт подарък",
          "Доставка: фото 30-60 дни, видео 60 дни",
          "Официален договор"
        ]
      }
    ],
    en: [
      {
        name: "Wedding Package 1",
        price: "1170",
        currency: "BGN",
        originalEuro: "600€",
        features: [
          "1 wedding photographer",
          "Up to 10 hours coverage",
          "Unlimited number of photos",
          "Delivery within 60 days",
          "USB flash drive or cloud link",
          "15 photos 10x15cm gift",
          "Official contract"
        ]
      },
      {
        name: "Wedding Package 2",
        price: "1370",
        currency: "BGN",
        originalEuro: "700€",
        features: [
          "1 wedding photographer",
          "Full day coverage",
          "Unlimited number of photos",
          "USB in stylish wooden box",
          "30 photos 10x15cm",
          "Luxury photo book 25x25cm",
          "2 prints 30x40cm",
          "Delivery within 60 business days",
          "Official contract"
        ]
      },
      {
        name: "Wedding Package 4",
        price: "1900",
        currency: "BGN",
        originalEuro: "970€",
        features: [
          "2 wedding photographers",
          "Full day coverage",
          "Unlimited number of photos",
          "USB in stylish wooden box",
          "30 photos 13x18cm",
          "Post-wedding photoshoot gift",
          "Delivery within 60 business days",
          "Official contract"
        ]
      },
      {
        name: "Video Package",
        price: "1370",
        currency: "BGN",
        originalEuro: "700€",
        isVideo: true,
        features: [
          "Videographer for the whole day",
          "Full HD quality",
          "USB in stylish box",
          "Cloud link for sharing",
          "Delivery within 60 business days",
          "Official contract"
        ]
      },
      {
        name: "Combo (Photo + Video)",
        price: "2740",
        currency: "BGN",
        originalEuro: "1400€",
        isCombo: true,
        featured: true,
        features: [
          "Photographer + Videographer",
          "Up to 12 hours coverage",
          "Unlimited number of photos",
          "Full HD video",
          "USB in stylish box",
          "15 photos + A4 print gift",
          "Delivery: photo 30-60 days, video 60 days",
          "Official contract"
        ]
      }
    ]
  };


  return (
    <section id="pricing" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4">
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl font-light mb-4" style={{fontFamily: 'Cormorant Garamond, serif'}}>
            {language === 'bg' ? 'Сватбени пакети' : 'Wedding Packages'}
          </h2>
          <p className="text-xl text-gray-600">
            {language === 'bg' ? 'Изберете перфектния пакет за вашата сватба' : 'Choose the perfect package for your wedding'}
          </p>
        </motion.div>

        {/* Pricing Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {packagesData[language].map((pkg, index) => (
            <motion.div 
              key={index}
              className={`bg-white p-6 md:p-8 rounded-xl shadow-lg relative flex flex-col h-full transition-all duration-300 hover:shadow-xl hover:-translate-y-1 ${
                pkg.featured ? 'ring-2 ring-amber-500 shadow-amber-100' : 'hover:shadow-gray-200'
              }`}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              {pkg.featured && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <div className="bg-amber-500 text-white px-4 py-1 rounded-full text-sm font-medium">
                    {language === 'bg' ? 'НАЙ-ПОПУЛЯРЕН' : 'MOST POPULAR'}
                  </div>
                </div>
              )}
              
              <h3 className="text-xl md:text-2xl font-medium mb-4" style={{fontFamily: 'Cormorant Garamond, serif'}}>
                {pkg.name}
              </h3>
              
              <div className="text-center mb-6 flex-shrink-0">
                <div className="text-3xl md:text-4xl font-bold text-amber-600">
                  {pkg.price} {pkg.currency}
                </div>
                <p className="text-xs md:text-sm text-gray-500 mt-1" style={{fontSize: '0.8em'}}>
                  {pkg.originalEuro && (
                    `(${pkg.originalEuro})`
                  )}
                </p>
              </div>
              
              <ul className="space-y-2 md:space-y-3 mb-8 flex-grow">
                {pkg.features.map((feature, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className="text-amber-500 mt-0.5 flex-shrink-0">✓</span>
                    <span className="text-sm md:text-base text-gray-700 leading-relaxed">{feature}</span>
                  </li>
                ))}
              </ul>
              
              <button className="w-full py-3 md:py-4 bg-amber-600 text-white rounded-lg font-semibold transition-all duration-300 hover:bg-amber-700 hover:shadow-lg mt-auto">
                {language === 'bg' ? 'Избери пакет' : 'Choose Package'}
              </button>
            </motion.div>
          ))}
        </div>

        {/* Trust Banner */}
        <motion.div 
          className="bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-100 rounded-2xl p-6 md:p-8 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
        >
          <div className="flex items-center justify-center gap-3 mb-3">
            <div className="w-8 h-8 bg-amber-100 rounded-full flex items-center justify-center">
              <span className="text-amber-600 text-lg">🎁</span>
            </div>
            <h3 className="text-xl md:text-2xl font-medium text-amber-800" style={{fontFamily: 'Cormorant Garamond, serif'}}>
              {language === 'bg' 
                ? 'Всички пакети включват стилна USB кутия и официален договор' 
                : 'All packages include a stylish USB box and official contract'}
            </h3>
          </div>
          <p className="text-sm md:text-base text-amber-700 max-w-2xl mx-auto">
            {language === 'bg'
              ? 'Професионално обслужване с гаранция за качество и сигурност на вашите спомени'
              : 'Professional service with guarantee for quality and security of your memories'}
          </p>
        </motion.div>
      </div>
    </section>
  );
};

// Testimonials Section
const TestimonialsSection = () => {
  const { language } = useLanguage();
  
  const testimonials = {
    bg: [
      {
        name: 'Мария и Георги',
        date: 'Септември 2024',
        text: 'Невероятен екип! Снимките са прекрасни и качеството е изключително. Препоръчваме ги на всички наши приятели!'
      },
      {
        name: 'Иван и Елена',
        date: 'Юли 2024',
        text: 'Професионализмът и креативността на екipa ни впечатлиха. Уловиха всеки важен момент от нашия специален ден.'
      },
      {
        name: 'София и Димитър',
        date: 'Май 2024',
        text: 'Благодарим за прекрасните спомени! Видеото и снимките надминаха всичките ни очаквания. Истински професионалисти!'
      }
    ],
    en: [
      {
        name: 'Maria & George',
        date: 'September 2024',
        text: 'Amazing team! The photos are beautiful and the quality is exceptional. We recommend them to all our friends!'
      },
      {
        name: 'Ivan & Elena',
        date: 'July 2024',
        text: 'The professionalism and creativity of the team impressed us. They captured every important moment of our special day.'
      },
      {
        name: 'Sofia & Dimitar',
        date: 'May 2024',
        text: 'Thank you for the beautiful memories! The video and photos exceeded all our expectations. True professionals!'
      }
    ]
  };

  return (
    <section className="py-20 bg-white">
      <div className="max-w-6xl mx-auto px-4">
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl font-light mb-4" style={{fontFamily: 'Cormorant Garamond, serif'}}>
            {language === 'bg' ? 'Отзиви от клиенти' : 'Client Testimonials'}
          </h2>
          <p className="text-xl text-gray-600">
            {language === 'bg' ? 'Какво казват нашите клиенти' : 'What our clients say'}
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials[language].map((testimonial, index) => (
            <motion.div 
              key={testimonial.name} 
              className="bg-gray-50 p-8 rounded-lg"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <div className="flex items-center mb-4">
                {[...Array(5)].map((_, j) => (
                  <Star key={j} className="w-5 h-5 text-amber-500 fill-current" />
                ))}
              </div>
              <p className="text-gray-700 mb-6 italic leading-relaxed" style={{fontFamily: 'Crimson Text, serif'}}>
                "{testimonial.text}"
              </p>
              <div>
                <div className="font-medium text-gray-800">{testimonial.name}</div>
                <div className="text-sm text-gray-500">{testimonial.date}</div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

// About Section
const AboutSection = () => {
  const { language } = useLanguage();
  
  return (
    <section id="about" className="py-20 bg-gray-50">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-light mb-4" style={{fontFamily: 'Cormorant Garamond, serif'}}>
            {language === 'bg' ? 'За нас' : 'About Us'}
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {language === 'bg' 
              ? 'Ние сме екип от професионални фотографи, посветени на улавянето на най-важните моменти във вашия живот.'
              : 'We are a team of professional photographers dedicated to capturing the most important moments in your life.'}
          </p>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {[
            { icon: Heart, title: language === 'bg' ? 'Страст' : 'Passion' },
            { icon: Award, title: language === 'bg' ? 'Качество' : 'Quality' },
            { icon: Users, title: language === 'bg' ? 'Екип' : 'Team' }
          ].map((item, i) => (
            <div key={i} className="text-center">
              <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <item.icon className="w-8 h-8 text-amber-600" />
              </div>
              <h3 className="text-xl font-medium mb-2">{item.title}</h3>
              <p className="text-gray-600">
                {language === 'bg' 
                  ? 'Описание на нашите ценности и подход към работата.'
                  : 'Description of our values and approach to work.'}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Gallery Placeholder Section
const GalleryPlaceholderSection = () => {
  const { language, translations } = useLanguage();
  const navigate = useNavigate();
  
  return (
    <section className="py-20 bg-gray-900 text-white">
      <div className="max-w-6xl mx-auto px-4 text-center">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <Camera className="w-16 h-16 text-amber-500 mx-auto mb-6" />
          <h2 className="text-4xl font-light mb-4" style={{fontFamily: 'Cormorant Garamond, serif'}}>
            {translations[language].clientGallery.title}
          </h2>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            {translations[language].clientGallery.description}
          </p>
          <button 
            onClick={() => navigate('/client-gallery')}
            className="bg-amber-600 text-white px-8 py-4 text-lg hover:bg-amber-700 transition rounded-lg inline-flex items-center gap-2"
          >
            {translations[language].clientGallery.cta.button}
            <ArrowRight className="w-5 h-5" />
          </button>
        </motion.div>
      </div>
    </section>
  );
};


// Lead Magnet Form
const LeadMagnetForm = () => {
  const { language, translations } = useLanguage();
  
  return (
    <section className="py-20 bg-amber-50">
      <div className="max-w-4xl mx-auto px-4 text-center">
        <h2 className="text-4xl font-light mb-4" style={{fontFamily: 'Cormorant Garamond, serif'}}>
          {translations[language].ctaSection.title}
        </h2>
        <p className="text-xl text-gray-600 mb-8">
          {translations[language].ctaSection.description}
        </p>
        <div className="bg-white p-8 rounded-lg shadow-lg max-w-md mx-auto">
          <form className="space-y-4">
            <input 
              id="name"
              name="name"
              type="text" 
              placeholder={language === 'bg' ? 'Вашето име' : 'Your name'}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
            />
            <input 
              id="email"
              name="email"
              type="email" 
              placeholder="Email"
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
            />
            <textarea 
              id="message"
              name="message"
              placeholder={language === 'bg' ? 'Вашето съобщение' : 'Your message'}
              rows={4}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
            ></textarea>
            <button 
              type="submit"
              className="w-full bg-amber-600 text-white py-3 rounded-lg hover:bg-amber-700 transition"
            >
              {language === 'bg' ? 'Изпрати съобщение' : 'Send Message'}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

// Main App Component
const AppContent = () => {
  return (
    <>
      <SEOHead page="home" />
      <Navigation />
      <main>
        <Routes>
          <Route path="/" element={
            <>
              <SEOHead page="home" />
              <HeroSection />
              <PricingSection />
              <TestimonialsSection />
              <FAQSection />
              <AboutSection />
              <GalleryPlaceholderSection />
              <LeadMagnetSection />
              <ContactSection />
            </>
          } />
          <Route path="/gallery" element={
            <>
              <SEOHead page="gallery" />
              <PublicGallery />
            </>
          } />
          <Route path="/client-gallery" element={
            <>
              <SEOHead page="gallery" />
              <ClientGallery />
            </>
          } />
        </Routes>
      </main>
      <WhatsAppButton />
      <MobileStickyBar />
    </>
  );
};

// Root App Component
function App() {
  return (
    <LanguageProvider>
      <Suspense fallback={
        <div className="min-h-screen flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-600"></div>
        </div>
      }>
        <AppContent />
      </Suspense>
    </LanguageProvider>
  );
}

export default App;