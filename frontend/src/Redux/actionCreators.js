import * as ActionTypes from './actionTypes'

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
export const fetchInredients = () => (dispatch) => {
    dispatch(ingredientsLoading(true));

    return fetch(baseUrl + "ingredients")
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
//----------------------------------INGREDIENT
//----------------------------------GROCERIES
export const fetchGroceries = () => (dispatch) => {
    dispatch(groceriesLoading(true));

    return fetch(baseUrl + "groceries")
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
export const fetchRecipe = (id) => (dispatch) => {
    dispatch(recipeLoading(true));

    return fetch(baseUrl + "recipes/" + id)
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

export const addRecipe = (recipe) => ({
    type: ActionTypes.ADD_RECIPE,
    payload: recipe
});
//----------------------------------RECIPE
//----------------------------------RECIPECOLLECTION
export const fetchRecipeCollection = () => (dispatch) => {
    dispatch(recipeCollectionLoading(true));

    return fetch(baseUrl + "recipes")
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
export const fetchMealPlan = (id) => (dispatch) => {
    dispatch(mealPlanLoading(true));

    return fetch(baseUrl + "mealplans/" + id)
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

    return fetch(baseUrl + "mealplans")
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

export const addMealPlanCollection = (recipeCollection) => ({
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

    return fetch(baseUrl + 'comments', {
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