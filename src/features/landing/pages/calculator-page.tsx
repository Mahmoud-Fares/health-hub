import { useState } from 'react';

import { ArrowRight, Calculator, Info } from 'lucide-react';

const CalculatorsPage = () => {
   const [activeCalculator, setActiveCalculator] = useState('bmr');

   return (
      <div className='pb-20 pt-28'>
         <div className='container mx-auto px-4'>
            {/* Page Header */}
            <div className='mb-12 text-center'>
               <h1 className='mb-6 text-4xl font-bold text-gray-900 md:text-5xl'>
                  Nutrition Calculators
               </h1>
               <p className='mx-auto max-w-3xl text-xl text-gray-700'>
                  Free tools to help you understand your nutritional needs and
                  track your progress
               </p>
            </div>

            {/* Calculator Selection */}
            <div className='mb-12 flex flex-wrap justify-center gap-4'>
               <CalculatorButton
                  id='bmr'
                  label='BMR Calculator'
                  isActive={activeCalculator === 'bmr'}
                  onClick={() => setActiveCalculator('bmr')}
               />
               <CalculatorButton
                  id='tdee'
                  label='TDEE Calculator'
                  isActive={activeCalculator === 'tdee'}
                  onClick={() => setActiveCalculator('tdee')}
               />
               <CalculatorButton
                  id='macro'
                  label='Macro Calculator'
                  isActive={activeCalculator === 'macro'}
                  onClick={() => setActiveCalculator('macro')}
               />
               <CalculatorButton
                  id='bmi'
                  label='BMI Calculator'
                  isActive={activeCalculator === 'bmi'}
                  onClick={() => setActiveCalculator('bmi')}
               />
               <CalculatorButton
                  id='water'
                  label='Water Intake'
                  isActive={activeCalculator === 'water'}
                  onClick={() => setActiveCalculator('water')}
               />
            </div>

            {/* Active Calculator */}
            <div className='mx-auto max-w-4xl'>
               {activeCalculator === 'bmr' && <BMRCalculator />}
               {activeCalculator === 'tdee' && <TDEECalculator />}
               {activeCalculator === 'macro' && <MacroCalculator />}
               {activeCalculator === 'bmi' && <BMICalculator />}
               {activeCalculator === 'water' && <WaterIntakeCalculator />}
            </div>

            {/* Calculator Information */}
            <div className='mx-auto mt-16 max-w-4xl'>
               <div className='rounded-xl bg-gray-50 p-6'>
                  <div className='mb-4 flex items-start'>
                     <Info size={24} className='mr-3 mt-1 text-blue-600' />
                     <div>
                        <h3 className='mb-2 text-xl font-bold text-gray-900'>
                           About Our Calculators
                        </h3>
                        <p className='text-gray-700'>
                           These calculators provide estimates based on
                           established formulas used in nutrition science. While
                           they offer a helpful starting point, individual needs
                           can vary based on factors not captured by these
                           calculations. For personalized nutrition guidance,
                           consider booking a consultation with one of our
                           registered dietitians.
                        </p>
                     </div>
                  </div>
               </div>
            </div>

            {/* CTA Section */}
            <div className='mx-auto mt-16 max-w-4xl rounded-xl bg-blue-50 p-8 text-center'>
               <h2 className='mb-4 text-2xl font-bold text-gray-900'>
                  Need Personalized Nutrition Guidance?
               </h2>
               <p className='mb-6 text-gray-700'>
                  Our nutrition experts can create a customized plan based on
                  your unique needs, preferences, and goals.
               </p>
               <a
                  href='/find-doctors'
                  className='inline-flex items-center rounded-full bg-blue-600 px-6 py-2 font-medium text-white transition-colors duration-300 hover:bg-blue-700'
               >
                  Book a Consultation <ArrowRight size={16} className='ml-2' />
               </a>
            </div>
         </div>
      </div>
   );
};

const CalculatorButton = ({
   label,
   isActive,
   onClick,
}: {
   id: string;
   label: string;
   isActive: boolean;
   onClick: () => void;
}) => (
   <button
      onClick={onClick}
      className={`flex items-center rounded-full px-6 py-2 transition-colors duration-300 ${
         isActive
            ? 'bg-blue-600 text-white'
            : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
      }`}
   >
      <Calculator size={18} className='mr-2' /> {label}
   </button>
);

const BMRCalculator = () => {
   const [gender, setGender] = useState('female');
   const [age, setAge] = useState('');
   const [weight, setWeight] = useState('');
   const [height, setHeight] = useState('');
   const [weightUnit, setWeightUnit] = useState('kg');
   const [heightUnit, setHeightUnit] = useState('cm');
   const [result, setResult] = useState<number | null>(null);

   const calculateBMR = () => {
      if (!age || !weight || !height) {
         alert('Please fill in all fields');
         return;
      }

      const ageNum = parseFloat(age);
      let weightKg = parseFloat(weight);
      let heightCm = parseFloat(height);

      // Convert to metric if needed
      if (weightUnit === 'lbs') {
         weightKg = weightKg * 0.453592;
      }

      if (heightUnit === 'in') {
         heightCm = heightCm * 2.54;
      }

      // Mifflin-St Jeor Equation
      let bmr;
      if (gender === 'male') {
         bmr = 10 * weightKg + 6.25 * heightCm - 5 * ageNum + 5;
      } else {
         bmr = 10 * weightKg + 6.25 * heightCm - 5 * ageNum - 161;
      }

      setResult(Math.round(bmr));
   };

   return (
      <div className='rounded-xl border border-gray-100 bg-white p-8 shadow-sm'>
         <h2 className='mb-6 flex items-center text-2xl font-bold text-gray-900'>
            <Calculator size={24} className='mr-2 text-blue-600' /> Basal
            Metabolic Rate (BMR) Calculator
         </h2>

         <p className='mb-6 text-gray-700'>
            Your Basal Metabolic Rate (BMR) is the number of calories your body
            needs to maintain basic physiological functions while at rest. This
            includes breathing, circulation, cell production, and more.
         </p>

         <div className='mb-6 grid grid-cols-1 gap-6 md:grid-cols-2'>
            <div>
               <label className='mb-2 block font-medium text-gray-700'>
                  Gender
               </label>
               <div className='flex space-x-4'>
                  <label className='flex items-center'>
                     <input
                        type='radio'
                        name='gender'
                        value='male'
                        checked={gender === 'male'}
                        onChange={() => setGender('male')}
                        className='mr-2'
                     />
                     Male
                  </label>
                  <label className='flex items-center'>
                     <input
                        type='radio'
                        name='gender'
                        value='female'
                        checked={gender === 'female'}
                        onChange={() => setGender('female')}
                        className='mr-2'
                     />
                     Female
                  </label>
               </div>
            </div>

            <div>
               <label className='mb-2 block font-medium text-gray-700'>
                  Age
               </label>
               <input
                  type='number'
                  value={age}
                  onChange={(e) => setAge(e.target.value)}
                  min='1'
                  max='120'
                  className='w-full rounded-lg border border-gray-300 bg-white p-3 focus:border-blue-500 focus:outline-none'
                  placeholder='Years'
               />
            </div>
         </div>

         <div className='mb-8 grid grid-cols-1 gap-6 md:grid-cols-2'>
            <div>
               <label className='mb-2 block font-medium text-gray-700'>
                  Weight
               </label>
               <div className='flex'>
                  <input
                     type='number'
                     value={weight}
                     onChange={(e) => setWeight(e.target.value)}
                     min='1'
                     className='w-full rounded-l-lg border border-gray-300 bg-white p-3 focus:border-blue-500 focus:outline-none'
                     placeholder='Weight'
                  />
                  <select
                     value={weightUnit}
                     onChange={(e) => setWeightUnit(e.target.value)}
                     className='rounded-r-lg border border-gray-300 bg-gray-100 p-3 focus:outline-none'
                  >
                     <option value='kg'>kg</option>
                     <option value='lbs'>lbs</option>
                  </select>
               </div>
            </div>

            <div>
               <label className='mb-2 block font-medium text-gray-700'>
                  Height
               </label>
               <div className='flex'>
                  <input
                     type='number'
                     value={height}
                     onChange={(e) => setHeight(e.target.value)}
                     min='1'
                     className='w-full rounded-l-lg border border-gray-300 bg-white p-3 focus:border-blue-500 focus:outline-none'
                     placeholder='Height'
                  />
                  <select
                     value={heightUnit}
                     onChange={(e) => setHeightUnit(e.target.value)}
                     className='rounded-r-lg border border-gray-300 bg-gray-100 p-3 focus:outline-none'
                  >
                     <option value='cm'>cm</option>
                     <option value='in'>in</option>
                  </select>
               </div>
            </div>
         </div>

         <button
            onClick={calculateBMR}
            className='mb-6 w-full rounded-lg bg-blue-600 px-6 py-3 font-bold text-white transition-colors duration-300 hover:bg-blue-700'
         >
            Calculate BMR
         </button>

         {result !== null && (
            <div className='rounded-xl bg-blue-50 p-6'>
               <h3 className='mb-2 text-xl font-bold text-gray-900'>
                  Your Results
               </h3>
               <p className='mb-2 text-gray-700'>
                  Your Basal Metabolic Rate (BMR) is:
               </p>
               <p className='mb-4 text-3xl font-bold text-blue-600'>
                  {result} calories/day
               </p>
               <p className='text-sm text-gray-700'>
                  This is the number of calories your body needs at complete
                  rest. Your total daily calorie needs will be higher based on
                  your activity level.
               </p>
            </div>
         )}
      </div>
   );
};

const TDEECalculator = () => {
   const [gender, setGender] = useState('female');
   const [age, setAge] = useState('');
   const [weight, setWeight] = useState('');
   const [height, setHeight] = useState('');
   const [weightUnit, setWeightUnit] = useState('kg');
   const [heightUnit, setHeightUnit] = useState('cm');
   const [activityLevel, setActivityLevel] = useState('sedentary');
   const [result, setResult] = useState<{ bmr: number; tdee: number } | null>(
      null
   );

   const calculateTDEE = () => {
      if (!age || !weight || !height) {
         alert('Please fill in all fields');
         return;
      }

      const ageNum = parseFloat(age);
      let weightKg = parseFloat(weight);
      let heightCm = parseFloat(height);

      // Convert to metric if needed
      if (weightUnit === 'lbs') {
         weightKg = weightKg * 0.453592;
      }

      if (heightUnit === 'in') {
         heightCm = heightCm * 2.54;
      }

      // Mifflin-St Jeor Equation for BMR
      let bmr;
      if (gender === 'male') {
         bmr = 10 * weightKg + 6.25 * heightCm - 5 * ageNum + 5;
      } else {
         bmr = 10 * weightKg + 6.25 * heightCm - 5 * ageNum - 161;
      }

      // Activity multipliers
      const activityMultipliers = {
         sedentary: 1.2, // Little or no exercise
         light: 1.375, // Light exercise 1-3 days/week
         moderate: 1.55, // Moderate exercise 3-5 days/week
         active: 1.725, // Active exercise 6-7 days/week
         veryActive: 1.9, // Very active exercise, physical job or training twice/day
      };

      const tdee =
         bmr *
         activityMultipliers[activityLevel as keyof typeof activityMultipliers];

      setResult({
         bmr: Math.round(bmr),
         tdee: Math.round(tdee),
      });
   };

   return (
      <div className='rounded-xl border border-gray-100 bg-white p-8 shadow-sm'>
         <h2 className='mb-6 flex items-center text-2xl font-bold text-gray-900'>
            <Calculator size={24} className='mr-2 text-blue-600' /> Total Daily
            Energy Expenditure (TDEE) Calculator
         </h2>

         <p className='mb-6 text-gray-700'>
            Your Total Daily Energy Expenditure (TDEE) is the total number of
            calories you burn each day, including your basal metabolism and all
            activities.
         </p>

         <div className='mb-6 grid grid-cols-1 gap-6 md:grid-cols-2'>
            <div>
               <label className='mb-2 block font-medium text-gray-700'>
                  Gender
               </label>
               <div className='flex space-x-4'>
                  <label className='flex items-center'>
                     <input
                        type='radio'
                        name='gender'
                        value='male'
                        checked={gender === 'male'}
                        onChange={() => setGender('male')}
                        className='mr-2'
                     />
                     Male
                  </label>
                  <label className='flex items-center'>
                     <input
                        type='radio'
                        name='gender'
                        value='female'
                        checked={gender === 'female'}
                        onChange={() => setGender('female')}
                        className='mr-2'
                     />
                     Female
                  </label>
               </div>
            </div>

            <div>
               <label className='mb-2 block font-medium text-gray-700'>
                  Age
               </label>
               <input
                  type='number'
                  value={age}
                  onChange={(e) => setAge(e.target.value)}
                  min='1'
                  max='120'
                  className='w-full rounded-lg border border-gray-300 bg-white p-3 focus:border-blue-500 focus:outline-none'
                  placeholder='Years'
               />
            </div>
         </div>

         <div className='mb-6 grid grid-cols-1 gap-6 md:grid-cols-2'>
            <div>
               <label className='mb-2 block font-medium text-gray-700'>
                  Weight
               </label>
               <div className='flex'>
                  <input
                     type='number'
                     value={weight}
                     onChange={(e) => setWeight(e.target.value)}
                     min='1'
                     className='w-full rounded-l-lg border border-gray-300 bg-white p-3 focus:border-blue-500 focus:outline-none'
                     placeholder='Weight'
                  />
                  <select
                     value={weightUnit}
                     onChange={(e) => setWeightUnit(e.target.value)}
                     className='rounded-r-lg border border-gray-300 bg-gray-100 p-3 focus:outline-none'
                  >
                     <option value='kg'>kg</option>
                     <option value='lbs'>lbs</option>
                  </select>
               </div>
            </div>

            <div>
               <label className='mb-2 block font-medium text-gray-700'>
                  Height
               </label>
               <div className='flex'>
                  <input
                     type='number'
                     value={height}
                     onChange={(e) => setHeight(e.target.value)}
                     min='1'
                     className='w-full rounded-l-lg border border-gray-300 bg-white p-3 focus:border-blue-500 focus:outline-none'
                     placeholder='Height'
                  />
                  <select
                     value={heightUnit}
                     onChange={(e) => setHeightUnit(e.target.value)}
                     className='rounded-r-lg border border-gray-300 bg-gray-100 p-3 focus:outline-none'
                  >
                     <option value='cm'>cm</option>
                     <option value='in'>in</option>
                  </select>
               </div>
            </div>
         </div>

         <div className='mb-8'>
            <label className='mb-2 block font-medium text-gray-700'>
               Activity Level
            </label>
            <select
               value={activityLevel}
               onChange={(e) => setActivityLevel(e.target.value)}
               className='w-full rounded-lg border border-gray-300 bg-white p-3 focus:border-blue-500 focus:outline-none'
            >
               <option value='sedentary'>
                  Sedentary (little or no exercise)
               </option>
               <option value='light'>
                  Lightly active (light exercise 1-3 days/week)
               </option>
               <option value='moderate'>
                  Moderately active (moderate exercise 3-5 days/week)
               </option>
               <option value='active'>
                  Active (hard exercise 6-7 days/week)
               </option>
               <option value='veryActive'>
                  Very active (very hard exercise, physical job or training
                  twice/day)
               </option>
            </select>
         </div>

         <button
            onClick={calculateTDEE}
            className='mb-6 w-full rounded-lg bg-blue-600 px-6 py-3 font-bold text-white transition-colors duration-300 hover:bg-blue-700'
         >
            Calculate TDEE
         </button>

         {result !== null && (
            <div className='rounded-xl bg-blue-50 p-6'>
               <h3 className='mb-2 text-xl font-bold text-gray-900'>
                  Your Results
               </h3>
               <div className='mb-4 grid grid-cols-1 gap-4 md:grid-cols-2'>
                  <div>
                     <p className='mb-1 text-gray-700'>
                        Your Basal Metabolic Rate (BMR):
                     </p>
                     <p className='text-2xl font-bold text-blue-600'>
                        {result.bmr} calories/day
                     </p>
                  </div>
                  <div>
                     <p className='mb-1 text-gray-700'>
                        Your Total Daily Energy Expenditure (TDEE):
                     </p>
                     <p className='text-2xl font-bold text-blue-600'>
                        {result.tdee} calories/day
                     </p>
                  </div>
               </div>
               <p className='text-sm text-gray-700'>
                  This is an estimate of how many calories you burn per day. To
                  lose weight, consume fewer calories than your TDEE. To gain
                  weight, consume more.
               </p>
            </div>
         )}
      </div>
   );
};

const MacroCalculator = () => {
   const [gender, setGender] = useState('female');
   const [age, setAge] = useState('');
   const [weight, setWeight] = useState('');
   const [height, setHeight] = useState('');
   const [weightUnit, setWeightUnit] = useState('kg');
   const [heightUnit, setHeightUnit] = useState('cm');
   const [activityLevel, setActivityLevel] = useState('moderate');
   const [goal, setGoal] = useState('maintain');
   const [result, setResult] = useState<{
      calories: number;
      protein: number;
      carbs: number;
      fat: number;
   } | null>(null);

   const calculateMacros = () => {
      if (!age || !weight || !height) {
         alert('Please fill in all fields');
         return;
      }

      const ageNum = parseFloat(age);
      let weightKg = parseFloat(weight);
      let heightCm = parseFloat(height);

      // Convert to metric if needed
      if (weightUnit === 'lbs') {
         weightKg = weightKg * 0.453592;
      }

      if (heightUnit === 'in') {
         heightCm = heightCm * 2.54;
      }

      // Mifflin-St Jeor Equation for BMR
      let bmr;
      if (gender === 'male') {
         bmr = 10 * weightKg + 6.25 * heightCm - 5 * ageNum + 5;
      } else {
         bmr = 10 * weightKg + 6.25 * heightCm - 5 * ageNum - 161;
      }

      // Activity multipliers
      const activityMultipliers = {
         sedentary: 1.2,
         light: 1.375,
         moderate: 1.55,
         active: 1.725,
         veryActive: 1.9,
      };

      // let tdee = bmr * activityMultipliers[activityLevel as keyof typeof activityMultipliers];
      const tdee =
         bmr *
         activityMultipliers[activityLevel as keyof typeof activityMultipliers];

      // Adjust based on goal
      let calories;
      if (goal === 'lose') {
         calories = tdee - 500; // 500 calorie deficit for weight loss
      } else if (goal === 'gain') {
         calories = tdee + 500; // 500 calorie surplus for weight gain
      } else {
         calories = tdee; // Maintenance
      }

      // Calculate macros
      // Protein: 1.6g per kg of bodyweight (or adjusted based on goal)
      let protein;
      if (goal === 'lose') {
         protein = weightKg * 2.0; // Higher protein for weight loss
      } else if (goal === 'gain') {
         protein = weightKg * 1.8; // High protein for muscle gain
      } else {
         protein = weightKg * 1.6; // Moderate protein for maintenance
      }

      // Fat: 25-35% of calories
      let fatPercentage;
      if (goal === 'lose') {
         fatPercentage = 0.25; // Lower fat for weight loss
      } else {
         fatPercentage = 0.3; // Moderate fat otherwise
      }

      const fat = (calories * fatPercentage) / 9; // 9 calories per gram of fat

      // Remaining calories from carbs
      const proteinCalories = protein * 4; // 4 calories per gram of protein
      const fatCalories = fat * 9;
      const carbCalories = calories - proteinCalories - fatCalories;
      const carbs = carbCalories / 4; // 4 calories per gram of carbs

      setResult({
         calories: Math.round(calories),
         protein: Math.round(protein),
         carbs: Math.round(carbs),
         fat: Math.round(fat),
      });
   };

   return (
      <div className='rounded-xl border border-gray-100 bg-white p-8 shadow-sm'>
         <h2 className='mb-6 flex items-center text-2xl font-bold text-gray-900'>
            <Calculator size={24} className='mr-2 text-blue-600' /> Macro
            Calculator
         </h2>

         <p className='mb-6 text-gray-700'>
            Calculate your recommended macronutrient intake based on your body
            metrics, activity level, and goals.
         </p>

         <div className='mb-6 grid grid-cols-1 gap-6 md:grid-cols-2'>
            <div>
               <label className='mb-2 block font-medium text-gray-700'>
                  Gender
               </label>
               <div className='flex space-x-4'>
                  <label className='flex items-center'>
                     <input
                        type='radio'
                        name='gender'
                        value='male'
                        checked={gender === 'male'}
                        onChange={() => setGender('male')}
                        className='mr-2'
                     />
                     Male
                  </label>
                  <label className='flex items-center'>
                     <input
                        type='radio'
                        name='gender'
                        value='female'
                        checked={gender === 'female'}
                        onChange={() => setGender('female')}
                        className='mr-2'
                     />
                     Female
                  </label>
               </div>
            </div>

            <div>
               <label className='mb-2 block font-medium text-gray-700'>
                  Age
               </label>
               <input
                  type='number'
                  value={age}
                  onChange={(e) => setAge(e.target.value)}
                  min='1'
                  max='120'
                  className='w-full rounded-lg border border-gray-300 bg-white p-3 focus:border-blue-500 focus:outline-none'
                  placeholder='Years'
               />
            </div>
         </div>

         <div className='mb-6 grid grid-cols-1 gap-6 md:grid-cols-2'>
            <div>
               <label className='mb-2 block font-medium text-gray-700'>
                  Weight
               </label>
               <div className='flex'>
                  <input
                     type='number'
                     value={weight}
                     onChange={(e) => setWeight(e.target.value)}
                     min='1'
                     className='w-full rounded-l-lg border border-gray-300 bg-white p-3 focus:border-blue-500 focus:outline-none'
                     placeholder='Weight'
                  />
                  <select
                     value={weightUnit}
                     onChange={(e) => setWeightUnit(e.target.value)}
                     className='rounded-r-lg border border-gray-300 bg-gray-100 p-3 focus:outline-none'
                  >
                     <option value='kg'>kg</option>
                     <option value='lbs'>lbs</option>
                  </select>
               </div>
            </div>

            <div>
               <label className='mb-2 block font-medium text-gray-700'>
                  Height
               </label>
               <div className='flex'>
                  <input
                     type='number'
                     value={height}
                     onChange={(e) => setHeight(e.target.value)}
                     min='1'
                     className='w-full rounded-l-lg border border-gray-300 bg-white p-3 focus:border-blue-500 focus:outline-none'
                     placeholder='Height'
                  />
                  <select
                     value={heightUnit}
                     onChange={(e) => setHeightUnit(e.target.value)}
                     className='rounded-r-lg border border-gray-300 bg-gray-100 p-3 focus:outline-none'
                  >
                     <option value='cm'>cm</option>
                     <option value='in'>in</option>
                  </select>
               </div>
            </div>
         </div>

         <div className='mb-8 grid grid-cols-1 gap-6 md:grid-cols-2'>
            <div>
               <label className='mb-2 block font-medium text-gray-700'>
                  Activity Level
               </label>
               <select
                  value={activityLevel}
                  onChange={(e) => setActivityLevel(e.target.value)}
                  className='w-full rounded-lg border border-gray-300 bg-white p-3 focus:border-blue-500 focus:outline-none'
               >
                  <option value='sedentary'>
                     Sedentary (little or no exercise)
                  </option>
                  <option value='light'>Lightly active (1-3 days/week)</option>
                  <option value='moderate'>
                     Moderately active (3-5 days/week)
                  </option>
                  <option value='active'>Active (6-7 days/week)</option>
                  <option value='veryActive'>
                     Very active (twice/day, extra heavy)
                  </option>
               </select>
            </div>

            <div>
               <label className='mb-2 block font-medium text-gray-700'>
                  Goal
               </label>
               <select
                  value={goal}
                  onChange={(e) => setGoal(e.target.value)}
                  className='w-full rounded-lg border border-gray-300 bg-white p-3 focus:border-blue-500 focus:outline-none'
               >
                  <option value='lose'>Lose Weight</option>
                  <option value='maintain'>Maintain Weight</option>
                  <option value='gain'>Gain Weight</option>
               </select>
            </div>
         </div>

         <button
            onClick={calculateMacros}
            className='mb-6 w-full rounded-lg bg-blue-600 px-6 py-3 font-bold text-white transition-colors duration-300 hover:bg-blue-700'
         >
            Calculate Macros
         </button>

         {result !== null && (
            <div className='rounded-xl bg-blue-50 p-6'>
               <h3 className='mb-4 text-xl font-bold text-gray-900'>
                  Your Recommended Daily Intake
               </h3>

               <div className='mb-6'>
                  <p className='mb-1 text-gray-700'>Total Calories:</p>
                  <p className='text-3xl font-bold text-blue-600'>
                     {result.calories} calories/day
                  </p>
               </div>

               <div className='mb-4 grid grid-cols-1 gap-4 md:grid-cols-3'>
                  <div className='rounded-lg bg-white p-4 shadow-sm'>
                     <p className='mb-1 text-gray-700'>Protein:</p>
                     <p className='mb-1 text-2xl font-bold text-blue-600'>
                        {result.protein}g
                     </p>
                     <p className='text-sm text-gray-600'>
                        ({Math.round(result.protein * 4)} calories)
                     </p>
                  </div>
                  <div className='rounded-lg bg-white p-4 shadow-sm'>
                     <p className='mb-1 text-gray-700'>Carbohydrates:</p>
                     <p className='mb-1 text-2xl font-bold text-blue-600'>
                        {result.carbs}g
                     </p>
                     <p className='text-sm text-gray-600'>
                        ({Math.round(result.carbs * 4)} calories)
                     </p>
                  </div>
                  <div className='rounded-lg bg-white p-4 shadow-sm'>
                     <p className='mb-1 text-gray-700'>Fat:</p>
                     <p className='mb-1 text-2xl font-bold text-blue-600'>
                        {result.fat}g
                     </p>
                     <p className='text-sm text-gray-600'>
                        ({Math.round(result.fat * 9)} calories)
                     </p>
                  </div>
               </div>

               <p className='text-sm text-gray-700'>
                  These macronutrient recommendations are based on your personal
                  metrics and goals. For a more personalized nutrition plan,
                  consider booking a consultation with one of our nutritionists.
               </p>
            </div>
         )}
      </div>
   );
};

const BMICalculator = () => {
   const [weight, setWeight] = useState('');
   const [height, setHeight] = useState('');
   const [weightUnit, setWeightUnit] = useState('kg');
   const [heightUnit, setHeightUnit] = useState('cm');
   const [result, setResult] = useState<{
      bmi: number;
      category: string;
   } | null>(null);

   const calculateBMI = () => {
      if (!weight || !height) {
         alert('Please fill in all fields');
         return;
      }

      let weightKg = parseFloat(weight);
      let heightM;

      // Convert to metric if needed
      if (weightUnit === 'lbs') {
         weightKg = weightKg * 0.453592;
      }

      if (heightUnit === 'cm') {
         heightM = parseFloat(height) / 100;
      } else {
         // inches
         heightM = parseFloat(height) * 0.0254;
      }

      const bmi = weightKg / (heightM * heightM);

      let category;
      if (bmi < 18.5) {
         category = 'Underweight';
      } else if (bmi >= 18.5 && bmi < 25) {
         category = 'Normal weight';
      } else if (bmi >= 25 && bmi < 30) {
         category = 'Overweight';
      } else {
         category = 'Obesity';
      }

      setResult({
         bmi: parseFloat(bmi.toFixed(1)),
         category,
      });
   };

   return (
      <div className='rounded-xl border border-gray-100 bg-white p-8 shadow-sm'>
         <h2 className='mb-6 flex items-center text-2xl font-bold text-gray-900'>
            <Calculator size={24} className='mr-2 text-blue-600' /> Body Mass
            Index (BMI) Calculator
         </h2>

         <p className='mb-6 text-gray-700'>
            BMI is a measure of body fat based on height and weight that applies
            to adult men and women. While BMI is a useful screening tool, it
            does not directly measure body fat and may not be accurate for
            athletes, elderly individuals, or pregnant women.
         </p>

         <div className='mb-8 grid grid-cols-1 gap-6 md:grid-cols-2'>
            <div>
               <label className='mb-2 block font-medium text-gray-700'>
                  Weight
               </label>
               <div className='flex'>
                  <input
                     type='number'
                     value={weight}
                     onChange={(e) => setWeight(e.target.value)}
                     min='1'
                     className='w-full rounded-l-lg border border-gray-300 bg-white p-3 focus:border-blue-500 focus:outline-none'
                     placeholder='Weight'
                  />
                  <select
                     value={weightUnit}
                     onChange={(e) => setWeightUnit(e.target.value)}
                     className='rounded-r-lg border border-gray-300 bg-gray-100 p-3 focus:outline-none'
                  >
                     <option value='kg'>kg</option>
                     <option value='lbs'>lbs</option>
                  </select>
               </div>
            </div>

            <div>
               <label className='mb-2 block font-medium text-gray-700'>
                  Height
               </label>
               <div className='flex'>
                  <input
                     type='number'
                     value={height}
                     onChange={(e) => setHeight(e.target.value)}
                     min='1'
                     className='w-full rounded-l-lg border border-gray-300 bg-white p-3 focus:border-blue-500 focus:outline-none'
                     placeholder='Height'
                  />
                  <select
                     value={heightUnit}
                     onChange={(e) => setHeightUnit(e.target.value)}
                     className='rounded-r-lg border border-gray-300 bg-gray-100 p-3 focus:outline-none'
                  >
                     <option value='cm'>cm</option>
                     <option value='in'>in</option>
                  </select>
               </div>
            </div>
         </div>

         <button
            onClick={calculateBMI}
            className='mb-6 w-full rounded-lg bg-blue-600 px-6 py-3 font-bold text-white transition-colors duration-300 hover:bg-blue-700'
         >
            Calculate BMI
         </button>

         {result !== null && (
            <div className='rounded-xl bg-blue-50 p-6'>
               <h3 className='mb-2 text-xl font-bold text-gray-900'>
                  Your Results
               </h3>
               <p className='mb-2 text-gray-700'>
                  Your Body Mass Index (BMI) is:
               </p>
               <p className='mb-2 text-3xl font-bold text-blue-600'>
                  {result.bmi}
               </p>
               <p className='mb-4 text-xl font-medium'>
                  Category: {result.category}
               </p>
               <p className='text-sm text-gray-700'>
                  BMI Categories:
                  <br />
                  Underweight: Less than 18.5
                  <br />
                  Normal weight: 18.5 - 24.9
                  <br />
                  Overweight: 25 - 29.9
                  <br />
                  Obesity: 30 or greater
               </p>
               <div className='mt-4 border-l-4 border-yellow-400 bg-yellow-50 p-4 text-yellow-800'>
                  <p className='text-sm'>
                     <strong>Note:</strong> BMI is a screening tool, not a
                     diagnostic tool. It does not account for muscle mass, bone
                     density, or body composition. For a more comprehensive
                     assessment of your health, consult with a healthcare
                     professional.
                  </p>
               </div>
            </div>
         )}
      </div>
   );
};

const WaterIntakeCalculator = () => {
   const [weight, setWeight] = useState('');
   const [weightUnit, setWeightUnit] = useState('kg');
   const [activityLevel, setActivityLevel] = useState('moderate');
   const [climate, setClimate] = useState('temperate');
   const [result, setResult] = useState<{
      ml: number;
      oz: number;
      cups: number;
   } | null>(null);

   const calculateWaterIntake = () => {
      if (!weight) {
         alert('Please enter your weight');
         return;
      }

      let weightKg = parseFloat(weight);

      // Convert to kg if needed
      if (weightUnit === 'lbs') {
         weightKg = weightKg * 0.453592;
      }

      // Base calculation: 30-35ml per kg of body weight
      let baseIntake = weightKg * 30;

      // Adjust for activity level
      const activityMultipliers = {
         sedentary: 1.0,
         light: 1.1,
         moderate: 1.2,
         active: 1.3,
         veryActive: 1.4,
      };

      baseIntake *=
         activityMultipliers[activityLevel as keyof typeof activityMultipliers];

      // Adjust for climate
      const climateMultipliers = {
         cold: 0.9,
         temperate: 1.0,
         hot: 1.2,
         veryHot: 1.4,
      };

      baseIntake *=
         climateMultipliers[climate as keyof typeof climateMultipliers];

      // Convert to ounces and cups
      const oz = baseIntake / 29.5735;
      const cups = oz / 8;

      setResult({
         ml: Math.round(baseIntake),
         oz: Math.round(oz),
         cups: parseFloat(cups.toFixed(1)),
      });
   };

   return (
      <div className='rounded-xl border border-gray-100 bg-white p-8 shadow-sm'>
         <h2 className='mb-6 flex items-center text-2xl font-bold text-gray-900'>
            <Calculator size={24} className='mr-2 text-blue-600' /> Water Intake
            Calculator
         </h2>

         <p className='mb-6 text-gray-700'>
            Proper hydration is essential for overall health. This calculator
            provides an estimate of how much water you should drink daily based
            on your weight, activity level, and climate.
         </p>

         <div className='mb-6'>
            <label className='mb-2 block font-medium text-gray-700'>
               Weight
            </label>
            <div className='flex'>
               <input
                  type='number'
                  value={weight}
                  onChange={(e) => setWeight(e.target.value)}
                  min='1'
                  className='w-full rounded-l-lg border border-gray-300 bg-white p-3 focus:border-blue-500 focus:outline-none'
                  placeholder='Weight'
               />
               <select
                  value={weightUnit}
                  onChange={(e) => setWeightUnit(e.target.value)}
                  className='rounded-r-lg border border-gray-300 bg-gray-100 p-3 focus:outline-none'
               >
                  <option value='kg'>kg</option>
                  <option value='lbs'>lbs</option>
               </select>
            </div>
         </div>

         <div className='mb-8 grid grid-cols-1 gap-6 md:grid-cols-2'>
            <div>
               <label className='mb-2 block font-medium text-gray-700'>
                  Activity Level
               </label>
               <select
                  value={activityLevel}
                  onChange={(e) => setActivityLevel(e.target.value)}
                  className='w-full rounded-lg border border-gray-300 bg-white p-3 focus:border-blue-500 focus:outline-none'
               >
                  <option value='sedentary'>
                     Sedentary (little or no exercise)
                  </option>
                  <option value='light'>Lightly active (1-3 days/week)</option>
                  <option value='moderate'>
                     Moderately active (3-5 days/week)
                  </option>
                  <option value='active'>Active (6-7 days/week)</option>
                  <option value='veryActive'>
                     Very active (intense exercise daily)
                  </option>
               </select>
            </div>

            <div>
               <label className='mb-2 block font-medium text-gray-700'>
                  Climate
               </label>
               <select
                  value={climate}
                  onChange={(e) => setClimate(e.target.value)}
                  className='w-full rounded-lg border border-gray-300 bg-white p-3 focus:border-blue-500 focus:outline-none'
               >
                  <option value='cold'>Cold</option>
                  <option value='temperate'>Temperate</option>
                  <option value='hot'>Hot</option>
                  <option value='veryHot'>Very Hot</option>
               </select>
            </div>
         </div>

         <button
            onClick={calculateWaterIntake}
            className='mb-6 w-full rounded-lg bg-blue-600 px-6 py-3 font-bold text-white transition-colors duration-300 hover:bg-blue-700'
         >
            Calculate Water Intake
         </button>

         {result !== null && (
            <div className='rounded-xl bg-blue-50 p-6'>
               <h3 className='mb-4 text-xl font-bold text-gray-900'>
                  Your Recommended Daily Water Intake
               </h3>

               <div className='mb-4 grid grid-cols-1 gap-4 md:grid-cols-3'>
                  <div className='rounded-lg bg-white p-4 text-center shadow-sm'>
                     <p className='mb-1 text-gray-700'>Milliliters:</p>
                     <p className='text-2xl font-bold text-blue-600'>
                        {result.ml} ml
                     </p>
                  </div>
                  <div className='rounded-lg bg-white p-4 text-center shadow-sm'>
                     <p className='mb-1 text-gray-700'>Fluid Ounces:</p>
                     <p className='text-2xl font-bold text-blue-600'>
                        {result.oz} oz
                     </p>
                  </div>
                  <div className='rounded-lg bg-white p-4 text-center shadow-sm'>
                     <p className='mb-1 text-gray-700'>Cups:</p>
                     <p className='text-2xl font-bold text-blue-600'>
                        {result.cups} cups
                     </p>
                  </div>
               </div>

               <p className='mb-4 text-sm text-gray-700'>
                  This is a general recommendation. Your actual needs may vary
                  based on health conditions, medications, and other factors.
                  Remember that you also get water from foods and other
                  beverages.
               </p>

               <div className='rounded-lg border-l-4 border-blue-400 bg-blue-50 p-4'>
                  <h4 className='mb-2 font-bold text-gray-900'>
                     Tips for Staying Hydrated:
                  </h4>
                  <ul className='space-y-1 text-sm text-gray-700'>
                     <li>
                        • Carry a reusable water bottle with you throughout the
                        day
                     </li>
                     <li>• Set reminders to drink water regularly</li>
                     <li>• Drink a glass of water before each meal</li>
                     <li>• Increase intake during exercise and hot weather</li>
                     <li>• Eat water-rich foods like fruits and vegetables</li>
                  </ul>
               </div>
            </div>
         )}
      </div>
   );
};

export default CalculatorsPage;
