import React, { useState, useEffect } from 'react';
import { Breadcrumb, Col, Button } from 'react-bootstrap';
import { Control, LocalForm, Errors } from 'react-redux-form';
import {Link} from 'react-router-dom';
import PlanGenerator from '../SubComponents/MealPlanGenerator';
import {Scheduler} from '../SubComponents/Scheduler/Scheduler';
import Groceries from './GroceryList';
import { MealList } from './RecipesList';


function MealPlans(props) {
  const [events, setEvents] = useState([{
    id: 0,
    planId: 0,
    title: '',
    start: '',
    end: ''
     }]); 

     useEffect(() => {
       matchData()
      }, [])
  

    function matchData() {
        const userId = props.plans.filter((plan) => plan.userId === props.user.id);
    
        props.recipes.map((recipe, index) => {
          for(let i = 0; i < userId.length; i++){
            if(recipe.id === userId[i].recipeId){
                console.log (recipe.name+" "+userId[i].start+" "+userId[i].stop)
                setEvents([...events,events.push({ id: i, planId: userId[i].planId, title: recipe.name, start: userId[i].start, end: userId[i].stop })] )
                 }console.log("EVENTS: " + JSON.stringify( events))
                }
            } 
        )}

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
                        <PlanGenerator recipes={props.recipes} nutrition={props.recipeNutrition} postPlan={props.postMealPlan} plans={props.plans} user={props.user} recipeTags={props.recipeTags}/>
                </aside>
                </div>
                <div className="col" md={6} id="plan-dash">
                    <div className="row">
                        <h5>Add Recipes to Plan</h5>
                            <MealList 
                                recipes={props.recipes}
                                nutrition={props.recipeNutrition.filter(rn => rn.recipeId != 0)} 
                                user={props.user}/>
                    </div>
                </div>
            </div>
            <div className="row">
                    <h5>Meal Plan Visualizer</h5>
                    <Scheduler plans={props.plans} user={props.user} recipes={props.recipes} events={events} edit={props.edit}/>
                    </div>
            </div>
                    {/* Visible if the user is registered. */}         
        </div>
</div>
    )
}

export default MealPlans;
