// import React from 'react';
import { Clock } from 'lucide-react';
import { Link } from 'react-router-dom';

// Sample data for featured articles
const featuredArticles = [
   {
      id: 1,
      title: 'The Ultimate Guide to Macronutrients',
      excerpt:
         'Understanding proteins, carbs, and fats - the building blocks of nutrition.',
      category: 'Nutrition Basics',
      image: '/images/article1.jpeg',
      readTime: '8 min read',
      date: 'May 15, 2025',
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
   },
];

const FeaturedArticles = () => {
   return (
      <div className='grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3'>
         {featuredArticles.map((article) => (
            <ArticleCard key={article.id} article={article} />
         ))}
      </div>
   );
};

interface Article {
   id: number;
   title: string;
   excerpt: string;
   category: string;
   image: string;
   readTime: string;
   date: string;
}

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
         <Link to={`/articles/${article.id}`}>
            <h3 className='mb-3 text-xl font-bold text-gray-900 transition-colors duration-300 hover:text-blue-600'>
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

export default FeaturedArticles;
