import React, {Component} from 'react';
import {Routes, Route, Navigate, useParams} from 'react-router-dom'
import Login from '../Login/Login'
import Register from '../Register/Register'
import Header from '../Header/Header'
import { Footer } from '../Footer/Footer'
import Home from '../Home/Home'
import Recipes from '../Pages/Recipes'
import EditRecipe from '../Pages/EditRecipe'
import RecipesList from '../Pages/RecipesList'
import AddRecipe from '../Pages/AddRecipe'
import Groceries from '../Pages/GroceryList'
import MealPlans from '../Pages/MealPlans'
import Dashboard from '../Pages/Dashboard';
import DailyValueForm from '../SubComponents/DailyValueForm';
import {addToken, deleteUser, fetchUsers, fetchIngredients, fetchGroceries, fetchGrocery,
        toggleFetchGrocery, toggleGrocery, fetchMealPlan, postMealPlan, editMealPlan, fetchRecipe, postRecipe, 
        deleteRecipe, deleteRecipeIngredients, deleteRecipeNutrition, deleteRecipeSteps, editRecipe, fetchRecipeNutrition, 
        postRecipeNutrition, postRecipeIngredients, postRecipeSteps, fetchRecipeSteps, editRecipeSteps, 
        fetchRecipeIngredients, editRecipeIngredients, deleteGroceries, deleteCompletedGroceries, fetchRecipeTags,
        postRecipeTags, postComment, fetchComments, deleteComment, editComment, postGroceries,
        postIngredient, searchRecipe,fetchNutrition, postNutrition, fetchFavorites, postFavorite, deleteFavorites } from '../../Redux/actionCreators'
import {connect} from 'react-redux'
import { withRouter } from '../WithRouer/WithRouter';
import IngredientsList from '../Pages/IngredientsList';
import Ingredients from '../Pages/Ingredients';
import {Scheduler} from '../SubComponents/Scheduler/Scheduler';


const mapStateToProps = state => {
    return {
        token: state.token,
        user: state.user,
        allUsers: state.allUsers,
        comments: state.comments,
        groceries: state.groceries,
        ingredients: state.ingredients,
        nutrition: state.nutrition,
        recipe: state.recipe,
        recipeSearch: state.recipeSearch,
        recipeSteps: state.recipeSteps,
        recipeTags: state.recipeTags,
        favorites: state.favorites,
        recipeIngredients: state.recipeIngredients,
        recipeNutrition: state.recipeNutrition,
        mealPlan: state.mealPlan,
    }
}

const mapDispatchToProps = (dispatch) => ({
    addToken: () => { dispatch(addToken()) },
    deleteUser: () => { dispatch(deleteUser())},
    deleteComment: (id) => { dispatch(deleteComment(id))},
    deleteRecipe: (id) => { dispatch(deleteRecipe(id))},
    deleteRecipeSteps: (id) => { dispatch(deleteRecipeSteps(id))},
    deleteRecipeIngredients: (id) => { dispatch(deleteRecipeIngredients(id))},
    deleteRecipeNutrition: (id) => { dispatch(deleteRecipeNutrition(id))},
    editRecipe: (id, name, numSteps, image, notes, userId, type) => {dispatch(editRecipe(id, name, numSteps, image, notes, userId, type))},
    editRecipeSteps: (recipeId, stepNum, steps) => {dispatch(editRecipeSteps(recipeId, stepNum, steps))},
    editRecipeIngredients: (recipeId, ingredientId, ingredient_name, measurement, unit, ingredientKey) => 
        {dispatch(editRecipeIngredients(recipeId, ingredientId, ingredient_name, measurement, unit, ingredientKey))},
    editMealPlan: (planId, recipeId, start, stop) => {dispatch(editMealPlan(planId, recipeId, start, stop))},
    deleteCompletedGroceries: (id) => {dispatch(deleteCompletedGroceries(id))},
    deleteGroceries: (id) => {dispatch(deleteGroceries(id))},
    deleteFavorites: (recipeId, userId) => {dispatch(deleteFavorites(recipeId, userId))},
    editComment: (id, rating, comment) => {dispatch(editComment(id, rating, comment))},
    toggleGrocery: (id) => { dispatch(toggleGrocery(id)) },
    toggleFetchGrocery: (name, qty) => {dispatch(toggleFetchGrocery(name, qty))},

    // Fetch methods
    fetchUsers: () => {dispatch(fetchUsers())},
    fetchIngredients: () => {dispatch(fetchIngredients())},
    fetchGroceries: () => {dispatch(fetchGroceries())},
    fetchGrocery: (id) => {dispatch(fetchGrocery(id))},
    fetchComments: () => {dispatch(fetchComments())},
    fetchFavorites: () => {dispatch(fetchFavorites())},

    // Fetch with parameters
    fetchMealPlan: () => {dispatch(fetchMealPlan())},
    fetchRecipe: () => {dispatch(fetchRecipe())},
    fetchRecipeSteps: () => {dispatch(fetchRecipeSteps())},
    fetchRecipeTags: () => {dispatch(fetchRecipeTags())},
    fetchRecipeIngredients: () => {dispatch(fetchRecipeIngredients())},
    fetchRecipeNutrition: () => {dispatch(fetchRecipeNutrition())},
    fetchNutrition: () => {dispatch(fetchNutrition())},
    searchRecipe: (search) => {dispatch(searchRecipe(search))},

    //Post methods
    postComment: (id, recipeId, userId, rating, comment) => 
        {dispatch(postComment(id, recipeId, userId, rating, comment))},
    postRecipe: (id, name, numSteps, image, notes, userId, type) => 
        {dispatch(postRecipe(id, name, numSteps, image, notes, userId, type))},
    postNutrition: (servingSize, calories, caloriesFat, totalFat, saturatedFat, transFat, polyFat, monoFat, cholesterol, sodium, potassium, totalCarbs, 
        dietaryFiber, sugar, sugarAlcohol, addedSugar, protein, vitA, vitB6, vitB12, vitC, vitD, vitE, vitK, calcium, iron, magnesium, thiamine, biotin, 
        pantoAcid, phosphorous, iodine, zinc, selenium, copper, manganese, chromium, molybdenum, chloride) => 
        {dispatch(postNutrition(servingSize, calories, caloriesFat, totalFat, saturatedFat, transFat, polyFat, monoFat, cholesterol, sodium, potassium, 
            totalCarbs, dietaryFiber, sugar, sugarAlcohol, addedSugar, protein, vitA, vitB6, vitB12, vitC, vitD, vitE, vitK, calcium, iron, magnesium, 
            thiamine, biotin, pantoAcid, phosphorous, iodine, zinc, selenium, copper, manganese, chromium, molybdenum, chloride))},
    postIngredient: (name, type) => {dispatch(postIngredient(name, type))},
    postRecipeSteps: (recipeId, stepNum, steps) => {dispatch(postRecipeSteps(recipeId, stepNum, steps))},
    postRecipeIngredients: (recipeId, ingredientId, ingredient_name, measurement, unit) => 
        {dispatch(postRecipeIngredients(recipeId, ingredientId, ingredient_name, measurement, unit))},
    postGroceries: (ingredient_name,qty, user_id) =>
        {dispatch(postGroceries(ingredient_name,
            qty, user_id))},
    postRecipeNutrition: (servingSize, calories, caloriesFat, totalFat, saturatedFat, transFat, polyFat, monoFat, cholesterol, sodium, potassium, 
        totalCarbs, dietaryFiber, sugar, sugarAlcohol, addedSugar, protein, vitA, vitB6, vitB12, vitC, vitD, vitE, vitK, calcium, iron, magnesium, 
        thiamine, biotin, pantoAcid, phosphorous, iodine, zinc, selenium, copper, manganese, chromium, molybdenum, chloride, recipeId) => 
        {dispatch(postRecipeNutrition(servingSize, calories, caloriesFat, totalFat, saturatedFat, transFat, polyFat, monoFat, cholesterol, sodium, 
            potassium, totalCarbs, dietaryFiber, sugar, sugarAlcohol, addedSugar, protein, vitA, vitB6, vitB12, vitC, vitD, vitE, vitK, calcium, 
            iron, magnesium, thiamine, biotin, pantoAcid, phosphorous, iodine, zinc, selenium, copper, manganese, chromium, molybdenum, chloride, recipeId))},
    postMealPlan: (userId, planId, recipeId, start, stop) => {dispatch(postMealPlan(userId, planId, recipeId, start, stop))},
    postRecipeTags: (recipeid, tag) => {dispatch(postRecipeTags(recipeid, tag))},
    postFavorite: (recipeId, userId) => {dispatch(postFavorite(recipeId, userId))}
});

class Main extends Component {
    constructor(props){
        super(props);
    }

    componentDidMount(){
        this.props.fetchUsers();
        this.props.fetchIngredients();
        this.props.fetchNutrition();
        this.props.fetchGroceries();
        this.props.fetchMealPlan();
        this.props.fetchComments();
        this.props.fetchRecipe();
        this.props.fetchRecipeSteps();
        this.props.fetchRecipeTags();
        this.props.fetchFavorites();
        this.props.fetchRecipeIngredients();
        this.props.fetchRecipeNutrition();      
    }

    handleLogout = () => {
        this.props.addToken("")
        this.props.deleteUser()
    }

    render(){

        const IngredientWithId = () => {
            const {id} = useParams();
            return(
                <Ingredients 
                    ingredient={this.props.ingredients.ingredients.filter(
                        (ingredient) => ingredient.id === parseInt(id,10))[0]}
                    nutrition={this.props.nutrition.nutrition.filter(
                        (nutrition) => nutrition.id === parseInt(id,10))[0]}
                />
            );
        }

        const RecipeWithId = () => {
            const {id} = useParams();
           
            return(
                <Recipes targetRecipe={this.props.recipe.recipe.filter((recipe) => recipe.id === parseInt(id,10))[0]}
                targetRecipeSteps={this.props.recipeSteps.recipeSteps.filter(steps => steps.recipeId === parseInt(id,10))}
                recipeLoading={this.props.recipe.isLoading}
                recipeErrMess={this.props.recipe.errMess}
                favorites={this.props.favorites.favorites.filter(fave => fave.recipeId === parseInt(id,10))}
                postFavorite={this.props.postFavorite}
                deleteFavorite={this.props.deleteFavorites}
                user={this.props.user}
                users={this.props.allUsers}
                searchRecipe={this.props.searchRecipe}
                recipeTags={this.props.recipeTags.recipeTags.filter(tag => tag.recipeId === parseInt(id,10))}
                recipeNutrition={this.props.recipeNutrition.recipeNutrition.filter(nutrition => nutrition.recipeId === parseInt(id,10))[0]}
                targetIngredients={this.props.recipeIngredients.recipeIngredients.filter(ingredients => ingredients.recipeId === parseInt(id,10))}
                ingredients={this.props.ingredients.ingredients}
                targetComments={this.props.comments.comments.filter(comments => comments.recipeId === parseInt(id,10))}
                commentsLoading={this.props.comments.isLoading}
                commentsErrMess={this.props.comments.errMess}  
                postComment={this.props.postComment}
                deleteComment={this.props.deleteComment}
                editComment={this.props.editComment}
                editRecipe={this.props.editRecipe}
                nutrition={this.props.nutrition.nutrition}
                postGroceries={this.props.postGroceries}
                />
            ) 
        }

        const EditRecipeWithId = () => {

            const {id} = useParams();
            const targetIngredients = this.props.recipeIngredients.recipeIngredients.filter(ingredients => ingredients.recipeId === parseInt(id,10));
            const ingredientKeyArray = targetIngredients.map(ingredient => ingredient.ingredient_key)
            return(
                <EditRecipe targetRecipe={this.props.recipe.recipe.filter((recipe) => recipe.id === parseInt(id,10))[0]}
                targetRecipeSteps={this.props.recipeSteps.recipeSteps.filter(steps => steps.recipeId === parseInt(id,10))}
                recipeLoading={this.props.recipe.isLoading}
                recipeErrMess={this.props.recipe.errMess}
                recipeTags={this.props.recipeTags.recipeTags.filter(tag => tag.recipeId === parseInt(id,10))}
                user={this.props.user}
                targetIngredients={this.props.recipeIngredients.recipeIngredients.filter(ingredients => ingredients.recipeId === parseInt(id,10))}
                ingredients={this.props.ingredients.ingredients}
                editRecipe={this.props.editRecipe}
                editRecipeSteps={this.props.editRecipeSteps}
                editRecipeIngredients={this.props.editRecipeIngredients}
                nutrition={this.props.nutrition.nutrition}
                recipeNutrition={this.props.recipeNutrition.recipeNutrition.filter(nutrition => nutrition.recipeId === parseInt(id,10))[0]}
                ingredientKeyArray={ingredientKeyArray}
                deleteIngredients={this.props.deleteRecipeIngredients}
                postIngredients={this.props.postRecipeIngredients}/>
            ) 
        }



        return(
            <div>
                {/* Passes the token and the handleLogout method to the Header component. */}
                
                <Header token={this.props.token.token} user={this.props.user} 
                handleLogout={this.handleLogout} searchRecipe={this.props.searchRecipe}
                recipeSearch={this.props.recipeSearch}/>
                <div className="main">
                    <Routes>
                        <Route path='/login' element={<Login/>}/>
                        <Route path='/register'element={<Register/>}/>
                        <Route path='/user' element={<Dashboard 
                            user={this.props.user} 
                            recipes={this.props.recipe.recipe} 
                            deleteRecipe={this.props.deleteRecipe} 
                            deleteSteps={this.props.deleteRecipeSteps}
                            deleteIngredients={this.props.deleteRecipeIngredients}
                            deleteNutrition={this.props.deleteRecipeNutrition}
                            groceries={this.props.groceries}
                            edit={this.props.editMealPlan}
                            plans={this.props.mealPlan.mealPlan}/>}/>
                        <Route exact path='/recipes' element={<RecipesList recipes={this.props.recipe.recipe} />}/>
                        <Route path='/recipes/search/:searchbar' element={<RecipesList recipes={this.props.recipe.recipeSearch} />}/>
                        <Route exact path='/add/recipe' element={<AddRecipe 
                            postRecipe={this.props.postRecipe}  
                            postSteps={this.props.postRecipeSteps}
                            postGroceries={this.props.postGroceries}
                            postRecipeTags={this.props.postRecipeTags}
                            postIngredients={this.props.postRecipeIngredients}
                            postRecipeNutrition={this.props.postRecipeNutrition} 
                            ingredients={this.props.ingredients.ingredients}
                            nutrition={this.props.nutrition.nutrition} 
                            authUser={this.props.user} 
                            plans={this.props.mealPlan.mealPlan}
                            recipes={this.props.recipe.recipe}/>}/>
                        <Route path='/recipes/:id' element={<RecipeWithId/>}/>
                        <Route exact path='edit/recipes/:id' element={<EditRecipeWithId/>}/>
                        <Route exact path='/ingredients' element={<IngredientsList collection={this.props.ingredients.ingredients} />}/>
                        <Route path='/ingredients/:id' element={<IngredientWithId/>}/>
                        <Route path='/groceries' element={<Groceries
                            user={this.props.user}
                            groceries={this.props.groceries.groceries
                                .filter((grocery) => grocery.userId === parseInt(this.props.user.id,10))}
                            ingredients={this.props.ingredients.ingredients}
                            nutrition={this.props.nutrition.nutrition}
							postIngredient={this.props.postIngredient}
							postNutrition={this.props.postNutrition}
                            postGroceries={this.props.postGroceries}
                            toggleGrocery={this.props.toggleGrocery}
                            deleteGroceries={this.props.deleteGroceries}
                            deleteCompletedGroceries={this.props.deleteCompletedGroceries}
                            fetchGrocery={this.props.fetchGrocery}
                            toggleFetchGrocery={this.props.toggleFetchGrocery}/>}/>
                        <Route path='/mealplans' element={<MealPlans 
                        recipes={this.props.recipe.recipe} 
                        recipeNutrition={this.props.recipeNutrition.recipeNutrition}
                        recipeTags={this.props.recipeTags.recipeTags}
                        plans={this.props.mealPlan.mealPlan}
                        postMealPlan={this.props.postMealPlan}
                        edit={this.props.editMealPlan}
                        user={this.props.user}/>}/>
                        <Route path='/dvcalc' element={<DailyValueForm ingredients={this.props.ingredients.ingredients}/>}/>
                        <Route path='/home' element={<Home collection={this.props.recipe.recipe} token={this.props.token.token}/>}/>
                        <Route path='/scheduler' element={<Scheduler 
                              user={this.props.user} 
                              recipes={this.props.recipe.recipe} 
                              deleteRecipe={this.props.deleteRecipe} 
                              deleteSteps={this.props.deleteRecipeSteps}
                              deleteIngredients={this.props.deleteRecipeIngredients}
                              deleteNutrition={this.props.deleteRecipeNutrition}
                              groceries={this.props.groceries}
                              plans={this.props.mealPlan.mealPlan}
                              edit={this.props.editMealPlan}/>}/>
                        {/* <Route path='/home' element={this.props.token.token !== undefined ? <Home collection={this.props.recipe.recipe}/> : null}/>                       */}
                        <Route path='' element={<Navigate to='/home' />} />
                    </Routes>
                </div>
            <Footer/>
        </div>
        )
    }
} 

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Main));