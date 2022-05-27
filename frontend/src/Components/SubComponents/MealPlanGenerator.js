import React, {Component} from 'react';
import {Link, useNavigate} from 'react-router-dom'
import { Breadcrumb, Col, Button } from 'react-bootstrap'
import { Control, LocalForm, Errors } from 'react-redux-form';
import {TiArrowShuffle} from 'react-icons/ti'
import {Tooltip} from 'react-tippy';
import 'react-tippy/dist/tippy.css';

export default class PlanGenerator extends Component {
    constructor(props){
        super(props)
        this.state = {
            shuffled: false,
            intake: 0,
            meals: 0
        }
    }

    displayGenerator = () => {
        this.setState({
            shuffled: !this.state.shuffled
        })
    }

    handleSubmit(calories, meals) {
        this.setState({
            intake: calories,
            meals: meals
        })
        this.generator(this.state.intake, this.state.meals)
    }

    generator(calories, meals){
        console.log("GENERATOR: " + calories + " " + meals)
        let mealArr = [];
        const caloricIntake = calories;
        let numMeals = meals;
        let calCeilPerMeal = caloricIntake/numMeals;

        const recNutrition = this.props.nutrition;
        const ceiling = recNutrition.filter((recipe) => recipe.calories <= calCeilPerMeal);

        const breakfast = this.props.recipes.filter((recipe) => recipe.type === "Breakfast");
        const dinner = this.props.recipes.filter((recipe) => recipe.type === "Dinner");   
        const lunch = this.props.recipes.filter((recipe) => recipe.type === "Lunch");

        const shuffle = arr => [...arr].sort(() => Math.random() - 0.5);
   
        function mealFilter(recipes){
            let shuffledNutrition = shuffle(ceiling);
            const fMeal = recipes.filter((recipe) => recipe.id == shuffledNutrition[0].recipeId);

            if(fMeal[0] && shuffledNutrition[0]){
                return(
                <Tooltip 
                    trigger="mouseenter" arrow="true" position="right-end" max-width={'1000px'} html={(<div id="tooltip">{RecipeNutrition(fMeal[0], shuffledNutrition[0])}</div>)}>
                        <div key={fMeal[0].id}>
                            <div>
                                <div className="plan-img-wrapper">
                                <img className="plan-img" src={fMeal[0].image}/>
                            </div>
                            <div className="plan-details-wrapper">
                                <table>
                                    <tr>
                                        <td className="plan-meal-name"><strong>{fMeal[0].name}</strong></td>
                                        <td className="plan-meal-flex"></td>
                                        <td className="plan-meal-type">{fMeal[0].type}</td>
                                    </tr>
                                    <tr className="plan-meal-cals">
                                        <td>Cal: {shuffledNutrition[0].calories}</td>
                                    </tr>
                                </table>
                            </div>
                        </div>
                    </div> </Tooltip>
                )
            }
             else {
                mealFilter(recipes);
            }
        }

        if(meals==1){
            return(
            <div>
                <div className="plan-block">
                    {console.log("TEST.")}
                    {mealFilter(dinner)}
                </div>
            </div>
            )
        } else if(meals==2){
            return(
            <div>
                <div className="plan-block">
                    {mealFilter(breakfast)}
                </div>
                <div className="plan-block">
                    {mealFilter(dinner)}
                </div>
            </div>
            )
        } else if(meals==3){
            return(
            <div>
                <div className="plan-block">
                     {mealFilter(breakfast)}
                </div>
                <div className="plan-block">2</div>
                <div className="plan-block">
                    {mealFilter(dinner)}
                </div>
            </div>
            )
        } if(meals>3){
            return(
            <div>
                <div className="plan-block">
                    {mealFilter(breakfast)}
                </div>
                <div className="plan-block">2</div>
                <div className="plan-block">
                    {mealFilter(dinner)}<button onClick={()=>{{mealFilter(dinner)}}}>Button</button>
                </div>
            </div>
            )
        }
    }


        render(){
            let calories = document.getElementById('caloric-intake');
            let numMeals = document.getElementById('meal-count');
    return (
        <>
        <LocalForm id="target-nutrition">
            <div className="row">
            <div className="col">
                <label htmlFor="calories">Target Caloric Intake</label>
                    <input type="number" model='.calories' 
                    name="calories" 
                    className="caloric-intake"
                    id="caloric-intake"
                    defaultValue={1000}/>
            </div> 
            <div className="col">
                <label htmlFor="meals">In How Many Meals?</label>
                    <select type="number" model='.meals' 
                    name="meals" 
                    className="meal-count"
                    id="meal-count"
                    defaultValue={3}>
                        <option>1</option>
                        <option>2</option>
                        <option>3</option>
                        <option>4</option>
                        <option>5</option>
                        <option>6</option>
                        <option>7</option>
                        <option>8</option>
                        <option>9</option>
                    </select>
                    <button onClick={() =>{this.handleSubmit(calories.value, numMeals.value)}}><TiArrowShuffle/></button>
                </div>                       
            {/* <Col md={2}>
                        <button onClick={() => this.displayGenerator()}>Shuffle</button>             
            </Col> */}
            </div>
            </LocalForm>
            <div>
                   {this.state.shuffled ? 
                        <div>{this.generator(calories.value,numMeals.value)}</div> 
                    : 
                        <div><button onClick={()=>{this.displayGenerator()}}>Generate Plan</button></div>
                    }
                </div>
        </>
    );
    }
}


function RecipeNutrition(recipe, nutrition)  {
    return(

        <div>
        { nutrition && recipe ?
            <table>
                <tr>
                    <th>Recipe</th>
                    <th>{recipe.name}</th>
                </tr>
                <tr>
                    <td>Serving Size</td>
                    <td>{nutrition.servingSize}</td> 
                </tr>
                <tr>
                    <td>Calories</td>
                    <td>{nutrition.calories}</td>
                </tr>
                <tr>
                    <td>Calories from Fat</td>
                    <td>{nutrition.caloriesFat}</td>
                </tr>
                <tr>
                    <td>Total Fat</td>
                    <td>{nutrition.totalFat}g</td>
                </tr>
                <tr>
                    <td>Saturated Fat</td>
                    <td>{nutrition.saturatedFat}g</td>
                </tr>          
                <tr>
                    <td>Cholesterol</td>
                    <td>{nutrition.cholesterol}mg</td>
                </tr>
                <tr>
                    <td>Sodium</td>
                    <td>{nutrition.sodium}mg</td>
                </tr>
                <tr>
                    <td>Total Carbohydrates</td>
                    <td>{nutrition.totalCarbs}g</td>
                </tr>
                <tr>
                    <td>Sugar</td>
                    <td>{nutrition.sugar}g</td>
                </tr>
                <tr>
                    <td>Dietary Fiber</td>
                    <td>{nutrition.dietaryFiber}g</td>
                </tr>
                <tr>
                    <td>Potassium</td>
                    <td>{nutrition.potassium}mg</td>
                </tr>
                <tr>
                    <td>Protein</td>
                    <td>{nutrition.protein}g</td>
                </tr> 
            </table>
        
        : 
        
        <div> Nutrition data not available. </div>}
    </div>
    )

}