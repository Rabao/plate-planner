import React, { Component } from 'react'
import {Breadcrumb} from 'react-bootstrap'
import {Link} from 'react-router-dom'
import { MealPlanRandomizer } from '../SubComponents/MealPlanRandomizer';
import Groceries from './GroceryList';
import { MealList } from './RecipesList';

function MealPlans(props) {
    return(
        <div className='container'>
        <Breadcrumb>
            <Breadcrumb.Item>
                <Link to="/home">Home</Link>  
            </Breadcrumb.Item>
            <Breadcrumb.Item active>
                Meal Plans
            </Breadcrumb.Item>
        </Breadcrumb>
        <div className="container">
            <div className='component-body'>             
                <div className="row">
                <div className="col" md={3} id="generate-plan">
                <aside>
                    <h5>Generate Plans</h5>
                    <MealPlanRandomizer/>
                </aside>
                </div>
                <div className="col" md={6} id="plan-dash">
                 <div className="row">
                    <h5>Meal Plan Visualizer</h5>
                    </div>
                    <div className="row">
                        <h5>Add Recipes to Plan</h5>
                        <MealList 
                            recipes={props.recipes}/>
                    </div>
                </div>
                <div className="col" md={3} id="grocery-list">
                <aside>
                    <h5>Generate Plans</h5>
                    {/* <Groceries groceries={props.groceries}/> */}
                </aside>
                </div>
                </div>
                </div>
                    {/* Visible if the user is registered. */}         
        </div>
</div>
    )
}

export default MealPlans;