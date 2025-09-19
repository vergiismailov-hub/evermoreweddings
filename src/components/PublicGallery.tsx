import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '../contexts/LanguageContext';
import { X, ChevronLeft, ChevronRight, Play, Filter } from 'lucide-react';

interface GalleryItem {
  id: string;
  src: string;
  alt: string;
  category: 'wedding' | 'details' | 'video';
  caption: {
    bg: string;
    en: string;
  };
  date: string;
  isVideo?: boolean;
}

const PublicGallery: React.FC = () => {
  const { language } = useLanguage();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [lightboxItem, setLightboxItem] = useState<GalleryItem | null>(null);
  const [lightboxIndex, setLightboxIndex] = useState<number>(0);

  // Sample gallery data
  const galleryItems: GalleryItem[] = [
    {
      id: '1',
      src: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=800&h=1200&fit=crop',
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
      src: 'https://images.unsplash.com/photo-1606216794074-735e91aa2c92?w=800&h=600&fit=crop',
      alt: language === 'bg' ? 'Сватбени детайли - пръстени' : 'Wedding details - rings',
      category: 'details',
      caption: {
        bg: 'Детайли от сватбата на Иван и Елена – Юли 2024',
        en: 'Details from Ivan & Elena\'s wedding – July 2024'
      },
      date: '2024-07-20'
    },
    // Add more items as needed
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

  const openLightbox = (item: GalleryItem, index: number) => {
    setLightboxItem(item);
    setLightboxIndex(index);
    // Analytics
    console.log('Analytics: gallery_open_' + item.id);
  };

  const closeLightbox = () => {
    setLightboxItem(null);
  };

  const navigateLightbox = (direction: 'prev' | 'next') => {
    const newIndex = direction === 'prev' 
      ? (lightboxIndex - 1 + filteredItems.length) % filteredItems.length
      : (lightboxIndex + 1) % filteredItems.length;
    
    setLightboxIndex(newIndex);
    setLightboxItem(filteredItems[newIndex]);
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

  // Analytics
  useEffect(() => {
    console.log('Analytics: gallery_view');
  }, []);

  return (
    <div className="min-h-screen bg-white pt-20">
      {/* Hero Section */}
      <section className="relative h-96 bg-gradient-to-br from-gray-900 to-gray-800 flex items-center justify-center">
        <div className="absolute inset-0">
          <img 
            src="https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=1920&h=800&fit=crop"
            alt={language === 'bg' ? 'Галерия - Evermore Weddings' : 'Gallery - Evermore Weddings'}
            className="w-full h-full object-cover opacity-40"
          />
        </div>
        <div className="relative text-center text-white max-w-4xl px-4">
          <h1 className="font-serif text-4xl md:text-6xl font-semibold mb-4">
            {language === 'bg' ? 'Галерия' : 'Gallery'}
          </h1>
          <p className="font-sans text-lg md:text-xl opacity-90">
            {language === 'bg' ? 'Истории, разказани чрез снимки' : 'Stories told through images'}
          </p>
        </div>
      </section>

      {/* Filter Bar */}
      <section className="py-8 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex flex-wrap justify-center gap-3">
            {categories.map((category) => (
              <button
                key={category.key}
                onClick={() => {
                  setSelectedCategory(category.key);
                  console.log('Analytics: gallery_filter_' + category.key);
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
        </div>
      </section>

      {/* Gallery Grid */}
      <section className="py-12">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredItems.map((item, index) => (
              <motion.div
                key={item.id}
                className="relative group cursor-pointer overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-all duration-200"
                whileHover={{ y: -2, scale: 1.02 }}
                onClick={() => openLightbox(item, index)}
              >
                <img
                  src={item.src}
                  alt={item.alt}
                  className="w-full h-64 object-cover transition-transform duration-200 group-hover:scale-105"
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
              </motion.div>
            ))}
          </div>

          {/* Gallery Counter */}
          <div className="text-center mt-8">
            <p className="font-sans text-sm text-gray-500">
              {language === 'bg' 
                ? `Показани ${filteredItems.length} от ${galleryItems.length}`
                : `Showing ${filteredItems.length} of ${galleryItems.length}`
              }
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="font-serif text-3xl md:text-4xl font-semibold mb-4 text-gray-800">
            {language === 'bg' 
              ? 'Всяка снимка е част от една история. Създайте вашата.'
              : 'Every photo is part of a story. Let\'s create yours.'
            }
          </h2>
          <button 
            onClick={() => {
              console.log('Analytics: gallery_book_cta');
              window.location.href = '/#pricing';
            }}
            className="bg-amber-600 text-white px-8 py-4 rounded-lg font-sans font-medium hover:bg-amber-700 transition-colors duration-200"
          >
            {language === 'bg' ? 'Вижте пакетите' : 'View Packages'}
          </button>
        </div>
      </section>

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
                className="absolute top-4 right-4 text-white hover:text-gray-300 z-10"
                aria-label={language === 'bg' ? 'Затвори' : 'Close'}
              >
                <X className="w-8 h-8" />
              </button>

              <button
                onClick={() => navigateLightbox('prev')}
                className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white hover:text-gray-300"
                aria-label={language === 'bg' ? 'Предишна' : 'Previous'}
              >
                <ChevronLeft className="w-8 h-8" />
              </button>

              <button
                onClick={() => navigateLightbox('next')}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white hover:text-gray-300"
                aria-label={language === 'bg' ? 'Следваща' : 'Next'}
              >
                <ChevronRight className="w-8 h-8" />
              </button>

              <img
                src={lightboxItem.src}
                alt={lightboxItem.alt}
                className="max-w-full max-h-full object-contain"
              />

              <div className="absolute bottom-4 left-4 right-4 text-white text-center">
                <p className="font-sans text-lg">
                  {lightboxItem.caption[language]}
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating CTA */}
      <motion.button
        className="fixed bottom-6 right-6 bg-amber-600 text-white px-6 py-3 rounded-full shadow-lg hover:bg-amber-700 transition-colors duration-200 z-40"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => {
          console.log('Analytics: gallery_book_cta');
          window.location.href = '/#contact';
        }}
      >
        {language === 'bg' ? 'Резервирайте дата' : 'Book a Date'}
      </motion.button>
    </div>
  );
};

export default PublicGallery;