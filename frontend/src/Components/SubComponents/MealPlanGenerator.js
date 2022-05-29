import React, {useState} from 'react';
import {Link, useNavigate} from 'react-router-dom'
import { Breadcrumb, Col, Button } from 'react-bootstrap'
import { Control, LocalForm, Errors } from 'react-redux-form';
import {TiArrowShuffle} from 'react-icons/ti'
import {Tooltip} from 'react-tippy';
import 'react-tippy/dist/tippy.css';


 const PlanGenerator = (props) => {
    const [isClicked, setIsClicked] = useState(false);
    const [shuffled,setShuffled] = useState(false);
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

    function setValues(calories, numMeals) {
        setIntake({intake: calories});
        setMeals({meals: numMeals});
        generator(intake, meals);
    }

    //-------------------------------------------------------------------PLAN ID GENERATOR
    //-------------------------------------------------------------------PLAN ID GENERATOR
    //-------------------------------------------------------------------PLAN ID GENERATOR

    function getRandomInt(max)  {
        return Math.floor(Math.random() * max);
    }

    function assignId() {
        let postId = getRandomInt(50000);

        // props.plans.map((plan) => {
        //     if(plan.id === postId || postId === 0){
        //        postId = Math.random();
        //       }}
        // )

        return postId;
     }

     function handleSubmit() {
        let planId = assignId();
        assignId();
        for(let i =0; i < mealObject.length -1; i++){
            if(mealObject[0]){
                props.postPlan(props.user.id, planId, mealObject[i].id, "2022-05-28", mealObject[i].type);
                console.log(props.user.id, planId, mealObject[i].id, "2022-05-28", mealObject[i].type)
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

        const recNutrition = props.nutrition;
        const ceiling = recNutrition.filter((recipe) => recipe.calories <= calCeilPerMeal);

        const breakfast = props.recipes.filter((recipe) => recipe.type === "Breakfast");
        const dinner = props.recipes.filter((recipe) => recipe.type === "Dinner");   
        const lunch = props.recipes.filter((recipe) => recipe.type === "Lunch");

        const shuffle = arr => [...arr].sort(() => Math.random() - 0.5);
        
        function mealFilter(recipes){
            let shuffledNutrition = shuffle(ceiling);
            const fMeal = recipes.filter((recipe) => recipe.id === shuffledNutrition[0].recipeId);
            mealObject.push(fMeal[0]);

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
            
        }

        let bShuffle = mealFilter(breakfast);
        let lShuffle = mealFilter(lunch)
        let dShuffle = mealFilter(dinner);

        if(meals==1){
            return(
            <div>
                <div className="plan-block">
                    {bShuffle}
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
                    {lShuffle}
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
                </div>
                <div className="plan-block">
                    {lShuffle}
                </div>
                <div className="plan-block">
                    {dShuffle}
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
                    <button className="shuffle _close" onClick={() =>{setValues(calories.value, numMeals.value)}}><TiArrowShuffle/></button>
                </div>                       
            </div>
            </LocalForm>
            <div>
                   {shuffled ? 
                        <div>{generator(calories.value,numMeals.value)}<button className="submit-buttons" onClick={() => {handleSubmit()}}>Save Meal Plan</button></div> 
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