import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import { Breadcrumb, Button, Col } from 'react-bootstrap';
import {Modal, ModalBody, ModalHeader} from 'reactstrap';
import { Control, LocalForm, Errors } from 'react-redux-form';
import Loader from '../SubComponents/Loader/Loader';
import IngredientsData from './Ingredients';
import DailyValue from '../SubComponents/DailyValueDisplay';
import {Tooltip} from 'react-tippy';
import 'react-tippy/dist/tippy.css';
import {RiPlayListAddFill} from 'react-icons/ri';


export default class EditRecipe extends Component {
    constructor(props) {
        super(props);
        this.state = {
            ingredientValues: [],
            stepValues: []
        };
      }


      Recipe() {
        // (console.log("RECIPE ID: "+ this.props.targetRecipe.id))
        const recipeId = this.props.targetRecipe.id;
        const userId = this.props.user.id;
        // const authorAvatar = props.users.filter((user) => user.id === props.recipe.userId)[0].avatar;
        // function handleSubmit(values) {
        //     props.postComment( recipeId, userId, values.rating, values.userComment);
        //     window.location.reload(false);
        // }
    
        // function getAuthorFromId(id) {
        //     return props.users.allUsers.filter((user) => user.id === parseInt(id,10))[0].username;
        // }
    
        // if(props.isLoading){
        // return(<div className="container">
        //         <div className="row">
        //             <Loader/>
        //         </div>
        //     </div>);     
            
        if (this.props.errMess) {
            return(<div className="container">
            <div className="row">
                <h4>{this.props.errMess}</h4>
            </div>   
        </div>);  
        
        } else { 
        return(
            <div>
                <div className="row">
                    <div className="recipe-info-name" md={9}>
                    <label htmlFor="name">Recipe Title</label><br/> 
                                            <input type="text" model='.name' 
                                            name="name" 
                                            className="recipe-title"
                                            id="name"
                                            key={`${Math.floor((Math.random() * 1000))}-min`}
                                            defaultValue={this.props.targetRecipe.name}/> 
                    {/* {props.recipe ? <h3>{props.recipe.name}</h3> : <h3>Null</h3>} */}
                    </div>
                    <div className="author-info-postedby" md={2}>
                        {/* <span>Written by:<h6>{getAuthorFromId(props.recipe.userId)}</h6></span>  */}
                    </div>
                    
                    {/* {getAuthorFromId(props.recipe.userId) ?  */}
                    
                    <div className="author-info-avatar" md={1}>
                            {/* <div className="avatar">
                                { authorAvatar ? <img src={authorAvatar}/> : <img src="/avatars/noavatar.png"/>}
                            </div> */}
                    </div>
                    
                    {/* : 
                    
                    <h6>Null</h6>} */}
                    
                </div>
                <div className='component-body'>
                {this.props.ingredients && this.props.nutrition ?<Ingredients ingredients={this.props.ingredients} recipe={this.props.targetRecipe} nutrition={this.props.nutrition} authUser={this.props.user}/> : <div>Null</div>}
                {this.RecipeSteps(this.props.targetRecipeSteps)}
                {/* {props.recipeSteps ?<RecipeSteps target={props.recipeSteps} />: <div>Null</div>} */}
                {this.props.targetRecipe ?<Notes target={this.props.targetRecipe.notes}/> : <div>Null</div>}            
                </div>
            </div>
        )
      }
    }




    RecipeSteps() {
        function resizeTextarea (id) {
            var a = document.getElementsByClassName("recipe-steps");
            a.style.height = 'auto';
            a.style.height = a.scrollHeight+'px';
          }
          
          function init() {
            var a = document.getElementsByClassName("recipe-steps");
            for(var i=0,inb=a.length;i<inb;i++) {
               if(a[i].getAttribute('data-resizable')=='true')
                resizeTextarea(a[i].id);
            }
          }
        const recipeSteps = this.props.targetRecipeSteps.map((step, i) => {
            return(
                <div>
                    <div key={i}>
                        <input type="textarea" model={".step"+i} name={"step"+i} defaultValue={step.steps} className="recipe-steps"/>
                    </div>
                </div>
                // <li key={step.step_num}>{step.steps}</li>
                )
            });
    
        return ( <div className='row' >         
                    <div>
                        <label>Steps</label> 
                        {recipeSteps} 
                    </div>
                </div>
    
        )
    }
    

  render() {
            return (
                <div className='container'>
                    <Breadcrumb>
                        <Breadcrumb.Item>
                            <Link to="/recipes">Recipes</Link>  
                        </Breadcrumb.Item>
                        <Breadcrumb.Item>
                            <Link to={"/recipes/"+ this.props.targetRecipe.id}>{this.props.targetRecipe.name}</Link>  
                        </Breadcrumb.Item>
                        <Breadcrumb.Item active>
                            <span>Currently editing: {this.props.targetRecipe.name}</span>
                        </Breadcrumb.Item>
                    </Breadcrumb>
                    {this.Recipe (this.props.targetRecipe,
                        this.props.targetRecipeSteps,
                        this.props.targetIngredients,
                        this.props.ingredients,
                        this.props.user,
                        this.props.users, 
                        this.props.nutrition,
                        this.props.recipeLoading, 
                        this.props.recipeErrMess)}
                {/* <Recipe recipe={this.props.targetRecipe}
                    recipeSteps={this.props.targetRecipeSteps}
                    ingredients={this.props.targetIngredients}
                    allIngredients={this.props.ingredients}
                    user={this.props.user}
                    users={this.props.users} 
                    nutrition={this.props.nutrition}
                    isLoading={this.props.recipeLoading} 
                    errMess={this.props.recipeErrMess}/> */}
                </div>  
            )
        }  
    }



function Ingredients(props) { 
    const getIngredientFromId = (id) => {
        return props.ingredients.filter(ingredients => ingredients.id === parseInt(id,10))[0].name;
    }

    // const recipeIngredients = 
    
    
    return (    
      
          <div className='row'>
              <div className='col' md={7}>
                   <h5>Ingredients</h5>
                   {
                       props.ingredients.map((ingredient, index) => {

                        let item = '';
                
                        if(ingredient.measurement<2){
                            item = " " + ingredient.unit + " ";
                        } else {
                            item = " " + ingredient.unit + "s ";
                        }
                
                        // console.log(props.nutrition);
                
                        return (  
                            <div id="recipe-ingredients" className='row' key={index}>
                                <div className='col' md={8}>
                                    <p className="recipe-ingredient-text">
                                        <div id="ingredient-measurement"><span>{ingredient.measurement}</span></div>{item} of <Tooltip 
                                            trigger="mouseenter" arrow="true" position="right-end" max-width={'1000px'} html={(<div id="tooltip"></div>)}><span>{getIngredientFromId(76)}</span></Tooltip>
                                    </p>
                                </div>
                            </div>
                             )
                
                         
                    })
                   }
                   
              </div>
              <div className='col' id="recipe-pg-img-container" md={5}>
                  <img id="recipe-pg-img" src={props.recipe.image}></img>      
              </div>
              <DailyValue ingredients={props.ingredients}/>
          </div>
        );
}




// function RecipeSteps(props) {

//     const recipeSteps = props.target.map((step) => {
//         return(
//             <li key={step.step_num}>{step.steps}</li>
//             )
//         });

//     return ( <div className='row' >         
//                 <div className='col' md={12}>
//                     <h5>Recipe Steps</h5>
//                     <ol id="recipe-steps-list">   
//                         {recipeSteps} 
//                     </ol>
//                 </div>
//             </div>

//     )
// }

function Notes(props) { 

    return (
        <div className='row'>
            <label htmlFor="editNotes">Notes</label>
                <Control.textarea model='.editNotes' 
                    name="editNotes"
                    rows="12" 
                    id="editNotes"
                    placeholder={props.target}/>
        </div>

        );
  }

  
// function Notes(props) { 

//     return (
//         <div className='row'>
//             <div className='col' md={12}>
//                 <h5>Notes</h5>
//                 <p>{props.target}</p>
//             </div>
//         </div>

//         );
//   }
  
  