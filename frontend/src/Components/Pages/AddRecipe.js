import React, {useState} from 'react'
import {Link, useNavigate} from 'react-router-dom'
import { Breadcrumb, Col, Button } from 'react-bootstrap'
import { Control, LocalForm, Errors } from 'react-redux-form';
import Loader from '../SubComponents/Loader/Loader';
import axios from 'axios';
import DailyValueCalculator from '../SubComponents/DailyValueCalculator';
import DailyValue from '../SubComponents/DailyValueDisplay';
import AutoComplete from '../SubComponents/AutoComplete';

function AddRecipe(props) {
    const navigate = useNavigate();
    let pageRedirect= false;
    let found = false;  
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

    let totalServingContainer = 0;
    let totalServingQuantity= 0;
    let totalServingQuantityUnits= 0;
    let totalServingSizeWeight= 0;
    let totalServingSizeUnit= 0;
    let totalCalories= 0;
    let totalCaloriesFat= 0;
    let totalTotalFat= 0;
    let totalSaturatedFat= 0;
    let totalTransFat= 0;
    let totalPolyFat= 0;
    let totalMonoFat= 0;
    let totalCholesterol= 0;
    let totalSodium= 0;
    let totalTotalCarbs= 0;
    let totalDietaryFiber= 0;
    let totalSugar= 0;
    let totalSugarAlcohol= 0;
    let totalAddedSugar= 0;
    let totalProtein= 0;
    let totalVitA= 0;
    let totalVitB6= 0;
    let totalVitB12= 0;
    let totalVitC= 0;
    let totalVitD= 0;
    let totalVitE= 0;
    let totalVitK= 0;
    let totalCalcium= 0;
    let totalIron= 0;
    let totalMagnesium= 0;
    let totalThiamine= 0;
    let totalBiotin= 0;
    let totalPantoAcid= 0;
    let totalPotassium= 0;
    let totalPhosphorous= 0;
    let totalIodine= 0;
    let totalZinc= 0;
    let totalSelenium= 0;
    let totalCopper= 0;
    let totalManganese= 0;
    let totalChromium= 0;
    let totalMolybdenum= 0;
    let totalChloride= 0;

    const servingContainer = document.getElementById('servingContainer');
    const servingQuantity = document.getElementById('servingQuantity');
    const servingQuantityUnits = document.getElementById('servingQuantityUnits');
    const servingSizeWeight = document.getElementById('servingSizeWeight');
    const servingSizeUnit = document.getElementById('servingSizeUnit');
    const calories = document.getElementById('calories');
    const caloriesFat = document.getElementById('caloriesFat');
    const totalFat = document.getElementById('totalFat');
    const saturatedFat = document.getElementById('saturatedFat');
    const transFat = document.getElementById('transFat');
    const polyFat = document.getElementById('polyFat');
    const monoFat = document.getElementById('monoFat');
    const cholesterol = document.getElementById('cholesterol');
    const sodium = document.getElementById('sodium');
    const totalCarbs = document.getElementById('totalCarbs');
    const dietaryFiber = document.getElementById('dietaryFiber');
    const sugar = document.getElementById('sugar');
    const sugarAlcohol = document.getElementById('sugarAlcohol');
    const addedSugar = document.getElementById('addedSugar');
    const protein = document.getElementById('protein');
    const vitA = document.getElementById('vitA');
    const vitB6 = document.getElementById('vitB6');
    const vitB12 = document.getElementById('vitB12');
    const vitC = document.getElementById('vitC');
    const vitD = document.getElementById('vitD');
    const vitE = document.getElementById('vitE');
    const vitK = document.getElementById('vitK');
    const calcium = document.getElementById('calcium');
    const iron = document.getElementById('iron');
    const magnesium = document.getElementById('magnesium');
    const thiamine = document.getElementById('thiamine');
    const biotin = document.getElementById('biotin');
    const pantoAcid = document.getElementById('pantoAcid');
    const potassium = document.getElementById('potassium');
    const phosphorous = document.getElementById('phosphorous');
    const iodine = document.getElementById('iodine');
    const zinc = document.getElementById('zinc');
    const selenium = document.getElementById('selenium');
    const copper = document.getElementById('copper');
    const manganese = document.getElementById('manganese');
    const chromium = document.getElementById('chromium');
    const molybdenum = document.getElementById('molybdenum');
    const chloride = document.getElementById('chloride');

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

    function handleToggle() {

        if(dvCalc.classList.contains('close')){
            dvCalc.classList.remove('close');
            dvCalc.classList.add('open');
        } else {
            dvCalc.classList.remove('open');
            dvCalc.classList.add('close');
        }

        setToggle({ toggle: !toggle })

    }


    function handleInputChange() {
        const product = document.getElementById('ingredient');
        let i = -1;    
       
      
        do{ 
            i++;
            console.log(props.ingredients[i].name)
            if(product.value == props.ingredients[i].name)
                found = true;
        }while(!found);
        if(found){
            for(let i = 0; i < numIngredients; i++){

                totalServingContainer+= parseInt(props.nutrition[i].servingSize); //SS by Container
                totalServingQuantity+= parseInt(props.nutrition[i].servingSizeQty);
                totalServingQuantityUnits+= parseInt(props.nutrition[i].servingSizeQtyUnit);
                totalServingSizeWeight+= parseInt(props.nutrition[i].servingSizeWeight);
                totalServingSizeUnit+= parseInt(props.nutrition[i].servingSizeUnit);
                totalCalories+= parseInt(props.nutrition[i].calories);
                totalCaloriesFat+= parseInt(props.nutrition[i].caloriesFat);
                totalTotalFat+= parseInt(props.nutrition[i].totalFat);
                totalSaturatedFat+= parseInt(props.nutrition[i].saturatedFat);
                totalTransFat+= parseInt(props.nutrition[i].transFat); 
                totalPolyFat+= parseInt(props.nutrition[i].polyFat);
                totalMonoFat+= parseInt(props.nutrition[i].monoFat);
                totalCholesterol+= parseInt(props.nutrition[i].cholesterol);
                totalSodium+= parseInt(props.nutrition[i].sodium);
                totalTotalCarbs+= parseInt(props.nutrition[i].totalCarbs);
                totalDietaryFiber+= parseInt(props.nutrition[i].dietaryFiber);
                totalSugar+= parseInt(props.nutrition[i].sugar);
                totalSugarAlcohol+= parseInt(props.nutrition[i].sugarAlcohol);
                totalAddedSugar+= parseInt(props.nutrition[i].addedSugar);
                totalProtein+= parseInt(props.nutrition[i].protein);
                totalVitA+= parseInt(props.nutrition[i].vitA);
                totalVitB6+= parseInt(props.nutrition[i].vitB6);
                totalVitB12+= parseInt(props.nutrition[i].vitB12);
                totalVitC+= parseInt(props.nutrition[i].vitC);
                totalVitD+= parseInt(props.ingredients[i].vitD);
                totalVitE+= parseInt(props.nutrition[i].vitE);
                totalVitK+= parseInt(props.nutrition[i].vitK);
                totalCalcium+= parseInt(props.nutrition[i].calcium);
                totalIron+= parseInt(props.nutrition[i].iron);
                totalMagnesium+= parseInt(props.nutrition[i].magnesium);
                totalThiamine+= parseInt(props.nutrition[i].thiamine);
                totalBiotin+= parseInt(props.nutrition[i].biotin);
                totalPantoAcid+= parseInt(props.nutrition[i].pantoAcid);
                totalPotassium+= parseInt(props.nutrition[i].potassium);
                totalPhosphorous+= parseInt(props.nutrition[i].phosphorous);
                totalIodine+= parseInt(props.nutrition[i].iodine);
                totalZinc+= parseInt(props.nutrition[i].zinc);
                totalSelenium+= parseInt(props.nutrition[i].selenium);
                totalCopper+= parseInt(props.nutrition[i].copper);
                totalManganese+= parseInt(props.nutrition[i].manganese);
                totalChromium+= parseInt(props.nutrition[i].chromium);
                totalMolybdenum+= parseInt(props.nutrition[i].molybdenum);
                totalChloride+= parseInt(props.nutrition[i].chloride);
                
            }

 
            servingContainer.value = totalServingContainer;
            servingQuantity.value = totalServingQuantity;
            servingQuantityUnits.value = totalServingQuantityUnits;
            servingSizeWeight.value = totalServingSizeWeight;
            servingSizeUnit.value = totalServingSizeUnit;
            calories.value =totalCalories;
            caloriesFat.value = totalCaloriesFat;
            totalFat.value = totalTotalFat;
            saturatedFat.value = totalSaturatedFat;
            transFat.value = totalTransFat;
            polyFat.value = totalPolyFat;
            monoFat.value = totalMonoFat;
            cholesterol.value = totalCholesterol;
            sodium.value = totalSodium;
    
            totalCarbs.value = totalTotalCarbs;
            dietaryFiber.value = totalDietaryFiber;
            sugar.value = totalSugar;
            sugarAlcohol.value = totalSugarAlcohol;
            addedSugar.value = totalAddedSugar;
            protein.value = totalProtein;
            vitA.value = totalVitA;
            vitB6.value = totalVitB6;
            vitB12.value = totalVitB12;
            vitC.value = totalVitC;
            vitD.value = totalVitD;
            vitE.value = totalVitE;
            vitK.value = totalVitK;
    
            calcium.value = totalCalcium;
            iron.value = totalIron;
            magnesium.value = totalMagnesium;
            thiamine.value = totalThiamine;
    
            biotin.value = totalBiotin;
            pantoAcid.value = totalPantoAcid;
            potassium.value = totalPotassium;
            phosphorous.value = totalPhosphorous;
            iodine.value = totalIodine;
            zinc.value = totalZinc;
            selenium.value = totalSelenium;
            copper.value = totalCopper;
            manganese.value = totalManganese;
    
            chromium.value = totalChromium;
            molybdenum.value = totalMolybdenum;
            chloride.value = totalChloride;
    
            }
        }
        // console.log(found);


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
                        <Control.text model={nameMode} name={nameHtmlIdent} id="ingredient" className="recipe-ingredients ingredients-controls" onChange={(e) => {handleInputChange(e)}}/>
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
                                        {console.log("ingredients " + props.ingredients[0].name)}
                                        <div className="dvcalc" onClick={(e) => {handleToggle(e)}}><span>Add Nutritional Value Details</span></div><div 
                                        className="toggle-dvcalc close"><DailyValueCalculator 
                                        ingredients={props.ingredients} nutrition={props.nutrition}
                                        found={found}/>
                                       </div>
                                    </div>
                                    </Col>
                                    <Col md={6}>
                                    <div className="image-dropzone" onDrop={(file) => {onDrop(file)}}>
                                        <input type="file" id="img-input" 
                                        accept=".jpg, .jpeg, .png, .bmp"
                                        onChange={(e) => {handleChange(e)}}/>
                                        <div id="preview-image-container"></div>
                                    </div>
                                    <div className="container">
                                        <DailyValue/>
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