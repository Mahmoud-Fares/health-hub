import { useState } from 'react';

import {
   ChefHat,
   ChevronDown,
   ChevronUp,
   Clock,
   Globe,
   Tag,
   Users,
   Utensils,
} from 'lucide-react';

interface Recipe {
   id: number;
   name: string;
   image: string;
   readyInMinutes: number;
   servings: number;
   instructions: string[];
   ingredients: Array<{
      name: string;
      amount: number;
      unit: string;
   }>;
   difficulty: string;
   cuisineType: string;
   dietaryTags: string[];
}

interface EnhancedRecipeCardProps {
   recipe: Recipe;
}

function EnhancedRecipeCard({ recipe }: EnhancedRecipeCardProps) {
   const [showAllInstructions, setShowAllInstructions] = useState(false);
   const [activeTab, setActiveTab] = useState<'ingredients' | 'instructions'>(
      'ingredients'
   );

   const getDifficultyColor = (difficulty: string) => {
      switch (difficulty.toLowerCase()) {
         case 'easy':
            return 'text-emerald-600 bg-emerald-50';
         case 'medium':
            return 'text-yellow-600 bg-yellow-50';
         case 'hard':
            return 'text-red-600 bg-red-50';
         default:
            return 'text-gray-600 bg-gray-50';
      }
   };

   const visibleInstructions = showAllInstructions
      ? recipe.instructions
      : recipe.instructions.slice(0, 4);

   return (
      <div className='overflow-hidden rounded-3xl border border-white/20 bg-white/80 shadow-2xl backdrop-blur-md'>
         {/* Header */}
         <div className='relative'>
            <img
               src={recipe.image}
               alt={recipe.name}
               className='h-64 w-full object-cover'
            />
            <div className='absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent' />
            <div className='absolute bottom-4 left-6 right-6'>
               <h3 className='mb-2 flex items-center text-2xl font-bold text-white'>
                  <ChefHat className='mr-3 h-6 w-6 text-orange-400' />
                  {recipe.name}
               </h3>
               <div className='flex items-center space-x-4 text-white/90'>
                  <div className='flex items-center'>
                     <Globe className='mr-1 h-4 w-4' />
                     <span className='text-sm'>{recipe.cuisineType}</span>
                  </div>
                  <div
                     className={`rounded-full px-3 py-1 text-xs font-medium ${getDifficultyColor(recipe.difficulty)}`}
                  >
                     {recipe.difficulty}
                  </div>
               </div>
            </div>
         </div>

         <div className='p-8'>
            {/* Recipe Stats */}
            <div className='mb-8 grid grid-cols-3 gap-4'>
               <div className='rounded-xl bg-gradient-to-br from-blue-50 to-blue-100 p-4 text-center'>
                  <Clock className='mx-auto mb-2 h-6 w-6 text-blue-600' />
                  <div className='text-lg font-bold text-blue-800'>
                     {recipe.readyInMinutes}
                  </div>
                  <div className='text-sm text-blue-600'>minutes</div>
               </div>
               <div className='rounded-xl bg-gradient-to-br from-emerald-50 to-emerald-100 p-4 text-center'>
                  <Users className='mx-auto mb-2 h-6 w-6 text-emerald-600' />
                  <div className='text-lg font-bold text-emerald-800'>
                     {recipe.servings}
                  </div>
                  <div className='text-sm text-emerald-600'>servings</div>
               </div>
               <div className='rounded-xl bg-gradient-to-br from-orange-50 to-orange-100 p-4 text-center'>
                  <Utensils className='mx-auto mb-2 h-6 w-6 text-orange-600' />
                  <div className='text-lg font-bold text-orange-800'>
                     {recipe.instructions.length}
                  </div>
                  <div className='text-sm text-orange-600'>steps</div>
               </div>
            </div>

            {/* Dietary Tags */}
            {recipe.dietaryTags.length > 0 && (
               <div className='mb-8'>
                  <h4 className='mb-3 flex items-center text-lg font-semibold text-gray-900'>
                     <Tag className='mr-2 h-5 w-5 text-purple-500' />
                     Dietary Information
                  </h4>
                  <div className='flex flex-wrap gap-2'>
                     {recipe.dietaryTags.map((tag, index) => (
                        <span
                           key={index}
                           className='rounded-full border border-purple-200 bg-purple-100 px-3 py-2 text-sm font-medium text-purple-700 transition-colors hover:bg-purple-200'
                        >
                           {tag}
                        </span>
                     ))}
                  </div>
               </div>
            )}

            {/* Tab Navigation */}
            <div className='mb-6'>
               <div className='flex space-x-1 rounded-lg bg-gray-100 p-1'>
                  <button
                     onClick={() => setActiveTab('ingredients')}
                     className={`flex-1 rounded-md px-4 py-2 text-sm font-medium transition-all duration-200 ${
                        activeTab === 'ingredients'
                           ? 'bg-white text-gray-900 shadow-sm'
                           : 'text-gray-600 hover:text-gray-900'
                     }`}
                  >
                     Ingredients ({recipe.ingredients.length})
                  </button>
                  <button
                     onClick={() => setActiveTab('instructions')}
                     className={`flex-1 rounded-md px-4 py-2 text-sm font-medium transition-all duration-200 ${
                        activeTab === 'instructions'
                           ? 'bg-white text-gray-900 shadow-sm'
                           : 'text-gray-600 hover:text-gray-900'
                     }`}
                  >
                     Instructions ({recipe.instructions.length})
                  </button>
               </div>
            </div>

            {/* Tab Content */}
            <div className='min-h-[300px]'>
               {activeTab === 'ingredients' && (
                  <div className='space-y-3'>
                     <h4 className='mb-4 text-lg font-semibold text-gray-900'>
                        Ingredients
                     </h4>
                     {recipe.ingredients.map((ingredient, index) => (
                        <div
                           key={index}
                           className='flex items-center justify-between rounded-lg bg-gray-50/80 px-4 py-3 backdrop-blur-sm transition-colors hover:bg-gray-100/80'
                        >
                           <span className='font-medium text-gray-900'>
                              {ingredient.name}
                           </span>
                           <span className='font-semibold text-gray-600'>
                              {ingredient.amount} {ingredient.unit}
                           </span>
                        </div>
                     ))}
                  </div>
               )}

               {activeTab === 'instructions' && (
                  <div>
                     <h4 className='mb-4 text-lg font-semibold text-gray-900'>
                        Cooking Instructions
                     </h4>
                     <div className='space-y-4'>
                        {visibleInstructions.map((instruction, index) => (
                           <div
                              key={index}
                              className='flex items-start space-x-4 rounded-lg bg-gray-50/80 p-4 backdrop-blur-sm transition-colors hover:bg-gray-100/80'
                           >
                              <div className='flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-gradient-to-r from-orange-400 to-orange-500 text-sm font-bold text-white shadow-lg'>
                                 {index + 1}
                              </div>
                              <p className='flex-1 leading-relaxed text-gray-700'>
                                 {instruction}
                              </p>
                           </div>
                        ))}

                        {recipe.instructions.length > 4 && (
                           <button
                              onClick={() =>
                                 setShowAllInstructions(!showAllInstructions)
                              }
                              className='flex w-full items-center justify-center space-x-2 rounded-lg bg-gradient-to-r from-orange-50 to-orange-100 px-4 py-3 font-medium text-orange-700 transition-all duration-200 hover:from-orange-100 hover:to-orange-200'
                           >
                              {showAllInstructions ? (
                                 <>
                                    <ChevronUp className='h-4 w-4' />
                                    <span>Show Less</span>
                                 </>
                              ) : (
                                 <>
                                    <ChevronDown className='h-4 w-4' />
                                    <span>
                                       Show {recipe.instructions.length - 4}{' '}
                                       More Steps
                                    </span>
                                 </>
                              )}
                           </button>
                        )}
                     </div>
                  </div>
               )}
            </div>

            {/* Action Buttons */}
            <div className='mt-8 flex space-x-4'>
               <button className='flex-1 transform rounded-xl bg-gradient-to-r from-orange-500 to-orange-600 px-6 py-3 font-medium text-white shadow-lg transition-all duration-200 hover:-translate-y-0.5 hover:from-orange-600 hover:to-orange-700 hover:shadow-xl'>
                  Are you excited? Start cooking now!
               </button>
            </div>
         </div>
      </div>
   );
}

export default EnhancedRecipeCard;
