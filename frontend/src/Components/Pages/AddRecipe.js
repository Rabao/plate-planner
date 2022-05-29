import React, {Component, useState, useEffect, useRef} from 'react'
import {Link, useNavigate} from 'react-router-dom'
import { Breadcrumb, Col, Button } from 'react-bootstrap'
import { Control, LocalForm, Errors } from 'react-redux-form';
import Loader from '../SubComponents/Loader/Loader';
import axios from 'axios';
import DailyValueForm from '../SubComponents/DailyValueForm';
import IngredientSteps from '../SubComponents/IngredientSteps';


function AddRecipe(props) {
    const navigate = useNavigate();
    let pageRedirect= false;
    let found = false;  
    let filePath= "";
    let tags = [];
    let SPACE_BAR = 32;

    const servingSize = document.getElementById('servingSize');
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

    const [selectedFile, setSelectedFile] = useState([]);
    const [preview, setPreview] = useState('');
    const fileInputRef = useRef();

    useEffect(() => {
        if(selectedFile){
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreview(reader.result)
            }
            if(selectedFile && selectedFile.type){
                reader.readAsDataURL(selectedFile);
            }
        } else {
            setPreview(null)
        }
    }, [selectedFile])

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
    function getIdByIngredientName (name){
            return props.ingredients.filter(ingredients => ingredients.name === name)[0].id;
        }

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
        const tags = document.getElementsByClassName('recipe-tags');
        let delimitedTags = tags[0].value.split(" ");
        //------------------------------------------------------------------IMAGE READER

        const formData = new FormData();

        let data = new FormData()
        data.append('file', selectedFile)
        filePath = '/uploads/' + selectedFile.name;
        
        console.log(filePath)
        
        fetch(' http://localhost:8080/upload', {
          method: 'POST',
          body: data
        })

        // ------------------------------------------------------------------SUBMISSION LOGIC
        
        props.postRecipeNutrition( servingSize.value, calories.value, caloriesFat.value, 
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
            props.postIngredients(id,getIdByIngredientName(ingredients[i].value),ingredients[i].value,qty[i].value,unit[i].value)
        }

        for(let i=0; i< delimitedTags.length; i++){
            props.postRecipeTags(id, delimitedTags[i])
        }

        setTimeout(() => {
        pageRedirect= true;
        if(pageRedirect === true){
            navigate(path); 
        }}, 600)
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
                                        <Control.text model='.name' 
                                        name="name" 
                                        className="recipe-title"
                                        id="name"
                                        placeholder="Name your recipe..."/> 
                                    </Col>
                                    <Col md={2}>
                                    <label htmlFor="recipe-type">Meal Type</label><br/> 
                                    <select model=".recipe-type" name="recipe-type" className="recipe-type" defaultValue={"Breakfast"}>
                                            <option>Breakfast</option>
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
                                        <IngredientSteps/>
                                    </div>
                                    </Col>
                                    <Col md={6}>
                                    <div className="image-submitter">
                                        <form>         
                                            <input type="file" id="img-input" 
                                            accept="image/*" 
                                            style={{display:"none"}} 
                                            ref={fileInputRef}
                                            onChange={() => {
                                                const file = document.getElementById('img-input').files[0];
                                                if(file && file.type.substr(0,5)==="image"){ //validates file type
                                                    {console.log("CONSOLE: " + file)}
                                                    setSelectedFile(file)
                                                } else {
                                                    setSelectedFile(null)
                                                }}} 
                                            
                                            onDrop={() => {
                                                const file = document.getElementById('img-input').files[0];
                                                if(file && file.type.substr(0,5)==="image"){ //validates file type
                                                    {console.log("CONSOLE: " + file)}
                                                    setSelectedFile(file)
                                                } else {
                                                    setSelectedFile(null)
                                                }}} />
                                            { preview ? <img id="preview-img" 
                                                                        src={preview} 
                                                                        onClick={() => {
                                                                            setSelectedFile([])
                                                                            setPreview('')
                                                                        }}
                                                                        alt={"Filename: " + selectedFile.name + ", File type: " + selectedFile.type + ", File size: " + selectedFile.size + " bytes"}/> 
                                            : 
                                            <div>
                                                <button onClick={(e) => {
                                                    e.preventDefault();
                                                    fileInputRef.current.click();
                                                }}>Click here to add an image.</button>
                                                
                                            </div>}
                                        </form>
                                    </div>
                                    </Col>
                                </div>
                                <div><DailyValueForm 
                                        ingredients={props.ingredients} nutrition={props.nutrition}
                                        found={found}/>
                                       </div>
                                       <Col md={12}>
                                <h5>Tags</h5>
                                    <Control.text model='.tags' 
                                        name="tags"
                                        id="tags"
                                        className="recipe-forms recipe-tags"/>             
                                </Col>  
                                <Col md={12}>
                                <h5>Notes</h5>
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