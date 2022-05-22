import React, {Component, useState} from 'react'
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

    // let totalServingContainer = 0;
    // let totalServingQuantity= 0;
    // let totalServingQuantityUnits= 0;
    // let totalServingSizeWeight= 0;
    // let totalServingSizeUnit= 0;
    // let totalCalories= 0;
    // let totalCaloriesFat= 0;
    // let totalTotalFat= 0;
    // let totalSaturatedFat= 0;
    // let totalTransFat= 0;
    // let totalPolyFat= 0;
    // let totalMonoFat= 0;
    // let totalCholesterol= 0;
    // let totalSodium= 0;
    // let totalTotalCarbs= 0;
    // let totalDietaryFiber= 0;
    // let totalSugar= 0;
    // let totalSugarAlcohol= 0;
    // let totalAddedSugar= 0;
    // let totalProtein= 0;
    // let totalVitA= 0;
    // let totalVitB6= 0;
    // let totalVitB12= 0;
    // let totalVitC= 0;
    // let totalVitD= 0;
    // let totalVitE= 0;
    // let totalVitK= 0;
    // let totalCalcium= 0;
    // let totalIron= 0;
    // let totalMagnesium= 0;
    // let totalThiamine= 0;
    // let totalBiotin= 0;
    // let totalPantoAcid= 0;
    // let totalPotassium= 0;
    // let totalPhosphorous= 0;
    // let totalIodine= 0;
    // let totalZinc= 0;
    // let totalSelenium= 0;
    // let totalCopper= 0;
    // let totalManganese= 0;
    // let totalChromium= 0;
    // let totalMolybdenum= 0;
    // let totalChloride= 0;

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




    // function handleInputChange(e) {
    //     let product = document.getElementById('ingredient');
        
    //     if(e.target.index){
        

    //     found = false;
    //     let i = -1;
    //     do{
    //         i++;
    //         if(product.value == props.ingredients[i].name)
    //             found = true;
        
    //     }while((!found && i< props.ingredients.length-1) && e.target.select());
    //     if(found){
            
    //         totalServingContainer+= parseInt(props.nutrition[i].servingSize); //SS by Container
    //         totalServingQuantity+= parseInt(props.nutrition[i].servingSizeQty);
    //         totalServingQuantityUnits+= parseInt(props.nutrition[i].servingSizeQtyUnit);
    //         totalServingSizeWeight+= parseInt(props.nutrition[i].servingSizeWeight);
    //         totalServingSizeUnit+= parseInt(props.nutrition[i].servingSizeUnit);
    //         totalCalories+= parseInt(props.nutrition[i].calories);
    //         totalCaloriesFat+= parseInt(props.nutrition[i].caloriesFat);
    //         totalTotalFat+= parseInt(props.nutrition[i].totalFat);
    //         totalSaturatedFat+= parseInt(props.nutrition[i].saturatedFat);
    //         totalTransFat+= parseInt(props.nutrition[i].transFat); 
    //         totalPolyFat+= parseInt(props.nutrition[i].polyFat);
    //         totalMonoFat+= parseInt(props.nutrition[i].monoFat);
    //         totalCholesterol+= parseInt(props.nutrition[i].cholesterol);
    //         totalSodium+= parseInt(props.nutrition[i].sodium);
    //         totalTotalCarbs+= parseInt(props.nutrition[i].totalCarbs);
    //         totalDietaryFiber+= parseInt(props.nutrition[i].dietaryFiber);
    //         totalSugar+= parseInt(props.nutrition[i].sugar);
    //         totalSugarAlcohol+= parseInt(props.nutrition[i].sugarAlcohol);
    //         totalAddedSugar+= parseInt(props.nutrition[i].addedSugar);
    //         totalProtein+= parseInt(props.nutrition[i].protein);
    //         totalVitA+= parseInt(props.nutrition[i].vitA);
    //         totalVitB6+= parseInt(props.nutrition[i].vitB6);
    //         totalVitB12+= parseInt(props.nutrition[i].vitB12);
    //         totalVitC+= parseInt(props.nutrition[i].vitC);
    //         totalVitD+= parseInt(props.ingredients[i].vitD);
    //         totalVitE+= parseInt(props.nutrition[i].vitE);
    //         totalVitK+= parseInt(props.nutrition[i].vitK);
    //         totalCalcium+= parseInt(props.nutrition[i].calcium);
    //         totalIron+= parseInt(props.nutrition[i].iron);
    //         totalMagnesium+= parseInt(props.nutrition[i].magnesium);
    //         totalThiamine+= parseInt(props.nutrition[i].thiamine);
    //         totalBiotin+= parseInt(props.nutrition[i].biotin);
    //         totalPantoAcid+= parseInt(props.nutrition[i].pantoAcid);
    //         totalPotassium+= parseInt(props.nutrition[i].potassium);
    //         totalPhosphorous+= parseInt(props.nutrition[i].phosphorous);
    //         totalIodine+= parseInt(props.nutrition[i].iodine);
    //         totalZinc+= parseInt(props.nutrition[i].zinc);
    //         totalSelenium+= parseInt(props.nutrition[i].selenium);
    //         totalCopper+= parseInt(props.nutrition[i].copper);
    //         totalManganese+= parseInt(props.nutrition[i].manganese);
    //         totalChromium+= parseInt(props.nutrition[i].chromium);
    //         totalMolybdenum+= parseInt(props.nutrition[i].molybdenum);
    //         totalChloride+= parseInt(props.nutrition[i].chloride);
            
    //     }


    //     servingContainer.value = totalServingContainer;
    //     servingQuantity.value = totalServingQuantity;
    //     servingQuantityUnits.value = totalServingQuantityUnits;
    //     servingSizeWeight.value = totalServingSizeWeight;
    //     servingSizeUnit.value = totalServingSizeUnit;
    //     calories.value =totalCalories;
    //     caloriesFat.value = totalCaloriesFat;
    //     totalFat.value = totalTotalFat;
    //     saturatedFat.value = totalSaturatedFat;
    //     transFat.value = totalTransFat;
    //     polyFat.value = totalPolyFat;
    //     monoFat.value = totalMonoFat;
    //     cholesterol.value = totalCholesterol;
    //     sodium.value = totalSodium;

    //     totalCarbs.value = totalTotalCarbs;
    //     dietaryFiber.value = totalDietaryFiber;
    //     sugar.value = totalSugar;
    //     sugarAlcohol.value = totalSugarAlcohol;
    //     addedSugar.value = totalAddedSugar;
    //     protein.value = totalProtein;
    //     vitA.value = totalVitA;
    //     vitB6.value = totalVitB6;
    //     vitB12.value = totalVitB12;
    //     vitC.value = totalVitC;
    //     vitD.value = totalVitD;
    //     vitE.value = totalVitE;
    //     vitK.value = totalVitK;

    //     calcium.value = totalCalcium;
    //     iron.value = totalIron;
    //     magnesium.value = totalMagnesium;
    //     thiamine.value = totalThiamine;

    //     biotin.value = totalBiotin;
    //     pantoAcid.value = totalPantoAcid;
    //     potassium.value = totalPotassium;
    //     phosphorous.value = totalPhosphorous;
    //     iodine.value = totalIodine;
    //     zinc.value = totalZinc;
    //     selenium.value = totalSelenium;
    //     copper.value = totalCopper;
    //     manganese.value = totalManganese;

    //     chromium.value = totalChromium;
    //     molybdenum.value = totalMolybdenum;
    //     chloride.value = totalChloride;

    //     }
    // }
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
    class RenderIngredientsInput extends Component {
        constructor(props) {
            super(props);
            this.state = {
                values: [],
                totalValue: [{
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
                            <Control.text type="number" model={".qty"+i} name={"qty"+i} className="qty ingredients-controls"/>
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
                            <Control.text model={".ingredient"+i} value={el||''} name={"ingredient"+i} className="recipe-ingredients ingredients-controls" onChange={this.handleInputChange.bind(this,i)}/>
                        <button class="submit-button-small" onClick={this.removeClick.bind(this)}>Remove</button></div>      
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
          
     handleInputChange(x, e) {

        // let totalServingContainer = 0;
        // let totalServingQuantity= 0;
        // let totalServingQuantityUnits= 0;
        // let totalServingSizeWeight= 0;
        // let totalServingSizeUnit= 0;
        // let totalCalories= 0;
        // let totalCaloriesFat= 0;
        // let totalTotalFat= 0;
        // let totalSaturatedFat= 0;
        // let totalTransFat= 0;
        // let totalPolyFat= 0;
        // let totalMonoFat= 0;
        // let totalCholesterol= 0;
        // let totalSodium= 0;
        // let totalTotalCarbs= 0;
        // let totalDietaryFiber= 0;
        // let totalSugar= 0;
        // let totalSugarAlcohol= 0;
        // let totalAddedSugar= 0;
        // let totalProtein= 0;
        // let totalVitA= 0;
        // let totalVitB6= 0;
        // let totalVitB12= 0;
        // let totalVitC= 0;
        // let totalVitD= 0;
        // let totalVitE= 0;
        // let totalVitK= 0;
        // let totalCalcium= 0;
        // let totalIron= 0;
        // let totalMagnesium= 0;
        // let totalThiamine= 0;
        // let totalBiotin= 0;
        // let totalPantoAcid= 0;
        // let totalPotassium= 0;
        // let totalPhosphorous= 0;
        // let totalIodine= 0;
        // let totalZinc= 0;
        // let totalSelenium= 0;
        // let totalCopper= 0;
        // let totalManganese= 0;
        // let totalChromium= 0;
        // let totalMolybdenum= 0;
        // let totalChloride= 0;
    
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

        const product = document.getElementsByClassName('recipe-ingredients');
        
   

        let values = [...this.state.values];
        values[x] = e.target.value;
        this.setState({values});


        props.ingredients.map((ingredient, index) => {

         if(values[x] == ingredient.name){
            
            this.setState(prevState => ({ totalValue: [...prevState.totalValue, 


            {
            totalCalories: this.state.totalValue[x].totalCalories + parseInt(props.nutrition[index].calories),
            totalCaloriesFat: this.state.totalValue[x].totalCaloriesFat + parseInt(props.nutrition[index].caloriesFat),
            totalTotalFat: this.state.totalValue[x].totalTotalFat + parseInt(props.nutrition[index].totalFat),
            totalSaturatedFat: this.state.totalValue[x].totalSaturatedFat + parseInt(props.nutrition[index].saturatedFat),
            totalTransFat: this.state.totalValue[x].totalTransFat + parseInt(props.nutrition[index].transFat), 
            totalPolyFat: this.state.totalValue[x].totalPolyFat + parseInt(props.nutrition[index].polyFat),
            totalMonoFat: this.state.totalValue[x].totalMonoFat + parseInt(props.nutrition[index].monoFat),
            totalCholesterol: this.state.totalValue[x].totalCholesterol + parseInt(props.nutrition[index].cholesterol),
            totalSodium: this.state.totalValue[x].totalSodium + parseInt(props.nutrition[index].sodium),
            totalTotalCarbs: this.state.totalValue[x].totalTotalCarbs + parseInt(props.nutrition[index].totalCarbs),
            totalDietaryFiber: this.state.totalValue[x].totalDietaryFiber + parseInt(props.nutrition[index].dietaryFiber),
            totalSugar: this.state.totalValue[x].totalSugar + parseInt(props.nutrition[index].sugar),
            totalSugarAlcohol: this.state.totalValue[x].totalSugarAlcohol + parseInt(props.nutrition[index].sugarAlcohol),
            totalAddedSugar: this.state.totalValue[x].totalAddedSugar + parseInt(props.nutrition[index].addedSugar),
            totalProtein: this.state.totalValue[x].totalProtein + parseInt(props.nutrition[index].protein),
            totalVitA: this.state.totalValue[x].totalVitA + parseInt(props.nutrition[index].vitA),
            totalVitB6: this.state.totalValue[x].totalVitB6 + parseInt(props.nutrition[index].vitB6),
            totalVitB12: this.state.totalValue[x].totalVitB12 + parseInt(props.nutrition[index].vitB12),
            totalVitC: this.state.totalValue[x].totalVitC + parseInt(props.nutrition[index].vitC),
            totalVitD: this.state.totalValue[x].totalVitD + parseInt(props.nutrition[index].vitD),
            totalVitE: this.state.totalValue[x].totalVitE + parseInt(props.nutrition[index].vitE),
            totalVitK: this.state.totalValue[x].totalVitK + parseInt(props.nutrition[index].vitK),
            totalCalcium: this.state.totalValue[x].totalCalcium + parseInt(props.nutrition[index].calcium),
            totalIron: this.state.totalValue[x].totalIron + parseInt(props.nutrition[index].iron),
            totalMagnesium: this.state.totalValue[x].totalMagnesium + parseInt(props.nutrition[index].magnesium),
            totalThiamine: this.state.totalValue[x].totalThiamine + parseInt(props.nutrition[index].thiamine),
            totalBiotin: this.state.totalValue[x].totalBiotin + parseInt(props.nutrition[index].biotin),
            totalPantoAcid: this.state.totalValue[x].totalPantoAcid + parseInt(props.nutrition[index].pantoAcid),
            totalPotassium: this.state.totalValue[x].totalPotassium + parseInt(props.nutrition[index].potassium),
            totalPhosphorous: this.state.totalValue[x].totalPhosphorous + parseInt(props.nutrition[index].phosphorous),
            totalIodine: this.state.totalValue[x].totalIodine + parseInt(props.nutrition[index].iodine),
            totalZinc: this.state.totalValue[x].totalZinc + parseInt(props.nutrition[index].zinc),
            totalSelenium: this.state.totalValue[x].totalSelenium + parseInt(props.nutrition[index].selenium),
            totalCopper: this.state.totalValue[x].totalCopper + parseInt(props.nutrition[index].copper),
            totalManganese: this.state.totalValue[x].totalManganese + parseInt(props.nutrition[index].manganese),
            totalChromium: this.state.totalValue[x].totalChromium + parseInt(props.nutrition[index].chromium),
            totalMolybdenum: this.state.totalValue[x].totalMolybdenum + parseInt(props.nutrition[index].molybdenum),
            totalChloride: this.state.totalValue[x].totalChloride + parseInt(props.nutrition[index].chloride)} ]
      
            })) 

            console.log(this.state.totalValue)

        }

        
        // totalServingContainer+= parseInt(props.nutrition[index].servingSize); //SS by Container
        // totalServingQuantity+= parseInt(props.nutrition[index].servingSizeQty);
        // totalServingQuantityUnits+= parseInt(props.nutrition[index].servingSizeQtyUnit);
        // totalServingSizeWeight+= parseInt(props.nutrition[index].servingSizeWeight);
        // totalServingSizeUnit+= parseInt(props.nutrition[index].servingSizeUnit);
        // totalCalories+= parseInt(props.nutrition[index].calories);
        // totalCaloriesFat+= parseInt(props.nutrition[index].caloriesFat);
        // totalTotalFat+= parseInt(props.nutrition[index].totalFat);
        // totalSaturatedFat+= parseInt(props.nutrition[index].saturatedFat);
        // totalTransFat+= parseInt(props.nutrition[index].transFat); 
        // totalPolyFat+= parseInt(props.nutrition[index].polyFat);
        // totalMonoFat+= parseInt(props.nutrition[index].monoFat);
        // totalCholesterol+= parseInt(props.nutrition[index].cholesterol);
        // totalSodium+= parseInt(props.nutrition[index].sodium);
        // totalTotalCarbs+= parseInt(props.nutrition[index].totalCarbs);
        // totalDietaryFiber+= parseInt(props.nutrition[index].dietaryFiber);
        // totalSugar+= parseInt(props.nutrition[index].sugar);
        // totalSugarAlcohol+= parseInt(props.nutrition[index].sugarAlcohol);
        // totalAddedSugar+= parseInt(props.nutrition[index].addedSugar);
        // totalProtein+= parseInt(props.nutrition[index].protein);
        // totalVitA+= parseInt(props.nutrition[index].vitA);
        // totalVitB6+= parseInt(props.nutrition[index].vitB6);
        // totalVitB12+= parseInt(props.nutrition[index].vitB12);
        // totalVitC+= parseInt(props.nutrition[index].vitC);
        // totalVitD+= parseInt(props.ingredients[index].vitD);
        // totalVitE+= parseInt(props.nutrition[index].vitE);
        // totalVitK+= parseInt(props.nutrition[index].vitK);
        // totalCalcium+= parseInt(props.nutrition[index].calcium);
        // totalIron+= parseInt(props.nutrition[index].iron);
        // totalMagnesium+= parseInt(props.nutrition[index].magnesium);
        // totalThiamine+= parseInt(props.nutrition[index].thiamine);
        // totalBiotin+= parseInt(props.nutrition[index].biotin);
        // totalPantoAcid+= parseInt(props.nutrition[index].pantoAcid);
        // totalPotassium+= parseInt(props.nutrition[index].potassium);
        // totalPhosphorous+= parseInt(props.nutrition[index].phosphorous);
        // totalIodine+= parseInt(props.nutrition[index].iodine);
        // totalZinc+= parseInt(props.nutrition[index].zinc);
        // totalSelenium+= parseInt(props.nutrition[index].selenium);
        // totalCopper+= parseInt(props.nutrition[index].copper);
        // totalManganese+= parseInt(props.nutrition[index].manganese);
        // totalChromium+= parseInt(props.nutrition[index].chromium);
        // totalMolybdenum+= parseInt(props.nutrition[index].molybdenum);
        // totalChloride+= parseInt(props.nutrition[index].chloride);    

        
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

        // servingContainer.value = totalServingContainer;
        // servingQuantity.value = totalServingQuantity;
        // servingQuantityUnits.value = totalServingQuantityUnits;
        // servingSizeWeight.value = totalServingSizeWeight;
        // servingSizeUnit.value = totalServingSizeUnit;
        // calories.value =totalCalories;
        // caloriesFat.value = totalCaloriesFat;
        // totalFat.value = totalTotalFat;
        // saturatedFat.value = totalSaturatedFat;
        // transFat.value = totalTransFat;
        // polyFat.value = totalPolyFat;
        // monoFat.value = totalMonoFat;
        // cholesterol.value = totalCholesterol;
        // sodium.value = totalSodium;

        // totalCarbs.value = totalTotalCarbs;
        // dietaryFiber.value = totalDietaryFiber;
        // sugar.value = totalSugar;
        // sugarAlcohol.value = totalSugarAlcohol;
        // addedSugar.value = totalAddedSugar;
        // protein.value = totalProtein;
        // vitA.value = totalVitA;
        // vitB6.value = totalVitB6;
        // vitB12.value = totalVitB12;
        // vitC.value = totalVitC;
        // vitD.value = totalVitD;
        // vitE.value = totalVitE;
        // vitK.value = totalVitK;

        // calcium.value = totalCalcium;
        // iron.value = totalIron;
        // magnesium.value = totalMagnesium;
        // thiamine.value = totalThiamine;

        // biotin.value = totalBiotin;
        // pantoAcid.value = totalPantoAcid;
        // potassium.value = totalPotassium;
        // phosphorous.value = totalPhosphorous;
        // iodine.value = totalIodine;
        // zinc.value = totalZinc;
        // selenium.value = totalSelenium;
        // copper.value = totalCopper;
        // manganese.value = totalManganese;

        // chromium.value = totalChromium;
        // molybdenum.value = totalMolybdenum;
        // chloride.value = totalChloride;


        



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