import React, {Component} from 'react';
import {Switch, Route, Redirect, Link} from 'react-router-dom'
import Login from '../Login/Login'
import Register from '../Register/Register'
import Header from '../Header/Header'
import { Footer } from '../Footer/Footer'
import Home from '../Home/Home'
import Recipes from '../Pages/Recipes'
import Groceries from '../Pages/GroceryList'
import MealPlans from '../Pages/MealPlans'
import {addToken, deleteUser,
        fetchInredients, fetchGroceries, fetchMealPlan, 
        fetchMealPlanCollection, fetchRecipe, fetchRecipeCollection,
        postComment, addGroceries, addIngredients, addMealPlan, 
        addMealPlanCollection, addRecipe, addRecipeCollection} from '../../Redux/actionCreators'
import {connect} from 'react-redux'
import {withRouter} from 'react-router-dom'
import RecipeCollection from '../SubComponents/RecipeCollection';

const mapStateToProps = state => {
    return {
        token: state.token,
        user: state.user,
        comments: state.comments,
        groceries: state.groceries,
        ingredients: state.ingredients,
        recipe: state.recipe,
        mealPlan: state.mealPlan
    }
}

const mapDispatchToProps = (dispatch) => ({
    addToken: () => { dispatch(addToken()) },
    deleteUser: () => { dispatch(deleteUser())},

    // Fetch methods
    fetchInredients: () => {dispatch(fetchInredients())},
    fetchGroceries: () => {dispatch(fetchGroceries())},
    fetchMealPlanCollection: () => {dispatch(fetchMealPlanCollection())},
    fetchRecipeCollection: () => {dispatch(fetchRecipeCollection())},

    // Fetch with parameters
    fetchMealPlan: (id) => {dispatch(fetchMealPlan(id))},
    fetchRecipe: (id) => {dispatch(fetchRecipe(id))},

    //Post methods
    postComment: (recipeId, rating, user, userId, comment) => {dispatch(postComment(recipeId, rating, user, userId, comment))},

    //Add methods
    addGroceries: () => {dispatch(addGroceries())},
    addIngredients: () => {dispatch(addIngredients())},
    addMealPlan: () => {dispatch(addMealPlan())},
    addMealPlanCollection: () => {dispatch(addMealPlanCollection())},
    addRecipe: () => {dispatch(addRecipe())},
    addRecipeCollection: () => {dispatch(addRecipeCollection())}
});

class Main extends Component {
    constructor(props){
        super(props);

        // this.alertTest = this.alertTest.bind(this);
    }

    componentDidMount(){
        this.props.fetchInredients();
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
        return(
            <div>
                {/* Passes the token and the handleLogout method to the Header component. */}
                <Header token={this.props.token.token} handleLogout={this.handleLogout}/>
                <Switch>
                    <Route path='/login' component={() => <Login/>}/>
                    <Route path='/register'component={() => <Register/>}/>
                    <Route path='/recipes' component={() => <Recipes/>}/>
                    <Route path='/groceries' component={() => <Groceries/>}/>
                    <Route path='/mealplans' component={() => <MealPlans/>}/>
                    <Route path='/home' component={this.props.token.token !== undefined ? () => <Home/> : null}/>
                    <Redirect to='/login'/>
                </Switch>
                <Footer/>
                <RecipeCollection collection={this.props.recipe.recipe}/>
            </div>
        )
    }
} 

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Main));