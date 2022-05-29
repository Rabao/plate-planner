import React, {useState} from 'react';
import {Link, useNavigate} from 'react-router-dom'
import { Breadcrumb, Col, Button } from 'react-bootstrap'
import { Control, LocalForm, Errors } from 'react-redux-form';
import {TiArrowShuffle} from 'react-icons/ti'
import {Tooltip} from 'react-tippy';
import 'react-tippy/dist/tippy.css';
import { array } from 'prop-types';
import arrayShuffle from 'array-shuffle';

 const PlanGenerator = (props) => {
    const [isClicked, setIsClicked] = useState(false);
    // const [isMealSelected, setMealSelected] = useState(false);
    const [shuffled,setShuffled] = useState(false);
    const [formValues, setFormValues] = useState({
        intake: 0,
        meals: 0
    })
    const [intake, setIntake] = useState(0);
    const [meals, setMeals] = useState(0);
    let mealObject = [];

    function showShuffle() {
        document.getElementsByClassName('shuffle')[0].classList.remove('_close');
        document.getElementsByClassName('shuffle')[0].classList.add('_open');
    }

    function displayGenerator() {
        setShuffled({shuffled: !shuffled});
        showShuffle();
    }

    // function setMealClicked(mealClicked){
    //     setMealSelected({isMealSelected: mealClicked})
    // }

    function setValues(calories, numMeals) {
        setFormValues({
            intake: calories,
            meals: numMeals
        })
        // mealClicked = false;
        generator(formValues.intake, formValues.meals);
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
        let today = new Date()
        let date = today.getDate();
        let month = today.getMonth() + 1;
        let year = today.getFullYear();
        let planId = assignId();
        assignId();
        for(let i =0; i < mealObject.length; i++){
            if(mealObject[0]){
                props.postPlan(props.user.id, planId, mealObject[i].id, year +'-'+month+'-'+date, mealObject[i].type);
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

        bShuffle = mealFilter(matchedBreakfast) 
        lShuffle = mealFilter(matchedLunch)
        dShuffle = mealFilter(matchedDinner);

        return <MealPlanDisplay bShuffle={bShuffle}
            lShuffle={lShuffle}
            dShuffle={dShuffle}
            mealToAdd={null}
            />
    }

    function MealPlanDisplay(props){
        let mealType;
        let mealDisplay;
        console.log(props.mealToAdd);
        if(props.mealToAdd!=null){
            mealType = props.mealToAdd.recipe.type;
            mealDisplay = 
                <div key={props.mealToAdd.recipe.id}>
                    <Tooltip 
                        trigger="mouseenter" arrow="true" position="right" 
                        distance="10px" html={(<div id="tooltip">{RecipeNutrition(props.mealToAdd.recipe, props.nutrition)}</div>)}>
                        <table className="plan-details-wrapper">
                            <tr>
                                <td className="plan-img-wrapper"><img className="plan-img" src={props.mealToAdd.recipe.image}/></td>
                                <td className="plan-meal-name"><strong>{props.mealToAdd.recipe.name}</strong><br/><td className="plan-meal-cals"><strong>Cal:</strong> {props.mealToAdd.nutrition.calories}</td></td>
                                <td className="plan-meal-flex"></td>
                                <td className="plan-meal-type">{props.mealToAdd.recipe.type}<br/></td>
                            </tr>
                        </table></Tooltip>
                    </div>}
        if(meals==1){
            return(
            <div>
                <div className="plan-block">
                    {mealType == 'Dinner' ? mealDisplay : props.dShuffle}
                </div>
            </div>
            )
        } else if(meals==2){
            return(
            <div>
                <div className="plan-block">
                    {mealType == 'Breakfast' ? mealDisplay : props.bShuffle}
                </div>
                <div className="plan-block">
                    {mealType == 'Dinner' ? mealDisplay : props.dShuffle}
                </div>
            </div>
            )
        } else if(meals==3){
            return(
            <div>
                <div className="plan-block">
                    {mealType == 'Breakfast' ? mealDisplay : props.bShuffle}
                </div>
                <div className="plan-block">
                    {mealType == 'Lunch' ? mealDisplay : props.lShuffle}
                </div>
                <div className="plan-block">
                    {mealType == 'Dinner' ? mealDisplay : props.dShuffle}
                </div>
            </div>
            )
        } else{
            return(
            <div>
                <div className="plan-block">
                    {mealType == 'Breakfast' ? mealDisplay : props.bShuffle}
                    <hr/>
                </div>
                <div className="plan-block">
                    {mealType == 'Lunch' ? mealDisplay : props.lShuffle}
                    <hr/>
                </div>
                <div className="plan-block">
                    {mealType == 'Dinner' ? mealDisplay : props.dShuffle}
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
                        <div>{mealClicked ? <MealPlanDisplay bShuffle={bShuffle}
                        lShuffle={lShuffle}
                        dShuffle={dShuffle} mealToAdd={mealToAdd}/> : generator(calories.value,numMeals.value)}<button className="submit-buttons" onClick={() => {handleSubmit()}}>Save Meal Plan</button></div> 
                    : 
                        <div><button className="submit-buttons" onClick={()=>{displayGenerator()}} style={{width:'78%'}}>Generate Plan</button></div>
                    }
                </div>
        </>
    );
    
}

let mealClicked;
let mealToAdd;

let bShuffle;
let lShuffle;
let dShuffle;

export function SendMealToPlan(recipe,nutrition){
    mealClicked = true;
    mealToAdd={
        recipe: recipe,
        nutrition: nutrition
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

export default PlanGenerator;