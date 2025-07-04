import React, { useRef, useState } from 'react';

import { AxiosError } from 'axios';
import {
   AlertCircle,
   Camera,
   CheckCircle,
   Clock,
   Image as ImageIcon,
   Info,
   Loader,
   Sparkles,
   Upload,
   Zap,
} from 'lucide-react';
import Webcam from 'react-webcam';

import {
   FoodRecognitionResult,
   NutritionData,
   Recipe,
   analyzeFoodImage,
   getHealthyRecipe,
   getNutrition,
} from '@/features/landing/api/food-api';
import EnhancedNutritionCard from '@/features/landing/components/food-scanner/enhanced-nutrition-card';
import EnhancedRecipeCard from '@/features/landing/components/food-scanner/enhanced-recipe-card';

interface AnalysisStep {
   id: string;
   name: string;
   status: 'pending' | 'processing' | 'completed' | 'error';
   message: string;
}

function FoodScannerPage() {
   const [selectedImage, setSelectedImage] = useState<string | null>(null);
   const [isAnalyzing, setIsAnalyzing] = useState(false);
   const [analysisSteps, setAnalysisSteps] = useState<AnalysisStep[]>([]);
   const [recognitionResult, setRecognitionResult] =
      useState<FoodRecognitionResult | null>(null);
   const [nutritionData, setNutritionData] = useState<NutritionData | null>(
      null
   );
   const [recipe, setRecipe] = useState<Recipe | null>(null);
   const [error, setError] = useState<string | null>(null);
   const [useCamera, setUseCamera] = useState(false);

   const fileInputRef = useRef<HTMLInputElement>(null);
   const webcamRef = useRef<Webcam>(null);

   const initializeAnalysisSteps = (): AnalysisStep[] => [
      {
         id: 'upload',
         name: 'Image Processing',
         status: 'pending',
         message: 'Optimizing image for AI analysis...',
      },
      {
         id: 'recognition',
         name: 'Advanced Food Recognition',
         status: 'pending',
         message: 'Running deep learning models...',
      },
      {
         id: 'nutrition',
         name: 'Precision Nutrition Analysis',
         status: 'pending',
         message: 'Calculating comprehensive nutritional profile...',
      },
      {
         id: 'recipe',
         name: 'Recipe Intelligence',
         status: 'pending',
         message: 'Finding perfect recipe matches...',
      },
   ];

   const updateAnalysisStep = (
      stepId: string,
      status: AnalysisStep['status'],
      message?: string
   ) => {
      setAnalysisSteps((prev) =>
         prev.map((step) =>
            step.id === stepId
               ? { ...step, status, message: message || step.message }
               : step
         )
      );
   };

   const analyzeImage = async (file: File): Promise<void> => {
      setIsAnalyzing(true);
      setError(null);
      setRecognitionResult(null);
      setNutritionData(null);
      setRecipe(null);
      const steps = initializeAnalysisSteps();
      setAnalysisSteps(steps);

      try {
         updateAnalysisStep('upload', 'processing');
         await new Promise((res) => setTimeout(res, 1200));
         updateAnalysisStep('upload', 'completed');

         updateAnalysisStep('recognition', 'processing');
         const recognition = await analyzeFoodImage(file);
         console.log('🍽️ Top prediction:', recognition.name);
         setRecognitionResult(recognition);
         updateAnalysisStep(
            'recognition',
            'completed',
            `Identified: ${recognition.name}`
         );

         updateAnalysisStep('nutrition', 'processing');
         const nutrition = await getNutrition(recognition.name);
         console.log('🧪 Nutrition:', nutrition);
         setNutritionData(nutrition);
         updateAnalysisStep('nutrition', 'completed');

         updateAnalysisStep('recipe', 'processing');
         const recipeData = await getHealthyRecipe(recognition.name);
         setRecipe(recipeData);
         updateAnalysisStep('recipe', 'completed');
      } catch (err: unknown) {
         const axiosError = err as AxiosError;
         const currentStep = analysisSteps.find(
            (s) => s.status === 'processing'
         );
         if (currentStep) updateAnalysisStep(currentStep.id, 'error');

         if (
            axiosError.response &&
            axiosError.response.data &&
            (axiosError.response.data as { status?: { description?: string } })
               ?.status?.description
         ) {
            setError(
               `API Error: ${(axiosError.response.data as { status: { description: string } }).status.description}`
            );
         } else if (axiosError.message) {
            setError(`Error: ${axiosError.message}`);
         } else {
            setError('Unexpected error during analysis.');
         }

         console.error('Analysis error:', err);
      } finally {
         setIsAnalyzing(false);
      }
   };

   const triggerFileInput = () => fileInputRef.current?.click();

   const captureAndAnalyze = () => {
      const screenshot = webcamRef.current?.getScreenshot();
      if (screenshot) {
         fetch(screenshot)
            .then((res) => res.blob())
            .then((blob) => {
               const file = new File([blob], 'captured.jpg', {
                  type: 'image/jpeg',
               });
               setSelectedImage(screenshot);
               analyzeImage(file);
               setUseCamera(false);
            });
      }
   };

   const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files?.[0];
      if (file) {
         if (!file.type.startsWith('image/')) {
            setError('Please select a valid image file (JPG, PNG, WebP, etc.)');
            return;
         }
         if (file.size > 15 * 1024 * 1024) {
            setError(
               'Image file is too large. Please select an image under 15MB.'
            );
            return;
         }
         const reader = new FileReader();
         reader.onload = (e) => {
            setSelectedImage(e.target?.result as string);
            analyzeImage(file);
         };
         reader.onerror = () => {
            setError('Failed to read the image file.');
         };
         reader.readAsDataURL(file);
      }
   };

   const getStepIcon = (status: AnalysisStep['status']) => {
      switch (status) {
         case 'completed':
            return <CheckCircle className='h-5 w-5 text-emerald-500' />;
         case 'processing':
            return <Loader className='h-5 w-5 animate-spin text-blue-500' />;
         case 'error':
            return <AlertCircle className='h-5 w-5 text-red-500' />;
         default:
            return (
               <div className='h-5 w-5 rounded-full border-2 border-gray-300' />
            );
      }
   };

   return (
      <div className='pb-20 pt-28'>
         {useCamera && (
            <div className='fixed inset-0 z-50 flex items-center justify-center bg-black/70'>
               <div className='space-y-4 rounded-xl bg-white p-6 shadow-xl'>
                  <Webcam
                     ref={webcamRef}
                     screenshotFormat='image/jpeg'
                     className='h-[300px] w-[400px] rounded-xl object-cover'
                  />
                  <div className='flex justify-between'>
                     <button
                        onClick={captureAndAnalyze}
                        className='rounded-xl bg-emerald-600 px-4 py-2 font-bold text-white'
                     >
                        Capture & Analyze
                     </button>
                     <button
                        onClick={() => setUseCamera(false)}
                        className='rounded-xl bg-gray-200 px-4 py-2 text-black'
                     >
                        Cancel
                     </button>
                  </div>
               </div>
            </div>
         )}

         <div className='mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8'>
            {/* Header */}
            <div className='mb-12 text-center'>
               <h1 className='mb-6 bg-gradient-to-r from-emerald-600 via-blue-600 to-purple-600 bg-clip-text text-5xl font-bold text-transparent'>
                  AI-Powered Food Scanner
               </h1>
               <div className='mb-4 flex items-center justify-center space-x-2'>
                  <Sparkles className='h-6 w-6 text-yellow-500' />
                  <span className='text-lg font-semibold text-gray-700'>
                     High Precision • Advanced AI • Instant Results
                  </span>
                  <Sparkles className='h-6 w-6 text-yellow-500' />
               </div>
               <p className='mx-auto max-w-4xl text-xl leading-relaxed text-gray-600'>
                  State-of-the-art computer vision and machine learning for
                  precise nutritional analysis and intelligent recipe
                  recommendations
               </p>
            </div>

            {/* Upload Section */}
            <div className='mb-8 rounded-3xl border border-white/20 bg-white/80 p-10 shadow-2xl backdrop-blur-md'>
               <div className='text-center'>
                  <h2 className='mb-8 text-3xl font-bold text-gray-900'>
                     Analyze Your Meal
                  </h2>
                  <div className='mb-6 flex justify-center'>
                     <div className='flex items-center space-x-2 rounded-xl border border-blue-200 bg-blue-50 px-4 py-2 text-blue-700 shadow-sm'>
                        <Info className='h-5 w-5 text-blue-500' />
                        <span className='text-sm'>
                           Analysis may take up to 10 seconds. Please wait...
                        </span>
                     </div>
                  </div>

                  <div className='mx-auto grid max-w-3xl gap-8 md:grid-cols-2'>
                     <button
                        onClick={() => setUseCamera(true)}
                        disabled={isAnalyzing}
                        className='border-3 group flex transform flex-col items-center justify-center rounded-2xl border-dashed border-emerald-300 p-8 transition-all duration-300 hover:scale-105 hover:border-emerald-400 hover:bg-emerald-50 disabled:cursor-not-allowed disabled:opacity-50'
                     >
                        <div className='mb-4 rounded-full bg-emerald-100 p-4 transition-colors group-hover:bg-emerald-200'>
                           <Camera className='h-12 w-12 text-emerald-600 transition-transform group-hover:scale-110' />
                        </div>
                        <span className='mb-2 text-xl font-bold text-gray-900'>
                           Take Photo
                        </span>
                        <span className='text-sm text-gray-600'>
                           High-resolution camera for instant analysis
                        </span>
                     </button>

                     <button
                        onClick={triggerFileInput}
                        disabled={isAnalyzing}
                        className='border-3 group flex transform flex-col items-center justify-center rounded-2xl border-dashed border-blue-300 p-8 transition-all duration-300 hover:scale-105 hover:border-blue-400 hover:bg-blue-50 disabled:cursor-not-allowed disabled:opacity-50'
                     >
                        <div className='mb-4 rounded-full bg-blue-100 p-4 transition-colors group-hover:bg-blue-200'>
                           <Upload className='h-12 w-12 text-blue-600 transition-transform group-hover:scale-110' />
                        </div>
                        <span className='mb-2 text-xl font-bold text-gray-900'>
                           Upload Image
                        </span>
                        <span className='text-sm text-gray-600'>
                           Select from gallery for detailed analysis
                        </span>
                     </button>
                  </div>

                  <input
                     type='file'
                     ref={fileInputRef}
                     onChange={handleImageUpload}
                     accept='image/*'
                     className='hidden'
                     disabled={isAnalyzing}
                  />

                  {error && (
                     <div className='mt-6 rounded-xl border border-red-200 bg-red-50 p-4'>
                        <div className='flex items-center space-x-2'>
                           <AlertCircle className='h-5 w-5 text-red-500' />
                           <p className='font-medium text-red-700'>{error}</p>
                        </div>
                     </div>
                  )}

                  {isAnalyzing && (
                     <div className='mt-6 rounded-xl border border-blue-200 bg-blue-50 p-4'>
                        <div className='flex items-center justify-center space-x-2'>
                           <Loader className='h-5 w-5 animate-spin text-blue-500' />
                           <p className='font-medium text-blue-700'>
                              Advanced AI analysis in progress...
                           </p>
                        </div>
                     </div>
                  )}
               </div>
            </div>

            {/* Analysis Results */}
            {selectedImage && (
               <div className='space-y-10'>
                  {/* Image Preview and Analysis Steps */}
                  <div className='space-y-6'>
                     {/* Image Preview */}
                     <div className='rounded-3xl border border-white/20 bg-white/80 p-8 shadow-2xl backdrop-blur-md'>
                        <h3 className='mb-6 flex items-center text-2xl font-bold text-gray-900'>
                           <ImageIcon className='mr-3 h-6 w-6 text-emerald-500' />
                           Your Image
                        </h3>
                        <div className='relative'>
                           <img
                              src={selectedImage}
                              alt='Uploaded food'
                              className='h-64 w-full rounded-2xl object-cover shadow-lg'
                           />
                           {isAnalyzing && (
                              <div className='absolute inset-0 flex items-center justify-center rounded-2xl bg-black/50'>
                                 <div className='rounded-full bg-white p-6 shadow-2xl'>
                                    <Zap className='h-10 w-10 animate-pulse text-emerald-500' />
                                 </div>
                              </div>
                           )}
                        </div>

                        {recognitionResult && (
                           <div className='mt-6 rounded-xl border border-emerald-200 bg-gradient-to-r from-emerald-50 to-blue-50 p-4'>
                              <div className='flex items-center justify-between'>
                                 <div>
                                    <p className='text-lg font-bold text-gray-900'>
                                       {recognitionResult.name}
                                    </p>
                                    <p className='text-sm text-gray-600'>
                                       Category: {recognitionResult.category}
                                    </p>
                                 </div>
                                 <div className='text-right'>
                                    <div className='text-2xl font-bold text-emerald-600'>
                                       {Math.round(
                                          recognitionResult.confidence * 100
                                       )}
                                       %
                                    </div>
                                    <div className='text-xs text-gray-500'>
                                       Confidence
                                    </div>
                                 </div>
                              </div>

                              {recognitionResult.alternatives.length > 0 && (
                                 <div className='mt-4 border-t border-emerald-200 pt-4'>
                                    <p className='mb-2 text-sm font-medium text-gray-700'>
                                       Alternative matches:
                                    </p>
                                    <div className='flex flex-wrap gap-2'>
                                       {recognitionResult.alternatives.map(
                                          (alt, index) => (
                                             <span
                                                key={index}
                                                className='rounded-full border bg-white px-2 py-1 text-xs text-gray-600'
                                             >
                                                {alt.name} (
                                                {Math.round(
                                                   alt.confidence * 100
                                                )}
                                                %)
                                             </span>
                                          )
                                       )}
                                    </div>
                                 </div>
                              )}
                           </div>
                        )}
                     </div>

                     {/* Analysis Steps */}
                     {analysisSteps.length > 0 && (
                        <div className='rounded-3xl border border-white/20 bg-white/80 p-8 shadow-2xl backdrop-blur-md'>
                           <h3 className='mb-6 flex items-center text-2xl font-bold text-gray-900'>
                              <Clock className='mr-3 h-6 w-6 text-blue-500' />
                              AI Analysis Progress
                           </h3>
                           <div className='space-y-4'>
                              {analysisSteps.map((step) => (
                                 <div
                                    key={step.id}
                                    className='flex items-center space-x-4 rounded-xl bg-gray-50/80 p-4 backdrop-blur-sm'
                                 >
                                    <div className='flex-shrink-0'>
                                       {getStepIcon(step.status)}
                                    </div>
                                    <div className='flex-1'>
                                       <div className='flex items-center justify-between'>
                                          <h4 className='font-semibold text-gray-900'>
                                             {step.name}
                                          </h4>
                                          <span
                                             className={`rounded-full px-2 py-1 text-xs font-medium ${
                                                step.status === 'completed'
                                                   ? 'bg-emerald-100 text-emerald-700'
                                                   : step.status ===
                                                       'processing'
                                                     ? 'bg-blue-100 text-blue-700'
                                                     : step.status === 'error'
                                                       ? 'bg-red-100 text-red-700'
                                                       : 'bg-gray-100 text-gray-600'
                                             }`}
                                          >
                                             {step.status === 'processing'
                                                ? 'Processing...'
                                                : step.status === 'completed'
                                                  ? 'Complete'
                                                  : step.status === 'error'
                                                    ? 'Failed'
                                                    : 'Pending'}
                                          </span>
                                       </div>
                                       <p className='mt-1 text-sm text-gray-600'>
                                          {step.message}
                                       </p>
                                    </div>
                                 </div>
                              ))}
                           </div>
                        </div>
                     )}
                  </div>

                  {/* Results */}
                  <div className='space-y-8'>
                     {nutritionData && (
                        <EnhancedNutritionCard
                           nutritionData={nutritionData}
                           confidence={recognitionResult?.confidence || 0}
                        />
                     )}
                     {recipe && <EnhancedRecipeCard recipe={recipe} />}
                  </div>
               </div>
            )}
         </div>
      </div>
   );
}

export default FoodScannerPage;
