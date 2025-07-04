import  { useState } from 'react';
import { Clock, Users, ChefHat, Utensils, Globe, Tag, ChevronDown, ChevronUp } from 'lucide-react';

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
  const [activeTab, setActiveTab] = useState<'ingredients' | 'instructions'>('ingredients');

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty.toLowerCase()) {
      case 'easy': return 'text-emerald-600 bg-emerald-50';
      case 'medium': return 'text-yellow-600 bg-yellow-50';
      case 'hard': return 'text-red-600 bg-red-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  const visibleInstructions = showAllInstructions ? recipe.instructions : recipe.instructions.slice(0, 4);

  return (
    <div className="bg-white/80 backdrop-blur-md rounded-3xl shadow-2xl overflow-hidden border border-white/20">
      {/* Header */}
      <div className="relative">
        <img
          src={recipe.image}
          alt={recipe.name}
          className="w-full h-64 object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
        <div className="absolute bottom-4 left-6 right-6">
          <h3 className="text-2xl font-bold text-white mb-2 flex items-center">
            <ChefHat className="h-6 w-6 mr-3 text-orange-400" />
            {recipe.name}
          </h3>
          <div className="flex items-center space-x-4 text-white/90">
            <div className="flex items-center">
              <Globe className="h-4 w-4 mr-1" />
              <span className="text-sm">{recipe.cuisineType}</span>
            </div>
            <div className={`px-3 py-1 rounded-full text-xs font-medium ${getDifficultyColor(recipe.difficulty)}`}>
              {recipe.difficulty}
            </div>
          </div>
        </div>
      </div>
      
      <div className="p-8">
        {/* Recipe Stats */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          <div className="text-center p-4 bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl">
            <Clock className="h-6 w-6 mx-auto mb-2 text-blue-600" />
            <div className="text-lg font-bold text-blue-800">{recipe.readyInMinutes}</div>
            <div className="text-sm text-blue-600">minutes</div>
          </div>
          <div className="text-center p-4 bg-gradient-to-br from-emerald-50 to-emerald-100 rounded-xl">
            <Users className="h-6 w-6 mx-auto mb-2 text-emerald-600" />
            <div className="text-lg font-bold text-emerald-800">{recipe.servings}</div>
            <div className="text-sm text-emerald-600">servings</div>
          </div>
          <div className="text-center p-4 bg-gradient-to-br from-orange-50 to-orange-100 rounded-xl">
            <Utensils className="h-6 w-6 mx-auto mb-2 text-orange-600" />
            <div className="text-lg font-bold text-orange-800">{recipe.instructions.length}</div>
            <div className="text-sm text-orange-600">steps</div>
          </div>
        </div>

        {/* Dietary Tags */}
        {recipe.dietaryTags.length > 0 && (
          <div className="mb-8">
            <h4 className="text-lg font-semibold text-gray-900 mb-3 flex items-center">
              <Tag className="h-5 w-5 mr-2 text-purple-500" />
              Dietary Information
            </h4>
            <div className="flex flex-wrap gap-2">
              {recipe.dietaryTags.map((tag, index) => (
                <span
                  key={index}
                  className="px-3 py-2 bg-purple-100 text-purple-700 text-sm font-medium rounded-full border border-purple-200 hover:bg-purple-200 transition-colors"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Tab Navigation */}
        <div className="mb-6">
          <div className="flex space-x-1 bg-gray-100 rounded-lg p-1">
            <button
              onClick={() => setActiveTab('ingredients')}
              className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-all duration-200 ${
                activeTab === 'ingredients'
                  ? 'bg-white text-gray-900 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Ingredients ({recipe.ingredients.length})
            </button>
            <button
              onClick={() => setActiveTab('instructions')}
              className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-all duration-200 ${
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
        <div className="min-h-[300px]">
          {activeTab === 'ingredients' && (
            <div className="space-y-3">
              <h4 className="text-lg font-semibold text-gray-900 mb-4">Ingredients</h4>
              {recipe.ingredients.map((ingredient, index) => (
                <div key={index} className="flex justify-between items-center py-3 px-4 bg-gray-50/80 backdrop-blur-sm rounded-lg hover:bg-gray-100/80 transition-colors">
                  <span className="text-gray-900 font-medium">{ingredient.name}</span>
                  <span className="text-gray-600 font-semibold">
                    {ingredient.amount} {ingredient.unit}
                  </span>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'instructions' && (
            <div>
              <h4 className="text-lg font-semibold text-gray-900 mb-4">Cooking Instructions</h4>
              <div className="space-y-4">
                {visibleInstructions.map((instruction, index) => (
                  <div key={index} className="flex items-start space-x-4 p-4 bg-gray-50/80 backdrop-blur-sm rounded-lg hover:bg-gray-100/80 transition-colors">
                    <div className="flex-shrink-0 w-8 h-8 bg-gradient-to-r from-orange-400 to-orange-500 text-white rounded-full flex items-center justify-center text-sm font-bold shadow-lg">
                      {index + 1}
                    </div>
                    <p className="text-gray-700 leading-relaxed flex-1">{instruction}</p>
                  </div>
                ))}
                
                {recipe.instructions.length > 4 && (
                  <button
                    onClick={() => setShowAllInstructions(!showAllInstructions)}
                    className="w-full py-3 px-4 bg-gradient-to-r from-orange-50 to-orange-100 text-orange-700 rounded-lg hover:from-orange-100 hover:to-orange-200 transition-all duration-200 font-medium flex items-center justify-center space-x-2"
                  >
                    {showAllInstructions ? (
                      <>
                        <ChevronUp className="h-4 w-4" />
                        <span>Show Less</span>
                      </>
                    ) : (
                      <>
                        <ChevronDown className="h-4 w-4" />
                        <span>Show {recipe.instructions.length - 4} More Steps</span>
                      </>
                    )}
                  </button>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="mt-8 flex space-x-4">
          <button className="flex-1 bg-gradient-to-r from-orange-500 to-orange-600 text-white py-3 px-6 rounded-xl hover:from-orange-600 hover:to-orange-700 transition-all duration-200 font-medium shadow-lg hover:shadow-xl transform hover:-translate-y-0.5">
            Are you excited? Start cooking now!
          </button>
          
        </div>
      </div>
    </div>
  );
}

export default EnhancedRecipeCard;