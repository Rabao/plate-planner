import React, {Component} from 'react';
import {Routes, Route, Navigate, Link, useParams} from 'react-router-dom'
import Login from '../Login/Login'
import Register from '../Register/Register'
import Header from '../Header/Header'
import { Footer } from '../Footer/Footer'
import Home from '../Home/Home'
import Recipes from '../Pages/Recipes'
import RecipesList from '../Pages/RecipesList'
import Groceries from '../Pages/GroceryList'
import MealPlans from '../Pages/MealPlans'
import {addToken, deleteUser, fetchUsers,
        fetchIngredients, fetchGroceries, fetchMealPlan, 
        fetchMealPlanCollection, fetchRecipe, fetchRecipeSteps,
        postComment, fetchComments, addGroceries, addIngredients, postIngredient,
        addNutrition, fetchNutrition, postNutrition, addMealPlan, 
        addMealPlanCollection, addRecipe, } from '../../Redux/actionCreators'
import {connect} from 'react-redux'
import { withRouter } from '../WithRouer/WithRouter';
import IngredientsList from '../Pages/IngredientsList';
import Ingredients from '../Pages/Ingredients';
import Loader from '../SubComponents/Loader/Loader';

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
        mealPlan: state.mealPlan,
    }
}

const mapDispatchToProps = (dispatch) => ({
    addToken: () => { dispatch(addToken()) },
    deleteUser: () => { dispatch(deleteUser())},

    // Fetch methods
    fetchUsers: () => {dispatch(fetchUsers())},
    fetchIngredients: () => {dispatch(fetchIngredients())},
    fetchGroceries: () => {dispatch(fetchGroceries())},
    fetchMealPlanCollection: () => {dispatch(fetchMealPlanCollection())},
    fetchComments: () => {dispatch(fetchComments())},
    // fetchRecipeCollection: () => {dispatch(fetchRecipeCollection())},

    // Fetch with parameters
    fetchMealPlan: () => {dispatch(fetchMealPlan())},
    fetchRecipe: () => {dispatch(fetchRecipe())},
    fetchRecipeSteps: () => {dispatch(fetchRecipeSteps())},
    fetchNutrition: () => {dispatch(fetchNutrition())},

    //Post methods
    postComment: (recipeId, userId, rating, comment) => 
        {dispatch(postComment(recipeId, userId, rating, comment))},
    postNutrition: (serving_size, calories, calories_fat, total_fat, 
        saturated_fat, trans_fat, cholesterol, sodium, potassium, total_carbs, 
        dietary_fiber, sugar, sugar_alcohol, protein, vitC, calcium, iron, vitD,
        vitB6, cobalamin, magnesium) => 
        {dispatch(postNutrition(serving_size, calories, calories_fat, total_fat, 
            saturated_fat, trans_fat, cholesterol, sodium, potassium, total_carbs, 
            dietary_fiber, sugar, sugar_alcohol, protein, vitC, calcium, iron, vitD,
            vitB6, cobalamin, magnesium))},
    postIngredient: (name, type) => {dispatch(postIngredient(name, type))},

    //Add methods
    // addGroceries: () => {dispatch(addGroceries())},
    // addIngredients: () => {dispatch(addIngredients())},
    // addNutrition: () => {dispatch(addNutrition())},
    // addMealPlan: () => {dispatch(addMealPlan())},
    // addMealPlanCollection: () => {dispatch(addMealPlanCollection())},
    // addRecipe: () => {dispatch(addRecipe())},
    // addRecipeCollection: () => {dispatch(addRecipeCollection())}
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
                recipeLoading={this.props.recipe.recipe.isLoading}
                recipeErrMess={this.props.recipe.recipe.errMess}
                user={this.props.user}
                users={this.props.allUsers.allUsers}
                targetComments={this.props.comments.comments.filter(comments => comments.recipeId === parseInt(id,10))}
                commentsLoading={this.props.comments.isLoading}
                commentsErrMess={this.props.comments.errMess}  
                postComment={this.props.postComment}/>
            ) 
        }

// filter(comments => comments.recipeId === parseInt(id,10))
        return(
            <div>
             
                {/* Passes the token and the handleLogout method to the Header component. */}
                <Header token={this.props.token.token} user={this.props.user.username} handleLogout={this.handleLogout}/>
                <div className="main">
                    <Routes>
                        <Route path='/login' element={<Login/>}/>
                        <Route path='/register'element={<Register/>}/>
                        <Route exact path='/recipes' element={<RecipesList recipes={this.props.recipe.recipe} />}/>
                        <Route path='/recipes/:id' element={<RecipeWithId/>}/>
                        <Route exact path='/ingredients' element={<IngredientsList collection={this.props.ingredients.ingredients} />}/>
                        <Route path='/ingredients/:id' element={<IngredientWithId/>}/>
                        <Route path='/groceries' element={<Groceries 
                            ingredients={this.props.ingredients.ingredients}
                            nutrition={this.props.nutrition.nutrition}
							postIngredient={this.props.postIngredient}
							postNutrition={this.props.postNutrition}/>}/>
                        <Route path='/mealplans' element={<MealPlans/>}/>
                        <Route path='/home' element={this.props.token.token !== undefined ? <Home collection={this.props.recipe.recipe}/> : null}/>
                        <Route path='' element={<Navigate to='/login' />} />
                    </Routes>
                </div>
            <Footer/>
        </div>
        )
    }
} 

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Main));