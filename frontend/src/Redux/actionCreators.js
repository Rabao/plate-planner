import * as ActionTypes from './ActionTypes'
import { baseUrl } from '../Shared/baseUrl'

//----------------------------------USER AUTH
export const addToken = (token) => ({
    type: ActionTypes.ADD_TOKEN,
    payload: token
});

export const addUser = (user) => ({
    type: ActionTypes.ADD_USER,
    payload: user
})

export const deleteUser = () => ({
    type: ActionTypes.DELETE_USER
})
//----------------------------------USER AUTH
//----------------------------------INGREDIENT
export const fetchIngredients = () => (dispatch) => {
    dispatch(ingredientsLoading(true));

    return fetch(baseUrl + "/ingredients", {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
        credentials: 'same-origin'
        })
        .then(response => {
            if (response.ok) {
                return response;
            } else {
                let error = new Error('Error ' + response.status + ': ' + response.statusText);
                error.response = response;
                throw error;
            }
        },  
        error => {
            let errmess = new Error(error.message);
            throw errmess;
        })
        .then(response => response.json())
        .then(ingredients => dispatch(addIngredients(ingredients)))
        .catch(error => dispatch(ingredientsFailed(error.message)));
}

export const ingredientsLoading = () => ({
    type: ActionTypes.INGREDIENTS_LOADING
});

export const ingredientsFailed = (errmess) => ({
    type: ActionTypes.INGREDIENTS_FAILED,
    payload: errmess
});

export const deleteIngredient = () => ({
    type: ActionTypes.DELETE_INGREDIENTS
});

export const addIngredients = (ingredients) => ({
    type: ActionTypes.ADD_INGREDIENTS,
    payload: ingredients
});

export const postIngredient = (id, name,type) => (dispatch) => {
    const newIngredient = {
        id: id,
        name: name,
        type: type
    }

    return fetch(baseUrl + '/ingredients', {
        method: 'POST',
        body: JSON.stringify(newIngredient),
        headers: {
            'Content-Type': 'application/json'
        },
        credentials: 'same-origin'
    })
    .then(response => {
        if (response.ok) {
            return response;
        } else {
            let error = new Error('Error ' + response.status + ': ' + response.statusText);
            error.response = response;
            throw error;
            }
    },  
    error => {
        let errmess = new Error(error.message);
        throw errmess;
    })
    .then(response => response.json())
    .then(response => dispatch(addIngredients(response)))
    .catch(error => {console.log('Post ingredient ', error.message)
        alert('Your ingredient could not be added.\nError: ' + error.message)});
};
//----------------------------------INGREDIENT
//----------------------------------NUTRITION
export const fetchNutrition = () => (dispatch) => {
    dispatch(nutritionLoading(true));

    return fetch(baseUrl + "/nutrition", {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
        credentials: 'same-origin'
        })
        .then(response => {
            if (response.ok) {
                return response;
            } else {
                let error = new Error('Error ' + response.status + ': ' + response.statusText);
                error.response = response;
                throw error;
            }
        },  
        error => {
            let errmess = new Error(error.message);
            throw errmess;
        })
        .then(response => response.json())
        .then(nutrition => dispatch(addNutrition(nutrition)))
        .catch(error => dispatch(nutritionFailed(error.message)));
}

export const nutritionLoading = () => ({
    type: ActionTypes.NUTRITION_LOADING
});

export const nutritionFailed = (errmess) => ({
    type: ActionTypes.NUTRITION_FAILED,
    payload: errmess
});

export const deleteNutrition = () => ({
    type: ActionTypes.DELETE_NUTRITION
});

export const addNutrition = (nutrition) => ({
    type: ActionTypes.ADD_NUTRITION,
    payload: nutrition
});

export const postNutrition = (id, serving_size, calories, calories_fat,
    total_fat, saturated_fat, trans_fat, cholesterol, sodium, potassium, 
    total_carbs, dietary_fiber, sugar, sugar_alcohol, protein) => (dispatch) => {
    const newNutrition = {
        id: id,
        serving_size: serving_size,
        calories: calories,
        calories_fat: calories_fat,
        total_fat: total_fat,
        saturated_fat: saturated_fat,
        trans_fat: trans_fat,
        cholesterol: cholesterol,
        sodium: sodium,
        potassium: potassium,
        total_carbs: total_carbs,
        dietary_fiber: dietary_fiber,
        sugar: sugar,
        sugar_alcohol: sugar_alcohol,
        protein: protein
    }

    return fetch(baseUrl + '/nutrition', {
        method: 'POST',
        body: JSON.stringify(newNutrition),
        headers: {
            'Content-Type': 'application/json'
        },
        credentials: 'same-origin'
    })
    .then(response => {
        if (response.ok) {
            return response;
        } else {
            let error = new Error('Error ' + response.status + ': ' + response.statusText);
            error.response = response;
            throw error;
            }
    },  
    error => {
        let errmess = new Error(error.message);
        throw errmess;
    })
    .then(response => response.json())
    .then(response => dispatch(addNutrition(response)))
    .catch(error => {console.log('Post nutrition ', error.message)
        alert('Your nutrition could not be added.\nError: ' + error.message)});
};
//----------------------------------NUTRITION
//----------------------------------GROCERIES
export const fetchGroceries = () => (dispatch) => {
    dispatch(groceriesLoading(true));

    return fetch(baseUrl + "/groceries", {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
        credentials: 'same-origin'
        })
        .then(response => {
         if (response.ok) {
             return response;
         } else {
             let error = new Error('Error ' + response.status + ': ' + response.statusText);
             error.response = response;
             throw error;
         }
    },  
    error => {
        let errmess = new Error(error.message);
        throw errmess;
    })
    .then(response => response.json())
    .then(groceries => dispatch(addGroceries(groceries)))
    .catch(error => dispatch(groceriesFailed(error.message)));
}

export const groceriesLoading = () => ({
    type: ActionTypes.GROCERIES_LOADING
});

export const groceriesFailed = (errmess) => ({
    type: ActionTypes.GROCERIES_FAILED,
    payload: errmess
});

export const deleteGroceries = () => ({
    type: ActionTypes.DELETE_GROCERIES
});

export const addGroceries = (mealplans) => ({
    type: ActionTypes.ADD_GROCERIES,
    payload: mealplans
});
//----------------------------------GROCERIES
//----------------------------------RECIPE
export const fetchRecipe = () => (dispatch) => {
    dispatch(recipeLoading(true));

    return fetch(baseUrl + "/recipes", {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
        credentials: 'same-origin'
        })
        .then(response => {
         if (response.ok) {
             return response;
         } else {
             let error = new Error('Error ' + response.status + ': ' + response.statusText);
             error.response = response;
             throw error;
         }
    },  
    error => {
        let errmess = new Error(error.message);
        throw errmess;
    })
    .then(response => response.json())
    .then(recipe => dispatch(addRecipe(recipe)))
    .catch(error => dispatch(recipeFailed(error.message)));
}

export const recipeLoading = () => ({
    type: ActionTypes.RECIPE_LOADING
});

export const recipeFailed = (errmess) => ({
    type: ActionTypes.RECIPE_FAILED,
    payload: errmess
});

export const deleteRecipe = () => ({
    type: ActionTypes.DELETE_RECIPE
});

export const addRecipe = (recipe) => ({
    type: ActionTypes.ADD_RECIPE,
    payload: recipe
});
//----------------------------------RECIPE
//----------------------------------RECIPECOLLECTION
export const fetchRecipeCollection = () => (dispatch) => {
    dispatch(recipeCollectionLoading(true));

    return fetch(baseUrl + "/recipes", {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
        credentials: 'same-origin'
        })
        .then(response => {
         if (response.ok) {
             return response;
         } else {
             let error = new Error('Error ' + response.status + ': ' + response.statusText);
             error.response = response;
             throw error;
         }
    },  
    error => {
        let errmess = new Error(error.message);
        throw errmess;
    })
    .then(response => response.json())
    .then(recipeCollection => dispatch(addRecipeCollection(recipeCollection)))
    .catch(error => dispatch(recipeCollectionFailed(error.message)));
}

export const recipeCollectionLoading = () => ({
    type: ActionTypes.RECIPECOLLECTION_LOADING
});

export const recipeCollectionFailed = (errmess) => ({
    type: ActionTypes.RECIPECOLLECTION_FAILED,
    payload: errmess
});

export const addRecipeCollection = (recipeCollection) => ({
    type: ActionTypes.ADD_RECIPECOLLECTION,
    payload: recipeCollection
});
//----------------------------------RECIPECOLLECTION
//----------------------------------MEALPLAN
export const fetchMealPlan = () => (dispatch) => {
    dispatch(mealPlanLoading(true));

    return fetch(baseUrl + "/mealplans", {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
        credentials: 'same-origin'
        })
        .then(response => {
         if (response.ok) {
             return response;
         } else {
             let error = new Error('Error ' + response.status + ': ' + response.statusText);
             error.response = response;
             throw error;
         }
    },  
    error => {
        let errmess = new Error(error.message);
        throw errmess;
    })
    .then(response => response.json())
    .then(mealPlan => dispatch(addMealPlan(mealPlan)))
    .catch(error => dispatch(mealPlanFailed(error.message)));
}

export const mealPlanLoading = () => ({
    type: ActionTypes.MEALPLAN_LOADING
});

export const mealPlanFailed = (errmess) => ({
    type: ActionTypes.MEALPLAN_FAILED,
    payload: errmess
});

export const deleteMealPlan = () => ({
    type: ActionTypes.DELETE_MEALPLAN
});

export const addMealPlan = (mealplans) => ({
    type: ActionTypes.ADD_MEALPLAN,
    payload: mealplans
});
//----------------------------------MEALPLAN
//----------------------------------MEALPLANCOLLECTION
export const fetchMealPlanCollection = () => (dispatch) => {
    dispatch(mealPlanCollectionLoading(true));

    return fetch(baseUrl + "/mealplans", {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
        credentials: 'same-origin'
        })
        .then(response => {
         if (response.ok) {
             return response;
         } else {
             let error = new Error('Error ' + response.status + ': ' + response.statusText);
             error.response = response;
             throw error;
         }
    },  
    error => {
        let errmess = new Error(error.message);
        throw errmess;
    })
    .then(response => response.json())
    .then(mealPlanCollection => dispatch(addMealPlanCollection(mealPlanCollection)))
    .catch(error => dispatch(mealPlanCollectionFailed(error.message)));
}

export const mealPlanCollectionLoading = () => ({
    type: ActionTypes.MEALPLANCOLLECTION_LOADING
});

export const mealPlanCollectionFailed = (errmess) => ({
    type: ActionTypes.MEALPLANCOLLECTION_FAILED,
    payload: errmess
});

export const addMealPlanCollection = (mealPlanCollection) => ({
    type: ActionTypes.ADD_MEALPLANCOLLECTION,
    payload: mealPlanCollection
});
//----------------------------------MEALPLANCOLLECTION
//----------------------------------COMMENTS
export const addComment = (comment) => ({
    type: ActionTypes.ADD_COMMENT,
    payload: comment
});

export const postComment = (recipeId, rating, user, userId, comment) => (dispatch) => {
    const newComment = {
        recipeId: recipeId,
        rating: rating,
        user: user,
        userId: userId,
        comment: comment
    }
    newComment.date = new Date().toISOString();

    return fetch(baseUrl + '/comments', {
        method: 'POST',
        body: JSON.stringify(newComment),
        headers: {
            'Content-Type': 'application/json'
        },
        credentials: 'same-origin'
    })
    .then(response => {
        if (response.ok) {
            return response;
        } else {
            let error = new Error('Error ' + response.status + ': ' + response.statusText);
            error.response = response;
            throw error;
            }
    },  
    error => {
        let errmess = new Error(error.message);
        throw errmess;
    })
    .then(response => response.json())
    .then(response => dispatch(addComment(response)))
    .catch(error => {console.log('Post comments ', error.message)
        alert('Your comment could not be posted.\nError: ' + error.message)});
};

//----------------------------------COMMENTS