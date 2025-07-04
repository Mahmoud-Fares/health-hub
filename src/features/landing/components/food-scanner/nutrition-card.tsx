import { Activity, Droplets, Wheat, Zap } from 'lucide-react';

interface NutritionInfo {
   calories: number;
   protein: number;
   carbs: number;
   fat: number;
   fiber: number;
   sugar: number;
   sodium: number;
   ingredients: string[];
}

interface NutritionCardProps {
   nutritionInfo: NutritionInfo;
}

function NutritionCard({ nutritionInfo }: NutritionCardProps) {
   const macros = [
      {
         name: 'Protein',
         value: nutritionInfo.protein,
         unit: 'g',
         color: 'emerald',
         icon: Activity,
      },
      {
         name: 'Carbs',
         value: nutritionInfo.carbs,
         unit: 'g',
         color: 'blue',
         icon: Wheat,
      },
      {
         name: 'Fat',
         value: nutritionInfo.fat,
         unit: 'g',
         color: 'orange',
         icon: Droplets,
      },
   ];

   const nutrients = [
      { name: 'Fiber', value: nutritionInfo.fiber, unit: 'g' },
      { name: 'Sugar', value: nutritionInfo.sugar, unit: 'g' },
      { name: 'Sodium', value: nutritionInfo.sodium, unit: 'mg' },
   ];

   return (
      <div className='rounded-2xl bg-white/70 p-6 shadow-xl backdrop-blur-sm'>
         <h3 className='mb-6 flex items-center text-xl font-semibold text-gray-900'>
            <Zap className='mr-2 h-5 w-5 text-emerald-500' />
            Nutritional Information
         </h3>

         {/* Calories */}
         <div className='mb-6 rounded-xl bg-gradient-to-r from-emerald-50 to-blue-50 p-4'>
            <div className='text-center'>
               <div className='text-3xl font-bold text-gray-900'>
                  {nutritionInfo.calories}
               </div>
               <div className='text-sm text-gray-600'>Calories</div>
            </div>
         </div>

         {/* Macros */}
         <div className='mb-6 grid grid-cols-3 gap-4'>
            {macros.map((macro) => {
               const Icon = macro.icon;
               return (
                  <div
                     key={macro.name}
                     className='rounded-lg bg-gray-50 p-3 text-center'
                  >
                     <Icon
                        className={`mx-auto mb-2 h-6 w-6 text-${macro.color}-500`}
                     />
                     <div className='text-lg font-semibold text-gray-900'>
                        {macro.value}
                        {macro.unit}
                     </div>
                     <div className='text-xs text-gray-600'>{macro.name}</div>
                  </div>
               );
            })}
         </div>

         {/* Other Nutrients */}
         <div className='mb-6'>
            <h4 className='mb-3 text-sm font-medium text-gray-900'>
               Other Nutrients
            </h4>
            <div className='space-y-2'>
               {nutrients.map((nutrient) => (
                  <div
                     key={nutrient.name}
                     className='flex items-center justify-between rounded-lg bg-gray-50 px-3 py-2'
                  >
                     <span className='text-sm text-gray-700'>
                        {nutrient.name}
                     </span>
                     <span className='text-sm font-medium text-gray-900'>
                        {nutrient.value}
                        {nutrient.unit}
                     </span>
                  </div>
               ))}
            </div>
         </div>

         {/* Ingredients */}
         <div>
            <h4 className='mb-3 text-sm font-medium text-gray-900'>
               Ingredients
            </h4>
            <div className='flex flex-wrap gap-2'>
               {nutritionInfo.ingredients.map((ingredient, index) => (
                  <span
                     key={index}
                     className='rounded-full bg-emerald-100 px-3 py-1 text-xs font-medium text-emerald-700'
                  >
                     {ingredient}
                  </span>
               ))}
            </div>
         </div>
      </div>
   );
}

export default NutritionCard;
