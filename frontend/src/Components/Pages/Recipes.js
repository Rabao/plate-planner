import React, { Component } from 'react'
import { createStore, combineReducers, applyMiddleware } from 'redux';
import {Link} from 'react-router-dom'
import { Breadcrumb, Button, Col } from 'react-bootstrap'
import {Modal, ModalBody, ModalHeader} from 'reactstrap'
import { Control, LocalForm, Errors } from 'react-redux-form';
import Loader from '../SubComponents/Loader/Loader';
import { deleteComment } from '../../Redux/actionCreators';


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
                    comments={this.props.targetComments} user={this.props.user} users={this.props.users}
                    isLoading={this.props.recipeLoading} errMess={this.props.recipeErrMess}
                    postComment={this.props.postComment}
                    deleteComment={this.props.deleteComment}/>
                 </div>  
            )
        }
      
}



const Recipe = (props) => {

    const recipeId = props.recipe.id;
    const userId = props.user.id;

    function handleSubmit(values) {
        props.postComment( recipeId, userId, values.rating, values.userComment);
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
            deleteComment={props.deleteComment}/> : <div>Null</div>}
            
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
                        className="form-control"/>
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
            isModalOpen: false
        };
        this.toggleModal = this.toggleModal.bind(this);
        this.handleSubmit = this.handleDelete.bind(this);
    }

    toggleModal(){
        this.setState({
            isModalOpen: !this.state.isModalOpen
        });
    }

    handleDelete(id){
        this.toggleModal();
        this.props.deleteComment(id);
    }

    render(){
        return(
            <>
                <div className="row">
                    <Col md={6}>
                        <Button className="interface_buttons" >&#9997;</Button>
                        <Button className="interface_buttons" onClick={this.toggleModal}>&#10060;</Button>
                    </Col>
                    <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
                        <ModalHeader toggle={this.toggleModal}>Delete Comment?</ModalHeader>
                        <ModalBody>
                            <LocalForm onSubmit={() => this.handleDelete(this.props.comment.id)}>
                                {this.props.comment.comment}<br></br>
                                <Button type='submit' variant='danger'>&#10060;Delete</Button>
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

function RenderComments(props){
    
   
    const recipeComments = props.target.map((comment) => {
        //User Filter 
            const userObj = props.users.allUsers.filter((user) => user.id === comment.userId);

        return (  
        <div id="user-comment" key={comment.id}>
                    <p className="username">{userObj[0].username}</p>
                    <p className="comment-text">{comment.comment}</p>
                    <p className="stars">{showStars(comment.rating)}</p>
                    <div>{comment.date}</div>
                    {props.authUser.id === comment.userId ? <EditDeleteComment 
                    deleteComment={props.deleteComment} comment={comment}/> : <div></div>}
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

function Ingredients(props) { 
    const recipeIngredients = props.ingredients.map((ingredient, index) => {

        let item = ''

        if(ingredient.unit>1){
            item = " " + ingredient.unit + " " + ingredient.ingredientName;
        } else {
            item = " " + ingredient.unit + "s " + ingredient.ingredientName;
        }

        return (  
                <div id="recipe-ingredients" key={index}>
                    <p className="recipe-ingredient-text">
                        <span id="ingredient-measurement">{ingredient.measurement}</span>
                        {item}
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
                    <ol>   
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
  