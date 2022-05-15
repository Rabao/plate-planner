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
        const map = props.collection.map((recipe) => {

            if(recipe != null){
                return(
                    <div className="col" md={4}>
                        <div key={recipe.id} className="recipe-collection" style={{cursor:'pointer'}} onClick={() => {handleClick(recipe)}}>
                            <div id="recipe-collection-text"><p>{recipe.name}</p></div>
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
          <div className="row">
            {enumRecipeCollection(props)}
        </div>
      </div>
    )
  
}
export default RecipeCollection;