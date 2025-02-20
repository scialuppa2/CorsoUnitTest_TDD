import { RecipeManager } from '../src/recipe.js';

describe('Ricerca di Ricette', () => {
    let recipeManager;

    beforeEach(() => {
        recipeManager = new RecipeManager();

        recipeManager.addRecipe({
            id: 1,
            name: 'Pasta al Pomodoro',
            ingredients: [
                { name: 'pasta', quantity: 100, unit: 'g' },
                { name: 'pomodoro', quantity: 200, unit: 'g' }
            ],
            servings: 2
        });
        recipeManager.addRecipe({
            id: 2,
            name: 'Insalata Caprese',
            ingredients: [
                { name: 'pomodoro', quantity: 150, unit: 'g' },
                { name: 'mozzarella', quantity: 100, unit: 'g' },
                { name: 'basilico', quantity: 5, unit: 'g' }
            ],
            servings: 2
        });
    });

    test('dovrebbe restituire le ricette contenenti tutti gli ingredienti specificati', () => {
        const risultati = recipeManager.searchRecipes(['pomodoro']);
        expect(risultati).toHaveLength(2);

        const risultati2 = recipeManager.searchRecipes(['pasta', 'pomodoro']);
        expect(risultati2).toHaveLength(1);
        expect(risultati2[0].name).toBe('Pasta al Pomodoro');
    });
});

describe('Adattamento delle Porzioni', () => {
    let recipeManager;
    let recipe;

    beforeEach(() => {
        recipeManager = new RecipeManager();
        recipe = {
            id: 1,
            name: 'Pasta al Pomodoro',
            ingredients: [
                { name: 'pasta', quantity: 100, unit: 'g' },
                { name: 'pomodoro', quantity: 200, unit: 'g' }
            ],
            servings: 2
        };
        recipeManager.addRecipe(recipe);
    });

    test('dovrebbe adattare correttamente le quantità degli ingredienti in base al numero di ospiti', () => {
        const adaptedRecipe = recipeManager.adaptRecipe(recipe.id, 4);
        const pasta = adaptedRecipe.ingredients.find(ing => ing.name === 'pasta');
        const pomodoro = adaptedRecipe.ingredients.find(ing => ing.name === 'pomodoro');

        expect(pasta.quantity).toBe(200);
        expect(pomodoro.quantity).toBe(400);
        expect(adaptedRecipe.servings).toBe(4);
    });
});

describe('Gestione delle Ricette Preferite', () => {
    let recipeManager;
    let recipe;

    beforeEach(() => {
        recipeManager = new RecipeManager();
        recipe = {
            id: 1,
            name: 'Pasta al Pomodoro',
            ingredients: [
                { name: 'pasta', quantity: 100, unit: 'g' }
            ],
            servings: 2
        };
        recipeManager.addRecipe(recipe);
    });

    test('dovrebbe aggiungere una ricetta ai preferiti', () => {
        recipeManager.addFavorite(recipe.id);
        expect(recipeManager.getFavorites()).toContainEqual(recipe);
    });

    test('dovrebbe rimuovere una ricetta dai preferiti', () => {
        recipeManager.addFavorite(recipe.id);
        recipeManager.removeFavorite(recipe.id);
        expect(recipeManager.getFavorites()).not.toContainEqual(recipe);
    });
});

