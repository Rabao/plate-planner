import React, {Component} from 'react';
import {Routes, Route, Navigate, Link, useParams} from 'react-router-dom'
import Login from '../Login/Login'
import Register from '../Register/Register'
import Header from '../Header/Header'
import { Footer } from '../Footer/Footer'
import Home from '../Home/Home'
import Recipes from '../Pages/Recipes'
import RecipesList from '../Pages/RecipesList'
import AddRecipe from '../Pages/AddRecipe'
import Groceries from '../Pages/GroceryList'
import MealPlans from '../Pages/MealPlans'
import Dashboard from '../Pages/Dashboard';
import DailyValueCalculator from '../SubComponents/DailyValueCalculator';
import {addToken, deleteUser, fetchUsers, fetchIngredients, fetchGroceries, fetchGrocery,
        toggleFetchGrocery, toggleGrocery, fetchMealPlan, fetchMealPlanCollection, fetchRecipe, postRecipe, 
        deleteRecipe, postRecipeNutrition, postRecipeIngredients, postRecipeSteps, fetchRecipeSteps, 
        fetchRecipeIngredients, deleteGroceries, deleteCompletedGroceries,
        postComment, fetchComments, deleteComment, editComment, postGroceries,
        addGroceries, addIngredients, postIngredient,
        addNutrition, fetchNutrition, postNutrition, addMealPlan, 
        addMealPlanCollection, addRecipe, } from '../../Redux/actionCreators'
import {connect} from 'react-redux'
import { withRouter } from '../WithRouer/WithRouter';
import IngredientsList from '../Pages/IngredientsList';
import Ingredients from '../Pages/Ingredients';
import Loader from '../SubComponents/Loader/Loader';
import AutoComplete from '../SubComponents/AutoComplete';

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
        recipeSteps: state.recipeSteps,
        recipeIngredients: state.recipeIngredients,
        mealPlan: state.mealPlan,
    }
}

const mapDispatchToProps = (dispatch) => ({
    addToken: () => { dispatch(addToken()) },
    deleteUser: () => { dispatch(deleteUser())},
    deleteComment: (id) => { dispatch(deleteComment(id))},
    deleteRecipe: (id) => { dispatch(deleteRecipe(id))},
    deleteCompletedGroceries: (id) => {dispatch(deleteCompletedGroceries(id))},
    deleteGroceries: (id) => {dispatch(deleteGroceries(id))},
    editComment: (id, rating, comment) => {dispatch(editComment(id, rating, comment))},
    toggleGrocery: (id) => { dispatch(toggleGrocery(id)) },
    toggleFetchGrocery: (name, qty) => {dispatch(toggleFetchGrocery(name, qty))},

    // Fetch methods
    fetchUsers: () => {dispatch(fetchUsers())},
    fetchIngredients: () => {dispatch(fetchIngredients())},
    fetchGroceries: () => {dispatch(fetchGroceries())},
    fetchGrocery: (id) => {dispatch(fetchGrocery(id))},
    fetchMealPlanCollection: () => {dispatch(fetchMealPlanCollection())},
    fetchComments: () => {dispatch(fetchComments())},

    // Fetch with parameters
    fetchMealPlan: () => {dispatch(fetchMealPlan())},
    fetchRecipe: () => {dispatch(fetchRecipe())},
    fetchRecipeSteps: () => {dispatch(fetchRecipeSteps())},
    fetchRecipeIngredients: () => {dispatch(fetchRecipeIngredients())},
    fetchNutrition: () => {dispatch(fetchNutrition())},

    //Post methods
    postComment: (id, recipeId, userId, rating, comment) => 
        {dispatch(postComment(id, recipeId, userId, rating, comment))},
    postRecipe: (id, name, numSteps, image, notes, userId, type) => 
        {dispatch(postRecipe(id, name, numSteps, image, notes, userId, type))},
    postNutrition: (servingSize, servingSizeQty, servingSizeQtyUnit, servingSizeWeight, servingSizeUnit, calories, caloriesFat,
        totalFat, saturatedFat, transFat, polyFat, monoFat, cholesterol, sodium, potassium, totalCarbs, dietaryFiber, sugar, sugarAlcohol, addedSugar, 
        protein, vitA, vitB6, vitB12, vitC, vitD, vitE, vitK, calcium, iron, magnesium, thiamine, biotin, pantoAcid, phosphorous, iodine, zinc, selenium,
        copper, manganese, chromium, molybdenum, chloride) => 
        {dispatch(postNutrition(servingSize, servingSizeQty, servingSizeQtyUnit, servingSizeWeight, servingSizeUnit, calories, caloriesFat,
            totalFat, saturatedFat, transFat, polyFat, monoFat, cholesterol, sodium, potassium, totalCarbs, dietaryFiber, sugar, sugarAlcohol, addedSugar, 
            protein, vitA, vitB6, vitB12, vitC, vitD, vitE, vitK, calcium, iron, magnesium, thiamine, biotin, pantoAcid, phosphorous, iodine, zinc, selenium,
            copper, manganese, chromium, molybdenum, chloride))},
    postIngredient: (name, type) => {dispatch(postIngredient(name, type))},
    postRecipeSteps: (recipeId, stepNum, steps) => {dispatch(postRecipeSteps(recipeId, stepNum, steps))},
    postRecipeIngredients: (recipeId, ingredientId, ingredient_name, measurement, unit) => 
        {dispatch(postRecipeIngredients(recipeId, ingredientId, ingredient_name, measurement, unit))},
    postGroceries: (ingredient_name,qty, user_id) =>
        {dispatch(postGroceries(ingredient_name,
            qty, user_id))},
    postRecipeNutrition: (servingSize, servingSizeQty, servingSizeQtyUnit, servingSizeWeight, servingSizeUnit, calories, caloriesFat, 
        totalFat, saturatedFat, transFat, polyFat, monoFat, cholesterol, sodium, potassium, totalCarbs, dietaryFiber, sugar, sugarAlcohol, 
        addedSugar, protein, vitA, vitB6, vitB12, vitC, vitD, vitE, vitK, calcium, iron, magnesium, thiamine, biotin, pantoAcid, phosphorous, 
        iodine, zinc, selenium, copper, manganese, chromium, molybdenum, chloride, recipeId) => {dispatch(postRecipeNutrition(servingSize, servingSizeQty, servingSizeQtyUnit, servingSizeWeight, servingSizeUnit, calories, caloriesFat, 
            totalFat, saturatedFat, transFat, polyFat, monoFat, cholesterol, sodium, potassium, totalCarbs, dietaryFiber, sugar, sugarAlcohol, 
            addedSugar, protein, vitA, vitB6, vitB12, vitC, vitD, vitE, vitK, calcium, iron, magnesium, thiamine, biotin, pantoAcid, phosphorous, 
            iodine, zinc, selenium, copper, manganese, chromium, molybdenum, chloride, recipeId))},
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
        this.props.fetchMealPlanCollection();
        this.props.fetchComments();
        this.props.fetchRecipe();
        this.props.fetchRecipeSteps();
        this.props.fetchRecipeIngredients();
       
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
                user={this.props.user}
                users={this.props.allUsers}
                targetIngredients={this.props.recipeIngredients.recipeIngredients.filter(ingredients => ingredients.recipeId === parseInt(id,10))}
                ingredients={this.props.ingredients.ingredients}
                targetComments={this.props.comments.comments.filter(comments => comments.recipeId === parseInt(id,10))}
                commentsLoading={this.props.comments.isLoading}
                commentsErrMess={this.props.comments.errMess}  
                postComment={this.props.postComment}
                deleteComment={this.props.deleteComment}
                editComment={this.props.editComment}
                nutrition={this.props.nutrition.nutrition}
                postGroceries={this.props.postGroceries}/>
            ) 
        }


        return(
            <div>
                {/* Passes the token and the handleLogout method to the Header component. */}
                <Header token={this.props.token.token} user={this.props.user} handleLogout={this.handleLogout}/>
                <div className="main">
                    <Routes>
                        <Route path='/login' element={<Login/>}/>
                        <Route path='/register'element={<Register/>}/>
                        <Route path='/user' element={<Dashboard user={this.props.user} recipes={this.props.recipe.recipe} deleteRecipe={this.props.deleteRecipe}/>}/>
                        <Route exact path='/recipes' element={<RecipesList recipes={this.props.recipe.recipe} />}/>
                        <Route exact path='/add/recipe' element={<AddRecipe 
                            postRecipe={this.props.postRecipe}  
                            postSteps={this.props.postRecipeSteps}
                            postGroceries={this.props.postGroceries}
                            postIngredients={this.props.postRecipeIngredients}
                            postRecipeNutrition={this.props.postRecipeNutrition} 
                            ingredients={this.props.ingredients.ingredients}
                            nutrition={this.props.nutrition.nutrition} 
                            authUser={this.props.user} 
                            recipes={this.props.recipe.recipe}/>}/>
                        <Route path='/recipes/:id' element={<RecipeWithId/>}/>
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
                        <Route path='/mealplans' element={<MealPlans/>}/>
                        <Route path='/dvcalc' element={<DailyValueCalculator ingredients={this.props.ingredients.ingredients}/>}/>
                        <Route path='/home' element={this.props.token.token !== undefined ? <Home collection={this.props.recipe.recipe}/> : null}/>                   
                        <Route path='' element={<Navigate to='/home' />} />
                    </Routes>
                </div>
            <Footer/>
        </div>
        )
    }
} 

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Main));