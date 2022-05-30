import React, {useState} from 'react';
import {Link, useNavigate} from 'react-router-dom'
import { Breadcrumb, Col, Button } from 'react-bootstrap'
import { Control, LocalForm, Errors } from 'react-redux-form';
import {TiArrowShuffle} from 'react-icons/ti'
import {Tooltip} from 'react-tippy';
import 'react-tippy/dist/tippy.css';
import DatePicker from "react-datepicker";
import { array } from 'prop-types';
import arrayShuffle from 'array-shuffle';
import "react-datepicker/dist/react-datepicker.css";

 const PlanGenerator = (props) => {
    const [isClicked, setIsClicked] = useState(false);
    const [shuffled,setShuffled] = useState(false);
    const [formValues, setFormValues] = useState({
        intake: 0,
        meals: 0
    })
    let today = new Date()
    let date = today.getDate('YYYY');
    let month = ('0'+(today.getMonth()+1)).slice(-2)
    let year = today.getFullYear('DD');
    let startDate = year+"-"+month+"-"+date;
    // const [intake, setIntake] = useState(0);
    // const [meals, setMeals] = useState(0);
    let mealObject = [];

    function showShuffle() {
        document.getElementsByClassName('shuffle')[0].classList.remove('_close');
        document.getElementsByClassName('shuffle')[0].classList.add('_open');
    }

    function displayGenerator() {
        setShuffled({shuffled: !shuffled});
        showShuffle();
    }

    function setValues(calories, numMeals) {
        setFormValues({
            intake: calories,
            meals: numMeals
        })
        generator(formValues.intake, formValues.meals);
        let date = document.getElementById('meal-plan-datetime');
        console.log(date.value+"T07:00:00-05:00")
    }

    //-------------------------------------------------------------------PLAN ID GENERATOR
    //-------------------------------------------------------------------PLAN ID GENERATOR
    //-------------------------------------------------------------------PLAN ID GENERATOR

    function getRandomInt(max)  {
        return Math.floor(Math.random() * max);
    }

    function assignId() {
        let postId = getRandomInt(50000);

        if(props.plans){
            props.plans.map((plan) => {
                if(plan.id === postId || postId === 0){
                postId = Math.random();
                }}
            )
        }

        return postId;
     }

     function handleSubmit() {
        let planId = assignId();
        assignId();
        let date = document.getElementById('meal-plan-datetime');
        let start = '';
        let end = '';

       
        for(let i =0; i < mealObject.length; i++){

            if(mealObject[i].type === "Breakfast"){
               start = date.value+"T07:00:00-05:00";
               end = date.value+"T08:00:00-05:00";
            } else if(mealObject[i].type === "Lunch"){
                start = date.value+"T12:00:00-05:00";
                end = date.value+"T13:00:00-05:00";
            } else if(mealObject[i].type === "Dinner"){
                start = date.value+"T19:00:00-05:00";
                end = date.value+"T20:00:00-05:00";
            }
            if(mealObject[0]){
                props.postPlan(props.user.id, planId, mealObject[i].id, start, end);
             }
            }     
        
        setTimeout(() => {
        setIsClicked({isClicked: !isClicked});
        }, 300)
    }

    function generator(calories, meals) {

        const caloricIntake = calories;
        let numMeals = meals;
        let calCeilPerMeal = caloricIntake/numMeals;

        function matchNutritionById(meals,ceil) {
            return meals.filter((recipe) => recipe.recipeId == ceil.id);
         }

        const ceiling = props.nutrition.filter((recipe) => recipe.calories <= calCeilPerMeal);
        
        const breakfast = props.recipes.filter((recipe) => recipe.type === "Breakfast");
        const dinner = props.recipes.filter((recipe) => recipe.type === "Dinner");   
        const lunch = props.recipes.filter((recipe) => recipe.type === "Lunch");

        const matchedBreakfast = matchNutritionById(breakfast,ceiling);
        const matchedLunch = matchNutritionById(lunch,ceiling);
        const matchedDinner = matchNutritionById(dinner,ceiling);
 
        function shuffleObject(array) {
            const shuffle = arr => [...arr].sort(() => Math.random() - 0.5);
            return shuffle(array);
        }
        
        function mealFilter(array){
            let shuffled = shuffleObject(array);
            let nutrition = ceiling.filter((recipe) => recipe.recipeId === shuffled[0].id)
            
            // If Else state causes blanks
            if(nutrition[0] && shuffled[0]){ mealObject.push(shuffled[0])
            return(
                
                        <div key={shuffled[0].id}>
                            <Tooltip 
                                trigger="mouseenter" arrow="true" position="right" 
                                distance="10px" html={(<div id="tooltip">{RecipeNutrition(shuffled[0], nutrition[0])}</div>)}>
                                <table className="plan-details-wrapper">
                                    <tr>
                                        <td className="plan-img-wrapper"><img className="plan-img" src={shuffled[0].image}/></td>
                                        <td className="plan-meal-name"><strong>{shuffled[0].name}</strong><br/><td className="plan-meal-cals"><strong>Cal:</strong> {nutrition[0].calories}</td></td>
                                        <td className="plan-meal-flex"></td>
                                        <td className="plan-meal-type">{shuffled[0].type}<br/></td>
                                    </tr>
                                </table></Tooltip>
                            </div>
                    
                )
            }
                
        }

        let bShuffle = mealFilter(matchedBreakfast) 
        // let lShuffle = mealFilter(matchedLunch)
        let dShuffle = mealFilter(matchedDinner);

        if(meals==1){
            return(
            <div>
                <div className="plan-block">
                    {dShuffle}
                </div>
            </div>
            )
        } else if(meals==2){
            return(
            <div>
                <div className="plan-block">
                    {bShuffle}
                </div>
                <div className="plan-block">
                    {dShuffle}
                </div>
            </div>
            )
        } else if(meals==3){
            return(
            <div>
                <div className="plan-block">
                     {bShuffle}
                </div>
                <div className="plan-block">
                    2
                </div>
                <div className="plan-block">
                    {dShuffle}
                </div>
            </div>
            )
        } if(meals>3){
            return(
            <div>
                <div className="plan-block">
                    {bShuffle}
                    <hr/>
                </div>
                <div className="plan-block">
                    2
                    <hr/>
                </div>
                <div className="plan-block">
                    {dShuffle}
                    <hr/>
                </div>
            </div>
            )
        }
    }


   
    let calories = document.getElementById('caloric-intake');
    let numMeals = document.getElementById('meal-count');

    return (
        <>
        <LocalForm id="target-nutrition">
            <div className="row">
            <div className="col">
                <label htmlFor="calories" style={{marginBottom:'10px'}}>Target Caloric Intake</label>
                    <input type="number" model='.calories' 
                    name="calories" 
                    className="caloric-intake"
                    id="caloric-intake"
                    step={1000}
                    defaultValue={1000}/>
            </div> 
            <div className="col">
                <label htmlFor="meals" style={{marginBottom:"9px"}}>In How Many Meals?</label>
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
                    <button className="shuffle _close" onClick={() =>{setValues(calories.value, numMeals.value)}}><TiArrowShuffle/></button>
                </div>                       
            </div>
            </LocalForm>
            <div>
                   {shuffled ? 
                        <div>
                            {generator(calories.value,numMeals.value)}
                            <input type="date" id="meal-plan-datetime" name="meal-plan-datetime" defaultValue={startDate}/>
                            <button className="submit-buttons" style={{width:"162px"}} onClick={() => {handleSubmit()}}>Save Meal Plan</button>
                        </div> 
                    : 
                        <div><button className="submit-buttons" onClick={()=>{displayGenerator()}} style={{width:'78%'}}>Generate Plan</button></div>
                    }
                </div>
        </>
    );
    
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

export default PlanGenerator;