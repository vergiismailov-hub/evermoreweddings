import React, { createContext, useState, useContext, useEffect, ReactNode } from 'react';

export const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

interface LanguageContextType {
  language: 'bg' | 'en';
  toggleLanguage: () => void;
  translations: {
    bg: TranslationContent;
    en: TranslationContent;
  };
}

interface TranslationContent {
  // Navigation
  home: string;
  gallery: string;
  pricing: string;
  about: string;
  contact: string;
  
  // Hero Section
  heroTitle: string;
  heroSubtitle: string;
  cta: string;
  
  // About Section
  aboutTitle: string;
  aboutText: string;
  
  // Testimonials
  testimonialTitle: string;
  
  // Packages
  packageEssential: string;
  packageSignature: string;
  packageLuxury: string;
  bookNow: string;
  
  // Lead Magnet
  downloadChecklist: string;
  
  // Additional content
  nav: {
    home: string;
    portfolio: string;
    about: string;
    packages: string;
    gallery: string;
    blog: string;
    contact: string;
  };
  hero: {
    title: string;
    subtitle: string;
    description: string;
    cta: string;
    secondaryCta: string;
  };
  features: {
    title: string;
    love: {
      title: string;
      description: string;
    };
    experience: {
      title: string;
      description: string;
    };
    quality: {
      title: string;
      description: string;
    };
  };
  aboutSection: {
    title: string;
    subtitle: string;
    mission: string;
    values: {
      authenticity: {
        title: string;
        description: string;
      };
      creativity: {
        title: string;
        description: string;
      };
      excellence: {
        title: string;
        description: string;
      };
    };
  };
  testimonials: {
    title: string;
    subtitle: string;
    reviews: Array<{
      name: string;
      location: string;
      text: string;
      rating: number;
    }>;
  };
  leadMagnet: {
    title: string;
    subtitle: string;
    benefits: string[];
    cta: string;
    disclaimer: string;
  };
  clientGallery: {
    title: string;
    description: string;
    features: {
      secure: {
        title: string;
        description: string;
      };
      quality: {
        title: string;
        description: string;
      };
      favorites: {
        title: string;
        description: string;
      };
    };
    cta: {
      title: string;
      description: string;
      button: string;
    };
  };
  packages: {
    title: string;
    subtitle: string;
    currency: string;
    cta: string;
    savings: string;
    popular: string;
    availability: string;
    trust: {
      contract: string;
      insurance: string;
      backup: string;
    };
    packages: Array<{
      name: string;
      price: number;
      originalPrice?: number;
      description: string;
      features: string[];
      ideal: string;
      featured?: boolean;
    }>;
  };
  ctaSection: {
    title: string;
    description: string;
  };
  contactInfo: {
    phone: string;
    email: string;
  };
  footer: {
    copyright: string;
  };
}

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguage] = useState<'bg' | 'en'>('bg');

  useEffect(() => {
    const savedLang = localStorage.getItem('language');
    if (savedLang && (savedLang === 'bg' || savedLang === 'en')) {
      setLanguage(savedLang as 'bg' | 'en');
    }
  }, []);

  const toggleLanguage = () => {
    const newLang = language === 'bg' ? 'en' : 'bg';
    setLanguage(newLang);
    localStorage.setItem('language', newLang);
  };
  
  const translations = {
    bg: {
      // Basic navigation
      home: 'Начало',
      gallery: 'Галерия',
      pricing: 'Цени',
      about: 'За нас',
      contact: 'Контакти',
      
      // Hero section
      heroTitle: 'Вашата любов, уловена завинаги',
      heroSubtitle: 'Професионална сватбена фотография и видео в България',
      cta: 'Резервирай сега',
      
      // About section
      aboutTitle: 'За Evermore Weddings',
      aboutText: 'Evermore Weddings е екип от 3 фотографи и 2 видеооператори, посветени на улавянето на вечни моменти. Нашата страст е да разказваме вашата любовна история през обектива, създавайки спомени, които ще цените завинаги.',
      
      // Testimonials
      testimonialTitle: 'Отзиви от клиенти',
      
      // Packages
      packageEssential: 'Основен',
      packageSignature: 'Подпис',
      packageLuxury: 'Лукс',
      bookNow: 'Запази дата',
      
      // Lead magnet
      downloadChecklist: 'Изтегли безплатен сватбен чеклист',
      
      // Extended navigation
      nav: {
        home: 'НАЧАЛО',
        portfolio: 'ПОРТФОЛИО',
        about: 'ЗА НАС',
        packages: 'ПАКЕТИ И ЦЕНИ',
        gallery: 'КЛИЕНТСКА ЗОНА',
        blog: 'БЛОГ',
        contact: 'КОНТАКТ'
      },
      hero: {
        title: 'Evermore Weddings',
        subtitle: 'ВАШАТА ЛЮБОВ, НАШАТА СТРАСТ',
        description: 'Професионален екип от 3 фотографи и 2 видеографи за най-важния ден във вашия живот',
        cta: 'ВИЖТЕ ОФЕРТИТЕ',
        secondaryCta: 'КЛИЕНТСКА ГАЛЕРИЯ'
      },
      features: {
        title: 'Защо да изберете нас',
        love: {
          title: 'С любов към детайлите',
          description: 'Всяка снимка е създадена с внимание към най-малките детайли'
        },
        experience: {
          title: 'Професионален опит',
          description: 'Над 500 сватби и безброй щастливи двойки'
        },
        quality: {
          title: 'Изключително качество',
          description: 'Високо качество на снимките и професионална обработка'
        }
      },
      aboutSection: {
        title: 'Нашата история',
        subtitle: 'Повече от 10 години създаваме вечни спомени',
        mission: 'Нашата мисия е да улавяме автентичните емоции и моменти, които правят всяка сватба уникална. Вярваме, че всяка любовна история заслужава да бъде разказана с красота и страст.',
        values: {
          authenticity: {
            title: 'Автентичност',
            description: 'Улавяме истинските емоции и спонтанни моменти'
          },
          creativity: {
            title: 'Креативност',
            description: 'Всяка сватба е уникална творческа възможност'
          },
          excellence: {
            title: 'Съвършенство',
            description: 'Стремим се към най-високо качество във всичко'
          }
        }
      },
      testimonials: {
        title: 'Какво казват нашите клиенти',
        subtitle: 'Над 500 щастливи двойки са ни се доверили',
        reviews: [
          {
            name: 'Мария и Георги',
            location: 'София',
            text: 'Evermore Weddings направиха нашия ден незабравим! Професионализмът и вниманието към детайлите бяха изключителни. Снимките са като от приказка!',
            rating: 5
          },
          {
            name: 'Елена и Димитър',
            location: 'Пловдив',
            text: 'Най-добрият избор за нашата сватба! Екипът беше невероятен - професионален, креативен и много мил. Препоръчваме ги на всички!',
            rating: 5
          },
          {
            name: 'Анна и Петър',
            location: 'Варна',
            text: 'Благодарим за прекрасните спомени! Качеството на снимките и видеото надмина очакванията ни. Истински професионалисти!',
            rating: 5
          }
        ]
      },
      leadMagnet: {
        title: 'Безплатен сватбен чеклист',
        subtitle: 'Всичко, което трябва да знаете за планирането на перфектната сватба',
        benefits: [
          'Пълен график за планиране 12 месеца преди сватбата',
          'Списък с най-важните задачи по месеци',
          'Съвети за избор на фотограф и видеограф',
          'Бюджетен калкулатор за сватба',
          'Контактна информация на проверени доставчици'
        ],
        cta: 'Изтегли безплатно',
        disclaimer: 'Няма спам. Само полезни съвети за вашата сватба.'
      },
      clientGallery: {
        title: 'Вашата персонална онлайн галерия',
        description: 'Всяка двойка получава защитена с парола онлайн галерия, където може да разглежда, изтегля и споделя своите сватбени снимки с близки и приятели. Галерията остава активна 1 година след сватбата.',
        features: {
          secure: {
            title: 'Защитен достъп',
            description: 'Само вие решавате кой да види снимките с уникална парола за всяка галерия'
          },
          quality: {
            title: 'Високо качество',
            description: 'Изтеглете снимките в пълна резолюция, готови за печат и споделяне'
          },
          favorites: {
            title: 'Любими снимки',
            description: 'Маркирайте любимите си снимки за лесно създаване на албум'
          }
        },
        cta: {
          title: 'Готови да видите вашите снимки?',
          description: 'Влезте в клиентската зона с паролата, която сте получили по имейл',
          button: 'Отворете галерията'
        }
      },
      packages: {
        title: 'Инвестирайте в спомени за цял живот',
        subtitle: 'Прозрачни цени, без скрити такси',
        currency: 'лв',
        cta: 'РЕЗЕРВИРАЙ СЕГА',
        savings: 'СПЕСТЯВАТЕ',
        popular: 'НАЙ-ИЗБИРАН',
        availability: 'Само 3 свободни дати за Май-Септември 2025',
        trust: {
          contract: 'Официален договор',
          insurance: 'Застраховка',
          backup: 'Резервно оборудване'
        },
        packages: [
          {
            name: 'Essential',
            price: 2500,
            description: 'Перфектен старт за вашата любовна история',
            features: [
              '1 професионален фотограф',
              '6 часа покритие на събитието',
              '300-400 обработени снимки',
              'Онлайн галерия за 1 година',
              'Възможност за изтегляне в пълна резолюция',
              'Доставка в рамките на 30 дни',
              '10 ретуширани портрета'
            ],
            ideal: 'Идеален за: Интимни сватби до 50 гости'
          },
          {
            name: 'Signature',
            price: 4000,
            originalPrice: 4500,
            description: 'Нашата препоръка за пълно покритие',
            features: [
              '2 фотографи + 1 видеограф',
              '10 часа покритие',
              '500-700 обработени снимки',
              'Професионален видео клип (3-5 мин)',
              'Дрон за въздушни кадри',
              'Предсватбена фотосесия БОНУС',
              'Онлайн галерия за 2 години',
              '20 ретуширани портрета',
              'Експресна доставка на 50 снимки за социални мрежи'
            ],
            ideal: 'Идеален за: Сватби от 50 до 150 гости',
            featured: true
          },
          {
            name: 'Luxury',
            price: 6000,
            description: 'Пълният VIP опит за вашия специален ден',
            features: [
              '3 фотографи + 2 видеографи',
              'Неограничено покритие (целодневно)',
              '800-1000+ обработени снимки',
              'Пълен сватбен филм (20-30 мин)',
              'Кратък клип за Instagram Reels',
              '2 дрона за уникални гледки',
              'Предсватбена И следсватбена сесия',
              'Луксозен фото албум 30x30см',
              'Онлайн галерия ЗАВИНАГИ',
              '50 ретуширани портрета',
              'Приоритетна обработка (15 дни)',
              'USB кутия с всички снимки'
            ],
            ideal: 'Идеален за: Големи сватби над 150 гости'
          }
        ]
      },
      ctaSection: {
        title: 'Готови ли сте да запечатаме вашия специален ден?',
        description: 'Свържете се с нас за персонализирана консултация'
      },
      contactInfo: {
        phone: '+359 888 123 456',
        email: 'info@evermoreweddings.bg'
      },
      footer: {
        copyright: '© 2024 Evermore Weddings. Всички права запазени.'
      }
    },
    en: {
      // Basic navigation
      home: 'Home',
      gallery: 'Gallery',
      pricing: 'Pricing',
      about: 'About',
      contact: 'Contact',
      
      // Hero section
      heroTitle: 'Your Love, Captured Forever',
      heroSubtitle: 'Professional wedding photography and videography in Bulgaria',
      cta: 'Book Now',
      
      // About section
      aboutTitle: 'About Evermore Weddings',
      aboutText: 'Evermore Weddings is a team of 3 photographers and 2 videographers dedicated to capturing timeless moments. Our passion is telling your love story through the lens, creating memories you\'ll cherish forever.',
      
      // Testimonials
      testimonialTitle: 'Client Testimonials',
      
      // Packages
      packageEssential: 'Essential',
      packageSignature: 'Signature',
      packageLuxury: 'Luxury',
      bookNow: 'Reserve Your Date',
      
      // Lead magnet
      downloadChecklist: 'Download Free Wedding Checklist',
      
      // Extended navigation
      nav: {
        home: 'HOME',
        portfolio: 'PORTFOLIO',
        about: 'ABOUT',
        packages: 'PACKAGES & PRICING',
        gallery: 'CLIENT AREA',
        blog: 'BLOG',
        contact: 'CONTACT'
      },
      hero: {
        title: 'Evermore Weddings',
        subtitle: 'YOUR LOVE, OUR PASSION',
        description: 'Professional team of 3 photographers and 2 videographers for the most important day of your life',
        cta: 'VIEW PACKAGES',
        secondaryCta: 'CLIENT GALLERY'
      },
      features: {
        title: 'Why choose us',
        love: {
          title: 'Attention to detail',
          description: 'Every photo is created with attention to the smallest details'
        },
        experience: {
          title: 'Professional experience',
          description: 'Over 500 weddings and countless happy couples'
        },
        quality: {
          title: 'Exceptional quality',
          description: 'High quality photos and professional processing'
        }
      },
      aboutSection: {
        title: 'Our Story',
        subtitle: 'Creating timeless memories for over 10 years',
        mission: 'Our mission is to capture the authentic emotions and moments that make every wedding unique. We believe every love story deserves to be told with beauty and passion.',
        values: {
          authenticity: {
            title: 'Authenticity',
            description: 'We capture genuine emotions and spontaneous moments'
          },
          creativity: {
            title: 'Creativity',
            description: 'Every wedding is a unique creative opportunity'
          },
          excellence: {
            title: 'Excellence',
            description: 'We strive for the highest quality in everything we do'
          }
        }
      },
      testimonials: {
        title: 'What Our Clients Say',
        subtitle: 'Over 500 happy couples have trusted us',
        reviews: [
          {
            name: 'Maria & George',
            location: 'Sofia',
            text: 'Evermore Weddings made our day unforgettable! The professionalism and attention to detail were exceptional. The photos are like from a fairy tale!',
            rating: 5
          },
          {
            name: 'Elena & Dimitar',
            location: 'Plovdiv',
            text: 'The best choice for our wedding! The team was incredible - professional, creative and very kind. We recommend them to everyone!',
            rating: 5
          },
          {
            name: 'Anna & Peter',
            location: 'Varna',
            text: 'Thank you for the beautiful memories! The quality of photos and video exceeded our expectations. True professionals!',
            rating: 5
          }
        ]
      },
      leadMagnet: {
        title: 'Free Wedding Checklist',
        subtitle: 'Everything you need to know for planning the perfect wedding',
        benefits: [
          'Complete 12-month planning timeline',
          'Monthly task breakdown with priorities',
          'Tips for choosing photographer and videographer',
          'Wedding budget calculator',
          'Verified vendor contact information'
        ],
        cta: 'Download Free',
        disclaimer: 'No spam. Just useful tips for your wedding.'
      },
      clientGallery: {
        title: 'Your personal online gallery',
        description: 'Every couple receives a password-protected online gallery where they can view, download and share their wedding photos with family and friends. The gallery remains active for 1 year after the wedding.',
        features: {
          secure: {
            title: 'Secure access',
            description: 'Only you decide who sees the photos with a unique password for each gallery'
          },
          quality: {
            title: 'High quality',
            description: 'Download photos in full resolution, ready for printing and sharing'
          },
          favorites: {
            title: 'Favorite photos',
            description: 'Mark your favorite photos for easy album creation'
          }
        },
        cta: {
          title: 'Ready to see your photos?',
          description: 'Enter the client area with the password you received by email',
          button: 'Open gallery'
        }
      },
      packages: {
        title: 'Invest in memories that last forever',
        subtitle: 'Transparent pricing, no hidden fees',
        currency: '',
        cta: 'BOOK NOW',
        savings: 'YOU SAVE',
        popular: 'MOST POPULAR',
        availability: 'Only 3 dates available for May-September 2025',
        trust: {
          contract: 'Official contract',
          insurance: 'Insurance coverage',
          backup: 'Backup equipment'
        },
        packages: [
          {
            name: 'Essential',
            price: 2500,
            description: 'Perfect start for your love story',
            features: [
              '1 professional photographer',
              '6 hours event coverage',
              '300-400 edited photos',
              'Online gallery for 1 year',
              'Full resolution download',
              'Delivery within 30 days',
              '10 retouched portraits'
            ],
            ideal: 'Ideal for: Intimate weddings up to 50 guests'
          },
          {
            name: 'Signature',
            price: 4000,
            originalPrice: 4500,
            description: 'Our recommendation for complete coverage',
            features: [
              '2 photographers + 1 videographer',
              '10 hours coverage',
              '500-700 edited photos',
              'Professional video clip (3-5 min)',
              'Drone for aerial shots',
              'Pre-wedding photoshoot BONUS',
              'Online gallery for 2 years',
              '20 retouched portraits',
              'Express delivery of 50 photos for social media'
            ],
            ideal: 'Ideal for: Weddings from 50 to 150 guests',
            featured: true
          },
          {
            name: 'Luxury',
            price: 6000,
            description: 'The complete VIP experience for your special day',
            features: [
              '3 photographers + 2 videographers',
              'Unlimited coverage (full day)',
              '800-1000+ edited photos',
              'Full wedding film (20-30 min)',
              'Short clip for Instagram Reels',
              '2 drones for unique perspectives',
              'Pre-wedding AND post-wedding sessions',
              'Luxury photo album 30x30cm',
              'Online gallery FOREVER',
              '50 retouched portraits',
              'Priority processing (15 days)',
              'USB box with all photos'
            ],
            ideal: 'Ideal for: Large weddings over 150 guests'
          }
        ]
      },
      ctaSection: {
        title: 'Ready to capture your special day?',
        description: 'Contact us for a personalized consultation'
      },
      contactInfo: {
        phone: '+359 888 123 456',
        email: 'info@evermoreweddings.bg'
      },
      footer: {
        copyright: '© 2024 Evermore Weddings. All rights reserved.'
      }
    }
  };
  
  return (
    <LanguageContext.Provider value={{ language, toggleLanguage, translations }}>
      {children}
    </LanguageContext.Provider>
  );
};