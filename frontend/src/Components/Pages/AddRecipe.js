import React, {Component, useState, useEffect} from 'react'
import {Link, useNavigate} from 'react-router-dom'
import { Breadcrumb, Col, Button } from 'react-bootstrap'
import { Control, LocalForm, Errors } from 'react-redux-form';
import Loader from '../SubComponents/Loader/Loader';
import axios from 'axios';
import DailyValueCalculator from '../SubComponents/DailyValueCalculator';
import IngredientSteps from '../SubComponents/IngredientSteps';


function AddRecipe(props) {
    const navigate = useNavigate();
    let pageRedirect= false;
    let found = false;  
    let filePath= "";

    let numSteps = 0;
    let stepsHtmlIdent = "steps" + numSteps;
    let stepsMode = ".steps" + numSteps;

    let ingredientType = '';

    // const servingContainer = document.getElementById('servingContainer');
    // const servingQuantity = document.getElementById('servingQuantity');
    // const servingQuantityUnits = document.getElementById('servingQuantityUnits');
    // const servingSizeWeight = document.getElementById('servingSizeWeight');
    // const servingSizeUnit = document.getElementById('servingSizeUnit');
    // const calories = document.getElementById('calories');
    // const caloriesFat = document.getElementById('caloriesFat');
    // const totalFat = document.getElementById('totalFat');
    // const saturatedFat = document.getElementById('saturatedFat');
    // const transFat = document.getElementById('transFat');
    // const polyFat = document.getElementById('polyFat');
    // const monoFat = document.getElementById('monoFat');
    // const cholesterol = document.getElementById('cholesterol');
    // const sodium = document.getElementById('sodium');
    // const totalCarbs = document.getElementById('totalCarbs');
    // const dietaryFiber = document.getElementById('dietaryFiber');
    // const sugar = document.getElementById('sugar');
    // const sugarAlcohol = document.getElementById('sugarAlcohol');
    // const addedSugar = document.getElementById('addedSugar');
    // const protein = document.getElementById('protein');
    // const vitA = document.getElementById('vitA');
    // const vitB6 = document.getElementById('vitB6');
    // const vitB12 = document.getElementById('vitB12');
    // const vitC = document.getElementById('vitC');
    // const vitD = document.getElementById('vitD');
    // const vitE = document.getElementById('vitE');
    // const vitK = document.getElementById('vitK');
    // const calcium = document.getElementById('calcium');
    // const iron = document.getElementById('iron');
    // const magnesium = document.getElementById('magnesium');
    // const thiamine = document.getElementById('thiamine');
    // const biotin = document.getElementById('biotin');
    // const pantoAcid = document.getElementById('pantoAcid');
    // const potassium = document.getElementById('potassium');
    // const phosphorous = document.getElementById('phosphorous');
    // const iodine = document.getElementById('iodine');
    // const zinc = document.getElementById('zinc');
    // const selenium = document.getElementById('selenium');
    // const copper = document.getElementById('copper');
    // const manganese = document.getElementById('manganese');
    // const chromium = document.getElementById('chromium');
    // const molybdenum = document.getElementById('molybdenum');
    // const chloride = document.getElementById('chloride');



    // calories.value = 0;
    // caloriesFat.value = 0;
    // totalFat.value = 0;
    // saturatedFat.value = 0;
    // transFat.value = 0;
    // polyFat.value = 0;
    // monoFat.value = 0;
    // cholesterol.value = 0;
    // sodium.value = 0;

    // totalCarbs.value = 0;
    // dietaryFiber.value = 0;
    // sugar.value = 0;
    // sugarAlcohol.value = 0;
    // addedSugar.value = 0;
    // protein.value = 0;
    // vitA.value = 0;
    // vitB6.value = 0;
    // vitB12.value = 0;
    // vitC.value = 0;
    // vitD.value = 0;
    // vitE.value = 0;
    // vitK.value = 0;

    // calcium.value = 0;
    // iron.value = 0;
    // magnesium.value = 0;
    // thiamine.value = 0;

    // biotin.value = 0;
    // pantoAcid.value = 0;
    // potassium.value = 0;
    // phosphorous.value = 0;
    // iodine.value = 0;
    // zinc.value = 0;
    // selenium.value = 0;
    // copper.value = 0;
    // manganese.value = 0;

    // chromium.value = 0;
    // molybdenum.value = 0;
    // chloride.value = 0;


    const [selectedFile, setSelectedFile] = useState([]);
    const [preview, setPreview] = useState([]);

    function handleChange() {  
        setSelectedFile(document.getElementById('img-input').files[0]);
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

        console.log("SELECTED FILE: " + selectedFile)

        let data = new FormData()
        data.append('file', selectedFile)
        filePath = '/uploads/' + selectedFile.name;
        
        console.log(filePath)
        
        fetch(' http://localhost:8080/upload', {
          method: 'POST',
          body: data
        })

        // ------------------------------------------------------------------SUBMISSION LOGIC
        
        // props.postRecipeNutrition( servingContainer.value, servingQuantity.value, servingQuantityUnits.value, servingSizeWeight.value,
        //     servingSizeUnit.value, calories.value, caloriesFat.value, 
        //     totalFat.value, saturatedFat.value, transFat.value, polyFat.value,
        //     monoFat.value, cholesterol.value, sodium.value, potassium.value, totalCarbs.value, 
        //     dietaryFiber.value, sugar.value, sugarAlcohol.value, addedSugar.value,
        //     protein.value, vitA.value, vitB6.value, vitB12.value, vitC.value, 
        //     vitD.value, vitE.value, vitK.value, calcium.value, iron.value,
        //     magnesium.value, thiamine.value, biotin.value, pantoAcid.value, 
        //     phosphorous.value, iodine.value, zinc.value, selenium.value,
        //     copper.value, manganese.value, chromium.value, molybdenum.value, chloride.value, id)
   
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
    class RenderIngredientsInput extends Component {
        constructor(props) {
            super(props);
            this.state = {
                values: [],
            };

          }
          
          createUI(){
             return this.state.values.map((el, i) => 
                 <div key={i}>
                            <Control.text type="number" model={".qty"+i} name={"qty"+i} className="qty ingredients-controls" defaultValue={1}/>
                            <Control.select model={".unit"+i} name={"unit"+i} className="unit-measure ingredients-controls" >                                 
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
                                <option disabled></option>
                                <option disabled>──────────</option>
                                <option disabled>Mass/Weight</option>
                                <option disabled></option>
                                <option>Pound</option>
                                <option>Ounce</option>
                                <option>Milligram</option>
                                <option>Gram</option>
                                <option>Kilogram</option>
                                <option>Whole</option>
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
                            <Control.text model={".ingredient"+i} value={el||''} name={"ingredient"+i} className="recipe-ingredients ingredients-controls" />
                        <button class="submit-button-small" onClick={this.removeClick.bind(this,i)}>Remove</button></div>      
             )
          }
          
          
          addClick(){
            this.setState(prevState => ({ values: [...prevState.values, '']}))
          }
          
          removeClick(i){
             let values = [...this.state.values];
             values.splice(i,1);
             this.setState({ values });
          }

          removeAll(){
            let values = [];
            this.setState({ values });
         }
        
          render() {
            return (
              <div>
                    <label htmlFor="steps">Ingredients</label> 
                    {this.createUI()}      
                    <div className="submit-button-interface col"><button class="submit-buttons" onClick={this.addClick.bind(this)}>Add Ingredient</button><button class="submit-buttons" onClick={this.removeAll.bind(this)}>Remove All</button></div>     
                </div>
   
            );
        }
    }

    // const ImageThumb = (image) => {
           
    //     if(image !== undefined && image !== null && image){
    //         return <img src={URL.createObjectURL(image)} alt={image.name} />;
    //       }
    //     // return <img src={URL.createObjectURL(image)} alt={image.name} />;
    //   };
      

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
                                        {/* <RenderIngredientsInput/>
                                        {renderStepsInput()} */}
                                        <IngredientSteps/>
                                        {console.log("ingredients " + props.ingredients[0].name)}
                                    </div>
                                    </Col>
                                    <Col md={6}>
                                    {/* <div className="image-dropzone">
                                        <span></span>
                                        <input type="file" id="img-input" 
                                        accept=".jpg, .jpeg, .png, .bmp"
                                        onChange={(e) => {handleChange(e)}}/>
                                        <div id="preview-image-container"></div>
                                    </div> */}
                                        <div className="image-submitter">
                                            <input type="file" id="img-input" accept=".jpg, .jpeg, .png, .bmp" onChange={() => handleChange()} />
                                            <p>Filename: {selectedFile.name}</p>
                                            <p>File type: {selectedFile.type}</p>
                                            <p>File size: {selectedFile.size} bytes</p>
                                            {/* <ImageThumb image={selectedFile}/>                                    */}
                                        </div>                                
                                    </Col>
                                </div>
                                <div><DailyValueCalculator 
                                        ingredients={props.ingredients} nutrition={props.nutrition}
                                        found={found}/>
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