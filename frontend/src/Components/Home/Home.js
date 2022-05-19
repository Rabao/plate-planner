import React, {Component} from 'react';
import {Link} from 'react-router-dom'
import RecipeCollection from '../SubComponents/RecipeCollection';

function Home(props) {
    return(
        <div>
            <div className="jumbotron">
                <div>
                    <h1>Plate Planner</h1>
                </div>
                    <div className="container dashboard">
                        <div className="row">
                            <div className="col" md={6}>
                                <Link to='/recipes'><button as={Link} to='/recipes' className="main-page-buttons">Recipes</button></Link>
                                </div>
                            <div className="col" md={6}>
                                <Link to='/mealplans'><button className="main-page-buttons">Meal Plans</button></Link>
                            </div>           
                            {/* <div className="col" md={3}>
                                <div className="card">
                                    <div className="card-body">
                                    <Link to='/ingredients'>Ingredients</Link>
                                    </div>
                                </div>
                            </div>                          */}
                        </div>
                    </div>
                </div>
                <div className="container">
                    <RecipeCollection collection={props.collection}/>
                </div>
        </div>
    )
}

export default Home;