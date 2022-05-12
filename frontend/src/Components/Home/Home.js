import React, {Component} from 'react';
import {Link} from 'react-router-dom'

function Home(props) {
    return(
        <div className="jumbotron">
            <div className="container">
            <div>
                <h1>Me.els</h1>
            </div>
                <div className="container">
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
        </div>
    )
}

export default Home;