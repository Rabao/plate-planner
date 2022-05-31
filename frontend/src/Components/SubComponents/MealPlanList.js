import React, {useState, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import ReactPaginate from 'react-paginate';
import {CgSearch} from 'react-icons/cg';
import { Control, LocalForm } from 'react-redux-form';

export function MealList (props) {
    const navigate = useNavigate();
    const numRecipes = props.recipes.length;
    const [isSelected, setIsSelected] = useState(false)
    const [recipes, setRecipes] = useState(props.recipes.slice(0, numRecipes))
    const [pageNumber, setPageNumber] = useState(0);
    const recipesPerPage = 5;
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

    function submitSearch(values){
        console.log(values.searchbar);
        props.searchRecipe(values.searchbar);
        const path = '/recipes/search/'+values.searchbar;
        navigate(path);       
    }


    function selectMeal(e, recipe){

        if(e.target.classList.contains('selected-meal')){
            e.target.classList.remove('selected-meal')
        } else {
            e.target.classList.add('selected-meal')

            if(!e.target){
                window.classList.remove('selected-meal')
            }
            
            if(mealObject.length != 0){
                mealObject.shift();
            }
            mealObject.push(recipe)
        }
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
        
        setTimeout(() => {
            setIsSelected({isSelected: !isSelected});
        }, 300)
    }

    const displayRecipes = props.recipes.slice(pagesVisited, pagesVisited+recipesPerPage).map((recipe,index) => {

        return (
             <div className={ isSelected ? 'row recipe-result-sm '+index+' selected-meal' : 'row recipe-result-sm '+index+' deselected-meal'} key={index+recipe.id} onClick={(e) => {selectMeal(e, recipe)}}>
                    <div><h6><strong>{recipe.name}</strong>, {recipe.type}</h6></div>
                        <div><h3>Cal: {props.nutrition.filter(rn => rn.recipeId == recipe.id)[0].calories}</h3></div>
                    <div id="recipe-img-td-sm"><img src={recipe.image}/></div>
                </div>
        )
    })

        
        return(
            <div>
                <div className="col search-wrapper" style={{width:"100%"}}>
                    <LocalForm onSubmit={(values)=>submitSearch(values)}>
                            <Control.text model='.searchbar' 
                            name="searchbar" 
                            className="form-control"
                            id="searchbar-meals"/>
                            {/* <input type="text" name="searchbar" id="searchbar"></input> */}
                            <button id="search-button-meals" type='submit'><CgSearch /></button>
                        </LocalForm>
                    </div>
                {displayRecipes}
                <ReactPaginate previousLabel={"Previous"} nextLabel={"Next"} pageCount={pageCount} 
                onPageChange={changePage} containerClassName={"meal-list-buttons"} previousLinkClassName={"previous-btn"} nextLinkClassName={"next-btn"} disabledClassName={"pagination-disabled"} activeClassName={"paginationActive"}/>
                <input type="date" id="meal-plan-list-datetime" name="meal-plan-list-datetime" defaultValue={startDate}/>
                <button className="submit-buttons" style={{width:"100%"}} onClick={() => {handleSubmit()}}>Save To Meal Plan</button>
            </div> )
    }
   
