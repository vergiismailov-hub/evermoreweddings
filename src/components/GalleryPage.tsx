import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '../contexts/LanguageContext';
import { X, ChevronLeft, ChevronRight, Play, ArrowUp, Calendar } from 'lucide-react';

interface GalleryItem {
  id: string;
  src: string;
  alt: string;
  category: 'all' | 'wedding' | 'details' | 'video';
  caption: {
    bg: string;
    en: string;
  };
  date: string;
  isVideo?: boolean;
}

const GalleryPage: React.FC = () => {
  const { language } = useLanguage();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [lightboxItem, setLightboxItem] = useState<GalleryItem | null>(null);
  const [lightboxIndex, setLightboxIndex] = useState<number>(0);
  const [showCompareModal, setShowCompareModal] = useState(false);
  const [showMobileStickyBar, setShowMobileStickyBar] = useState(false);
  const [visibleItems, setVisibleItems] = useState(12);

  // Sample gallery data with high-quality wedding photos
  const galleryItems: GalleryItem[] = [
    {
      id: '1',
      src: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=800&h=1200&fit=crop&auto=format&fm=webp&q=85',
      alt: language === 'bg' ? 'Сватбена фотография - Плевен, България' : 'Wedding photography - Pleven, Bulgaria',
      category: 'wedding',
      caption: {
        bg: 'Сватба на Мария и Георги – Септември 2024',
        en: 'Wedding of Maria & Georgi – September 2024'
      },
      date: '2024-09-15'
    },
    {
      id: '2',
      src: 'https://images.unsplash.com/photo-1606216794074-735e91aa2c92?w=800&h=600&fit=crop&auto=format&fm=webp&q=85',
      alt: language === 'bg' ? 'Сватбени детайли - пръстени' : 'Wedding details - rings',
      category: 'details',
      caption: {
        bg: 'Детайли от сватбата на Иван и Елена – Юли 2024',
        en: 'Details from Ivan & Elena\'s wedding – July 2024'
      },
      date: '2024-07-20'
    },
    {
      id: '3',
      src: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=800&h=1000&fit=crop&auto=format&fm=webp&q=85',
      alt: language === 'bg' ? 'Сватбена церемония' : 'Wedding ceremony',
      category: 'wedding',
      caption: {
        bg: 'Сватба на София и Димитър – Май 2024',
        en: 'Wedding of Sofia & Dimitar – May 2024'
      },
      date: '2024-05-18'
    },
    {
      id: '4',
      src: 'https://images.unsplash.com/photo-1465495976277-4387d4b0e4a6?w=800&h=600&fit=crop&auto=format&fm=webp&q=85',
      alt: language === 'bg' ? 'Сватбен букет' : 'Wedding bouquet',
      category: 'details',
      caption: {
        bg: 'Сватбени детайли – Август 2024',
        en: 'Wedding details – August 2024'
      },
      date: '2024-08-10'
    },
    {
      id: '5',
      src: 'https://images.unsplash.com/photo-1583939003579-730e3918a45a?w=800&h=1200&fit=crop&auto=format&fm=webp&q=85',
      alt: language === 'bg' ? 'Сватбено видео' : 'Wedding video',
      category: 'video',
      caption: {
        bg: 'Сватбено видео на Петър и Анна – Юни 2024',
        en: 'Wedding video of Peter & Anna – June 2024'
      },
      date: '2024-06-22',
      isVideo: true
    },
    {
      id: '6',
      src: 'https://images.unsplash.com/photo-1520854221256-17451cc331bf?w=800&h=800&fit=crop&auto=format&fm=webp&q=85',
      alt: language === 'bg' ? 'Първи танц' : 'First dance',
      category: 'wedding',
      caption: {
        bg: 'Първи танц – Октомври 2024',
        en: 'First dance – October 2024'
      },
      date: '2024-10-05'
    }
  ];

  const categories = [
    { key: 'all', label: language === 'bg' ? 'Всички' : 'All' },
    { key: 'wedding', label: language === 'bg' ? 'Сватбени истории' : 'Wedding Stories' },
    { key: 'details', label: language === 'bg' ? 'Детайли' : 'Details' },
    { key: 'video', label: language === 'bg' ? 'Видео' : 'Video' }
  ];

  const filteredItems = selectedCategory === 'all' 
    ? galleryItems 
    : galleryItems.filter(item => item.category === selectedCategory);

  const displayedItems = filteredItems.slice(0, visibleItems);

  // Analytics functions
  const trackEvent = (event: string, data?: any) => {
    console.log(`Analytics: ${event}`, data);
    if (window.dataLayer) {
      window.dataLayer.push({ event, ...data });
    }
  };

  const openLightbox = (item: GalleryItem, index: number) => {
    setLightboxItem(item);
    setLightboxIndex(index);
    trackEvent('gallery_open_' + item.id);
  };

  const closeLightbox = () => {
    setLightboxItem(null);
  };

  const navigateLightbox = (direction: 'prev' | 'next') => {
    const newIndex = direction === 'prev' 
      ? (lightboxIndex - 1 + displayedItems.length) % displayedItems.length
      : (lightboxIndex + 1) % displayedItems.length;
    
    setLightboxIndex(newIndex);
    setLightboxItem(displayedItems[newIndex]);
  };

  const loadMoreItems = () => {
    setVisibleItems(prev => Math.min(prev + 12, filteredItems.length));
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const openContactForm = () => {
    trackEvent('gallery_book_cta');
    window.location.href = '/#contact';
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!lightboxItem) return;
      
      switch (e.key) {
        case 'Escape':
          closeLightbox();
          break;
        case 'ArrowLeft':
          navigateLightbox('prev');
          break;
        case 'ArrowRight':
          navigateLightbox('next');
          break;
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [lightboxItem, lightboxIndex]);

  // Scroll tracking for mobile sticky bar
  useEffect(() => {
    const handleScroll = () => {
      const scrollPercent = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
      setShowMobileStickyBar(scrollPercent > 30);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Initial analytics
  useEffect(() => {
    trackEvent('gallery_view');
  }, []);

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative h-96 bg-gradient-to-br from-gray-900 to-gray-800 flex items-center justify-center">
        <div className="absolute inset-0">
          <img 
            src="https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=1920&h=800&fit=crop&auto=format&fm=webp&q=85"
            alt={language === 'bg' ? 'Галерия - Evermore Weddings' : 'Gallery - Evermore Weddings'}
            className="w-full h-full object-cover opacity-40"
            loading="eager"
            fetchPriority="high"
          />
        </div>
        <div className="relative text-center text-white max-w-4xl px-4 pt-20">
          <motion.h1 
            className="font-serif text-4xl md:text-6xl font-semibold mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            {language === 'bg' ? 'Галерия' : 'Gallery'}
          </motion.h1>
          <motion.p 
            className="font-sans text-lg md:text-xl opacity-90"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            {language === 'bg' ? 'Истории, разказани чрез снимки' : 'Stories told through images'}
          </motion.p>
        </div>
      </section>

      {/* Filter Bar */}
      <section className="py-8 bg-gray-50 sticky top-20 z-30">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex flex-wrap justify-center gap-3 mb-4">
            {categories.map((category) => (
              <button
                key={category.key}
                onClick={() => {
                  setSelectedCategory(category.key);
                  setVisibleItems(12);
                  trackEvent('gallery_filter_' + category.key);
                }}
                className={`px-6 py-2 rounded-full font-sans text-sm font-medium transition-all duration-200 ${
                  selectedCategory === category.key
                    ? 'bg-amber-600 text-white shadow-md'
                    : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200'
                }`}
                aria-label={`${language === 'bg' ? 'Филтрирай по' : 'Filter by'} ${category.label}`}
              >
                {category.label}
              </button>
            ))}
          </div>
          
          <div className="text-center">
            <button
              onClick={() => setShowCompareModal(true)}
              className="font-sans text-sm text-amber-600 hover:text-amber-700 underline"
            >
              {language === 'bg' ? 'Сравни пакетите' : 'Compare packages'}
            </button>
          </div>
        </div>
      </section>

      {/* Gallery Grid */}
      <section className="py-12">
        <div className="max-w-6xl mx-auto px-4">
          <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
            {displayedItems.map((item, index) => (
              <motion.div
                key={item.id}
                className="relative group cursor-pointer overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-all duration-200 break-inside-avoid"
                whileHover={{ y: -2 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                onClick={() => openLightbox(item, index)}
              >
                <img
                  src={item.src}
                  alt={item.alt}
                  className="w-full h-auto object-cover transition-transform duration-200 group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-200 flex items-center justify-center">
                  <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                    {item.isVideo ? (
                      <Play className="w-12 h-12 text-white" />
                    ) : (
                      <div className="w-12 h-12 border-2 border-white rounded-full flex items-center justify-center">
                        <div className="w-2 h-2 bg-white rounded-full"></div>
                      </div>
                    )}
                  </div>
                </div>
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                  <p className="font-sans text-white text-sm">
                    {item.caption[language]}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Gallery Counter & Load More */}
          <div className="text-center mt-12">
            <p className="font-sans text-sm text-gray-500 mb-4">
              {language === 'bg' 
                ? `Показани ${displayedItems.length} от ${filteredItems.length}`
                : `Showing ${displayedItems.length} of ${filteredItems.length}`
              }
            </p>
            
            {displayedItems.length < filteredItems.length && (
              <button
                onClick={loadMoreItems}
                className="bg-amber-600 text-white px-8 py-3 rounded-lg font-sans font-medium hover:bg-amber-700 transition-colors duration-200"
              >
                {language === 'bg' ? 'Покажи още' : 'Load More'}
              </button>
            )}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <motion.h2 
            className="font-serif text-3xl md:text-4xl font-semibold mb-4 text-gray-800"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            {language === 'bg' 
              ? 'Всяка снимка е част от една история. Създайте вашата.'
              : 'Every photo is part of a story. Let\'s create yours.'
            }
          </motion.h2>
          <motion.button 
            onClick={openContactForm}
            className="bg-amber-600 text-white px-8 py-4 rounded-lg font-sans font-medium hover:bg-amber-700 transition-colors duration-200"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            {language === 'bg' ? 'Резервирайте дата' : 'Book a Date'}
          </motion.button>
        </div>
      </section>

      {/* Mobile Sticky Bar */}
      <AnimatePresence>
        {showMobileStickyBar && (
          <motion.div
            className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg z-40 p-4"
            initial={{ y: 100 }}
            animate={{ y: 0 }}
            exit={{ y: 100 }}
            transition={{ duration: 0.3 }}
          >
            <div className="flex gap-3 max-w-sm mx-auto">
              <button
                onClick={scrollToTop}
                className="flex-1 flex items-center justify-center gap-2 bg-gray-100 text-gray-700 py-3 px-4 rounded-lg font-sans font-medium hover:bg-gray-200 transition-colors"
              >
                <ArrowUp className="w-4 h-4" />
                {language === 'bg' ? 'Галерия' : 'Gallery'}
              </button>
              <button
                onClick={openContactForm}
                className="flex-1 flex items-center justify-center gap-2 bg-amber-600 text-white py-3 px-4 rounded-lg font-sans font-medium hover:bg-amber-700 transition-colors"
              >
                <Calendar className="w-4 h-4" />
                {language === 'bg' ? 'Запазете дата' : 'Book Date'}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxItem && (
          <motion.div
            className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeLightbox}
          >
            <div className="relative max-w-4xl max-h-full" onClick={(e) => e.stopPropagation()}>
              <button
                onClick={closeLightbox}
                className="absolute top-4 right-4 text-white hover:text-gray-300 z-10 bg-black/20 rounded-full p-2"
                aria-label={language === 'bg' ? 'Затвори' : 'Close'}
              >
                <X className="w-6 h-6" />
              </button>

              <button
                onClick={() => navigateLightbox('prev')}
                className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white hover:text-gray-300 bg-black/20 rounded-full p-2"
                aria-label={language === 'bg' ? 'Предишна' : 'Previous'}
              >
                <ChevronLeft className="w-6 h-6" />
              </button>

              <button
                onClick={() => navigateLightbox('next')}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white hover:text-gray-300 bg-black/20 rounded-full p-2"
                aria-label={language === 'bg' ? 'Следваща' : 'Next'}
              >
                <ChevronRight className="w-6 h-6" />
              </button>

              {lightboxItem.isVideo ? (
                <div className="bg-gray-900 rounded-lg overflow-hidden">
                  <div className="aspect-video flex items-center justify-center">
                    <Play className="w-16 h-16 text-white" />
                  </div>
                </div>
              ) : (
                <img
                  src={lightboxItem.src}
                  alt={lightboxItem.alt}
                  className="max-w-full max-h-full object-contain rounded-lg"
                />
              )}

              <div className="absolute bottom-4 left-4 right-4 text-white text-center bg-black/50 rounded-lg p-4">
                <p className="font-sans text-lg mb-1">
                  {lightboxItem.caption[language]}
                </p>
                <p className="font-sans text-sm opacity-75">
                  {new Date(lightboxItem.date).toLocaleDateString(language === 'bg' ? 'bg-BG' : 'en-US')}
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating CTA */}
      <motion.button
        className="fixed bottom-6 right-6 bg-amber-600 text-white px-6 py-3 rounded-full shadow-lg hover:bg-amber-700 transition-colors duration-200 z-40 font-sans font-medium"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={openContactForm}
      >
        {language === 'bg' ? 'Резервирайте дата' : 'Book a Date'}
      </motion.button>

      {/* Schema.org JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ImageGallery",
            "name": language === 'bg' ? 'Галерия - Evermore Weddings' : 'Gallery - Evermore Weddings',
            "description": language === 'bg' ? 'Професионална сватбена фотография в България' : 'Professional wedding photography in Bulgaria',
            "url": window.location.href,
            "author": {
              "@type": "LocalBusiness",
              "name": "Evermore Weddings",
              "address": {
                "@type": "PostalAddress",
                "addressLocality": "Pleven",
                "addressCountry": "Bulgaria"
              },
              "areaServed": "Bulgaria",
              "sameAs": window.location.origin
            },
            "image": galleryItems.map(item => ({
              "@type": item.isVideo ? "VideoObject" : "ImageObject",
              "url": item.src,
              "name": item.caption[language],
              "description": item.alt,
              "contentLocation": "Bulgaria",
              "author": "Evermore Weddings"
            })),
            "breadcrumb": {
              "@type": "BreadcrumbList",
              "itemListElement": [
                {
                  "@type": "ListItem",
                  "position": 1,
                  "name": language === 'bg' ? 'Начало' : 'Home',
                  "item": window.location.origin
                },
                {
                  "@type": "ListItem",
                  "position": 2,
                  "name": language === 'bg' ? 'Галерия' : 'Gallery',
                  "item": window.location.href
                }
              ]
            }
          })
        }}
      />
    </div>
  );
};

export default GalleryPage;