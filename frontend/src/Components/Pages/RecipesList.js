import React, { useState } from 'react';
import { useDrag } from 'react-dnd'
import { ItemTypes } from '../SubComponents/utils/Items';
import {Breadcrumb} from 'react-bootstrap'
import {Link, useNavigate} from 'react-router-dom'
import { SendMealToPlan } from '../SubComponents/MealPlanGenerator';

//-------------------------------------------------------------------PLAN ID GENERATOR
//-------------------------------------------------------------------PLAN ID GENERATOR
//-------------------------------------------------------------------PLAN ID GENERATOR

function RecipesList(props) {

    const navigate = useNavigate();
    let results = 0;

    function handleClick (e) {
       const targetId = e.id;
       const path = '/recipes/'+e.id;
       console.log(e.id)
       navigate(path);       
     }

    function resultCount() {

        const ids = props.recipes.map(o => o.id)
        const filtered = props.recipes.filter(({id}, index) => !ids.includes(id, index + 1))
        
        for(let i = 0; i < filtered.length; i++){
            results++
        }
    }

    function renderRecipes(){

        const ids = props.recipes.map(o => o.id)
        const filtered = props.recipes.filter(({id}, index) => !ids.includes(id, index + 1))

        const map = filtered.map((recipe) => {
                let img = recipe.image;
                // console.log(recipe)
                return(
                <div className="row recipe-result" key={recipe.id}  onClick={() => {handleClick(recipe)}}>
                    <table>
                        <td id="recipe-text">
                            <tr id="recipe-title"><h6>{recipe.name}</h6></tr>
                            <tr id="recipe-note"><p>{recipe.notes}</p></tr>
                        </td>
                        <td id="recipe-img-td"><img src={recipe.image}/></td>
                    </table>
                </div>
                    )
                })
                return(map)
            }
    

    return(
        <div className="container">
            {resultCount()}
        <Breadcrumb>
            <Breadcrumb.Item>
                <Link to="/home">Home</Link>  
            </Breadcrumb.Item>
            <Breadcrumb.Item active>
                Recipes
            </Breadcrumb.Item>
        </Breadcrumb>
            <div className='component-body'>             
                <h5>Search returned {results} results:</h5>
                    {renderRecipes()}
                </div>
                    {/* Visible if the user is registered. */}         
        </div>
    )
}

export default RecipesList;