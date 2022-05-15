import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import logger from "redux-logger";
import { Comments } from "./comments";
import { Groceries } from "./groceries";
import { Recipe } from "./recipes";
import { Ingredients } from "./ingredients";
import { Nutrition } from './nutrition';
import { MealPlan } from "./mealPlans";
import {Token} from './token'
import {User} from './user'
import { RecipeSteps } from './recipeSteps';
import { createForms } from 'react-redux-form';
import { InitialFeedback } from "./forms";

export const ConfigureStore = () => {
    const store = createStore(
        combineReducers({
            token: Token,
            user: User,
            comments: Comments,
            groceries: Groceries,
            ingredients: Ingredients,
            nutrition: Nutrition,
            recipe: Recipe,
            recipeSteps: RecipeSteps,
            mealPlan: MealPlan,
            ...createForms({
                feedback: InitialFeedback
            })
            }),
        applyMiddleware(thunk, logger)
    );

    return store;
}