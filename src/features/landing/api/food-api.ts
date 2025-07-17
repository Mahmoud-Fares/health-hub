// lcp --proxyUrl https://api.clarifai.com --port 8010  شغل السيرفر الاول
import axios from 'axios';
import stringSimilarity from 'string-similarity';

const CLARIFAI_KEY = 'dca177d70c1e4357a1b45dbd6c8122e8';
const CLARIFAI_USER_ID = 'mrym';
const CLARIFAI_APP_ID = 'foodscanner';
const APP_WORKFLOW_ID = 'food-item-recognition-workflow-qe636h';
const SPOONACULAR_API_KEY = 'c4feab361ca74f0a931d9efdbfc2b2a8';

const CLARIFAI_API_URL = `http://localhost:8010/proxy/v2/users/${CLARIFAI_USER_ID}/apps/${CLARIFAI_APP_ID}/workflows/${APP_WORKFLOW_ID}/results`;
const SPOONACULAR_BASE = 'https://api.spoonacular.com';

const cache = new Map<string, unknown>();

export interface FoodRecognitionResult {
   name: string;
   confidence: number;
   category: string;
   alternatives: { name: string; confidence: number }[];
}

export interface NutritionData {
   calories: number;
   fat: number;
   saturatedFat: number;
   transFat: number;
   cholesterol: number;
   protein: number;
   carbs: number;
   fiber: number;
   sugar: number;
   sodium: number;
   potassium: number;
   calcium: number;
   iron: number;
   magnesium: number;
   zinc: number;
   vitaminA: number;
   vitaminC: number;
   vitaminD: number;
   vitaminB12: number;
   ingredients: string[];
   allergens: string[];
   servingSize: string;
   servingWeight: number;
   [key: string]: number | string[] | string;
}

export interface Recipe {
   id: number;
   name: string;
   title: string;
   readyInMinutes: number;
   servings: number;
   sourceUrl: string;
   image: string;
   summary: string;
   ingredients: { name: string; amount: number; unit: string }[];
   instructions: string[];
   difficulty: string;
   cuisineType: string;
   dietaryTags: string[];
}

interface Nutrient {
   name: string;
   amount: number;
   unit: string;
}

interface IngredientInfo {
   name: string;
   amount: number;
   unit: string;
   original: string;
}

interface InstructionStep {
   number: number;
   step: string;
}

interface SpoonacularIngredientInfo {
   nutrition: { nutrients: Nutrient[] };
   name: string;
   amount: number;
}

interface RecipeInfo {
   id: number;
   title: string;
   readyInMinutes: number;
   servings: number;
   sourceUrl: string;
   image: string;
   summary: string;
   cuisines?: string[];
   diets?: string[];
   extendedIngredients?: IngredientInfo[];
   analyzedInstructions?: { steps: InstructionStep[] }[];
}

function getNutrientAmount(nutrients: Nutrient[], name: string): number {
   const nutrient = nutrients.find(
      (n) => n.name.toLowerCase() === name.toLowerCase()
   );
   return nutrient?.amount || 0;
}

function toBase64(file: File): Promise<string> {
   return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
         const result = reader.result;
         if (typeof result === 'string') {
            resolve(result.split(',')[1]);
         } else {
            reject('Failed to read image as base64');
         }
      };
      reader.onerror = reject;
   });
}

function cleanFoodName(name: string): string {
   return name
      .toLowerCase()
      .replace(/[^a-z\s]/gi, '')
      .replace(/\b(food|meal|dish|cooked|raw)\b/g, '')
      .replace(/\s\s+/g, ' ')
      .trim();
}

function filterInvalidNames(name: string): boolean {
   const banned = ['dish', 'meal', 'cooked', 'raw', 'food'];
   return !banned.some((word) => name.toLowerCase().includes(word));
}

function cacheFetch<T>(key: string, fetcher: () => Promise<T>): Promise<T> {
   if (cache.has(key)) return Promise.resolve(cache.get(key) as T);
   return fetcher().then((result) => {
      cache.set(key, result);
      return result;
   });
}

function generateNGrams(input: string, n: number): string[] {
   const words = input.split(' ');
   const result: string[] = [];
   for (let i = 0; i <= words.length - n; i++) {
      result.push(words.slice(i, i + n).join(' '));
   }
   return result;
}

function getVariants(base: string): string[] {
   return Array.from(
      new Set([
         base,
         ...base.split(' '),
         ...generateNGrams(base, 2),
         base.replace(/s$/, ''),
      ])
   );
}

export const foodRecognitionService = {
   recognizeFood: async (imageFile: File): Promise<FoodRecognitionResult> => {
      const base64 = await toBase64(imageFile);

      const response = await axios.post(
         CLARIFAI_API_URL,
         {
            user_app_id: {
               user_id: CLARIFAI_USER_ID,
               app_id: CLARIFAI_APP_ID,
            },
            inputs: [{ data: { image: { base64 } } }],
         },
         {
            headers: {
               Authorization: `Key ${CLARIFAI_KEY}`,
               'Content-Type': 'application/json',
               Accept: 'application/json',
            },
         }
      );

      const outputs = response?.data?.results?.[0]?.outputs;
      if (!outputs || outputs.length === 0 || !outputs[0].data?.concepts) {
         throw new Error('No food detected by AI');
      }

      const concepts = outputs[0].data.concepts.filter(
         (c: { name: string; value: number }) =>
            filterInvalidNames(c.name) && c.value > 0.85
      );

      if (concepts.length === 0) {
         throw new Error(
            'No recognizable food in the image. Please retake with clearer focus.'
         );
      }

      const top = concepts[0];
      const alternatives = concepts
         .slice(1, 4)
         .map((c: { name: string; value: number }) => ({
            name: c.name,
            confidence: c.value,
         }));

      return {
         name: top.name,
         confidence: top.value,
         category: 'Food',
         alternatives,
      };
   },

   getNutritionData: async (
      foodName: string,
      fallbackNames: string[] = []
   ): Promise<NutritionData> => {
      const tryFetch = async (query: string): Promise<NutritionData | null> => {
         const key = `nutrition:${query}`;
         return cacheFetch(key, async () => {
            const searchRes = await axios.get(
               `${SPOONACULAR_BASE}/food/ingredients/search`,
               {
                  params: {
                     query: cleanFoodName(query),
                     number: 1,
                     apiKey: SPOONACULAR_API_KEY,
                  },
               }
            );
            const ingredient = searchRes.data.results?.[0];
            if (!ingredient?.id) return null;

            const infoRes = await axios.get(
               `${SPOONACULAR_BASE}/food/ingredients/${ingredient.id}/information`,
               {
                  params: {
                     amount: 100,
                     unit: 'g',
                     apiKey: SPOONACULAR_API_KEY,
                  },
               }
            );

            const data = infoRes.data as SpoonacularIngredientInfo;

            return {
               calories: getNutrientAmount(
                  data.nutrition.nutrients,
                  'Calories'
               ),
               fat: getNutrientAmount(data.nutrition.nutrients, 'Fat'),
               saturatedFat: getNutrientAmount(
                  data.nutrition.nutrients,
                  'Saturated Fat'
               ),
               transFat: getNutrientAmount(
                  data.nutrition.nutrients,
                  'Trans Fat'
               ),
               cholesterol: getNutrientAmount(
                  data.nutrition.nutrients,
                  'Cholesterol'
               ),
               protein: getNutrientAmount(data.nutrition.nutrients, 'Protein'),
               carbs: getNutrientAmount(
                  data.nutrition.nutrients,
                  'Carbohydrates'
               ),
               fiber: getNutrientAmount(data.nutrition.nutrients, 'Fiber'),
               sugar: getNutrientAmount(data.nutrition.nutrients, 'Sugar'),
               sodium: getNutrientAmount(data.nutrition.nutrients, 'Sodium'),
               potassium: getNutrientAmount(
                  data.nutrition.nutrients,
                  'Potassium'
               ),
               calcium: getNutrientAmount(data.nutrition.nutrients, 'Calcium'),
               iron: getNutrientAmount(data.nutrition.nutrients, 'Iron'),
               magnesium: getNutrientAmount(
                  data.nutrition.nutrients,
                  'Magnesium'
               ),
               zinc: getNutrientAmount(data.nutrition.nutrients, 'Zinc'),
               vitaminA: getNutrientAmount(
                  data.nutrition.nutrients,
                  'Vitamin A'
               ),
               vitaminC: getNutrientAmount(
                  data.nutrition.nutrients,
                  'Vitamin C'
               ),
               vitaminD: getNutrientAmount(
                  data.nutrition.nutrients,
                  'Vitamin D'
               ),
               vitaminB12: getNutrientAmount(
                  data.nutrition.nutrients,
                  'Vitamin B12'
               ),
               ingredients: [data.name],
               allergens: [],
               servingSize: '100 g',
               servingWeight: 100,
            };
         });
      };

      const base = cleanFoodName(foodName);
      const candidates = getVariants(base).concat(fallbackNames);

      for (const name of candidates) {
         const result = await tryFetch(name);
         if (result) return result;
      }

      throw new Error('No accurate nutrition data found');
   },

   getRecipe: async (foodName: string): Promise<Recipe> => {
      const base = cleanFoodName(foodName);
      const variants = getVariants(base);

      for (const query of variants) {
         const key = `recipe:${query}`;
         const result = await cacheFetch(key, async () => {
            const searchRes = await axios.get(
               `${SPOONACULAR_BASE}/recipes/complexSearch`,
               {
                  params: {
                     query,
                     number: 5,
                     addRecipeInformation: true,
                     instructionsRequired: true,
                     apiKey: SPOONACULAR_API_KEY,
                  },
               }
            );

            const results: Recipe[] = searchRes.data.results || [];
            if (results.length) {
               const best = results.reduce(
                  (
                     acc: { recipe: Recipe; similarity: number },
                     curr: Recipe
                  ) => {
                     const sim = stringSimilarity.compareTwoStrings(
                        curr.title.toLowerCase(),
                        query
                     );
                     return sim > acc.similarity
                        ? { recipe: curr, similarity: sim }
                        : acc;
                  },
                  { recipe: results[0], similarity: 0 }
               );

               const infoRes = await axios.get(
                  `${SPOONACULAR_BASE}/recipes/${best.recipe.id}/information`,
                  {
                     params: { apiKey: SPOONACULAR_API_KEY },
                  }
               );

               const data = infoRes.data as RecipeInfo;
               const ingredients =
                  data.extendedIngredients?.map((ing: IngredientInfo) => ({
                     name: ing.name || ing.original || 'Unknown',
                     amount: ing.amount || 0,
                     unit: ing.unit || '',
                  })) || [];

               const instructions =
                  data.analyzedInstructions?.[0]?.steps?.map(
                     (s: InstructionStep) => s.step
                  ) || [];

               return {
                  id: data.id,
                  name: data.title,
                  title: data.title,
                  readyInMinutes: data.readyInMinutes,
                  servings: data.servings,
                  sourceUrl: data.sourceUrl,
                  image: data.image,
                  summary: data.summary,
                  ingredients,
                  instructions,
                  difficulty: 'Moderate',
                  cuisineType: data.cuisines?.[0] || 'General',
                  dietaryTags: data.diets || [],
               };
            }

            return null;
         });

         if (result) return result;
      }

      return {
         id: 0,
         name: foodName,
         title: `Healthy ${foodName}`,
         readyInMinutes: 15,
         servings: 1,
         sourceUrl: 'https://spoonacular.com',
         image: '/placeholder.svg',
         summary: 'No exact recipe found, here’s a healthy suggestion.',
         ingredients: [{ name: foodName, amount: 1, unit: 'piece' }],
         instructions: ['Prepare it simply and eat fresh!'],
         difficulty: 'Easy',
         cuisineType: 'General',
         dietaryTags: [],
      };
   },
};

export const getHealthyRecipe = foodRecognitionService.getRecipe;
export const getNutrition = foodRecognitionService.getNutritionData;
export const analyzeFoodImage = foodRecognitionService.recognizeFood;
