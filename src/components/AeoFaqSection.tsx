import React, { useMemo, useState } from 'react';
import { ChevronDown, HelpCircle, MessageCircleQuestion, Sparkles } from 'lucide-react';
import { allFaqs, faqCategories } from '../data/faqs';

export const AeoFaqSection: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [openFaqId, setOpenFaqId] = useState<string>('');

  const filteredFaqs = useMemo(() => (
    selectedCategory === 'all'
      ? allFaqs
      : allFaqs.filter((faq) => faq.category === selectedCategory)
  ), [selectedCategory]);

  const activeCategory = faqCategories.find((category) => category.id === selectedCategory);

  const selectCategory = (categoryId: string) => {
    setSelectedCategory(categoryId);
    setOpenFaqId('');
  };

  const toggleFaq = (id: string) => {
    setOpenFaqId((currentId) => currentId === id ? '' : id);
  };

  return (
    <section id="faqs" className="border-y border-slate-200 bg-[#f5f8fb] py-20 text-slate-800 sm:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-8 border-b border-slate-200 pb-10 lg:grid-cols-[minmax(0,1fr)_250px] lg:items-end lg:gap-16">
          <div className="max-w-3xl">
            <div className="text-eyebrow inline-flex items-center gap-2 rounded-full border border-sky-200 bg-white px-3.5 py-2 text-slate-700 shadow-sm">
              <HelpCircle className="h-4 w-4 text-teal-600" />
              <span>Clinical &amp; Practical Q&amp;A</span>
            </div>

            <h2 className="text-section-title mt-5 text-navy-900">
              Frequently Asked <span className="text-teal-600">Questions</span>
            </h2>

            <p className="text-lead mt-4 max-w-2xl text-slate-600">
              Clear answers to common questions about consultations, treatment pathways, recovery and private care.
            </p>
          </div>

          <div className="border-l-2 border-teal-500 pl-5 text-slate-600">
            <div className="flex items-center gap-2 text-teal-700">
              <MessageCircleQuestion className="h-5 w-5" />
              <span className="text-eyebrow">Patient guidance</span>
            </div>
            <p className="mt-2 font-serif text-[28px] font-semibold leading-none text-navy-900">
              {allFaqs.length} common questions
            </p>
            <p className="text-body-small mt-2">
              Organised by the topic most relevant to your consultation.
            </p>
          </div>
        </div>

        <div className="mt-10 grid gap-8 lg:grid-cols-[230px_minmax(0,1fr)] lg:gap-14">
          <nav aria-label="FAQ categories" className="min-w-0">
            <p className="text-eyebrow mb-3 text-slate-500">Browse by topic</p>
            <div className="-mx-4 flex gap-2 overflow-x-auto px-4 pb-2 lg:mx-0 lg:block lg:space-y-1 lg:overflow-visible lg:px-0 lg:pb-0">
              {faqCategories.map((category) => {
                const isSelected = selectedCategory === category.id;

                return (
                  <button
                    key={category.id}
                    type="button"
                    onClick={() => selectCategory(category.id)}
                    className={`text-button min-h-11 shrink-0 rounded-lg border px-4 py-2.5 text-left transition-colors lg:flex lg:w-full lg:items-center lg:justify-between ${
                      isSelected
                        ? 'border-navy-900 bg-navy-900 text-white shadow-sm'
                        : 'border-slate-200 bg-white text-slate-700 hover:border-sky-300 hover:bg-sky-50'
                    }`}
                    aria-pressed={isSelected}
                  >
                    <span>{category.label}</span>
                    <span className={`ml-3 text-[12px] ${isSelected ? 'text-sky-200' : 'text-slate-400'}`}>
                      {category.id === 'all'
                        ? allFaqs.length
                        : allFaqs.filter((faq) => faq.category === category.id).length}
                    </span>
                  </button>
                );
              })}
            </div>
          </nav>

          <div>
            <div className="mb-3 flex items-center justify-between gap-4">
              <p className="text-eyebrow text-teal-700">{activeCategory?.label ?? 'All FAQs'}</p>
              <p className="text-meta text-slate-500">{filteredFaqs.length} questions</p>
            </div>

            <div className="border-y border-slate-200 bg-white">
              {filteredFaqs.map((faq, index) => {
                const isOpen = openFaqId === faq.id;
                const answerId = `${faq.id}-answer`;

                return (
                  <article key={faq.id} className="border-b border-slate-200 last:border-b-0">
                    <button
                      type="button"
                      onClick={() => toggleFaq(faq.id)}
                      className="group flex w-full items-start gap-4 px-4 py-5 text-left transition-colors hover:bg-slate-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-teal-500 sm:gap-5 sm:px-6 sm:py-6"
                      aria-expanded={isOpen}
                      aria-controls={answerId}
                    >
                      <span className="font-serif text-[20px] font-semibold leading-none text-teal-600 sm:text-[24px]">
                        {String(index + 1).padStart(2, '0')}
                      </span>

                      <span className="min-w-0 flex-1">
                        <span className="block font-serif text-[19px] font-semibold leading-[1.3] text-navy-900 sm:text-[22px]">
                          {faq.question}
                        </span>
                      </span>

                      <span
                        className={`mt-0.5 inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full border transition-all duration-200 ${
                          isOpen
                            ? 'rotate-180 border-teal-500 bg-teal-500 text-white'
                            : 'border-slate-200 bg-white text-slate-500 group-hover:border-sky-300 group-hover:text-teal-700'
                        }`}
                        aria-hidden="true"
                      >
                        <ChevronDown className="h-4 w-4" />
                      </span>
                    </button>

                    <div
                      id={answerId}
                      className={`grid transition-[grid-template-rows] duration-300 ease-out ${isOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'}`}
                    >
                      <div className="overflow-hidden">
                        <div className="ml-4 border-l-2 border-teal-500 bg-sky-50/50 px-5 py-5 sm:ml-6 sm:px-6">
                          <p className="text-body max-w-3xl text-slate-700">{faq.answer}</p>

                          <div className="text-body-small mt-5 flex max-w-3xl items-start gap-2 border-t border-sky-100 pt-4 text-teal-950">
                            <Sparkles className="mt-0.5 h-4 w-4 shrink-0 text-teal-600" />
                            <span><strong>Key takeaway:</strong> {faq.keyTakeaway}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
