import { applyMiddleware, createStore } from 'redux';
import thunk from 'redux-thunk';
import logger from "redux-logger";

import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage' // defaults to localStorage for web

import { Comments } from "./comments";
import { Groceries } from "./groceries";
import { Recipe } from "./recipes";
import { Ingredients } from "./ingredients";
import { Nutrition } from './nutrition';
import { MealPlan } from "./mealPlans";
import {Token} from './token';
import {User} from './user';
import { RecipeSteps } from './recipeSteps';
import { RecipeTags } from './recipeTags';
import { Favorites } from './favorites';
import { createForms } from 'react-redux-form';
import { InitialFeedback } from "./forms";
import { Users } from './users';
import { RecipeIngredients } from './recipeIngredients';
import { RecipeNutrition } from './recipeNutrition';
import { combineReducers } from 'redux';


const rootReducer = combineReducers({
            token: Token,
            user: User,
            allUsers: Users,
            comments: Comments,
            groceries: Groceries,
            ingredients: Ingredients,
            nutrition: Nutrition,
            recipe: Recipe,
            recipeSteps: RecipeSteps,
            recipeTags: RecipeTags,
            favorites: Favorites,
            recipeNutrition: RecipeNutrition,
            recipeIngredients: RecipeIngredients,
            mealPlan: MealPlan,
            ...createForms({
                feedback: InitialFeedback
            })
        })


const persistConfig={
    key:'root',
    storage,
    timeout:null,
}

const persistedReducer=persistReducer(persistConfig, rootReducer);

const store=createStore(persistedReducer,applyMiddleware(thunk,logger));

const persistor=persistStore(store);

export{persistor};
export default store;