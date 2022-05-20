import React, {useState} from 'react'
import {Link, useNavigate} from 'react-router-dom'
import { Breadcrumb, Col, Button } from 'react-bootstrap'
import { Control, LocalForm, Errors } from 'react-redux-form';
import Loader from '../SubComponents/Loader/Loader';
import axios from 'axios';
import DailyValueCalculator from '../SubComponents/DailyValueCalculator';

function AddRecipe(props) {
    const navigate = useNavigate();
    let pageRedirect= false;  
    let filePath= "";

    let numSteps = 0;
    let stepsHtmlIdent = "steps" + numSteps;
    let stepsMode = ".steps" + numSteps;

    let numIngredients = 0;
    let qtyHtmlIdent = "qty" + numIngredients;
    let qtyMode = ".qty" + numIngredients;
    let unitHtmlIdent = "unit" + numIngredients;
    let unitMode = ".unit" + numIngredients;
    let nameHtmlIdent = "name" + numIngredients;
    let nameMode = ".name" + numIngredients;

    const [selectedFile, setSelectedFile] = useState();
    const [toggle, setToggle] = useState(false);

    const dvCalc = document.getElementsByClassName('toggle-dvcalc')[0];

    function onDrop(file){
        if (file.length > 0) {
            setSelectedFile(file);
          }
    }

    function handleChange(event) {
        setSelectedFile(document.getElementById('img-input').files[0]); 
    }

    function handleToggle(e) {

        if(dvCalc.classList.contains('close')){
            dvCalc.classList.remove('close');
            dvCalc.classList.add('open');
        } else {
            dvCalc.classList.remove('open');
            dvCalc.classList.add('close');
        }

        setToggle({ toggle: !this.state.toggle })

    }

    //-------------------------------------------------------------------RECIPE ID GENERATOR
    //-------------------------------------------------------------------RECIPE ID GENERATOR
    //-------------------------------------------------------------------RECIPE ID GENERATOR

    function getRandomInt(max) {
        return Math.floor(Math.random() * max);
      }

     function assignId() {
        let postId = getRandomInt(50000);

        props.recipes.map((recipe) => {
            if(recipe.id === postId || postId === 0){
               postId = Math.random();
              }}
        )

        return postId;
     }

    //-------------------------------------------------------------------------HANDLE SUBMIT
    //-------------------------------------------------------------------------HANDLE SUBMIT
    //-------------------------------------------------------------------------HANDLE SUBMIT
    
     function handleSubmit() {
        //-------------------------------------------------------------------------VARIABLES
        
        let stepNum = 1;
        let id = assignId();
        assignId();
        const path = '/recipes/';

        //---------------------------------------------------------------------DOM ACCESSORS
        const name = document.getElementById('name');
        const type = document.getElementsByClassName('recipe-type');
        const notes = document.getElementById('notes');
        const qty = document.getElementsByClassName('qty'); //Measurement quantity (fills measurement parameter in postIngredients)
        const unit = document.getElementsByClassName('unit-measure');
        const steps = document.getElementsByClassName('recipe-steps');
        const ingredients = document.getElementsByClassName('recipe-ingredients');
        
        //------------------------------------------------------------------IMAGE READER

        const formData = new FormData();

        console.log(selectedFile)

        let data = new FormData()
        data.append('file', selectedFile)
        filePath = '/recipes-images/' + selectedFile.name;
        
        console.log(filePath)
        
        fetch(' http://localhost:8080/upload', {
          method: 'POST',
          body: data
        })
        
        // ------------------------------------------------------------------SUBMISSION LOGIC
   
        props.postRecipe(id,name.value,stepNum,filePath,notes.value,props.authUser.id,type[0].value);

        for(let i=0; i< steps.length; i++){     
            props.postSteps(id,stepNum,steps[i].value)
            stepNum++;             
        }

        for(let i=0; i< ingredients.length; i++){
            props.postIngredients(id,1,ingredients[i].value,qty[i].value,unit[i].value)
        }

        setTimeout(() => {
        pageRedirect= true;
        if(pageRedirect === true){
            navigate(path); 
        }}, 500)
    }

    
    //-------------------------------------------------------REACTIONARY RECIPE STEPS INPUTS
    //-------------------------------------------------------REACTIONARY RECIPE STEPS INPUTS
    //-------------------------------------------------------REACTIONARY RECIPE STEPS INPUTS
    const renderStepsInput = () => {
        const addStep = () => {         
            numSteps++;
            stepsHtmlIdent = "steps" + numSteps;
            stepsMode = ".steps" + numSteps;
            stepText = <div className="form-inline" id="steps" key={stepArr.length}>
                        <Control.text model={stepsMode} name={stepsHtmlIdent}  className="recipe-steps"/><button class="submit-button-small" onClick={() => {removeStep()}}>Remove</button>
                        </div>

            stepArr.push(stepText);
        }

        const removeStep = () => {
            numSteps--;
            stepsHtmlIdent = "steps" + numSteps;
            stepsMode = ".steps" + numSteps;
            stepArr.pop(stepText);
        }
        
        const removeAll = () => {
            while(stepArr.length > 0){
                stepArr.pop(stepText)
            }
            numSteps=0;
            stepsHtmlIdent = "";
            stepsMode = "";
        }

        let stepArr =[]
        let stepText = <div></div>
        
        return(
            <div>
                <label htmlFor="steps">Steps</label> 
                {stepArr}
                <div className="submit-button-interface col"><button class="submit-buttons" onClick={() => {addStep()}}>Add New Step</button><button class="submit-buttons" onClick={() => {removeAll()}}>Remove All</button></div>     
            </div>
        )

    }
    //-------------------------------------------------------REACTIONARY RECIPE INGREDIENT INPUTS
    //-------------------------------------------------------REACTIONARY RECIPE INGREDIENT INPUTS
    //-------------------------------------------------------REACTIONARY RECIPE INGREDIENT INPUTS
    const renderIngredientsInput = () => {

        const addIngredient = () => { 
            numIngredients++;
             qtyHtmlIdent = "qty" + numIngredients;
             qtyMode = ".qty" + numIngredients;
             unitHtmlIdent = "unit" + numIngredients;
             unitMode = ".unit" + numIngredients;
             nameHtmlIdent = "name" + numIngredients;
             nameMode = ".name" + numIngredients;
            
            let ingredientText = <div className="form-inline" key={ingredientArr.length}>
                        <Control.text type="number" model={qtyMode} name={qtyHtmlIdent} className="qty ingredients-controls"/>
                        <Control.select model={unitMode} name={unitHtmlIdent} className="unit-measure ingredients-controls" >
                            <option disabled>Volume</option>
                            <option disabled></option>
                            <option active>Teaspoon</option>
                            <option>Tablespoon</option>
                            <option>Fluid Ounce</option>
                            <option>Gill</option>
                            <option>Cup</option>
                            <option>Pint</option>
                            <option>Quart</option>
                            <option>Gallon</option>
                            <option>Milliliter</option>
                            <option>Liter</option>
                            <option>Whole</option>
                            <option disabled></option>
                            <option disabled>──────────</option>
                            <option disabled>Mass/Weight</option>
                            <option disabled></option>
                            <option>Pound</option>
                            <option>Ounce</option>
                            <option>Milligram</option>
                            <option>Gram</option>
                            <option>Kilogram</option>
                            <option disabled></option>
                            <option disabled>──────────</option>
                            <option disabled>Length</option>
                            <option disabled></option>
                            <option>Slice</option>
                            <option>Half</option>
                            <option>Millimeter</option>
                            <option>Centimeter</option>
                            <option>Meter</option>
                            <option>Inch</option>
                        </Control.select>
                        <Control.text model={nameMode} name={nameHtmlIdent} id="ingredient" className="recipe-ingredients ingredients-controls"/>
                        <button class="submit-button-small" onClick={() => {removeIngredient()}}>Remove</button>
                    </div>

            ingredientArr.push(ingredientText);
        }

        const removeIngredient = () => {
            numIngredients--;
            qtyHtmlIdent = "qty" + numIngredients;
            qtyMode = ".qty" + numIngredients;
            unitHtmlIdent = "unit" + numIngredients;
            unitMode = ".unit" + numIngredients;
            nameHtmlIdent = "name" + numIngredients;
            nameMode = ".name" + numIngredients;
            ingredientArr.pop(ingredientText);
        }
        
        const removeAll = () => {
            while(ingredientArr.length > 0){
                ingredientArr.pop(ingredientText)
            }
            numSteps=0;
            qtyHtmlIdent = "";
            qtyMode = "";
            unitHtmlIdent = "";
            unitMode = "";
            nameHtmlIdent = "";
            nameMode = "";
        }
        
        let ingredientArr =[]
        let ingredientText = <div></div>
        
        return(
                <div>
                    <label htmlFor="steps">Ingredients</label> 
                    {ingredientArr}
                    <div className="submit-button-interface col"><button class="submit-buttons" onClick={() => {addIngredient()}}>Add Ingredient</button><button class="submit-buttons" onClick={() => {removeAll()}}>Remove All</button></div>     
                </div>
        )
    }

    //-------------------------------------------------------------RENDER FORM COMPONENT
    //-------------------------------------------------------------RENDER FORM COMPONENT
    //-------------------------------------------------------------RENDER FORM COMPONENT
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
                    <h5>Author a New Recipe</h5>
                        <div className="row">
                            <div className="col">
        
                            <LocalForm id="recipe-form">
                                <div className="row">                
                                    <Col md={10}>
                                    <label htmlFor="name">Recipe Title</label><br/> 
                                        <Control.text model='.name' 
                                        name="name" 
                                        className="recipe-title"
                                        id="name"/> 
                                    </Col>
                                    <Col md={2}>
                                    <label htmlFor="recipe-type">Meal Type</label><br/> 
                                    <select model=".recipe-type" name="recipe-type" className="recipe-type" defaultValue={"Breakfast"}>
                                            <option>Breakfast</option>
                                            <option>Brunch</option>
                                            <option>Lunch</option>
                                            <option>Dinner</option>
                                            <option>Snack</option>
                                            <option>Dessert</option>
                                            <option>Drink</option>
                                    </select>
                                    </Col>
                                </div>
                                <div className="row">                             
                                    <Col md={6}>
                                    <div className="steps-container">
                                        {renderIngredientsInput()}
                                        {renderStepsInput()}
                                        <div className="dvcalc" onClick={(e) => {handleToggle(e)}}><span>Add Nutritional Value Details</span></div><div className="toggle-dvcalc close"><DailyValueCalculator/></div>
                                        {/* <DailyValueCalculator/> */}
                                    </div>
                                    </Col>
                                    <Col md={6}>
                                    <div class="image-dropzone" onDrop={(file) => {onDrop(file)}}>
                                        <input type="file" id="img-input" 
                                        accept=".jpg, .jpeg, .png, .bmp"
                                        onChange={(e) => {handleChange(e)}}/>
                                        <div id="preview-image-container"></div>
                                    </div>  
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
                                    <button class="submit-buttons" type="submit" form="recipe-form" onClick={() => {handleSubmit()}}>Post Recipe</button>
                                </Col>
                                </LocalForm>
                        </div>
                    </div>
                </div>
                    {/* Visible if the user is registered. */}         
        </div>
      
    )

}
export default AddRecipe;