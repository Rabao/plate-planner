import React, {useState} from 'react'
import {Link, useNavigate} from 'react-router-dom'
import { Breadcrumb, Col, Button } from 'react-bootstrap'
import { Control, LocalForm, Errors } from 'react-redux-form';
import Loader from '../SubComponents/Loader/Loader';
import axios from 'axios';


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
    // let blob = '';
    // function fileSelectedHandler (event) {
    //     setSelectedFile(event.target.files[0]);
    //     onFileUpload();
    // }


    // function onFileUpload() {
    //     // const formData = new FormData();

    //     // formData.append(
    //     //     "file",
    //     //     selectedFile,
    //     //     selectedFile.name
    //     // );

    //     // console.log(selectedFile);
    //     axios.post("/uploads/file", formData);

    // }


    // const createImage = (newImage) => axios.post("/uploads/file", newImage);

    // const createPost = async (post) => {
    //     try {
    //     await createImage(post);
    //     } catch (error) {
    //     console.log(error.message);
    //     }
    // };

    // const convertToBase64 = (file) => {
    //     return new Promise((resolve, reject) => {
    //     const fileReader = new FileReader();
    //     fileReader.readAsDataURL(file);
    //     fileReader.onload = () => {
    //         resolve(fileReader.result);
    //     };
    //     fileReader.onerror = (error) => {
    //         reject(error);
    //     };
    //     });
        
    // };
    // const handleFileUpload = async (e) => {
    //     if(e.target.files[0].size > 2097152){
    //         alert("File exceeds 2MB limit!");
    //         document.getElementById("img-input").value = "";       
    //     }
    //     const file = e.target.files[0];
    //     base64Img = await convertToBase64(file);
    //     setSelectedFile({ ...selectedFile, myFile: base64Img });
    //     console.log(base64Img);
    // };

    // let newB64 = "";
    // const handleChange = (e) => {
    //     const imgInput = document.getElementById('img-input');
    //     imgInput.addEventListener('change', function (e) {        
    //         // setSelectedFile(imgInput.files[0]);
    //         const reader = new FileReader();
    //         reader.onload = function () {
    //         newB64 = new Image()
    //         newB64.src = reader.result    

    //         setTimeout(() => {{
    //             blob = b64toBlob(newB64); 
    //             }}, 500)
           
    //         // document.getElementById('preview-image-container').appendChild(newB64)
            
    //         }
    //         reader.readAsDataURL(imgInput.files[0])
    //         reader.readAsText(imgInput.files[0])
    //     }, false)

    // }

    // function urlB64ToUint8Array(base64String) {
    //     const padding = '='.repeat((4 - base64String.length % 4) % 4);
    //     const base64 = (base64String + padding).replace(/-/g, '+').replace(/_/g, '/');
    
    //     const rawData = window.atob(base64);
    //     const outputArray = new Uint8Array(rawData.length);
    
    //     for (let i = 0; i < rawData.length; ++i) {
    //         outputArray[i] = rawData.charCodeAt(i);
    //     }
    
    //     return outputArray;
    // }
    // const b64toBlob = (b64Data, contentType='', sliceSize=512) => {
    //     const byteCharacters = atob(b64Data);
    //     const byteArrays = [];
      
    //     for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
    //       const slice = byteCharacters.slice(offset, offset + sliceSize);
      
    //       const byteNumbers = new Array(slice.length);
    //       for (let i = 0; i < slice.length; i++) {
    //         byteNumbers[i] = slice.charCodeAt(i);
    //       }
      
    //       const byteArray = new Uint8Array(byteNumbers);
    //       byteArrays.push(byteArray);
    //     }
      
    //      const blob = new Blob(byteArrays, {type: contentType});
    //     return blob;
    //   }


    function handleChange(event) {
        setSelectedFile(document.getElementById('img-input').files[0]); 
        console.log("THIS IS THE SELECTED FILE: " + selectedFile);
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
        const type = document.getElementById('type');
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
        filePath = '/' + selectedFile.name;
        
        console.log(filePath)
        
        fetch(' http://localhost:8080/upload', {
          method: 'POST',
          body: data
        })
        
        //------------------------------------------------------------------SUBMISSION LOGIC
   
        console.log("THIS IS THE FILE PATH:" + filePath);
        props.postRecipe(id,name.value,stepNum,filePath,notes.value,props.authUser.id,type.value);
        
        for(let i=0; i< steps.length; i++){     
            props.postSteps(id,stepNum,steps[i].value)
            stepNum++;             
        }

        for(let i=0; i< ingredients.length; i++){
            props.postIngredients(id,1,ingredients[i].value,qty[i].value,unit[i].value)
        }

        // setTimeout(() => {
        // pageRedirect= true;
        // if(pageRedirect === true){
        //     navigate(path); 
        // }}, 100)
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
                        <Control.text model={stepsMode} name={stepsHtmlIdent}  className="recipe-steps"/><button class="remove-step-button" onClick={() => {removeStep()}}>-</button>
                        </div>

            stepArr.push(stepText);
            console.log(stepsHtmlIdent); 
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
                <Col><button onClick={() => {addStep()}}>Add New Step</button><button onClick={() => {removeAll()}}>Remove All</button></Col>     
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
                            <option>Deciliter</option>
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
                            <option>Millimeter</option>
                            <option>Centimeter</option>
                            <option>Meter</option>
                            <option>Inch</option>
                        </Control.select>
                        <Control.text model={nameMode} name={nameHtmlIdent} id="ingredient" className="recipe-ingredients ingredients-controls"/>
                        <button id="remove-ingredient-button" onClick={() => {removeIngredient()}}>-</button>
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
                    <Col><button onClick={() => {addIngredient()}}>Add Ingredient</button><button onClick={() => {removeAll()}}>Remove All</button></Col>     
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
                                                
                                <Col md={10}>
                                <label htmlFor="name">Recipe Title</label> 
                                    <Control.text model='.name' 
                                    name="name" 
                                    className="recipe-title"
                                    id="name"/> 
                                </Col>
                               
                                <Col md={2}>
                           
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