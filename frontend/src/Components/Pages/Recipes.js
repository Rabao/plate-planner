import React, { Component } from 'react'
import {Link} from 'react-router-dom'
import { Breadcrumb, Button, Col } from 'react-bootstrap'
import {Modal, ModalBody, ModalHeader} from 'reactstrap'
import { Control, LocalForm, Errors } from 'react-redux-form';
import Loader from '../SubComponents/Loader/Loader';
import IngredientsData from './Ingredients';
import DailyValue from '../SubComponents/DailyValue';
import {Tooltip} from 'react-tippy';
import 'react-tippy/dist/tippy.css';

export default class Recipes extends Component {
    constructor(props){
        super(props)
    }

  render() {
            return (
                <div className='container'>
                    <Breadcrumb>
                        <Breadcrumb.Item>
                            <Link to="/home">Home</Link>  
                        </Breadcrumb.Item>
                        <Breadcrumb.Item active>
                            Recipes
                        </Breadcrumb.Item>
                    </Breadcrumb>
                    {/* {alert(this.props.user.username)} */}
                    <Recipe recipe={this.props.targetRecipe} recipeSteps={this.props.targetRecipeSteps} ingredients={this.props.targetIngredients}
                    comments={this.props.targetComments} user={this.props.user} users={this.props.users} nutrition={this.props.nutrition}
                    isLoading={this.props.recipeLoading} errMess={this.props.recipeErrMess}
                    postComment={this.props.postComment}
                    deleteComment={this.props.deleteComment}
                    editComment={this.props.editComment}/>
                 </div>  
            )
        }
      
}



const Recipe = (props) => {

    const recipeId = props.recipe.id;
    const userId = props.user.id;

    function handleSubmit(values) {
        props.postComment( recipeId, userId, values.rating, values.userComment);
        window.location.reload(false);
    }

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
            {props.recipe ? <h3>{props.recipe.name}</h3> : <h3>Null</h3>}
            <div className='component-body'>
            {props.ingredients ?<Ingredients ingredients={props.ingredients} recipe={props.recipe}/> : <div>Null</div>}
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
                        <button type='submit' color="primary">Post Comment</button>
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
        this.handleSubmit = this.handleDelete.bind(this);
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
                    <p>{console.log(comment.date)}</p>
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

function IngredientNutrition(ingredient, nutrition) {
    // console.log("Mouse has entered!" +  ingredient)
    return(
    <table>
        <tr>
            <th>Ingredient</th>
           
        </tr>
        <tr>
            <td>Serving Size</td>
  
        </tr>
        <tr>
            <td>Calories</td>
          
        </tr>
        <tr>
            <td>Calories from Fat</td>
    
        </tr>
    </table>
    )
    
}

function Ingredients(props) { 
    const recipeIngredients = props.ingredients.map((ingredient, index) => {
        let img = props.recipe.image;
        let item = '';

        if(ingredient.measurement<2){
            item = " " + ingredient.unit + " ";
        } else {
            item = " " + ingredient.unit + "s ";
        }

        return (  
                <div id="recipe-ingredients" key={index}>
                    <p className="recipe-ingredient-text">
                        <div id="ingredient-measurement"><span>{ingredient.measurement}</span></div>{item} of <Tooltip 
                            trigger="mouseenter" interactive position="bottom" html={(<div>{IngredientNutrition(ingredient.ingredientName, props.nutrition)}</div>)}><span>{ingredient.ingredientName}</span></Tooltip>
                          {/* <span>{ingredient.ingredientName}</span> */}
                    </p>
                </div>
             )
    });
    
    return (    
      
          <div className='row'>
              <div className='col' md={7}>
                   <h5>Ingredients</h5>
                   {recipeIngredients}
                   
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
  