import React, { useState } from 'react';
import { useDrag } from 'react-dnd'
import { ItemTypes } from '../SubComponents/utils/Items';
import {Breadcrumb} from 'react-bootstrap'
import {Link, useNavigate} from 'react-router-dom'
import { SendMealToPlan } from '../SubComponents/MealPlanGenerator';

//-------------------------------------------------------------------PLAN ID GENERATOR
//-------------------------------------------------------------------PLAN ID GENERATOR
//-------------------------------------------------------------------PLAN ID GENERATOR


export function MealList(props){
    // const [plan, setPlan] = useState([
    //     [{ id: 0, planId:(Math.random()*50000).toFixed(0), title: '', start: '', end: ''}]
    // ])
    const [events, setEvents] = useState({
        events:[{ id: 0, planId: 0, title: ''}]
    })
    const [draggedEvent, setDraggedEvent] = useState([])
    const [{ isDragging }, drag, dragPreview] = useDrag ( () => ({
        // item defined here to get a type
         type: 'Event' ,
         item:  events ,
         collect: (monitor) => ({
            isDragging: monitor.isDragging()
          }),
        }),
        [events]
    );

    const handleDragStart = (event) => {
            setDraggedEvent({ draggedEvent: event })
        }

    //   onDrag={()=> {setEvents({id: props.user.id, planId: (Math.random()*50000).toFixed(0), title: recipe.name})}}
    const map = props.recipes.map((recipe, index) => {
            return(
                <div className="row recipe-result" key={index+recipe.id} ref={dragPreview} style={{ opacity: isDragging ? 1 : 0.75}} draggable="true"
                 onDragStart={() => handleDragStart({id: props.user.id, planId: (Math.random()*50000).toFixed(0), title: recipe.name })} onDrag={()=> {setEvents({id: props.user.id, planId: (Math.random()*50000).toFixed(0), title: recipe.name})}}>
                    <table role="Handle" ref={drag}>
                        <td id="recipe-text">
                            <tr id="recipe-title"><h6><strong>{recipe.name}</strong>, {recipe.type}</h6></tr>
                            <tr id="recipe-title"><h3>Cal: {props.nutrition.filter(rn => rn.recipeId == recipe.id)[0].calories}</h3></tr>
                        </td>
                        <td id="recipe-img-td"><img src={recipe.image}/></td>
                    </table>
                </div>
                    )
            })
            return(
                <div>{map}</div>
                )
        }

// function GetCaloriesByRecipeId(props, id){
//     return 
//         props.nutrition.filter(rn => rn.recipeId == id)[0].calories;
// }

function RecipesList(props) {

    const navigate = useNavigate();
    let results = 0;

    function handleClick (e) {
       const targetId = e.id;
       const path = '/recipes/'+e.id;
       console.log(e.id)
       navigate(path);       
     }

    function resultCount() {

        const ids = props.recipes.map(o => o.id)
        const filtered = props.recipes.filter(({id}, index) => !ids.includes(id, index + 1))
        
        for(let i = 0; i < filtered.length; i++){
            results++
        }
    }

    function renderRecipes(){

        const ids = props.recipes.map(o => o.id)
        const filtered = props.recipes.filter(({id}, index) => !ids.includes(id, index + 1))

        const map = filtered.map((recipe) => {
                let img = recipe.image;
                // console.log(recipe)
                return(
                <div className="row recipe-result" key={recipe.id}  onClick={() => {handleClick(recipe)}}>
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