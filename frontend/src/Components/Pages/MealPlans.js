import React, { Component, useEffect } from 'react';
import { Breadcrumb, Col, Button } from 'react-bootstrap';
import { Control, LocalForm, Errors } from 'react-redux-form';
import {Link} from 'react-router-dom';
import PlanGenerator from '../SubComponents/MealPlanGenerator';
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
                <div className="col" md={6} id="generate-plan">
                <aside>
                    <h5>Generate Plans</h5>
                        <PlanGenerator recipes={props.recipes} nutrition={props.recipeNutrition}/>
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
                </div>
                </div>
                    {/* Visible if the user is registered. */}         
        </div>
</div>
    )
}

export default MealPlans;
