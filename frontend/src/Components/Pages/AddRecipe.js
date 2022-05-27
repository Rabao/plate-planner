import React, {Component, useState, useEffect, useRef} from 'react'
import {Link, useNavigate} from 'react-router-dom'
import { Breadcrumb, Col, Row } from 'react-bootstrap'
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

    const [toggle, setToggle] = useState(false);
    const toggleDvCalc = document.getElementsByClassName('toggle-dvcalcComponent')[0];

    function handleInnerToggle() {

        if(toggleDvCalc.classList.contains('_close')){
            toggleDvCalc.classList.remove('_close');
            toggleDvCalc.classList.add('_open');
        } else {
            toggleDvCalc.classList.remove('_open');
            toggleDvCalc.classList.add('_close');
        }

        setToggle({ toggle: !toggle })

    } 

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

    // function handleChange() {  
    //     setSelectedFile(document.getElementById('img-input').files[0]);
    // }

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

        // const formData = new FormData();

        // let data = new FormData()
        // data.append('file', selectedFile)
        // filePath = '/uploads/' + selectedFile.name;
        
        // console.log(filePath)
        
        // fetch(' http://localhost:8080/upload', {
        //   method: 'POST',
        //   body: data
        // })

        // ------------------------------------------------------------------SUBMISSION LOGIC
        
        // console.log("WHY??: " + calories.value, caloriesFat.value, 
        //             totalFat.value, saturatedFat.value, transFat.value, polyFat.value,
        //             monoFat.value, cholesterol.value, sodium.value, potassium.value, totalCarbs.value, 
        //             dietaryFiber.value, sugar.value, sugarAlcohol.value, addedSugar.value,
        //             protein.value, vitA.value, vitB6.value, vitB12.value, vitC.value, 
        //             vitD.value, vitE.value, vitK.value, calcium.value, iron.value,
        //             magnesium.value, thiamine.value, biotin.value, pantoAcid.value, 
        //             phosphorous.value, iodine.value, zinc.value, selenium.value,
        //             copper.value, manganese.value, chromium.value, molybdenum.value, chloride.value, id)
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
            props.postIngredients(id,1,ingredients[i].value,qty[i].value,unit[i].value)
        }

        setTimeout(() => {
        pageRedirect= true;
        if(pageRedirect === true){
            navigate(path); 
        }}, 500)
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
                                {/* <div><DailyValueForm 
                                        ingredients={props.ingredients} nutrition={props.nutrition}
                                        found={found}/> */}
                                         <div className="dvcalc" data-id="dvcalc"><span>Add Nutritional Value Details</span></div>
                                            <div className="toggle-dvcalc">
                                                <Row className="form-group">
                                                    <Col md={4}>
                                                        <label htmlFor="servingSize">Serving Size</label> 
                                                        <Control.text model='.servingSize' 
                                                            id="servingSize" 
                                                            name="servingSize" 
                                                            className="form-control"/>
                                                    </Col>
                                                    <Col md={4}>
                                                        <label htmlFor="calories">Calories</label> 
                                                            <Control.text model='.calories' 
                                                            id="calories" 
                                                            name="calories" 
                                                            className="form-control"/>
                                                    </Col>
                                                    <Col md={4}>
                                                        <label htmlFor="caloriesFat">Calories from Fat</label> 
                                                            <Control.text model='.caloriesFat' 
                                                            id="caloriesFat" 
                                                            name="caloriesFat" 
                                                            className="form-control"/>
                                                    </Col>
                                                </Row>
                                                <Row className="form-group">
                                                    <Col md={4}>
                                                        <label htmlFor="totalFat">Total Fat</label> 
                                                            <Control.text model='.totalFat' 
                                                            id="totalFat" 
                                                            name="totalFat" 
                                                            className="form-control"/>
                                                    </Col>
                                                    <Col md={2}>
                                                        <label htmlFor="saturatedFat">Saturated Fat</label> 
                                                            <Control.text model='.saturatedFat' 
                                                            id="saturatedFat" 
                                                            name="saturatedFat" 
                                                            className="form-control"/>
                                                    </Col>
                                                    <Col md={2}>
                                                        <label htmlFor="transFat">Trans Fat</label> 
                                                            <Control.text model='.transFat' 
                                                            id="transFat" 
                                                            name="transFat" 
                                                            className="form-control"/>
                                                    </Col>
                                                    <Col md={2}>
                                                        <label htmlFor="polyFat">Polyunsaturated Fat</label> 
                                                            <Control.text model='.polyFat' 
                                                            id="polyFat" 
                                                            name="polyFat" 
                                                            className="form-control"/>
                                                    </Col>
                                                    <Col md={2}>
                                                        <label htmlFor="monoFat">Monounsaturated Fat</label> 
                                                            <Control.text model='.monoFat' 
                                                            id="monoFat" 
                                                            name="monoFat" 
                                                            className="form-control"/>
                                                    </Col>
                                                </Row>
                                                <Row className="form-group">
                                                    <Col md={4}>
                                                        <label htmlFor="cholesterol">Cholesterol</label> 
                                                            <Control.text model='.cholesterol' 
                                                            id="cholesterol" 
                                                            name="cholesterol" 
                                                            className="form-control"/>
                                                    </Col>
                                                    <Col md={4}>
                                                        <label htmlFor="sodium">Sodium</label> 
                                                            <Control.text model='.sodium' 
                                                            id="sodium" 
                                                            name="sodium" 
                                                            className="form-control"/>
                                                    </Col>
                                                    <Col md={4}>
                                                        <label htmlFor="protein">Protein</label> 
                                                            <Control.text model='.protein' 
                                                            id="protein" 
                                                            name="protein" 
                                                            className="form-control"/>
                                                    </Col>
                                                </Row>
                                                <Row className="form-group">
                                                    <Col md={4}>
                                                        <label htmlFor="totalCarbs">Total Carbohydrates</label> 
                                                            <Control.text model='.totalCarbs' 
                                                            id="totalCarbs" 
                                                            name="totalCarbs" 
                                                            className="form-control"/>
                                                    </Col>
                                                    <Col md={2}>
                                                        <label htmlFor="dietaryFiber">Diet. Fiber</label> 
                                                            <Control.text model='.dietaryFiber' 
                                                            id="dietaryFiber" 
                                                            name="dietaryFiber" 
                                                            className="form-control"/>
                                                    </Col>
                                                    <Col md={2}>
                                                        <label htmlFor="sugar">Sugar</label> 
                                                            <Control.text model='.sugar' 
                                                            id="sugar" 
                                                            name="sugar" 
                                                            className="form-control"/>
                                                    </Col>
                                                    <Col md={2}>
                                                        <label htmlFor="sugarAlcohol">Sugar Alc.</label> 
                                                            <Control.text model='.sugarAlcohol' 
                                                            id="sugarAlcohol" 
                                                            name="sugarAlcohol" 
                                                            className="form-control"/>
                                                    </Col>
                                                    <Col md={2}>
                                                        <label htmlFor="addedSugar">Addtl.Sugar</label> 
                                                            <Control.text model='.addedSugar' 
                                                            id="addedSugar" 
                                                            name="addedSugar" 
                                                            className="form-control"/>
                                                    </Col>
                                                </Row>
                                                <div className="dvcalc" onClick={() => {handleInnerToggle()}}><span>Add Optional Vitamins and Minerals</span></div>
                                                <div className="toggle-dvcalcComponent _close">
                                                    <Row className="form-group">
                                                        <Col md={3}>
                                                            <label htmlFor="vitA">Vitamin A</label> 
                                                                <Control.text model='.vitA' 
                                                                id="vitA" 
                                                                name="vitA" 
                                                                className="form-control"/>
                                                        </Col>
                                                        <Col md={3}>
                                                            <label htmlFor="vitB6">Vitamin B6</label> 
                                                                <Control.text model='.vitB6' 
                                                                id="vitB6" 
                                                                name="vitB6" 
                                                                className="form-control"/>
                                                        </Col>
                                                        <Col md={3}>
                                                            <label htmlFor="vitB12">Vitamin B12</label> 
                                                                <Control.text model='.vitB12' 
                                                                id="vitB12" 
                                                                name="vitB12" 
                                                                className="form-control"/>
                                                        </Col>
                                                        <Col md={3}>
                                                            <label htmlFor="vitC">Vitamin C</label> 
                                                                <Control.text model='.vitC' 
                                                                id="vitC" 
                                                                name="vitC" 
                                                                className="form-control"/>
                                                        </Col>
                                                    </Row>
                                                    <Row className="form-group">
                                                        <Col md={4}>
                                                            <label htmlFor="vitD">Vitamin D</label> 
                                                                <Control.text model='.vitD' 
                                                                id="vitD" 
                                                                name="vitD" 
                                                                className="form-control"/>
                                                        </Col>
                                                        <Col md={4}>
                                                            <label htmlFor="vitE">Vitamin E</label> 
                                                                <Control.text model='.vitE' 
                                                                id="vitE" 
                                                                name="vitE" 
                                                                className="form-control"/>
                                                        </Col>
                                                        <Col md={4}>
                                                            <label htmlFor="vitK">Vitamin K</label> 
                                                                <Control.text model='.vitK' 
                                                                id="vitK" 
                                                                name="vitK" 
                                                                className="form-control"/>
                                                        </Col>
                                                    </Row>
                                                    <Row className="form-group">
                                                        <Col md={2}>
                                                            <label htmlFor="calcium">Calcium</label> 
                                                                <Control.text model='.calcium' 
                                                                id="calcium" 
                                                                name="calcium" 
                                                                className="form-control"/>
                                                        </Col>
                                                        <Col md={2}>
                                                            <label htmlFor="iron">Iron</label> 
                                                                <Control.text model='.iron' 
                                                                id="iron" 
                                                                name="iron" 
                                                                className="form-control"/>
                                                        </Col>
                                                        <Col md={2}>
                                                            <label htmlFor="magnesium">Magnesium</label> 
                                                                <Control.text model='.magnesium' 
                                                                id="magnesium" 
                                                                name="magnesium" 
                                                                className="form-control"/>
                                                        </Col>
                                                        <Col md={2}>
                                                            <label htmlFor="thiamine">Thiamine</label> 
                                                                <Control.text model='.thiamine' 
                                                                id="thiamine" 
                                                                name="thiamine" 
                                                                className="form-control"/>
                                                        </Col>
                                                        <Col md={2}>
                                                            <label htmlFor="biotin">Biotin</label> 
                                                                <Control.text model='.biotin' 
                                                                id="biotin" 
                                                                name="biotin" 
                                                                className="form-control"/>
                                                        </Col>
                                                        <Col md={2}>
                                                            <label htmlFor="pantoAcid">Pant. Acid</label> 
                                                                <Control.text model='.pantoAcid' 
                                                                id="pantoAcid" 
                                                                name="pantoAcid" 
                                                                className="form-control"/>
                                                        </Col>
                                                    </Row>
                                                    <Row className="form-group">
                                                        <Col md={2}>
                                                            <label htmlFor="potassium">Potassium</label> 
                                                                <Control.text model='.potassium' 
                                                                id="potassium" 
                                                                name="potassium" 
                                                                className="form-control"/>
                                                        </Col>
                                                        <Col md={2}>
                                                            <label htmlFor="phosphorous">Phosphorous</label> 
                                                                <Control.text model='.phosphorous' 
                                                                id="phosphorous" 
                                                                name="phosphorous" 
                                                                className="form-control"/>
                                                        </Col>
                                                        <Col md={2}>
                                                            <label htmlFor="iodine">Iodine</label> 
                                                                <Control.text model='.iodine' 
                                                                id="iodine" 
                                                                name="iodine" 
                                                                className="form-control"/>
                                                        </Col>
                                                        <Col md={2}>
                                                            <label htmlFor="zinc">Zinc</label> 
                                                                <Control.text model='.zinc' 
                                                                id="zinc" 
                                                                name="zinc" 
                                                                className="form-control"/>
                                                        </Col>
                                                        <Col md={2}>
                                                            <label htmlFor="selenium">Selenium</label> 
                                                                <Control.text model='.selenium' 
                                                                id="selenium" 
                                                                name="selenium" 
                                                                className="form-control"/>
                                                        </Col>
                                                        <Col md={2}>
                                                            <label htmlFor="copper">Copper</label> 
                                                                <Control.text model='.copper' 
                                                                id="copper" 
                                                                name="copper" 
                                                                className="form-control"/>
                                                        </Col>
                                                    </Row>
                                                    <Row className="form-group">
                                                        <Col md={2}></Col>
                                                        <Col md={2}>
                                                            <label htmlFor="manganese">Manganese</label> 
                                                                <Control.text model='.manganese' 
                                                                id="manganese" 
                                                                name="manganese" 
                                                                className="form-control"/>
                                                        </Col>
                                                        <Col md={2}>
                                                            <label htmlFor="chromium">Chromium</label> 
                                                                <Control.text model='.chromium' 
                                                                id="chromium" 
                                                                name="chromium" 
                                                                className="form-control"/>
                                                        </Col>
                                                        <Col md={2}>
                                                            <label htmlFor="molybdenum">Molybdenum</label> 
                                                                <Control.text model='.molybdenum' 
                                                                id="molybdenum" 
                                                                name="molybdenum" 
                                                                className="form-control"/>
                                                        </Col>
                                                        <Col md={2}>
                                                            <label htmlFor="chloride">Chloride</label> 
                                                                <Control.text model='.chloride' 
                                                                id="chloride" 
                                                                name="chloride" 
                                                                className="form-control"/>
                                                        </Col>
                                                    </Row>
                                                </div>
                                        </div>
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