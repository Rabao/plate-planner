import React, {Component} from 'react';
import {Breadcrumb} from 'react-bootstrap'
import {Link} from 'react-router-dom'

function RecipesList(props) {

    // renderRecipes(){
    //     const map = props.collection.map((recipe) => {

    //             // return(
    //             //     <div className="col" md={4}>
    //             //         <div key={recipe.id} className="recipe-collection">
    //             //             <div id="recipe-collection-text"><p>{recipe.name}</p></div>
    //             //         </div>            
    //             //     </div>
    //             //     )
    //             // })
    //         // }
    //     return(map)
    // }

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
                <div className="row">
                    <div></div>
                </div>
                <div>This is the recipes page comments!</div>

                    {/* Visible if the user is registered. */}
            </div>
        </div>
    )
}

export default RecipesList;