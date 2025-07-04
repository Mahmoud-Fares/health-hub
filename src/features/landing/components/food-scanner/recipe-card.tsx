import { ChefHat, Clock, Users } from 'lucide-react';

interface Recipe {
   id: number;
   name: string;
   image: string;
   readyInMinutes: number;
   servings: number;
   instructions: string[];
}

interface RecipeCardProps {
   recipe: Recipe;
}

function RecipeCard({ recipe }: RecipeCardProps) {
   return (
      <div className='rounded-2xl bg-white/70 p-6 shadow-xl backdrop-blur-sm'>
         <h3 className='mb-6 flex items-center text-xl font-semibold text-gray-900'>
            <ChefHat className='mr-2 h-5 w-5 text-orange-500' />
            Recipe: {recipe.name}
         </h3>

         <div className='mb-6'>
            <img
               src={recipe.image}
               alt={recipe.name}
               className='h-48 w-full rounded-xl object-cover'
            />
         </div>

         <div className='mb-6 flex items-center space-x-6 text-sm text-gray-600'>
            <div className='flex items-center'>
               <Clock className='mr-1 h-4 w-4' />
               <span>{recipe.readyInMinutes} minutes</span>
            </div>
            <div className='flex items-center'>
               <Users className='mr-1 h-4 w-4' />
               <span>{recipe.servings} servings</span>
            </div>
         </div>

         <div>
            <h4 className='mb-4 text-lg font-medium text-gray-900'>
               Instructions
            </h4>
            <ol className='space-y-3'>
               {recipe.instructions.map((instruction, index) => (
                  <li key={index} className='flex'>
                     <span className='mr-3 mt-0.5 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-orange-100 text-sm font-medium text-orange-600'>
                        {index + 1}
                     </span>
                     <span className='text-sm leading-relaxed text-gray-700'>
                        {instruction}
                     </span>
                  </li>
               ))}
            </ol>
         </div>
      </div>
   );
}

export default RecipeCard;
