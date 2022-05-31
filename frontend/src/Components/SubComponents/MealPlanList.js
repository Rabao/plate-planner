import React, {useState, useEffect} from 'react';
import ReactPaginate from 'react-paginate';

export function MealList (props) {
    const numRecipes = props.recipes.length;
    const [isSelected, setIsSelected] = useState(false)
    const [recipes, setRecipes] = useState(props.recipes.slice(0, numRecipes))
    const [pageNumber, setPageNumber] = useState(0);
    const recipesPerPage = 3;
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



    function selectMeal(e){

        if(e.target.classList.contains('selected-meal')){
            e.target.classList.remove('selected-meal')
        } else {
            e.target.classList.add('selected-meal')
        }

        setIsSelected({isSelected: !isSelected});
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
        
        // setTimeout(() => {
        // setIsClicked({isClicked: !isClicked});
        // }, 300)
    }

    const displayRecipes = props.recipes.slice(pagesVisited, pagesVisited+recipesPerPage).map((recipe,index) => {
        return (
             <div className="row recipe-result" key={index+recipe.id} onClick={(e) => {selectMeal(e)}}>
                    <table role="Handle">
                        <td id="recipe-text">
                            <tr id="recipe-title"><h6><strong>{recipe.name}</strong>, {recipe.type}</h6></tr>
                            <tr id="recipe-title"><h3>Cal: {props.nutrition.filter(rn => rn.recipeId == recipe.id)[0].calories}</h3></tr>
                        </td>
                        <td id="recipe-img-td"><img src={recipe.image}/></td>
                    </table>
                </div>
        )
    })



    // function renderMealList(){
    //     const map = this.props.recipes.map((recipe, index) => {
    //         return(
               
    //                 )
    //     })
        return(
            <div>
                {displayRecipes}
                <ReactPaginate previousLabel={"Previous"} nextLabel={"Next"} pageCount={pageCount} 
                onPageChange={changePage} containerClassName={"meal-list-buttons"} previousLinkClassName={"previous-btn"} nextLinkClassName={"next-btn"} disabledClassName={"pagination-disabled"} activeClassName={"paginationActive"}/>
                <input type="date" id="meal-plan-list-datetime" name="meal-plan-list-datetime" defaultValue={startDate}/>
                <button className="submit-buttons" style={{width:"162px"}} onClick={() => {handleSubmit()}}>Save To Meal Plan</button>
            </div> )
    }
   
