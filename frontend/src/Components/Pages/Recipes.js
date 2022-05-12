import React, { Component } from 'react'
import {Breadcrumb} from 'react-bootstrap'
import {Link} from 'react-router-dom'
import { Form, FormGroup, Input } from 'react-bootstrap'
import { Control, LocalForm, Errors } from 'react-redux-form';

export default class Recipes extends Component {
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
        <div className='component-body'>
        <Ingredients/>
        <RecipeSteps/>
        <Notes/>
        <RenderComments/>
        </div>
      </div>
    )
  }
}

function RenderComments(){
    return (
        <> 
            <div className='row'>
                <div className='col' md={12}>
                     <h5>Comments</h5>
                     <div>This is the recipes page comments!</div>
                     {/* Visible if the user is registered. */}
                     <CommentForm/>
                </div>
            </div>
        </>
      );
}

function CommentForm() {
    return (
        <>
            <Form>
                <FormGroup>                                   
                    <div  className="col" md={12}>
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
                    </div>                                     
                </FormGroup>
                <FormGroup>
                    <div  className="col" md={12}>
                    <label htmlFor="comment">Comment</label> 
                        <Control.textarea model='.comment' 
                        id="comment" 
                        name="comment" 
                        rows="6" 
                        className="form-control"/>
                    </div>
                </FormGroup>
                <FormGroup>
                    <div  className="col" md={12}>
                        <button type='submit' color="primary">Submit</button>
                    </div>
                </FormGroup>
            </Form>
        </>
    )
}

function Ingredients() {

    
    return (
      <> 
          <div className='row'>
              <div className='col' md={7}>
                   <h5>Ingredients</h5>
                   <div>This is the recipes page!</div>
              </div>
              <div className='col' md={5}>
                  <img id="recipe-img" src='../../Assets/victoria-shes-UC0HZdUitWY-unsplash.jpg'></img>
              </div>
          </div>
      </>
    );
  }

function RecipeSteps() {

    
    return (
      <> 
          <div className='row'>
              <div className='col' md={12}>
                   <h5>Recipe Steps</h5>
                   <div>This is the recipes page!</div>
              </div>
          </div>
      </>
    );
  }
  

function Notes() {

    
    return (
      <> 
          <div className='row'>
              <div className='col' md={12}>
                   <h5>Notes</h5>
                   <div>This is the recipes page!</div>
              </div>
          </div>
      </>
    );
  }
  