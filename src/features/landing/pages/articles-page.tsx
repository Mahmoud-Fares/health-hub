import React, { useState } from 'react';

import { Clock, Filter, Search, X } from 'lucide-react';
import { Link } from 'react-router-dom';

// Sample article data
const allArticles = [
   {
      id: 1,
      title: 'The Ultimate Guide to Macronutrients',
      excerpt:
         'Understanding proteins, carbs, and fats - the building blocks of nutrition.',
      category: 'Nutrition Basics',
      image: '/images/article1.jpeg',
      readTime: '8 min read',
      date: 'May 15, 2025',
      tags: ['macros', 'nutrition basics', 'diet'],
   },
   {
      id: 2,
      title: '10 Superfoods You Should Include in Your Diet',
      excerpt:
         'Discover nutrient-dense foods that offer maximum health benefits.',
      category: 'Healthy Eating',
      image: '/images/article2.jpeg',
      readTime: '6 min read',
      date: 'May 10, 2025',
      tags: ['superfoods', 'healthy eating', 'nutrition'],
   },
   {
      id: 3,
      title: 'Intermittent Fasting: Benefits and How to Start',
      excerpt:
         'The science behind intermittent fasting and how to implement it safely.',
      category: 'Diet Trends',
      image: '/images/article3.jpeg',
      readTime: '10 min read',
      date: 'May 5, 2025',
      tags: ['intermittent fasting', 'diet trends', 'weight loss'],
   },
   {
      id: 4,
      title: 'The Role of Protein in Muscle Recovery',
      excerpt:
         'How protein intake affects muscle repair and growth after exercise.',
      category: 'Sports Nutrition',
      image: '/images/article 4.jpeg',
      readTime: '7 min read',
      date: 'May 1, 2025',
      tags: ['protein', 'recovery', 'sports nutrition', 'fitness'],
   },
   {
      id: 5,
      title: "Plant-Based Eating: A Beginner's Guide",
      excerpt:
         'How to transition to a plant-based diet and ensure you get all essential nutrients.',
      category: 'Special Diets',
      image: '/images/article 5.jpeg',
      readTime: '9 min read',
      date: 'April 28, 2025',
      tags: ['plant-based', 'vegan', 'vegetarian', 'special diets'],
   },
   {
      id: 6,
      title: 'Understanding Food Labels: What to Look For',
      excerpt:
         'How to decode nutrition facts and ingredient lists for healthier choices.',
      category: 'Nutrition Basics',
      image: '/images/art 6.jpeg',
      readTime: '5 min read',
      date: 'April 25, 2025',
      tags: ['food labels', 'shopping', 'nutrition basics'],
   },
];

const categories = [
   'All',
   'Nutrition Basics',
   'Healthy Eating',
   'Diet Trends',
   'Sports Nutrition',
   'Special Diets',
];

interface Article {
   id: number;
   title: string;
   excerpt: string;
   category: string;
   image: string;
   readTime: string;
   date: string;
   tags: string[];
}

const ArticlesPage = () => {
   const [searchTerm, setSearchTerm] = useState('');
   const [selectedCategory, setSelectedCategory] = useState('All');
   const [filteredArticles, setFilteredArticles] =
      useState<Article[]>(allArticles);

   const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
      const term = e.target.value;
      setSearchTerm(term);
      filterArticles(term, selectedCategory);
   };

   const handleCategorySelect = (category: string) => {
      setSelectedCategory(category);
      filterArticles(searchTerm, category);
   };

   const filterArticles = (term: string, category: string) => {
      let filtered = allArticles;

      // Filter by search term
      if (term) {
         const lowerTerm = term.toLowerCase();
         filtered = filtered.filter(
            (article) =>
               article.title.toLowerCase().includes(lowerTerm) ||
               article.excerpt.toLowerCase().includes(lowerTerm) ||
               article.tags.some((tag) => tag.toLowerCase().includes(lowerTerm))
         );
      }

      // Filter by category
      if (category !== 'All') {
         filtered = filtered.filter((article) => article.category === category);
      }

      setFilteredArticles(filtered);
   };

   const clearFilters = () => {
      setSearchTerm('');
      setSelectedCategory('All');
      setFilteredArticles(allArticles);
   };

   return (
      <div className='pb-20 pt-28'>
         <div className='container mx-auto px-4'>
            {/* Page Header */}
            <div className='mb-12 text-center'>
               <h1 className='mb-4 text-4xl font-bold text-gray-900 md:text-5xl'>
                  Nutrition Articles
               </h1>
               <p className='mx-auto max-w-3xl text-xl text-gray-700'>
                  Evidence-based articles on nutrition, diet, and healthy eating
                  habits
               </p>
            </div>

            {/* Search and Filter */}
            <div className='mb-12'>
               <div className='mb-6 flex flex-col items-center justify-between gap-4 md:flex-row'>
                  <div className='relative w-full md:w-96'>
                     <input
                        type='text'
                        placeholder='Search articles...'
                        value={searchTerm}
                        onChange={handleSearch}
                        className='w-full rounded-full border border-gray-300 bg-white py-3 pl-12 pr-4 focus:border-blue-500 focus:outline-none'
                     />
                     <Search
                        className='absolute left-4 top-1/2 -translate-y-1/2 transform text-gray-400'
                        size={20}
                     />
                  </div>

                  <div className='flex items-center'>
                     <Filter size={20} className='mr-2 text-gray-700' />
                     <span className='mr-2 text-gray-700'>Filter:</span>
                     <div className='flex flex-wrap gap-2'>
                        {categories.map((category) => (
                           <button
                              key={category}
                              onClick={() => handleCategorySelect(category)}
                              className={`rounded-full px-4 py-1.5 text-sm transition-colors duration-300 ${
                                 selectedCategory === category
                                    ? 'bg-blue-600 text-white'
                                    : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                              }`}
                           >
                              {category}
                           </button>
                        ))}
                     </div>
                  </div>
               </div>

               {/* Active filters */}
               {(searchTerm || selectedCategory !== 'All') && (
                  <div className='flex items-center'>
                     <span className='mr-2 text-sm text-gray-600'>
                        Active filters:
                     </span>
                     <div className='flex flex-wrap gap-2'>
                        {searchTerm && (
                           <div className='flex items-center rounded-full bg-blue-100 px-3 py-1 text-sm text-blue-800'>
                              Search: "{searchTerm}"
                              <button
                                 onClick={() => setSearchTerm('')}
                                 className='ml-2 text-blue-800'
                              >
                                 <X size={14} />
                              </button>
                           </div>
                        )}
                        {selectedCategory !== 'All' && (
                           <div className='flex items-center rounded-full bg-blue-100 px-3 py-1 text-sm text-blue-800'>
                              Category: {selectedCategory}
                              <button
                                 onClick={() => setSelectedCategory('All')}
                                 className='ml-2 text-blue-800'
                              >
                                 <X size={14} />
                              </button>
                           </div>
                        )}
                        <button
                           onClick={clearFilters}
                           className='text-sm text-blue-600 underline hover:text-blue-800'
                        >
                           Clear all
                        </button>
                     </div>
                  </div>
               )}
            </div>

            {/* Articles Grid */}
            {filteredArticles.length > 0 ? (
               <div className='grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3'>
                  {filteredArticles.map((article) => (
                     <ArticleCard key={article.id} article={article} />
                  ))}
               </div>
            ) : (
               <div className='py-16 text-center'>
                  <p className='mb-4 text-xl text-gray-700'>
                     No articles found matching your criteria.
                  </p>
                  <button
                     onClick={clearFilters}
                     className='text-blue-600 underline hover:text-blue-800'
                  >
                     Clear filters and try again
                  </button>
               </div>
            )}
         </div>
      </div>
   );
};

const ArticleCard = ({ article }: { article: Article }) => (
   <div className='flex h-full flex-col overflow-hidden rounded-xl bg-white shadow-sm transition-shadow duration-300 hover:shadow-md'>
      <Link to={`/articles/${article.id}`}>
         <img
            src={article.image}
            alt={article.title}
            className='h-48 w-full object-cover transition-opacity duration-300 hover:opacity-90'
         />
      </Link>
      <div className='flex flex-grow flex-col p-6'>
         <span className='mb-2 text-sm font-semibold text-blue-600'>
            {article.category}
         </span>
         <Link to={`/articles/${article.id}`} className='group'>
            <h3 className='mb-3 text-xl font-bold text-gray-900 transition-colors duration-300 group-hover:text-blue-600'>
               {article.title}
            </h3>
         </Link>
         <p className='mb-4 flex-grow text-gray-700'>{article.excerpt}</p>
         <div className='mt-auto flex items-center justify-between text-sm text-gray-500'>
            <span>{article.date}</span>
            <span className='flex items-center'>
               <Clock size={16} className='mr-1' /> {article.readTime}
            </span>
         </div>
      </div>
   </div>
);

export default ArticlesPage;
