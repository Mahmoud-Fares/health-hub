import {
   Activity,
   AlertTriangle,
   Droplets,
   Info,
   Shield,
   Wheat,
   Zap,
} from 'lucide-react';

interface NutritionData {
   calories: number;
   protein: number;
   carbs: number;
   fat: number;
   fiber: number;
   sugar: number;
   sodium: number;
   potassium: number;
   calcium: number;
   iron: number;
   vitaminC: number;
   vitaminA: number;
   cholesterol: number;
   saturatedFat: number;
   transFat: number;
   ingredients: string[];
   allergens: string[];
   servingSize: string;
   servingWeight: number;
}

interface EnhancedNutritionCardProps {
   nutritionData: NutritionData;
   confidence: number;
}

function EnhancedNutritionCard({
   nutritionData,
   confidence,
}: EnhancedNutritionCardProps) {
   const macros = [
      {
         name: 'Protein',
         value: nutritionData.protein,
         unit: 'g',
         color: 'emerald',
         icon: Activity,
         daily: 50,
      },
      {
         name: 'Carbs',
         value: nutritionData.carbs,
         unit: 'g',
         color: 'blue',
         icon: Wheat,
         daily: 300,
      },
      {
         name: 'Fat',
         value: nutritionData.fat,
         unit: 'g',
         color: 'orange',
         icon: Droplets,
         daily: 65,
      },
   ];

   const micronutrients = [
      { name: 'Fiber', value: nutritionData.fiber, unit: 'g', daily: 25 },
      { name: 'Sugar', value: nutritionData.sugar, unit: 'g', daily: 50 },
      { name: 'Sodium', value: nutritionData.sodium, unit: 'mg', daily: 2300 },
      {
         name: 'Potassium',
         value: nutritionData.potassium,
         unit: 'mg',
         daily: 3500,
      },
      {
         name: 'Calcium',
         value: nutritionData.calcium,
         unit: 'mg',
         daily: 1000,
      },
      { name: 'Iron', value: nutritionData.iron, unit: 'mg', daily: 18 },
      {
         name: 'Vitamin C',
         value: nutritionData.vitaminC,
         unit: 'mg',
         daily: 90,
      },
      {
         name: 'Vitamin A',
         value: nutritionData.vitaminA,
         unit: 'IU',
         daily: 900,
      },
   ];

   const getConfidenceColor = (confidence: number) => {
      if (confidence >= 0.9) return 'text-emerald-600 bg-emerald-50';
      if (confidence >= 0.7) return 'text-yellow-600 bg-yellow-50';
      return 'text-red-600 bg-red-50';
   };

   const getConfidenceText = (confidence: number) => {
      if (confidence >= 0.9) return 'High Accuracy';
      if (confidence >= 0.7) return 'Good Accuracy';
      return 'Low Accuracy';
   };

   const calculateDailyValue = (value: number, daily: number) => {
      return Math.round((value / daily) * 100);
   };

   return (
      <div className='rounded-3xl border border-white/20 bg-white/80 p-8 shadow-2xl backdrop-blur-md'>
         {/* Header with Confidence */}
         <div className='mb-8 flex items-center justify-between'>
            <h3 className='flex items-center text-2xl font-bold text-gray-900'>
               <Zap className='mr-3 h-6 w-6 text-emerald-500' />
               Nutritional Analysis
            </h3>
            <div
               className={`rounded-full px-4 py-2 text-sm font-medium ${getConfidenceColor(confidence)}`}
            >
               <div className='flex items-center space-x-2'>
                  <Shield className='h-4 w-4' />
                  <span>
                     {getConfidenceText(confidence)} (
                     {Math.round(confidence * 100)}%)
                  </span>
               </div>
            </div>
         </div>

         {/* Serving Information */}
         <div className='mb-8 rounded-2xl bg-gradient-to-r from-blue-50 to-emerald-50 p-4'>
            <div className='grid grid-cols-2 gap-4 text-center'>
               <div>
                  <div className='mb-1 text-sm text-gray-600'>Serving Size</div>
                  <div className='text-lg font-semibold text-gray-900'>
                     {nutritionData.servingSize}
                  </div>
               </div>
               <div>
                  <div className='mb-1 text-sm text-gray-600'>Weight</div>
                  <div className='text-lg font-semibold text-gray-900'>
                     {nutritionData.servingWeight}g
                  </div>
               </div>
            </div>
         </div>

         {/* Calories */}
         <div className='mb-8 rounded-2xl bg-gradient-to-r from-emerald-50 via-blue-50 to-purple-50 p-6'>
            <div className='text-center'>
               <div className='mb-2 text-4xl font-bold text-gray-900'>
                  {nutritionData.calories}
               </div>
               <div className='text-lg text-gray-600'>Calories</div>
               <div className='mt-1 text-sm text-gray-500'>
                  {Math.round((nutritionData.calories / 2000) * 100)}% of daily
                  value*
               </div>
            </div>
         </div>

         {/* Macronutrients */}
         <div className='mb-8'>
            <h4 className='mb-4 text-lg font-semibold text-gray-900'>
               Macronutrients
            </h4>
            <div className='grid grid-cols-3 gap-4'>
               {macros.map((macro) => {
                  const Icon = macro.icon;
                  const dailyPercent = calculateDailyValue(
                     macro.value,
                     macro.daily
                  );
                  return (
                     <div
                        key={macro.name}
                        className='rounded-xl bg-gray-50/80 p-4 text-center backdrop-blur-sm transition-all duration-300 hover:shadow-lg'
                     >
                        <Icon
                           className={`mx-auto mb-3 h-8 w-8 text-${macro.color}-500`}
                        />
                        <div className='mb-1 text-2xl font-bold text-gray-900'>
                           {macro.value}
                           {macro.unit}
                        </div>
                        <div className='mb-2 text-sm text-gray-600'>
                           {macro.name}
                        </div>
                        <div className='mb-1 h-2 w-full rounded-full bg-gray-200'>
                           <div
                              className={`bg-${macro.color}-500 h-2 rounded-full transition-all duration-500`}
                              style={{
                                 width: `${Math.min(dailyPercent, 100)}%`,
                              }}
                           ></div>
                        </div>
                        <div className='text-xs text-gray-500'>
                           {dailyPercent}% DV
                        </div>
                     </div>
                  );
               })}
            </div>
         </div>

         {/* Micronutrients */}
         <div className='mb-8'>
            <h4 className='mb-4 text-lg font-semibold text-gray-900'>
               Vitamins & Minerals
            </h4>
            <div className='grid grid-cols-2 gap-3'>
               {micronutrients.map((nutrient) => {
                  const dailyPercent = calculateDailyValue(
                     nutrient.value,
                     nutrient.daily
                  );
                  return (
                     <div
                        key={nutrient.name}
                        className='flex items-center justify-between rounded-lg bg-gray-50/80 px-4 py-3 backdrop-blur-sm transition-colors hover:bg-gray-100/80'
                     >
                        <div>
                           <span className='text-sm font-medium text-gray-900'>
                              {nutrient.name}
                           </span>
                           <div className='text-xs text-gray-500'>
                              {dailyPercent}% DV
                           </div>
                        </div>
                        <div className='text-right'>
                           <span className='text-sm font-semibold text-gray-900'>
                              {nutrient.value}
                              {nutrient.unit}
                           </span>
                        </div>
                     </div>
                  );
               })}
            </div>
         </div>

         {/* Health Indicators */}
         <div className='mb-8'>
            <h4 className='mb-4 text-lg font-semibold text-gray-900'>
               Health Indicators
            </h4>
            <div className='grid grid-cols-2 gap-4'>
               <div className='rounded-xl bg-red-50 p-4'>
                  <div className='mb-1 text-sm font-medium text-red-700'>
                     Cholesterol
                  </div>
                  <div className='text-lg font-bold text-red-800'>
                     {nutritionData.cholesterol}mg
                  </div>
                  <div className='text-xs text-red-600'>
                     {Math.round((nutritionData.cholesterol / 300) * 100)}% DV
                  </div>
               </div>
               <div className='rounded-xl bg-orange-50 p-4'>
                  <div className='mb-1 text-sm font-medium text-orange-700'>
                     Saturated Fat
                  </div>
                  <div className='text-lg font-bold text-orange-800'>
                     {nutritionData.saturatedFat}g
                  </div>
                  <div className='text-xs text-orange-600'>
                     {Math.round((nutritionData.saturatedFat / 20) * 100)}% DV
                  </div>
               </div>
            </div>
         </div>

         {/* Allergens */}
         {nutritionData.allergens.length > 0 && (
            <div className='mb-8'>
               <h4 className='mb-4 flex items-center text-lg font-semibold text-gray-900'>
                  <AlertTriangle className='mr-2 h-5 w-5 text-red-500' />
                  Allergen Information
               </h4>
               <div className='flex flex-wrap gap-2'>
                  {nutritionData.allergens.map((allergen, index) => (
                     <span
                        key={index}
                        className='rounded-full border border-red-200 bg-red-100 px-3 py-2 text-sm font-medium text-red-700'
                     >
                        {allergen.charAt(0).toUpperCase() + allergen.slice(1)}
                     </span>
                  ))}
               </div>
            </div>
         )}

         {/* Ingredients */}
         <div className='mb-6'>
            <h4 className='mb-4 text-lg font-semibold text-gray-900'>
               Ingredients
            </h4>
            <div className='flex flex-wrap gap-2'>
               {nutritionData.ingredients.map((ingredient, index) => (
                  <span
                     key={index}
                     className='rounded-full bg-emerald-100 px-3 py-2 text-sm font-medium text-emerald-700 transition-colors hover:bg-emerald-200'
                  >
                     {ingredient}
                  </span>
               ))}
            </div>
         </div>

         {/* Disclaimer */}
         <div className='mt-6 rounded-xl bg-blue-50 p-4'>
            <div className='flex items-start space-x-2'>
               <Info className='mt-0.5 h-5 w-5 flex-shrink-0 text-blue-500' />
               <div className='text-sm text-blue-700'>
                  <p className='mb-1 font-medium'>
                     Nutritional Information Disclaimer
                  </p>
                  <p>
                     *Percent Daily Values are based on a 2,000 calorie diet.
                     Values are estimates and may vary based on preparation
                     method and specific ingredients used.
                  </p>
               </div>
            </div>
         </div>
      </div>
   );
}

export default EnhancedNutritionCard;
