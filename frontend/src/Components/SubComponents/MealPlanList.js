import React, {useState, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import ReactPaginate from 'react-paginate';
import {CgSearch} from 'react-icons/cg';
import { Control, LocalForm } from 'react-redux-form';
import { FaBacon, FaHamburger, FaStar } from 'react-icons/fa';
import {MdBreakfastDining, MdDinnerDining, MdIcecream, MdLocalDrink, MdLunchDining} from 'react-icons/md';
import {GiChocolateBar} from 'react-icons/gi'
import {Tooltip} from 'react-tippy';

export function MealList (props) {
    const navigate = useNavigate();
    const numRecipes = props.recipes.length;
    const [isSelected, setIsSelected] = useState(false);
    const [active, setActive] = useState(false);
    const [data, setdata] = useState(props.recipes);
    const [recipes, setRecipes] = useState(props.recipes.slice(0, numRecipes))
    const [pageNumber, setPageNumber] = useState(0);
    const recipesPerPage = 4;
    const pagesVisited = pageNumber * recipesPerPage;
    let pageCount = Math.ceil(numRecipes/recipesPerPage);
    const changePage = ({selected}) => {
        setPageNumber(selected)
    };

    // const [isClicked, setIsClicked] = useState(false);
    let today = new Date()
    let date = today.getDate('YYYY');
    let month = ('0'+(today.getMonth()+1)).slice(-2)
    let year = today.getFullYear('DD');
    let startDate = year+"-"+month+"-"+date;
    let mealObject = [];

    const filterResults = (filter) => {
        const result = props.recipes.filter((recipes) => {
          return recipes.type === filter;
        });
        if(filter === "All"){
          setdata(props.recipes);
        } else {
          setdata(result);
        }
      }
    
    function setSelected(){
        setIsSelected({isSelected: !isSelected});
    }

    function selectMeal(e, recipe){
        let docs = document.getElementsByClassName('plan-details-wrapper-list')
        for(let i =0; i < docs.length; i++){
            docs[i].classList.remove("selected-meal");
        }

        if(!e.target.classList.contains('selected-meal')){
            e.target.classList.add('selected-meal')         
            if(mealObject.length != 0){
                mealObject.shift();
            }
            mealObject.push(recipe)
           
        } else {
            e.target.classList.remove('selected-meal')
        }
        console.log(mealObject)
        setIsSelected({isSelected: !isSelected});
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
        let date = document.getElementById('meal-plan-list-datetime');
        let start = '';
        let end = '';

       
        for(let i =0; i < mealObject.length; i++){

            if(mealObject[i].type === "Breakfast"){
               start = date.value+"T06:00:00-05:00";
               end = date.value+"T09:00:00-05:00";
            } else if(mealObject[i].type === "Lunch"){
                start = date.value+"T12:00:00-05:00";
                end = date.value+"T13:00:00-05:00";
            } else if(mealObject[i].type === "Dinner"){
                start = date.value+"T18:00:00-05:00";
                end = date.value+"T19:00:00-05:00";
            }
            if(mealObject[0]){
                props.postPlan(props.user.id, planId, mealObject[i].id, start, end);
                console.log(props.user.id+" "+planId+" "+mealObject[i].id+" "+start+" "+end)
             }
            }     
        
    }

    const displayRecipes = data.slice(pagesVisited, pagesVisited+recipesPerPage).map((recipe,index) => {
       const nutrition = (props.nutrition.filter(rn => rn.recipeId === recipe.id));

        return (
            <Tooltip 
            trigger="mouseenter" arrow="true" position="right" 
            distance="10px" html={(<div id="tooltip">{RecipeNutrition(recipe, nutrition[0])}</div>)}>
            <table className={ isSelected ? 'row plan-details-wrapper-list t'+index+'selected-meal' : 'row plan-details-wrapper-list t'+index} key={index+recipe.id} onClick={(e) => {selectMeal(e, recipe)}}>
                <tr>
                    <td className="plan-img-wrapper-list"><img className="plan-img" src={recipe.image}/></td>
                    <td className="plan-meal-name"><strong>{recipe.name}</strong><br/><td className="plan-meal-cals"><strong>Cal:</strong> {nutrition[0].calories}</td></td>
                    <td className="plan-meal-flex"></td>
                    <td className="plan-meal-type">{recipe.type}<br/></td>
                </tr>
            </table>
        </Tooltip>
       

        )
    })

        
        return(
            <div>
                <div className="col search-wrapper" style={{width:"100%"}}>
                <label htmlFor='filters'>Filters:</label>
                    <ul className="filters">
                        <li onClick={() => {filterResults('All')}}><FaStar/>All</li>
                        <li onClick={() => {filterResults('Breakfast')}}><MdBreakfastDining/>Breakfast</li>
                        <li onClick={() => {filterResults('Lunch')}}><MdLunchDining/>Lunch</li>
                        <li onClick={() => {filterResults('Dinner')}}><MdDinnerDining/>Dinner</li>
                        <li onClick={() => {filterResults('Snack')}}><GiChocolateBar/>Snack</li>
                        <li onClick={() => {filterResults('Dessert')}}><MdIcecream/>Dessert</li>
                        <li onClick={() => {filterResults('Drinks')}}><MdLocalDrink/>Drinks</li>
                    </ul>
                    </div>
                {displayRecipes}
                <ReactPaginate previousLabel='&#11164;' nextLabel='&#11166;' pageCount={pageCount} 
                onPageChange={changePage} containerClassName={"meal-list-buttons"} previousLinkClassName={"previous-btn"} 
                nextLinkClassName={"next-btn"} disabledClassName={"pagination-disabled"} activeClassName={"paginationActive"} pageLinkClassName={"pagination-links"}/><br/>
                <input type="date" id="meal-plan-list-datetime" name="meal-plan-list-datetime" defaultValue={startDate}/>
                <button className="submit-buttons" style={{width:"100%"}} onClick={() => {handleSubmit()}}>Save To Meal Plan</button>
            </div> )
    }
   
