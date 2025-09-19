import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '../contexts/LanguageContext';
import { ChevronDown } from 'lucide-react';

interface FAQItem {
  question: {
    bg: string;
    en: string;
  };
  answer: {
    bg: string;
    en: string;
  };
}

const FAQSection: React.FC = () => {
  const { language } = useLanguage();
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqData: FAQItem[] = [
    {
      question: {
        bg: 'Колко време отнема обработката на снимките?',
        en: 'How long does photo processing take?'
      },
      answer: {
        bg: 'Обработката на снимките отнема между 30-60 работни дни в зависимост от избрания пакет. За видео материалите времето е до 60 работни дни.',
        en: 'Photo processing takes 30-60 business days depending on the selected package. For video materials, the time is up to 60 business days.'
      }
    },
    {
      question: {
        bg: 'Можем ли да платим на части?',
        en: 'Can we pay in installments?'
      },
      answer: {
        bg: 'Да, предлагаме възможност за плащане на части по договор. Обикновено се изисква депозит от 30% при подписване на договора.',
        en: 'Yes, we offer the possibility of installment payments by contract. Usually a 30% deposit is required when signing the contract.'
      }
    },
    {
      question: {
        bg: 'Пътувате ли извън Плевен?',
        en: 'Do you travel outside Pleven?'
      },
      answer: {
        bg: 'Да, пътуваме в цяла България и чужбина. Разходите за транспорт и настаняване се обсъждат индивидуално.',
        en: 'Yes, we travel throughout Bulgaria and abroad. Transportation and accommodation costs are discussed individually.'
      }
    },
    {
      question: {
        bg: 'Какво включват пакетите?',
        en: 'What do the packages include?'
      },
      answer: {
        bg: 'Всички пакети включват професионално фотографиране, обработка на снимките, USB носител в стилна кутия и официален договор. Детайлите за всеки пакет можете да видите в секцията с цени.',
        en: 'All packages include professional photography, photo processing, USB drive in a stylish box and official contract. You can see the details for each package in the pricing section.'
      }
    },
    {
      question: {
        bg: 'Имате ли резервна техника?',
        en: 'Do you have backup equipment?'
      },
      answer: {
        bg: 'Да, винаги носим резервна техника за всички важни компоненти - фотоапарати, обективи, светкавици и карти памет.',
        en: 'Yes, we always carry backup equipment for all important components - cameras, lenses, flashes and memory cards.'
      }
    },
    {
      question: {
        bg: 'Можем ли да видим пълна галерия от сватба?',
        en: 'Can we see a full wedding gallery?'
      },
      answer: {
        bg: 'Разбира се! Можем да ви покажем пълни галерии от предишни сватби при лична среща или онлайн консултация.',
        en: 'Of course! We can show you full galleries from previous weddings during a personal meeting or online consultation.'
      }
    }
  ];

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-20 bg-white">
      <div className="max-w-4xl mx-auto px-4">
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="font-serif text-4xl font-semibold mb-4 text-gray-800">
            {language === 'bg' ? 'Често задавани въпроси' : 'Frequently Asked Questions'}
          </h2>
          <p className="font-sans text-xl text-gray-600">
            {language === 'bg' 
              ? 'Отговори на най-честите въпроси за нашите услуги'
              : 'Answers to the most common questions about our services'
            }
          </p>
        </motion.div>

        <div className="space-y-4">
          {faqData.map((faq, index) => (
            <motion.div
              key={index}
              className="border border-gray-200 rounded-lg overflow-hidden"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full px-6 py-4 text-left bg-gray-50 hover:bg-gray-100 transition-colors duration-200 flex justify-between items-center"
                aria-expanded={openIndex === index}
              >
                <span className="font-sans font-medium text-gray-800">
                  {faq.question[language]}
                </span>
                <ChevronDown 
                  className={`w-5 h-5 text-gray-500 transition-transform duration-200 ${
                    openIndex === index ? 'rotate-180' : ''
                  }`}
                />
              </button>
              
              <AnimatePresence>
                {openIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="px-6 py-4 bg-white border-t border-gray-200">
                      <p className="font-sans text-gray-600 leading-relaxed">
                        {faq.answer[language]}
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>

        <motion.div 
          className="text-center mt-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
        >
          <p className="font-sans text-gray-600 mb-4">
            {language === 'bg' 
              ? 'Не намерихте отговор на въпроса си?'
              : 'Didn\'t find the answer to your question?'
            }
          </p>
          <a
            href="#contact"
            className="inline-flex items-center bg-amber-600 text-white px-6 py-3 rounded-lg font-sans font-medium hover:bg-amber-700 transition-colors duration-200"
          >
            {language === 'bg' ? 'Свържете се с нас' : 'Contact Us'}
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default FAQSection;