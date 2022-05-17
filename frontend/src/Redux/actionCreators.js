import * as ActionTypes from './ActionTypes'
import { baseUrl } from '../Shared/baseUrl'
import history from './history';

//----------------------------------USER AUTH
export const fetchUsers = () => (dispatch) => {
    // dispatch(usersLoading(true));

    return fetch(baseUrl + "/reviews/user", {
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
        .then(users => dispatch(addUsers(users)))
        .catch(error => dispatch(usersFailed(error.message)));
}

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

export const addUsers = (users) => ({
    type: ActionTypes.ADD_USERS,
    payload: users
})

export const usersLoading = () => ({
    type: ActionTypes.USERS_LOADING
})

export const usersFailed = () => ({
    type: ActionTypes.USERS_FAILED
})
//----------------------------------USER AUTH
//----------------------------------INGREDIENT
export const fetchIngredients = () => (dispatch) => {
    // dispatch(ingredientsLoading(true));

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

export const postIngredient = (name,type) => (dispatch) => {
    const newIngredient = {
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
    // dispatch(nutritionLoading(true));

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

export const postNutrition = (serving_size, calories, calories_fat,
    total_fat, saturated_fat, trans_fat, cholesterol, sodium, potassium, 
    total_carbs, dietary_fiber, sugar, sugar_alcohol, protein, vitC,
    calcium, iron, vitD, vitB6, cobalamin, magnesium) => (dispatch) => {
    const newNutrition = {
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
        protein: protein,
        vitC: vitC,
        calcium: calcium,
        iron: iron,
        vitD: vitD,
        vitB6: vitB6,
        cobalamin: cobalamin,
        magnesium: magnesium
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
    // dispatch(groceriesLoading(true));

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
export const postRecipe = (id, name, numSteps, image, notes, userId, type) => (dispatch) => {
    const newRecipe = {
        id:id,
        name: name,
        numSteps: numSteps,
        image: image,
        notes: notes,
        userId: userId,
        type: type
    }
    newRecipe.date = new Date().toISOString();

    return fetch(baseUrl + '/recipes', {
        method: 'POST',
        body: JSON.stringify(newRecipe),
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
    .then(response => response.text())
    .then(response => dispatch(addRecipe(response)))
    .catch(error => {console.log('Author recipe ', error.message)
        alert('Your recipe could not be published.\nError: ' + error.message)});
};

export const fetchRecipe = () => (dispatch) => {
    // dispatch(recipeLoading(true));

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

export const recipeLoading = (status) => ({
    type: ActionTypes.RECIPE_LOADING,
    payload: status
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
//-------------------
export const postRecipeIngredients = (recipeId, ingredientId, ingredientName, measurement, unit) => (dispatch) => {
    const newRecipe = {
        recipeId: recipeId,
        ingredientId: ingredientId,
        ingredientName: ingredientName,
        measurement: measurement,
        unit: unit
    }

    return fetch(baseUrl + '/recipes/ingredients', {
        method: 'POST',
        body: JSON.stringify(newRecipe),
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
    .then(response => response.text())
    .then(ingredients => dispatch(addRecipeIngredients(ingredients)))
    .catch(error => {console.log('Recipe ingredients ', error.message)
        alert('Your recipe ingredients could not be published.\nError: ' + error.message)});
};

export const fetchRecipeIngredients = () => (dispatch) => {
    // dispatch(recipeIngredientsLoading(true));

    return fetch(baseUrl + "/recipes/ingredients", {
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
    .then(ingredients => dispatch(addRecipeIngredients(ingredients)))
    .catch(error => dispatch(recipeIngredientsFailed(error.message)));
}

export const recipeIngredientsLoading = (status) => ({
    type: ActionTypes.RECIPEINGREDIENTS_LOADING,
    payload: status
});

export const recipeIngredientsFailed = (errmess) => ({
    type: ActionTypes.RECIPEINGREDIENTS_FAILED,
    payload: errmess
});

export const deleteRecipeIngredients = () => ({
    type: ActionTypes.DELETE_RECIPEINGREDIENTS
});

export const addRecipeIngredients = (ingredients) => ({
    type: ActionTypes.ADD_RECIPEINGREDIENTS,
    payload: ingredients
});

//----------------------------------RECIPE
//----------------------------------RECIPESTEPS
export const postRecipeSteps = (recipeId, stepNum, steps) => (dispatch) => {
    const newRecipe = {
        recipeId: recipeId,
        stepNum: stepNum,
        steps: steps
    }

    return fetch(baseUrl + '/steps', {
        method: 'POST',
        body: JSON.stringify(newRecipe),
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
    .then(response => response.text())
    .then(steps => dispatch(addRecipeSteps(steps)))
    .catch(error => {console.log('Recipe steps ', error.message)
        alert('Your recipe steps could not be published.\nError: ' + error.message)});
};

export const fetchRecipeSteps = () => (dispatch) => {
    // dispatch(recipeStepsLoading(true));

    return fetch(baseUrl + "/steps", {
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
    .then(steps => dispatch(addRecipeSteps(steps)))
    .catch(error => dispatch(recipeStepsFailed(error.message)));
}

export const recipeStepsLoading = (status) => ({
    type: ActionTypes.RECIPESTEPS_LOADING,
    payload: status
});

export const recipeStepsFailed = (errmess) => ({
    type: ActionTypes.RECIPESTEPS_FAILED,
    payload: errmess
});

export const deleteRecipeSteps = () => ({
    type: ActionTypes.DELETE_RECIPESTEPS
});

export const addRecipeSteps = (steps) => ({
    type: ActionTypes.ADD_RECIPESTEPS,
    payload: steps
});
//----------------------------------RECIPE
//----------------------------------MEALPLAN
export const fetchMealPlan = () => (dispatch) => {
    // dispatch(mealPlanLoading(true));

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
    // dispatch(mealPlanCollectionLoading(true));

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

export const postComment = (recipeId, userId, rating, comment) => (dispatch) => {
    const newComment = {
        recipeId: recipeId,
        rating: rating,
        userId: userId,
        comment: comment
    }
    newComment.date = new Date().toISOString();

    return fetch(baseUrl + '/reviews', {
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
    .then(response => response.text())
    .then(response => dispatch(addComment(response)))
    .catch(error => {console.log('Post comments ', error.message)
        alert('Your comment could not be posted.\nError: ' + error.message)});
};

export const fetchComments = () => (dispatch) => {
    return fetch(baseUrl + "/reviews/recipe")
        .then(response => {
            if (response.ok) {
                return response;
            }else {
                let error = new Error('Error ' + response.status + ': ' + response.statusText)
                error.response = response;
                throw error;
            }
        },  
        error => {
            let errmess = new Error(error.message);
            throw errmess;
        })
    .then(response => response.json())
    .then(comments => dispatch(addComments(comments)))
    .catch(error => dispatch(commentsFailed(error.message)));
}

export const addComments = (comments) => ({
    type: ActionTypes.ADD_COMMENTS,
    payload: comments
});

export const commentsFailed = (errmess) => ({
    type: ActionTypes.ADD_COMMENTS,
    payload: errmess
});

export const deleteComment = (id) => (dispatch) => {

    return fetch(baseUrl + '/reviews/' + id, {
        method: 'DELETE'})
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
    .then(response => response.text())
    .then(id => dispatch(deleteCommentSuccess(id)))
    .catch(error => {throw(error)});
}

export const deleteCommentSuccess = (id) => ({
    type: ActionTypes.DELETE_COMMENT,
    payload: id
})

export const editComment = (id, rating, comment) => (dispatch) => {

    return fetch(baseUrl + '/reviews/' + id + '?rating=' + rating + '&comment=' + comment, {
        method: 'PUT'})
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
    .then(response => response.text())
    .then((id, rating, comment) => dispatch(deleteCommentSuccess(id, rating, comment)))
    .catch(error => {throw(error)});
}

export const editCommentSuccess = (id, rating, comment) => ({
    type: ActionTypes.DELETE_COMMENT,
    payload: {
        id: id,
        rating: rating,
        comment: comment
    }
})
//----------------------------------COMMENTS