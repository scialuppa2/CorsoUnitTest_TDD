export class RecipeManager {
    constructor() {
        this.recipes = [];
        this.favorites = [];
    }

    // Aggiunge una ricetta all’elenco delle ricette
    addRecipe(recipe) {
        this.recipes.push(recipe);
    }

    // Ricerca ricette che contengono tutti gli ingredienti specificati
    searchRecipes(ingredients) {
        return this.recipes.filter(recipe => {
            const ingredientNames = recipe.ingredients.map(i => i.name.toLowerCase());
            return ingredients.every(ing => ingredientNames.includes(ing.toLowerCase()));
        });
    }

    // Adatta la ricetta in base al nuovo numero di porzioni
    adaptRecipe(recipeId, newServings) {
        const recipe = this.recipes.find(r => r.id === recipeId);
        if (!recipe) return null;
        const factor = newServings / recipe.servings;
        const adaptedIngredients = recipe.ingredients.map(ing => ({
            ...ing,
            quantity: ing.quantity * factor
        }));

        return { ...recipe, ingredients: adaptedIngredients, servings: newServings };
    }

    // Aggiunge una ricetta ai preferiti
    addFavorite(recipeId) {
        const recipe = this.recipes.find(r => r.id === recipeId);
        if (recipe && !this.favorites.some(r => r.id === recipeId)) {
            this.favorites.push(recipe);
        }
    }

    // Rimuove una ricetta dai preferiti
    removeFavorite(recipeId) {
        this.favorites = this.favorites.filter(r => r.id !== recipeId);
    }

    // Restituisce la lista dei preferiti
    getFavorites() {
        return this.favorites;
    }
}
