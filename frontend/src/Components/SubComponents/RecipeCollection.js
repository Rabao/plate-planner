import React, { Component } from 'react'
import Recipes from '../Pages/Recipes'
import {Routes, Route, Navigate, Link, useNavigate } from 'react-router-dom'


function RecipeCollection(props)  {

  const navigate = useNavigate();
 
  function handleClick (e) {
     const targetId = e.id;
     const path = '/recipes/'+e.id;
     console.log(e.id)
     navigate(path);       
   }

  const enumRecipeCollection = (props) => {
        const map = props.collection.map((recipe, index) => {

            if(recipe != null){
                return(
                    <div className="col" md={4}>
                      <div id="recipe-collection-text"><p><mark>{recipe.name}</mark></p></div>
                        <div key={index} className="recipe-collection" onClick={() => {handleClick(recipe)}}>  
                            <img src={recipe.image}/>
                        </div>            
                    </div>
                    )
                
            } else {
                return(<div><p>This is null.</p></div>)
            }
         }
        )
         return(map)
    }
    

  
    return (
      <div className="container">
                    <h3>Try Something New</h3>
                    <label htmlFor='filters'>Filters:</label>
                    <ul className="filters">
                        <li>Breakfast</li>
                        <li>Lunch</li>
                        <li>Dinner</li>
                        <li>Snack</li>
                        <li>Dessert</li>
                    </ul>
          <div className="row">
            {enumRecipeCollection(props)}
        </div>
      </div>
    )
  
}
export default RecipeCollection;