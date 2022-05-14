import React, {Component} from 'react';
import {Breadcrumb} from 'react-bootstrap'
import {Link} from 'react-router-dom'

function RecipesList(props) {

    function renderRecipes(){
        const map = props.recipes.map((recipe) => {
                console.log(recipe)
                return(
                    <div className="row recipe-result" key={recipe.id}>
                    <div className="col" id="recipe-text" xs={6} md={8} xl={10}>
                        <div className="row" id="recipe-title"><h6>{recipe.name}</h6></div>
                        <div className="row" id="recipe-note"><p>{recipe.notes}</p></div>
                    </div>
                    <div className="col recipe-img" xs={6} md={4} xl={10}>
                        <img alt="recipe" src={recipe.img}/>
                    </div>
                </div>
                    )
                })
                return(map)
            }
    

    return(
        <div className="container">
        <Breadcrumb>
            <Breadcrumb.Item>
                <Link to="/home">Home</Link>  
            </Breadcrumb.Item>
            <Breadcrumb.Item active>
                Recipes
            </Breadcrumb.Item>
        </Breadcrumb>
            <div className='component-body'>
                <h5>Recipes</h5>
                    {renderRecipes()}
                </div>
                    {/* Visible if the user is registered. */}         
        </div>
    )
}

export default RecipesList;