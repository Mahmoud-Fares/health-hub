// import React from 'react';
import {
   ArrowLeft,
   Bookmark,
   Calendar,
   Clock,
   Facebook,
   Linkedin,
   Share2,
   Twitter,
} from 'lucide-react';
import { Link, useParams } from 'react-router-dom';

// Sample article data
const articles = [
   {
      id: 1,
      title: 'The Ultimate Guide to Macronutrients',
      content: `
      <p class="lead">Understanding the role of proteins, carbohydrates, and fats is essential for building a balanced diet that supports your health and fitness goals.</p>
      
      <h2>What Are Macronutrients?</h2>
      <p>Macronutrients are the nutrients that your body needs in large amounts to function properly. They include proteins, carbohydrates, and fats, and they provide the energy (calories) your body needs for daily activities, exercise, and basic bodily functions.</p>
      
      <h2>Proteins: The Building Blocks</h2>
      <p>Proteins are made up of amino acids, which are essential for building and repairing tissues, supporting immune function, and creating enzymes and hormones. Good sources of protein include:</p>
      <ul>
        <li>Lean meats (chicken, turkey, beef)</li>
        <li>Fish and seafood</li>
        <li>Eggs</li>
        <li>Dairy products</li>
        <li>Legumes (beans, lentils)</li>
        <li>Tofu and tempeh</li>
      </ul>
      
      <h2>Carbohydrates: The Energy Source</h2>
      <p>Carbohydrates are your body's primary and preferred source of energy. They break down into glucose, which fuels your brain, muscles, and other organs. Carbs are found in:</p>
      <ul>
        <li>Whole grains (brown rice, oats, quinoa)</li>
        <li>Fruits</li>
        <li>Vegetables</li>
        <li>Legumes</li>
        <li>Starchy vegetables (potatoes, corn)</li>
      </ul>
      
      <h2>Fats: Essential for Health</h2>
      <p>Dietary fats are crucial for hormone production, brain health, vitamin absorption, and cell structure. Healthy fats can be found in:</p>
      <ul>
        <li>Avocados</li>
        <li>Nuts and seeds</li>
        <li>Olive oil</li>
        <li>Fatty fish (salmon, mackerel)</li>
        <li>Eggs</li>
      </ul>
      
      <h2>Finding Your Macro Balance</h2>
      <p>The ideal macronutrient ratio varies depending on your age, sex, activity level, and health goals. However, a general starting point for a balanced diet is:</p>
      <ul>
        <li>Proteins: 10-35% of daily calories</li>
        <li>Carbohydrates: 45-65% of daily calories</li>
        <li>Fats: 20-35% of daily calories</li>
      </ul>
      
      <p>For weight loss, some people find success with a slightly higher protein intake and lower carbohydrate intake. For athletic performance, carbohydrate needs often increase.</p>
      
      <h2>Quality Matters</h2>
      <p>Beyond just hitting your macro targets, the quality of your food choices makes a significant difference in your health. Focus on whole, minimally processed foods for the majority of your diet.</p>
      
      <h2>Tracking Your Macros</h2>
      <p>If you're interested in optimizing your nutrition, tracking your macronutrient intake can be helpful. Many apps make this process simple, allowing you to log your food and see the breakdown of proteins, carbs, and fats.</p>
      
      <h2>Conclusion</h2>
      <p>Understanding macronutrients is the foundation of nutrition science. By making informed choices about your protein, carbohydrate, and fat intake, you can create a diet that supports your unique health and fitness goals.</p>
    `,
      excerpt:
         'Understanding proteins, carbs, and fats - the building blocks of nutrition.',
      category: 'Nutrition Basics',
      image: '/images/article1.jpeg',
      author: {
         name: 'Dr. Emily Chen',
         role: 'Registered Dietitian',
         image: '/images/dr article1.jpeg',
      },
      readTime: '8 min read',
      date: 'May 15, 2025',
      tags: ['macros', 'nutrition basics', 'diet'],
      relatedArticles: [2, 4, 6],
   },
   {
      id: 2,
      title: '10 Superfoods You Should Include in Your Diet',
      content: `<p>Content for Superfoods article...</p>`,
      excerpt:
         'Discover nutrient-dense foods that offer maximum health benefits.',
      category: 'Healthy Eating',
      image: '/images/article2.jpeg',
      author: {
         name: 'Michael Wong',
         role: 'Nutrition Coach',
         image: '/images/dr article2.jpeg',
      },
      readTime: '6 min read',
      date: 'May 10, 2025',
      tags: ['superfoods', 'healthy eating', 'nutrition'],
      relatedArticles: [1, 3, 5],
   },
   {
      id: 3,
      title: 'Intermittent Fasting: Benefits and How to Start',
      content: `<p>Content for Intermittent Fasting article...</p>`,
      excerpt:
         'The science behind intermittent fasting and how to implement it safely.',
      category: 'Diet Trends',
      image: '/images/article3.jpeg',
      author: {
         name: 'Dr. Sarah Johnson',
         role: 'Nutritionist',
         image: '/images/dr 3.jpeg',
      },
      readTime: '10 min read',
      date: 'May 5, 2025',
      tags: ['intermittent fasting', 'diet trends', 'weight loss'],
      relatedArticles: [1, 2, 4],
   },
   {
      id: 4,
      title: 'The Role of Protein in Muscle Recovery',
      content: `<p>Content for Protein article...</p>`,
      excerpt:
         'How protein intake affects muscle repair and growth after exercise.',
      category: 'Sports Nutrition',
      image: '/images/article 4.jpeg',
      author: {
         name: 'James Rodriguez',
         role: 'Sports Nutritionist',
         image: '/images/dr 4.jpeg',
      },
      readTime: '7 min read',
      date: 'May 1, 2025',
      tags: ['protein', 'recovery', 'sports nutrition', 'fitness'],
      relatedArticles: [1, 3, 5],
   },
   {
      id: 5,
      title: "Plant-Based Eating: A Beginner's Guide",
      content: `<p>Content for Plant-Based Eating article...</p>`,
      excerpt:
         'How to transition to a plant-based diet and ensure you get all essential nutrients.',
      category: 'Special Diets',
      image: '/images/article 5.jpeg',
      author: {
         name: 'Lisa Patel',
         role: 'Plant-Based Specialist',
         image: '/images/dr 5.jpeg',
      },
      readTime: '9 min read',
      date: 'April 28, 2025',
      tags: ['plant-based', 'vegan', 'vegetarian', 'special diets'],
      relatedArticles: [2, 4, 6],
   },
   {
      id: 6,
      title: 'Understanding Food Labels: What to Look For',
      content: `<p>Content for Food Labels article...</p>`,
      excerpt:
         'How to decode nutrition facts and ingredient lists for healthier choices.',
      category: 'Nutrition Basics',
      image: '/images/art 6.jpeg',
      author: {
         name: 'Dr. Robert Williams',
         role: 'Food Scientist',
         image: '/images/dr 6.jpeg',
      },
      readTime: '5 min read',
      date: 'April 25, 2025',
      tags: ['food labels', 'shopping', 'nutrition basics'],
      relatedArticles: [1, 3, 5],
   },
];

const ArticleDetailPage = () => {
   const { id } = useParams<{ id: string }>();
   const articleId = parseInt(id || '1');

   const article = articles.find((a) => a.id === articleId);

   if (!article) {
      return (
         <div className='pb-20 pt-32 text-center'>
            <div className='container mx-auto px-4'>
               <h1 className='mb-6 text-3xl font-bold text-gray-900'>
                  Article Not Found
               </h1>
               <p className='mb-8 text-xl text-gray-700'>
                  The article you're looking for doesn't exist or has been
                  moved.
               </p>
               <Link
                  to='/articles'
                  className='rounded-full bg-blue-600 px-6 py-2 font-medium text-white transition-all duration-300 hover:bg-blue-700'
               >
                  Back to Articles
               </Link>
            </div>
         </div>
      );
   }

   const relatedArticles = article.relatedArticles
      .map((id) => articles.find((a) => a.id === id))
      .filter(Boolean);

   return (
      <div className='pb-20 pt-28'>
         <div className='container mx-auto px-4'>
            {/* Back to Articles */}
            <div className='mb-8'>
               <Link
                  to='/articles'
                  className='flex items-center font-medium text-blue-600 hover:text-blue-700'
               >
                  <ArrowLeft size={20} className='mr-2' /> Back to Articles
               </Link>
            </div>

            {/* Article Header */}
            <div className='mb-8'>
               <span className='mb-4 inline-block rounded-full bg-blue-100 px-3 py-1 text-sm font-medium text-blue-800'>
                  {article.category}
               </span>
               <h1 className='mb-6 text-3xl font-bold text-gray-900 md:text-4xl lg:text-5xl'>
                  {article.title}
               </h1>

               <div className='mb-6 flex flex-wrap items-center gap-4 text-gray-600'>
                  <div className='flex items-center'>
                     <Calendar size={18} className='mr-2' />
                     <span>{article.date}</span>
                  </div>
                  <div className='flex items-center'>
                     <Clock size={18} className='mr-2' />
                     <span>{article.readTime}</span>
                  </div>
               </div>

               <div className='mb-6 flex items-center'>
                  <img
                     src={article.author.image}
                     alt={article.author.name}
                     className='mr-4 h-12 w-12 rounded-full object-cover'
                  />
                  <div>
                     <p className='font-bold text-gray-900'>
                        {article.author.name}
                     </p>
                     <p className='text-gray-600'>{article.author.role}</p>
                  </div>
               </div>
            </div>

            {/* Article Image */}
            <div className='mb-10'>
               <img
                  src={article.image}
                  alt={article.title}
                  className='h-96 w-full rounded-xl object-cover'
               />
            </div>

            <div className='flex flex-col gap-8 lg:flex-row'>
               {/* Article Content */}
               <div className='lg:w-2/3'>
                  <article className='prose prose-lg max-w-none'>
                     <div
                        dangerouslySetInnerHTML={{ __html: article.content }}
                     />
                  </article>

                  {/* Tags */}
                  <div className='mt-8'>
                     <p className='mb-3 font-bold text-gray-900'>Tags:</p>
                     <div className='flex flex-wrap gap-2'>
                        {article.tags.map((tag, index) => (
                           <span
                              key={index}
                              className='rounded-full bg-gray-100 px-3 py-1 text-sm text-gray-800'
                           >
                              {tag}
                           </span>
                        ))}
                     </div>
                  </div>

                  {/* Share */}
                  <div className='mt-8 border-b border-t border-gray-200 py-6'>
                     <p className='mb-3 font-bold text-gray-900'>
                        Share this article:
                     </p>
                     <div className='flex space-x-4'>
                        <a
                           href='#'
                           className='rounded-full bg-blue-600 p-2 text-white transition-colors duration-300 hover:bg-blue-700'
                        >
                           <Facebook size={20} />
                        </a>
                        <a
                           href='#'
                           className='rounded-full bg-blue-400 p-2 text-white transition-colors duration-300 hover:bg-blue-500'
                        >
                           <Twitter size={20} />
                        </a>
                        <a
                           href='#'
                           className='rounded-full bg-blue-700 p-2 text-white transition-colors duration-300 hover:bg-blue-800'
                        >
                           <Linkedin size={20} />
                        </a>
                        <a
                           href='#'
                           className='rounded-full bg-gray-700 p-2 text-white transition-colors duration-300 hover:bg-gray-800'
                        >
                           <Share2 size={20} />
                        </a>
                     </div>
                  </div>
               </div>

               {/* Sidebar */}
               <div className='lg:w-1/3'>
                  <div className='mb-8 rounded-xl bg-blue-50 p-6'>
                     <div className='mb-4 flex items-center justify-between'>
                        <h3 className='text-xl font-bold text-gray-900'>
                           Save for Later
                        </h3>
                        <button className='text-blue-600 hover:text-blue-700'>
                           <Bookmark size={20} />
                        </button>
                     </div>
                     <p className='mb-4 text-gray-700'>
                        Like this article? Save it to read later or share with
                        friends who might benefit from this information.
                     </p>
                     <button className='w-full rounded-full bg-blue-600 py-2 text-white transition-colors duration-300 hover:bg-blue-700'>
                        Save Article
                     </button>
                  </div>

                  {/* Related Articles */}
                  <div className='rounded-xl bg-gray-50 p-6'>
                     <h3 className='mb-4 text-xl font-bold text-gray-900'>
                        Related Articles
                     </h3>
                     <div className='space-y-4'>
                        {relatedArticles.map(
                           (relatedArticle) =>
                              relatedArticle && (
                                 <div
                                    key={relatedArticle.id}
                                    className='rounded-lg bg-white p-4 shadow-sm'
                                 >
                                    <Link
                                       to={`/articles/${relatedArticle.id}`}
                                       className='group'
                                    >
                                       <h4 className='mb-2 font-bold text-gray-900 transition-colors duration-300 group-hover:text-blue-600'>
                                          {relatedArticle.title}
                                       </h4>
                                       <p className='mb-2 text-sm text-gray-700'>
                                          {relatedArticle.excerpt}
                                       </p>
                                       <div className='flex text-sm text-gray-500'>
                                          <span className='flex items-center'>
                                             <Clock
                                                size={14}
                                                className='mr-1'
                                             />{' '}
                                             {relatedArticle.readTime}
                                          </span>
                                       </div>
                                    </Link>
                                 </div>
                              )
                        )}
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </div>
   );
};

export default ArticleDetailPage;
