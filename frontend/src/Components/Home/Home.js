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
                            <div className="col" md={3}>
                                <div className="card ">
                                        <div className="card-body">
                                            <Link to='/recipes'>Recipes</Link>
                                        </div>
                                    </div>
                                </div>
                            <div className="col" md={3}>
                                <div className="card">
                                    <div className="card-body">
                                    <Link to='/groceries'>Groceries</Link>
                                    </div>
                                </div>
                            </div>
                            <div className="col" md={3}>
                                <div className="card">
                                    <div className="card-body">
                                    <Link to='/mealplans'>Meal Plans</Link>
                                    </div>
                                </div>
                            </div>                         
                        </div>
                    </div>
                </div>
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
                    <RecipeCollection collection={props.collection}/>
                </div>
        </div>
    )
}

export default Home;