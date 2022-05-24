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


export default class Recipes extends Component {
    constructor(props){
        super(props)
    }

  render() {
            return (
                <div className='container'>
                    <Breadcrumb>
                        <Breadcrumb.Item>
                            <Link to="/recipes">Recipes</Link>  
                        </Breadcrumb.Item>
                        <Breadcrumb.Item active>
                            {this.props.targetRecipe.name}
                        </Breadcrumb.Item>
                    </Breadcrumb>
                    <Recipe recipe={this.props.targetRecipe}
                    recipeSteps={this.props.targetRecipeSteps}
                    ingredients={this.props.targetIngredients}
                    allIngredients={this.props.ingredients}
                    comments={this.props.targetComments} user={this.props.user}
                    users={this.props.users} nutrition={this.props.nutrition}
                    isLoading={this.props.recipeLoading} errMess={this.props.recipeErrMess}
                    postComment={this.props.postComment}
                    deleteComment={this.props.deleteComment}
                    editComment={this.props.editComment}
                    postGroceries={this.props.postGroceries}/>
                 </div>  
            )
        }
      
}



const Recipe = (props) => {

    const recipeId = props.recipe.id;
    const userId = props.user.id;
    // const authorAvatar = props.users.allUsers.filter((user) => user.id === props.recipe.userId)[0].avatar;
    function handleSubmit(values) {
        props.postComment( recipeId, userId, values.rating, values.userComment);
        window.location.reload(false);
    }

    // function getAuthorFromId(id) {
    //     return props.users.allUsers.filter((user) => user.id === parseInt(id,10))[0].username;
    // }

    // if(props.isLoading){
    // return(<div className="container">
    //         <div className="row">
    //             <Loader/>
    //         </div>
    //     </div>);     
        
    if (props.errMess) {
        return(<div className="container">
        <div className="row">
            <h4>{props.errMess}</h4>
        </div>   
    </div>);  
    
    } else { 
    return(
        <div>
            {/* {console.log("AVATAR: "+JSON.stringify(props.users.allUsers.filter((user) => user.id === 1)))}
            <div className="row">
                {console.log(props.recipe)}
                {props.recipe ? 
                <div className="recipe-info-name" md={9}>
                    <h3>{props.recipe.name}</h3>  
                    <div id="manage-recipe-buttons" md={6}>
                        <Link to={"/edit/recipes/"+props.recipe.id}><button type="button" className="dashboard-interface-button" >&#9997; EDIT</button></Link>
                    </div>
                 </div>
                :
                <div className="recipe-info-name" md={9}>     
                    <h3>Null</h3>
                </div>
                }
                <div className="author-info-postedby" md={2}>
                    <span>Written by:<h6>{getAuthorFromId(props.recipe.userId)}</h6></span> 
                </div>
                
                {getAuthorFromId(props.recipe.userId) ? 
                
                <div className="author-info-avatar" md={1}>
                        <div className="avatar">
                            { authorAvatar ? <img src={authorAvatar}/> : <img src="/avatars/noavatar.png"/>}
                        </div>
                </div>
                
                : 
                
                <h6>Null</h6>}
                
            </div> */}
            <div className='component-body'>
            {props.ingredients && props.nutrition ?<Ingredients ingredients={props.ingredients} allIngredients={props.allIngredients} recipe={props.recipe} nutrition={props.nutrition} postGroceries={props.postGroceries} authUser={props.user}/> : <div>Null</div>}
            {props.recipeSteps ?<RecipeSteps target={props.recipeSteps} />: <div>Null</div>}
            {props.recipe ?<Notes target={props.recipe.notes} /> : <div>Null</div>}
            {props.comments ? <RenderComments target={props.comments} authUser={props.user} users={props.users}
            deleteComment={props.deleteComment} editComment={props.editComment}/> : <div>Null</div>}
            
            <LocalForm onSubmit={(values) => handleSubmit(values)}>                        
                    <Col md={12}>
                    <label htmlFor="rating">Rating</label> 
                        <Control.select model='.rating' 
                        name="rating" 
                        className="form-control"
                        defaultValue={1}> 
                            <option>1</option>
                            <option>2</option>
                            <option>3</option>
                            <option>4</option>
                            <option>5</option>
                        </Control.select>
                    </Col>                                     
                    <Col md={12}>
                    <label htmlFor="userComment">Comment</label> 
                        <Control.textarea model='.userComment' 
                        name="userComment" 
                        rows="6" 
                        className="form-control"
                        />
                    </Col>
                    <Col md={12}>
                        <button type='submit' className="submit-buttons">Post Comment</button>
                    </Col>
            </LocalForm>
            </div>
        </div>
    )
  }
}

class EditDeleteComment extends Component{

    constructor(props){
        super(props);
        this.state = {
            isModalOpen: false,
            activeModal: ''
        };
        this.toggleModal = this.toggleModal.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
        this.handleEdit = this.handleEdit.bind(this);
    }

    toggleModal(activeModal){
        this.setState({
            activeModal: activeModal,
            isModalOpen: !this.state.isModalOpen
        });
    }

    handleDelete(id){
        this.toggleModal();
        this.props.deleteComment(id);
        window.location.reload(false);
    }

    handleEdit(id, values){
        this.toggleModal();
        this.props.editComment(id, values.rating, values.userComment);
        window.location.reload(false);
    }

    render(){
        return(
            <>
                <div className="row">
                    <div className="col" md={6}>
                        <button className="interface-button" onClick={() => this.toggleModal('edit')}>&#9997; EDIT</button>
                        <button className="interface-button" onClick={() => this.toggleModal('delete')}>&#10060; DELETE</button>
                    </div>
                    {/* this.state.isModalOpen */}
                    <Modal isOpen={this.state.activeModal === 'delete'} toggle={this.toggleModal}> 
                        <ModalHeader toggle={this.toggleModal}>Delete Comment?</ModalHeader>
                        <ModalBody>
                            <LocalForm onSubmit={() => this.handleDelete(this.props.comment.id)}>
                                {this.props.comment.comment}<br></br>
                                <Button type='submit' variant='danger'>&#10060;Delete</Button>
                            </LocalForm>
                        </ModalBody>
                    </Modal>
                    <Modal isOpen={this.state.activeModal === 'edit'} toggle={this.toggleModal}> 
                        <ModalHeader toggle={this.toggleModal}>Edit Comment?</ModalHeader>
                        <ModalBody>
                            <LocalForm onSubmit={(values) =>
                                                this.handleEdit(this.props.comment.id, values)}>                        
                                <Col md={12}>
                                <label htmlFor="rating">Rating</label> 
                                    <Control.select model='.rating' 
                                    name="rating" 
                                    className="form-control"
                                    defaultValue={this.props.comment.rating}> 
                                        <option>1</option>
                                        <option>2</option>
                                        <option>3</option>
                                        <option>4</option>
                                        <option>5</option>
                                    </Control.select>
                                </Col>                                     
                                <Col md={12}>
                                <label htmlFor="userComment">Comment</label> 
                                    <Control.textarea model='.userComment' 
                                    name="userComment" 
                                    rows="6" 
                                    className="form-control"
                                    id="userComment"
                                    defaultValue={this.props.comment.comment}/>
                                </Col>
                                <Col md={12}>
                                    <Button type='submit' variant='primary'>&#9997;Edit</Button>
                                </Col>
                        </LocalForm>
                        </ModalBody>
                    </Modal>
                </div>
            </>
        )
    }
}

function showStars(rating){
    switch (rating){
        case 1:
            return (
                <div>
                    <img src='/star-vector-png-transparent-image-pngpix-21.png' style={{width:20}}></img>
                    <img src='/white-star-icon-19.png' style={{width:20}}></img>
                    <img src='/white-star-icon-19.png' style={{width:20}}></img>
                    <img src='/white-star-icon-19.png' style={{width:20}}></img>
                    <img src='/white-star-icon-19.png' style={{width:20}}></img>
                </div>
            );
        case 2:
            return (
                <div>
                    <img src='/star-vector-png-transparent-image-pngpix-21.png' style={{width:20}}></img>
                    <img src='/star-vector-png-transparent-image-pngpix-21.png' style={{width:20}}></img>
                    <img src='/white-star-icon-19.png' style={{width:20}}></img>
                    <img src='/white-star-icon-19.png' style={{width:20}}></img>
                    <img src='/white-star-icon-19.png' style={{width:20}}></img>
                </div>
            );
        case 3:
            return (
                <div>
                    <img src='/star-vector-png-transparent-image-pngpix-21.png' style={{width:20}}></img>
                    <img src='/star-vector-png-transparent-image-pngpix-21.png' style={{width:20}}></img>
                    <img src='/star-vector-png-transparent-image-pngpix-21.png' style={{width:20}}></img>
                    <img src='/white-star-icon-19.png' style={{width:20}}></img>
                    <img src='/white-star-icon-19.png' style={{width:20}}></img>
                </div>
            );
        case 4:
            return (
                <div>
                    <img src='/star-vector-png-transparent-image-pngpix-21.png' style={{width:20}}></img>
                    <img src='/star-vector-png-transparent-image-pngpix-21.png' style={{width:20}}></img>
                    <img src='/star-vector-png-transparent-image-pngpix-21.png' style={{width:20}}></img>
                    <img src='/star-vector-png-transparent-image-pngpix-21.png' style={{width:20}}></img>
                    <img src='/white-star-icon-19.png' style={{width:20}}></img>
                </div>
            );
        case 5:
            return (
                <div>
                    <img src='/star-vector-png-transparent-image-pngpix-21.png' style={{width:20}}></img>
                    <img src='/star-vector-png-transparent-image-pngpix-21.png' style={{width:20}}></img>
                    <img src='/star-vector-png-transparent-image-pngpix-21.png' style={{width:20}}></img>
                    <img src='/star-vector-png-transparent-image-pngpix-21.png' style={{width:20}}></img>
                    <img src='/star-vector-png-transparent-image-pngpix-21.png' style={{width:20}}></img>
                </div>
            );
        default:
            return(<div></div>);
    }
}

function compare( a, b ) {
    if ( a.id < b.id ){
      return -1;
    }
    if ( a.id > b.id ){
      return 1;
    }
    return 0;
  }

function RenderComments(props){
    
   props.target.sort(compare);
    const recipeComments = props.target.map((comment) => {
        //User Filter 
            const userObj = props.users.allUsers.filter((user) => user.id === comment.userId);
        return (  
        <div id="user-comment" key={comment.id}>
            <div className="row"><p className="username">{userObj[0].username}<span className="stars">{showStars(comment.rating)}</span></p></div>
                    <hr/>
                    <p className="comment-text">{comment.comment}</p> 
                    {props.authUser.id === comment.userId ? <EditDeleteComment 
                    deleteComment={props.deleteComment} editComment={props.editComment}
                    comment={comment}/> : <div></div>}
                </div>
             )
    });
    
    return (             
        <div className='row'>
            <div className='col' md={12}>
                <h5>Comments</h5>
                {recipeComments}
            </div>
        </div>
        
    )
}

 function IngredientNutrition(ingredient, nutrition)  {
    //    const nutrition = this.state.targNute;
    // console.log("NUT" + nutrition.serving_size)
   let tNutrition= nutrition.filter(nute => nute.id === ingredient.ingredientId)[0];
//    let targ = JSON.parse(targetNutrition);
    
//    console.log("TARGETED: " + JSON.stringify(tNutrition))
    return(
        <div>

        { tNutrition.id === ingredient.ingredientId ?
            <table>
                <tr>
                    <th>Ingredient</th>
                    <th>{ingredient.ingredient_name}</th>
                </tr>
                <tr>
                    <td>Serving Size</td>
                    <td>{tNutrition.servingSize}</td> 
                </tr>
                <tr>
                    <td>Calories</td>
                    <td>{tNutrition.calories}</td>
                </tr>
                <tr>
                    <td>Calories from Fat</td>
                    <td>{tNutrition.caloriesFat}</td>
                </tr>
                <tr>
                    <td>Total Fat</td>
                    <td>{tNutrition.totalFat}g</td>
                </tr>
                <tr>
                    <td>Saturated Fat</td>
                    <td>{tNutrition.saturatedFat}g</td>
                </tr>
                <tr>
                    <td>Trans Fat</td>
                    <td>{tNutrition.transFat}g</td>
                </tr>
                <tr>
                    <td>Cholesterol</td>
                    <td>{tNutrition.cholesterol}mg</td>
                </tr>
                <tr>
                    <td>Sodium</td>
                    <td>{tNutrition.sodium}mg</td>
                </tr>
                <tr>
                    <td>Potassium</td>
                    <td>{tNutrition.potassium}mg</td>
                </tr>
                <tr>
                    <td>Total Carbohydrates</td>
                    <td>{tNutrition.totalCarbs}g</td>
                </tr>
                <tr>
                    <td>Dietary Fiber</td>
                    <td>{tNutrition.dietaryFiber}g</td>
                </tr>
                <tr>
                    <td>Sugar</td>
                    <td>{tNutrition.sugar}g</td>
                </tr>
                <tr>
                    <td>Sugar Alcohol</td>
                    <td>{tNutrition.sugarAlcohol}g</td>
                </tr>
                <tr>
                    <td>Protein</td>
                    <td>{tNutrition.protein}g</td>
                </tr>
                <tr>
                    <td>Vitamin C</td>
                    <td>{tNutrition.vitC}%</td>
                </tr>
                <tr>
                    <td>Calcium</td>
                    <td>{tNutrition.calcium}%</td>
                </tr>
                <tr>
                    <td>Iron</td>
                    <td>{tNutrition.iron}%</td>
                </tr>
                <tr>
                    <td>Vitamin D</td>
                    <td>{tNutrition.vitD}%</td>
                </tr>
                <tr>
                    <td>Vitamin B6</td>
                    <td>{tNutrition.vitB6}%</td>
                </tr>
                <tr>
                    <td>Magnesium</td>
                    <td>{tNutrition.magnesium}%</td>
                </tr> 
            </table>
        
        : 
        
        <div> Nutrition data not found. </div>}
    </div>
    )
    
}
    
function checkList(e) {
    if(e.target.classList.contains('complete')){
        e.target.classList.remove('complete')
    } else {
        e.target.classList.add('complete')
    }  
}

function toggleButtonColor(e){
    e.target.innerHTML = '&#x2714 Item Added';
    e.target.classList.remove('submit-button-small')
    e.target.classList.add('submitted-button-small')
}

function Ingredients(props) { 

    const handleAddToList = (e, name) => {
        toggleButtonColor(e)
        props.postGroceries(name, 1, props.authUser.id)
    }
    

    const getIngredientFromId = (id) => {
        return props.allIngredients.filter(ingredients => ingredients.id === parseInt(id,10))[0].name;
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
                                        <div id="ingredient-measurement" className="" onClick={(e) => checkList(e)}><span>{ingredient.measurement}</span></div>{item} of <Tooltip 
                                            trigger="mouseenter" arrow="true" position="right-end" max-width={'1000px'} html={(<div id="tooltip">{IngredientNutrition(ingredient, props.nutrition)}</div>)}><span>{getIngredientFromId(ingredient.ingredientId)}</span></Tooltip>
                                    </p>
                                </div>
                                <div className='col' md={4}>
                                    <button type='submit' class="submit-button-small" onClick={(e) => handleAddToList(e, getIngredientFromId(ingredient.ingredientId))}><RiPlayListAddFill/> Add to Grocery List</button>
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




function RecipeSteps(props) {

    const recipeSteps = props.target.map((step) => {
        return(
            <li key={step.step_num}>{step.steps}</li>
            )
        });

    return ( <div className='row' >         
                <div className='col' md={12}>
                    <h5>Recipe Steps</h5>
                    <ol id="recipe-steps-list">   
                        {recipeSteps} 
                    </ol>
                </div>
            </div>

    )
}

function Notes(props) { 

    return (
        <div className='row'>
            <div className='col' md={12}>
                <h5>Notes</h5>
                <p>{props.target}</p>
            </div>
        </div>

        );
  }
  