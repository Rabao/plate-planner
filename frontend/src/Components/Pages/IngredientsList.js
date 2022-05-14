import React, {Component} from 'react';
import {Breadcrumb} from 'react-bootstrap'
import {Link} from 'react-router-dom'
import IngredientsCollection from '../SubComponents/IngredientsCollection';

function IngredientsList(props) {

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
                Ingredients
            </Breadcrumb.Item>
        </Breadcrumb>
            <div className='component-body'>
                <h5>Ingredients</h5>
                <div className="row">
                    <div></div>
                </div>
                <div>This is the ingredients page!</div>
                <IngredientsCollection collection={props.collection}/>
            </div>
        </div>
    )
}

export default IngredientsList;