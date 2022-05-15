import React, {Component} from 'react';
import {useParams} from 'react-router-dom'
import {Breadcrumb} from 'react-bootstrap'
import {Link} from 'react-router-dom'
import Recipes from '../Pages/Recipes'

function RecipesList(props) {
    let results = 0;

    function resultCount() {
        for(let i = 0; i < props.recipes.length; i++){
            results++
        }
    }

    function renderRecipes(){
        const map = props.recipes.map((recipe) => {
                console.log(recipe)
                return(
                <div className="row recipe-result" key={recipe.id}>
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