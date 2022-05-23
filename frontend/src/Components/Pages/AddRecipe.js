import React, {Component, useState} from 'react'
import {Link, useNavigate} from 'react-router-dom'
import { Breadcrumb, Col, Button } from 'react-bootstrap'
import { Control, LocalForm, Errors } from 'react-redux-form';
import Loader from '../SubComponents/Loader/Loader';
import axios from 'axios';
import DailyValueCalculator from '../SubComponents/DailyValueCalculator';
import DailyValue from '../SubComponents/DailyValueDisplay';
import AutoComplete from '../SubComponents/AutoComplete';
import FileUploader from '../SubComponents/FileUploader';

function AddRecipe(props) {
    const navigate = useNavigate();
    let pageRedirect= false;
    let found = false;  
    let filePath= "";

    let numSteps = 0;
    let stepsHtmlIdent = "steps" + numSteps;
    let stepsMode = ".steps" + numSteps;

    let ingredientType = '';

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
    
    let currentNutrition = [];

    const [selectedFile, setSelectedFile] = useState();

    const dvCalc = document.getElementsByClassName('toggle-dvcalc')[0];

    // function onDrop(file){
    //     if (file.length > 0) {
    //         setSelectedFile(file);
    //       }
    // }

    function handleChange(event) {
        
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
        
        props.postRecipeNutrition( servingContainer.value, servingQuantity.value, servingQuantityUnits.value, servingSizeWeight.value,
            servingSizeUnit.value, calories.value, caloriesFat.value, 
            totalFat.value, saturatedFat.value, transFat.value, polyFat.value,
            monoFat.value, cholesterol.value, sodium.value, potassium.value, totalCarbs.value, 
            dietaryFiber.value, sugar.value, sugarAlcohol.value, addedSugar.value,
            protein.value, vitA.value, vitB6.value, vitB12.value, vitC.value, 
            vitD.value, vitE.value, vitK.value, calcium.value, iron.value,
            magnesium.value, thiamine.value, biotin.value, pantoAcid.value, 
            phosphorous.value, iodine.value, zinc.value, selenium.value,
            copper.value, manganese.value, chromium.value, molybdenum.value, chloride.value, id)
   
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
                totalValue: [{
                                totalServingContainer: '',
                                totalServingQuantity: 0,
                                totalServingQuantityUnits:'',
                                totalServingSizeWeight: 0,
                                totalServingSizeUnit: '',
                                totalCalories: 0,
                                totalCaloriesFat: 0,
                                totalTotalFat: 0,
                                totalSaturatedFat: 0,
                                totalTransFat: 0, 
                                totalPolyFat: 0,
                                totalMonoFat: 0,
                                totalCholesterol: 0,
                                totalSodium: 0,
                                totalTotalCarbs: 0,
                                totalDietaryFiber: 0,
                                totalSugar: 0,
                                totalSugarAlcohol: 0,
                                totalAddedSugar: 0,
                                totalProtein: 0,
                                totalVitA: 0,
                                totalVitB6: 0,
                                totalVitB12: 0,
                                totalVitC: 0,
                                totalVitD: 0,
                                totalVitE: 0,
                                totalVitK: 0,
                                totalCalcium: 0,
                                totalIron: 0,
                                totalMagnesium: 0,
                                totalThiamine: 0,
                                totalBiotin: 0,
                                totalPantoAcid: 0,
                                totalPotassium: 0,
                                totalPhosphorous: 0,
                                totalIodine: 0,
                                totalZinc: 0,
                                totalSelenium: 0,
                                totalCopper: 0,
                                totalManganese: 0,
                                totalChromium: 0,
                                totalMolybdenum: 0,
                                totalChloride: 0}],
            };

          }
          
          createUI(){
             return this.state.values.map((el, i) => 
                 <div key={i}>
                            <Control.text type="number" model={".qty"+i} name={"qty"+i} className="qty ingredients-controls" defaultValue={1}/>
                            <Control.select model={".unit"+i} name={"unit"+i} className="unit-measure ingredients-controls" >
    {/* {ingredientType == "Coffee" || ingredientType == "Tea" || 
    ingredientType == "Juice" || ingredientType == "Soft Drink" ||
    ingredientType == "Liquor" || ingredientType == "Alcohol" || 
    ingredientType == "Water" || ingredientType == "Vegetables (Canned)" || ingredientType == "Fruit (Canned)" ||
    ingredientType == "Meat (Canned)" || ingredientType == "Sauce" || ingredientType == "Condiment"? <></>  : <option></option>}                                          */}
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
   {/* {ingredientType == "Coffee" || ingredientType == "Tea" || 
    ingredientType == "Juice" || ingredientType == "Soft Drink" ||
    ingredientType == "Liquor" || ingredientType == "Alcohol" || 
    ingredientType == "Water" ? <> </>  : <option></option>}*/}
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
                            <Control.text model={".ingredient"+i} value={el||''} name={"ingredient"+i} className="recipe-ingredients ingredients-controls" onChange={this.handleInputChange.bind(this,i)} />
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

    findNutrition(id){
        // return this.props.nutrition.filter()
        currentNutrition = props.nutrition.filter(
            (nutrient) => nutrient.id === parseInt(id,10))[0]
    }
          
     handleInputChange(x, event) {

        let values = [...this.state.values];
        values[x] = event.target.value;
        this.setState({values});
        
        
        props.ingredients.map((ingredient, index) => {

         if(values[x] == ingredient.name){
            // console.log("PROPS: " + props.nutrition[index].servingQuantity);
            // console.log("state: " + this.state.totalValue[x].totalServingQuantity);
            // console.log("INGREDIENT TYPE: " +  ingredient.type)
            ingredientType = ingredient.type;
            console.log(props.nutrition[index].servingSizeQty)
            console.log(props.nutrition[index].servingContainer)
            const qty = document.getElementsByClassName('qty');

            this.findNutrition(ingredient.id);

            console.log("QTY: " + qty[x].value)

                // this.setState(prevState => ({ totalValue: [...prevState.totalValue, 
                //     {
                            
                //         totalServingContainer: props.nutrition[index].servingContainer,
                //         totalServingQuantity: this.state.totalValue[x].totalServingQuantity + (qty.value * totalServingQuantity),
                //         totalServingQuantityUnits: props.nutrition[index].servingQuantityUnits,
                //         totalServingSizeWeight: this.state.totalValue[x].totalServingSizeWeight + (qty.value * totalServingSizeWeight),
                //         totalServingSizeUnit: props.nutrition[index].servingSizeUnit,
                //         totalCalories: this.state.totalValue[x].totalCalories + (qty.value * totalCalories),
                //         totalCaloriesFat: this.state.totalValue[x].totalCaloriesFat + (qty.value * parseFloat(props.nutrition[index].caloriesFat)),
                //         totalTotalFat: this.state.totalValue[x].totalTotalFat + (qty.value * parseFloat(props.nutrition[index].totalFat)),
                //         totalSaturatedFat: this.state.totalValue[x].totalSaturatedFat + (qty.value * parseFloat(props.nutrition[index].saturatedFat)),
                //         totalTransFat: this.state.totalValue[x].totalTransFat + (qty.value * parseFloat(props.nutrition[index].transFat)), 
                //         totalPolyFat: this.state.totalValue[x].totalPolyFat + (qty.value * parseFloat(props.nutrition[index].polyFat)),
                //         totalMonoFat: this.state.totalValue[x].totalMonoFat + (qty.value * parseFloat(props.nutrition[index].monoFat)),
                //         totalCholesterol: this.state.totalValue[x].totalCholesterol + (qty.value * parseFloat(props.nutrition[index].cholesterol)),
                //         totalSodium: this.state.totalValue[x].totalSodium + (qty.value * parseFloat(props.nutrition[index].sodium)),
                //         totalTotalCarbs: this.state.totalValue[x].totalTotalCarbs + (qty.value * parseFloat(props.nutrition[index].totalCarbs)),
                //         totalDietaryFiber: this.state.totalValue[x].totalDietaryFiber + (qty.value * parseFloat(props.nutrition[index].dietaryFiber)),
                //         totalSugar: this.state.totalValue[x].totalSugar + (qty.value * parseFloat(props.nutrition[index].sugar)),
                //         totalSugarAlcohol: this.state.totalValue[x].totalSugarAlcohol + (qty.value * parseFloat(props.nutrition[index].sugarAlcohol)),
                //         totalAddedSugar: this.state.totalValue[x].totalAddedSugar + (qty.value * parseFloat(props.nutrition[index].addedSugar)),
                //         totalProtein: this.state.totalValue[x].totalProtein + (qty.value * parseFloat(props.nutrition[index].protein)),
                //         totalVitA: this.state.totalValue[x].totalVitA + (qty.value * parseInt(props.nutrition[index].vitA)),
                //         totalVitB6: this.state.totalValue[x].totalVitB6 + (qty.value * parseInt(props.nutrition[index].vitB6)),
                //         totalVitB12: this.state.totalValue[x].totalVitB12 + (qty.value * parseInt(props.nutrition[index].vitB12)),
                //         totalVitC: this.state.totalValue[x].totalVitC + (qty.value * parseInt(props.nutrition[index].vitC)),
                //         totalVitD: this.state.totalValue[x].totalVitD + (qty.value * parseInt(props.nutrition[index].vitD)),
                //         totalVitE: this.state.totalValue[x].totalVitE + (qty.value * parseInt(props.nutrition[index].vitE)),
                //         totalVitK: this.state.totalValue[x].totalVitK + (qty.value * parseInt(props.nutrition[index].vitK)),
                //         totalCalcium: this.state.totalValue[x].totalCalcium + (qty.value * parseInt(props.nutrition[index].calcium)),
                //         totalIron: this.state.totalValue[x].totalIron + (qty.value * parseInt(props.nutrition[index].iron)),
                //         totalMagnesium: this.state.totalValue[x].totalMagnesium + (qty.value * parseInt(props.nutrition[index].magnesium)),
                //         totalThiamine: this.state.totalValue[x].totalThiamine + (qty.value * parseInt(props.nutrition[index].thiamine)),
                //         totalBiotin: this.state.totalValue[x].totalBiotin + (qty.value * parseInt(props.nutrition[index].biotin)),
                //         totalPantoAcid: this.state.totalValue[x].totalPantoAcid + (qty.value * parseInt(props.nutrition[index].pantoAcid)),
                //         totalPotassium: this.state.totalValue[x].totalPotassium + (qty.value * parseInt(props.nutrition[index].potassium)),
                //         totalPhosphorous: this.state.totalValue[x].totalPhosphorous + (qty.value * parseInt(props.nutrition[index].phosphorous)),
                //         totalIodine: this.state.totalValue[x].totalIodine + (qty.value * parseInt(props.nutrition[index].iodine)),
                //         totalZinc: this.state.totalValue[x].totalZinc + (qty.value * parseInt(props.nutrition[index].zinc)),
                //         totalSelenium: this.state.totalValue[x].totalSelenium + (qty.value * parseInt(props.nutrition[index].selenium)),
                //         totalCopper: this.state.totalValue[x].totalCopper + (qty.value * parseInt(props.nutrition[index].copper)),
                //         totalManganese: this.state.totalValue[x].totalManganese + (qty.value * parseInt(props.nutrition[index].manganese)),
                //         totalChromium: this.state.totalValue[x].totalChromium + (qty.value * parseInt(props.nutrition[index].chromium)),
                //         totalMolybdenum: this.state.totalValue[x].totalMolybdenum + (qty.value * parseInt(props.nutrition[index].molybdenum)),
                //         totalChloride: this.state.totalValue[x].totalChloride + (qty.value * parseInt(props.nutrition[index].chloride))   }]
                
                //     })) 
               
            // this.setState(prevState => ({ totalValue: [...prevState.totalValue, 
            // {
                            
            //     totalServingContainer: props.nutrition[index].servingContainer,
            //     totalServingQuantity: this.state.totalValue[x].totalServingQuantity + parseFloat(props.nutrition[index].servingQuantity),
            //     totalServingQuantityUnits: props.nutrition[index].servingQuantityUnits,
            //     totalServingSizeWeight: this.state.totalValue[x].totalServingSizeWeight + parseInt(props.nutrition[index].servingSizeWeight),
            //     totalServingSizeUnit: props.nutrition[index].servingSizeUnit,
            //     totalCalories: this.state.totalValue[x].totalCalories + parseFloat(props.nutrition[index].calories),
            //     totalCaloriesFat: this.state.totalValue[x].totalCaloriesFat + parseFloat(props.nutrition[index].caloriesFat),
            //     totalTotalFat: this.state.totalValue[x].totalTotalFat + parseFloat(props.nutrition[index].totalFat),
            //     totalSaturatedFat: this.state.totalValue[x].totalSaturatedFat + parseFloat(props.nutrition[index].saturatedFat),
            //     totalTransFat: this.state.totalValue[x].totalTransFat + parseFloat(props.nutrition[index].transFat), 
            //     totalPolyFat: this.state.totalValue[x].totalPolyFat + parseFloat(props.nutrition[index].polyFat),
            //     totalMonoFat: this.state.totalValue[x].totalMonoFat + parseFloat(props.nutrition[index].monoFat),
            //     totalCholesterol: this.state.totalValue[x].totalCholesterol + parseFloat(props.nutrition[index].cholesterol),
            //     totalSodium: this.state.totalValue[x].totalSodium + parseFloat(props.nutrition[index].sodium),
            //     totalTotalCarbs: this.state.totalValue[x].totalTotalCarbs + parseFloat(props.nutrition[index].totalCarbs),
            //     totalDietaryFiber: this.state.totalValue[x].totalDietaryFiber + parseFloat(props.nutrition[index].dietaryFiber),
            //     totalSugar: this.state.totalValue[x].totalSugar + parseFloat(props.nutrition[index].sugar),
            //     totalSugarAlcohol: this.state.totalValue[x].totalSugarAlcohol + parseFloat(props.nutrition[index].sugarAlcohol),
            //     totalAddedSugar: this.state.totalValue[x].totalAddedSugar + parseFloat(props.nutrition[index].addedSugar),
            //     totalProtein: this.state.totalValue[x].totalProtein + parseFloat(props.nutrition[index].protein),
            //     totalVitA: this.state.totalValue[x].totalVitA + parseInt(props.nutrition[index].vitA),
            //     totalVitB6: this.state.totalValue[x].totalVitB6 + parseInt(props.nutrition[index].vitB6),
            //     totalVitB12: this.state.totalValue[x].totalVitB12 + parseInt(props.nutrition[index].vitB12),
            //     totalVitC: this.state.totalValue[x].totalVitC + parseInt(props.nutrition[index].vitC),
            //     totalVitD: this.state.totalValue[x].totalVitD + parseInt(props.nutrition[index].vitD),
            //     totalVitE: this.state.totalValue[x].totalVitE + parseInt(props.nutrition[index].vitE),
            //     totalVitK: this.state.totalValue[x].totalVitK + parseInt(props.nutrition[index].vitK),
            //     totalCalcium: this.state.totalValue[x].totalCalcium + parseInt(props.nutrition[index].calcium),
            //     totalIron: this.state.totalValue[x].totalIron + parseInt(props.nutrition[index].iron),
            //     totalMagnesium: this.state.totalValue[x].totalMagnesium + parseInt(props.nutrition[index].magnesium),
            //     totalThiamine: this.state.totalValue[x].totalThiamine + parseInt(props.nutrition[index].thiamine),
            //     totalBiotin: this.state.totalValue[x].totalBiotin + parseInt(props.nutrition[index].biotin),
            //     totalPantoAcid: this.state.totalValue[x].totalPantoAcid + parseInt(props.nutrition[index].pantoAcid),
            //     totalPotassium: this.state.totalValue[x].totalPotassium + parseInt(props.nutrition[index].potassium),
            //     totalPhosphorous: this.state.totalValue[x].totalPhosphorous + parseInt(props.nutrition[index].phosphorous),
            //     totalIodine: this.state.totalValue[x].totalIodine + parseInt(props.nutrition[index].iodine),
            //     totalZinc: this.state.totalValue[x].totalZinc + parseInt(props.nutrition[index].zinc),
            //     totalSelenium: this.state.totalValue[x].totalSelenium + parseInt(props.nutrition[index].selenium),
            //     totalCopper: this.state.totalValue[x].totalCopper + parseInt(props.nutrition[index].copper),
            //     totalManganese: this.state.totalValue[x].totalManganese + parseInt(props.nutrition[index].manganese),
            //     totalChromium: this.state.totalValue[x].totalChromium + parseInt(props.nutrition[index].chromium),
            //     totalMolybdenum: this.state.totalValue[x].totalMolybdenum + parseInt(props.nutrition[index].molybdenum),
            //     totalChloride: this.state.totalValue[x].totalChloride + parseInt(props.nutrition[index].chloride)   }]
        
            // })) 

                           
            this.setState(prevState => ({ totalValue: [...prevState.totalValue, 
                {
                                
                    totalServingContainer: props.nutrition[index].servingContainer,
                    totalServingQuantity: this.state.totalValue[x].totalServingQuantity + currentNutrition.servingQuantity,
                    totalServingQuantityUnits: props.nutrition[index].servingQuantityUnits,
                    totalServingSizeWeight: this.state.totalValue[x].totalServingSizeWeight + currentNutrition.servingSizeWeight,
                    totalServingSizeUnit: props.nutrition[index].servingSizeUnit,
                    totalCalories: this.state.totalValue[x].totalCalories + currentNutrition.calories,
                    totalCaloriesFat: this.state.totalValue[x].totalCaloriesFat + currentNutrition.caloriesFat,
                    totalTotalFat: this.state.totalValue[x].totalTotalFat + currentNutrition.totalFat,
                    totalSaturatedFat: this.state.totalValue[x].totalSaturatedFat + currentNutrition.saturatedFat,
                    totalTransFat: this.state.totalValue[x].totalTransFat + currentNutrition.transFat, 
                    totalPolyFat: this.state.totalValue[x].totalPolyFat + currentNutrition.polyFat,
                    totalMonoFat: this.state.totalValue[x].totalMonoFat + currentNutrition.monoFat,
                    totalCholesterol: this.state.totalValue[x].totalCholesterol + currentNutrition.cholesterol,
                    totalSodium: this.state.totalValue[x].totalSodium + currentNutrition.sodium,
                    totalTotalCarbs: this.state.totalValue[x].totalTotalCarbs + currentNutrition.totalCarbs,
                    totalDietaryFiber: this.state.totalValue[x].totalDietaryFiber + currentNutrition.dietaryFiber,
                    totalSugar: this.state.totalValue[x].totalSugar + currentNutrition.sugar,
                    totalSugarAlcohol: this.state.totalValue[x].totalSugarAlcohol + currentNutrition.sugarAlcohol,
                    totalAddedSugar: this.state.totalValue[x].totalAddedSugar + currentNutrition.addedSugar,
                    totalProtein: this.state.totalValue[x].totalProtein + currentNutrition.protein,
                    totalVitA: this.state.totalValue[x].totalVitA + currentNutrition.vitA,
                    totalVitB6: this.state.totalValue[x].totalVitB6 + currentNutrition.vitB6,
                    totalVitB12: this.state.totalValue[x].totalVitB12 + currentNutrition.vitB12,
                    totalVitC: this.state.totalValue[x].totalVitC + currentNutrition.vitC,
                    totalVitD: this.state.totalValue[x].totalVitD + currentNutrition.vitD,
                    totalVitE: this.state.totalValue[x].totalVitE + currentNutrition.vitE,
                    totalVitK: this.state.totalValue[x].totalVitK + currentNutrition.vitK,
                    totalCalcium: this.state.totalValue[x].totalCalcium + currentNutrition.calcium,
                    totalIron: this.state.totalValue[x].totalIron + currentNutrition.iron,
                    totalMagnesium: this.state.totalValue[x].totalMagnesium + currentNutrition.magnesium,
                    totalThiamine: this.state.totalValue[x].totalThiamine + currentNutrition.thiamine,
                    totalBiotin: this.state.totalValue[x].totalBiotin + currentNutrition.biotin,
                    totalPantoAcid: this.state.totalValue[x].totalPantoAcid + currentNutrition.pantoAcid,
                    totalPotassium: this.state.totalValue[x].totalPotassium + currentNutrition.potassium,
                    totalPhosphorous: this.state.totalValue[x].totalPhosphorous + currentNutrition.phosphorous,
                    totalIodine: this.state.totalValue[x].totalIodine + currentNutrition.iodine,
                    totalZinc: this.state.totalValue[x].totalZinc + currentNutrition.zinc,
                    totalSelenium: this.state.totalValue[x].totalSelenium + currentNutrition.selenium,
                    totalCopper: this.state.totalValue[x].totalCopper + currentNutrition.copper,
                    totalManganese: this.state.totalValue[x].totalManganese + currentNutrition.manganese,
                    totalChromium: this.state.totalValue[x].totalChromium + currentNutrition.chromium,
                    totalMolybdenum: this.state.totalValue[x].totalMolybdenum + currentNutrition.molybdenum,
                    totalChloride: this.state.totalValue[x].totalChloride + currentNutrition.chloride   }]
            
                })) 
        }   

        servingContainer.value = this.state.totalValue[x].totalServingContainer;
        servingQuantity.value = this.state.totalValue[x].totalServingQuantity;
        servingQuantityUnits.value = this.state.totalValue[x].totalServingQuantityUnits;
        servingSizeWeight.value = this.state.totalValue[x].totalServingSizeWeight;
        servingSizeUnit.value = this.state.totalValue[x].totalServingSizeUnit;
        calories.value = this.state.totalValue[x].totalCalories;
        caloriesFat.value = this.state.totalValue[x].totalCaloriesFat;
        totalFat.value = this.state.totalValue[x].totalTotalFat;
        saturatedFat.value = this.state.totalValue[x].totalSaturatedFat;
        transFat.value = this.state.totalValue[x].totalTransFat;
        polyFat.value = this.state.totalValue[x].totalPolyFat;
        monoFat.value = this.state.totalValue[x].totalMonoFat;
        cholesterol.value = this.state.totalValue[x].totalCholesterol;
        sodium.value = this.state.totalValue[x].totalSodium;

        totalCarbs.value = this.state.totalValue[x].totalTotalCarbs;
        dietaryFiber.value = this.state.totalValue[x].totalDietaryFiber;
        sugar.value = this.state.totalValue[x].totalSugar;
        sugarAlcohol.value = this.state.totalValue[x].totalSugarAlcohol;
        addedSugar.value = this.state.totalValue[x].totalAddedSugar;
        protein.value = this.state.totalValue[x].totalProtein;
        vitA.value = this.state.totalValue[x].totalVitA;
        vitB6.value = this.state.totalValue[x].totalVitB6;
        vitB12.value = this.state.totalValue[x].totalVitB12;
        vitC.value = this.state.totalValue[x].totalVitC;
        vitD.value = this.state.totalValue[x].totalVitD;
        vitE.value = this.state.totalValue[x].totalVitE;
        vitK.value = this.state.totalValue[x].totalVitK;

        calcium.value = this.state.totalValue[x].totalCalcium;
        iron.value = this.state.totalValue[x].totalIron;
        magnesium.value = this.state.totalValue[x].totalMagnesium;
        thiamine.value = this.state.totalValue[x].totalThiamine;

        biotin.value = this.state.totalValue[x].totalBiotin;
        pantoAcid.value = this.state.totalValue[x].totalPantoAcid;
        potassium.value = this.state.totalValue[x].totalPotassium;
        phosphorous.value = this.state.totalValue[x].totalPhosphorous;
        iodine.value = this.state.totalValue[x].totalIodine;
        zinc.value = this.state.totalValue[x].totalZinc;
        selenium.value = this.state.totalValue[x].totalSelenium;
        copper.value = this.state.totalValue[x].totalCopper;
        manganese.value = this.state.totalValue[x].totalManganese;

        chromium.value = this.state.totalValue[x].totalChromium;
        molybdenum.value = this.state.totalValue[x].totalMolybdenum;
        chloride.value = this.state.totalValue[x].totalChloride;

            });
         }   
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
                                        <RenderIngredientsInput/>
                                        {renderStepsInput()}
                                        {console.log("ingredients " + props.ingredients[0].name)}
                                        <div><DailyValueCalculator 
                                        ingredients={props.ingredients} nutrition={props.nutrition}
                                        found={found}/>
                                       </div>
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
                                    <FileUploader/>
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