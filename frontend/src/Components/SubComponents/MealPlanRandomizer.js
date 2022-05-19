import React from 'react';
import {Link, useNavigate} from 'react-router-dom'
import { Breadcrumb, Col, Button } from 'react-bootstrap'
import { Control, LocalForm, Errors } from 'react-redux-form';

export const MealPlanRandomizer = () => {
  return (
    <>
    <LocalForm id="target-nutrition">
        <div className="row">                       
            <label htmlFor="name">Target Caloric Intake</label>
            <Col md={2}> 
                <Control.text type="number" model='.name' 
                name="name" 
                className="recipe-title"
                id="name"/> 
            </Col>
            <label htmlFor="name">In How Many Meals?</label>
            <Col md={2}> 
                <Control.text type="number" model='.name' 
                name="name" 
                className="recipe-title"
                id="name"/> 
            </Col>
            <Col md={2}>
                <div>Shuffle</div>
        
            </Col>
        </div>
        {/* </div>  
            <label htmlFor="type">Meal Type</label> 
            <Control.select model=".type" name="type" id="type" className="recipe-type">
                    <option value="Breakfast" active>Breakfast</option>
                    <option value="Brunch">Brunch</option>
                    <option value="Lunch">Lunch</option>
                    <option value="Dinner">Dinner</option>
                    <option value="Snack">Snack</option>
                    <option value="Dessert">Dessert</option>
                    <option value="Drink">Drink</option>
            </Control.select>
            </Col>
            
            <div className="row">                             
                <Col md={6}>
                <div className="steps-container">
                    {renderIngredientsInput()}
                    {renderStepsInput()}
                </div>
                </Col>
                <Col md={6}>
                    <input type="file" id="img-input" 
                    accept=".jpg, .jpeg, .png, .bmp"
                    onChange={(e) => {handleChange(e)}}/>
                    <div id="preview-image-container"></div>
                </Col>
            </div>
            <Col md={12}>
            <label htmlFor="notes">Notes</label> 
                <Control.textarea model='.notes' 
                    name="notes"
                    rows="12" 
                    id="notes"
                    className="recipe-forms"/>                 
            </Col>  
            <Col md={8}>
                <Button type="submit" form="recipe-form" onClick={() => {handleSubmit()}}>Post Recipe</Button>
            </Col> */}
        </LocalForm>
    </>
  );
}
