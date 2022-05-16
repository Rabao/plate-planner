import React, { Component, useEffect, useState } from 'react'
import { createStore, combineReducers, applyMiddleware } from 'redux';
import {Link} from 'react-router-dom'
import { Breadcrumb, Col } from 'react-bootstrap'
import { Control, LocalForm, Errors } from 'react-redux-form';
import Loader from '../SubComponents/Loader/Loader';
import {useDropzone} from 'react-dropzone';

const thumbsContainer = {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 0
  };
  
  const thumb = {
    display: 'inline-flex',
    borderRadius: 2,
    border: '1px solid #eaeaea',
    marginBottom: 8,
    marginRight: 8,
    width: 100,
    height: 100,
    padding: 4,
    boxSizing: 'border-box'
  };
  
  const thumbInner = {
    display: 'flex',
    minWidth: 0,
    overflow: 'hidden'
  };
  
  const img = {
    display: 'block',
    width: 'auto',
    height: '100%'
  };
  

function AddRecipe() {

    const [files, setFiles] = useState([]);
    const {getRootProps, getInputProps} = useDropzone({
      accept: {
        'image/*': []
      },
      onDrop: acceptedFiles => {
        setFiles(acceptedFiles.map(file => Object.assign(file, {
          preview: URL.createObjectURL(file)
        })));
      }
    });
    
    const thumbs = files.map(file => (
      <div style={thumb} key={file.name}>
        <div style={thumbInner}>
          <img
            src={file.preview}
            style={img}
            // Revoke data uri after image is loaded
            onLoad={() => { URL.revokeObjectURL(file.preview) }}
          />
        </div>
      </div>
    ));
  
    useEffect(() => {
      // Make sure to revoke the data uris to avoid memory leaks, will run on unmount
      return () => files.forEach(file => URL.revokeObjectURL(file.preview));
    }, []);

    const renderStepsInput = () => {

        const addStep = () => {         
            stepArr.push(stepText);
        }

        const removeStep = () => {
            stepArr.pop(stepText);
        }
        
        const removeAll = () => {
            while(stepArr.length > 0){
                stepArr.pop(stepText)
            }
        }

        let stepText = <div className="form-inline">
                            <Control.text model=".steps" name="steps" className="recipe-steps"/><button id="remove-step-button" onClick={() => {removeStep()}}>-</button>
                        </div>
        let stepArr =[]
        return(
                <div>
                    <label htmlFor="steps">Steps</label> 
                    {stepArr}
                    <Col><button onClick={() => {addStep()}}>Add New Step</button><button onClick={() => {removeAll()}}>Remove All</button></Col>     
                </div>
        )
    }

    const renderIngredientsInput = () => {

        const addIngredient = () => {         
            ingredientArr.push(ingredientText);
        }

        const removeIngredient = () => {
            ingredientArr.pop(ingredientText);
        }
        
        const removeAll = () => {
            while(ingredientArr.length > 0){
                ingredientArr.pop(ingredientText)
            }
        }

        let ingredientText = <div className="form-inline">
                            <Control.text type="number" model=".ingredient-qty" name="ingredient-qty" className="recipe-ingredients"/>
                            <Control.select type=""model=".ingredient-unit" name="ingredient-unit" className="recipe-ingredients">
                                <option>Unit of Measurement</option>
                                <option disabled>Volume</option>
                                <option disabled></option>
                                <option>Teaspoon</option>
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
                                <option>Millimeter</option>
                                <option>Centimeter</option>
                                <option>Meter</option>
                                <option>Inch</option>
                            </Control.select>
                            <Control.text model=".ingredient-name" name="ingredient-name" className="recipe-ingredients"/>
                            <button id="remove-step-button" onClick={() => {removeIngredient()}}>-</button>
                        </div>
        let ingredientArr =[]
        return(
                <div>
                    <label htmlFor="steps">Ingredients</label> 
                    {ingredientArr}
                    <Col><button onClick={() => {addIngredient()}}>Add Ingredient</button><button onClick={() => {removeAll()}}>Remove All</button></Col>     
                </div>
        )
    }





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
                            <LocalForm >                        
                                <Col md={12}>
                                <label htmlFor="title">Recipe Title</label> 
                                    <Control.text model='.title' 
                                    name="title" 
                                    className="recipe-forms"/> 
                                </Col>
                                <div className="row">                                   
                                <Col md={6}>
                                <div className="steps-container">
                                    {renderIngredientsInput()}
                                    {renderStepsInput()}
                                </div>
                                </Col>
                                <Col md={6}>
                                    <div className="image-dropzone">
                                        <section className="container">
                                            <div {...getRootProps({className: 'dropzone'})}>
                                                <input {...getInputProps()} />
                                                <p>Drag 'n' drop some files here, or click to select files</p>
                                            </div>
                                            <aside style={thumbsContainer}>
                                                {thumbs}
                                            </aside>
                                        </section>
                                    </div>
                                </Col>
                                </div>
                                <Col md={12}>
                                <label htmlFor="title">Notes</label> 
                                    <Control.textarea model='.notes' 
                                        name="notes"
                                        rows="12" 
                                        className="recipe-forms"/> 
                                </Col>  
                                <Col md={8}>
                                    <button type='submit' color="primary">Post Recipe</button>
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