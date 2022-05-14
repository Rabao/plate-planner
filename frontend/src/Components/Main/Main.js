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
import {addToken, deleteUser,
        fetchIngredients, fetchGroceries, fetchMealPlan, 
        fetchMealPlanCollection, fetchRecipe, fetchRecipeCollection,
        postComment, addGroceries, addIngredients, postIngredient,
        addNutrition, fetchNutrition, postNutrition, addMealPlan, 
        addMealPlanCollection, addRecipe, addRecipeCollection} from '../../Redux/actionCreators'
import {connect} from 'react-redux'
import { withRouter } from '../WithRouer/WithRouter';
import IngredientsList from '../Pages/IngredientsList';
import Ingredients from '../Pages/Ingredients';

const mapStateToProps = state => {
    return {
        token: state.token,
        user: state.user,
        comments: state.comments,
        groceries: state.groceries,
        ingredients: state.ingredients,
        nutrition: state.nutrition,
        recipe: state.recipe,
        mealPlan: state.mealPlan
    }
}

const mapDispatchToProps = (dispatch) => ({
    addToken: () => { dispatch(addToken()) },
    deleteUser: () => { dispatch(deleteUser())},

    // Fetch methods
    fetchIngredients: () => {dispatch(fetchIngredients())},
    fetchGroceries: () => {dispatch(fetchGroceries())},
    fetchMealPlanCollection: () => {dispatch(fetchMealPlanCollection())},
    fetchRecipeCollection: () => {dispatch(fetchRecipeCollection())},
    fetchMealPlan: () => {dispatch(fetchMealPlan())},
    fetchRecipe: () => {dispatch(fetchRecipe())},
    fetchNutrition: () => {dispatch(fetchNutrition())},

    //Post methods
    postComment: (recipeId, rating, user, userId, comment) => 
        {dispatch(postComment(recipeId, rating, user, userId, comment))},
    postNutrition: (id, serving_size, calories, calories_fat, total_fat, 
        saturated_fat, trans_fat, cholesterol, sodium, potassium, total_carbs, 
        dietary_fiber, sugar, sugar_alcohol, protein, vitC, calcium, iron, vitD,
        vitB6, cobalamin, magnesium) => 
        {dispatch(postNutrition(id, serving_size, calories, calories_fat, total_fat, 
            saturated_fat, trans_fat, cholesterol, sodium, potassium, total_carbs, 
            dietary_fiber, sugar, sugar_alcohol, protein, vitC, calcium, iron, vitD,
            vitB6, cobalamin, magnesium))},
    postIngredient: (id, name, type) => {dispatch(postIngredient(id, name, type))},

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

        // this.alertTest = this.alertTest.bind(this);
    }

    componentDidMount(){
        this.props.fetchIngredients();
        this.props.fetchNutrition();
        this.props.fetchGroceries();
        this.props.fetchMealPlan();
        this.props.fetchMealPlanCollection();
        this.props.fetchRecipe();
        this.props.fetchRecipeCollection();
    }

    handleLogout = () => {
        this.props.addToken("")
        this.props.deleteUser()
    }

    //  PROOF OF CONCEPT REDUX WORKING
    // alertTest = () => {
    //     let arr = []
    //     this.props.ingredients.ingredients.map((ing) => {
    //         arr.push(ing)
    //         console.log(ing);
    //     })
    //     alert(arr)
    // }

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

        return(
            <div>
                {/* Passes the token and the handleLogout method to the Header component. */}
                <Header token={this.props.token.token} handleLogout={this.handleLogout}/>
                <Routes>
                    <Route exact path='/login' element={<Login/>}/>
                    <Route path='/register'element={<Register/>}/>
                    <Route exact path='/recipes' element={<RecipesList recipes={this.props.recipe.recipe} />}/>
                    <Route path='/recipes/:id' element={<Recipes recipes={this.props.recipe.recipe} />}/>
                    <Route exact path='/ingredients' element={<IngredientsList collection={this.props.ingredients.ingredients} />}/>
                    <Route path='/ingredients/:id' element={<IngredientWithId/>}/>
                    <Route path='/groceries' element={<Groceries/>}/>
                    <Route path='/mealplans' element={<MealPlans/>}/>
                    <Route path='/home' element={this.props.token.token !== undefined ? <Home collection={this.props.recipe.recipe}/> : null}/>
                    <Route path='' element={<Navigate to='/login' />} />
                </Routes>
                <Footer/>
            </div>
        )
    }
} 

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Main));