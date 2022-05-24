    
import React, {Component} from 'react'  
import { Control } from 'react-redux-form';

class IngredientSteps  extends Component {
    constructor(props) {
        super(props);
        this.state = {
            ingredientValues: [],
            stepValues: []
        };
      }
    
    //-------------------------------------------------------REACTIONARY RECIPE STEPS INPUTS
    //-------------------------------------------------------REACTIONARY RECIPE STEPS INPUTS
    //-------------------------------------------------------REACTIONARY RECIPE STEPS INPUTS
    renderStepsInput = () => {
        return this.state.stepValues.map((el, i) =>
            <div key={i}>
                        <Control.textarea model={".step"+i} name={"step"+i} defaultValue={el||''}  className="recipe-steps"/>
                        <button class="submit-button-small" onClick={this.removeStep.bind(this,i)}>Remove</button>
            </div>
            )
        }

    addStep(){
        this.setState(prevState => ({ stepValues: [...prevState.stepValues, '']}))
    }
    
    removeStep(i){
        let stepValues = [...this.state.stepValues];
        stepValues.splice(i,1);
        this.setState({ stepValues });
    }

    removeAllSteps(){
    let stepValues = [];
    this.setState({ stepValues });
    }

    //-------------------------------------------------------REACTIONARY RECIPE INGREDIENT INPUTS
    //-------------------------------------------------------REACTIONARY RECIPE INGREDIENT INPUTS
    //-------------------------------------------------------REACTIONARY RECIPE INGREDIENT INPUTS
    renderIngredientsInput = () => {    
        return this.state.ingredientValues.map((el, i) => 
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
                    <Control.text model={".ingredient"+i} defaultValue={el||''} name={"ingredient"+i} className="recipe-ingredients ingredients-controls" />
                <button class="submit-button-small" onClick={this.removeIngredient.bind(this,i)}>Remove</button></div>      
        )
    }
          
          
    addIngredient(){
        this.setState(prevState => ({ ingredientValues: [...prevState.ingredientValues, '']}))
    }
    
    removeIngredient(i){
        let ingredientValues = [...this.state.ingredientValues];
        ingredientValues.splice(i,1);
        this.setState({ ingredientValues });
    }

    removeAllIngredients(){
    let ingredientValues = [];
    this.setState({ ingredientValues });
    }


   
        render() {
        return (
            <div>    
                 <div>
                    <label>Ingredients</label> 
                    {this.renderIngredientsInput()}      
                    <div className="submit-button-interface col"><button class="submit-buttons" onClick={this.addIngredient.bind(this)}>Add Ingredient</button><button class="submit-buttons" onClick={this.removeAllIngredients.bind(this)}>Remove All</button></div>     
                </div>        
                <div>
                    <label>Steps</label> 
                    {this.renderStepsInput()}
                    <div className="submit-button-interface col"><button class="submit-buttons" onClick={this.addStep.bind(this)}>Add New Step</button><button class="submit-buttons" onClick={this.removeAllSteps.bind(this)}>Remove All</button></div>     
                </div>
            </div>

        );
    }
}


export default IngredientSteps;