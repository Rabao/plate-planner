import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import { Breadcrumb, Button, Col } from 'react-bootstrap';
import {Modal, ModalBody, ModalHeader} from 'reactstrap';
import { Control, LocalForm, Errors } from 'react-redux-form';
import Loader from '../SubComponents/Loader/Loader';
import IngredientsData from './Ingredients';
import {Tooltip} from 'react-tippy';
import 'react-tippy/dist/tippy.css';
import {RiPlayListAddFill} from 'react-icons/ri';
import DailyValueForm from '../SubComponents/DailyValueForm';

export default class EditRecipe extends Component {
    constructor(props) {
        super(props);
        this.state = {
            ingredientValues: [],
            stepValues: [],
            file: [],
            preview: ''
        };

        this.fileInputRef = React.createRef();
      }

      componentDidUpdate(prevProps, prevState) {
          if(prevState.file !== this.state.file){
            const reader = new FileReader();
            reader.onloadend = () => {
                this.setState({
                    preview: reader.result
                })
            }

            if(this.state.file && this.state.file.type){
                reader.readAsDataURL(this.state.file);
            }
          } 
      }

      componentDidMount () {
        if (this.multilineTextarea) {
          this.multilineTextarea.style.height = 'auto';
        }
        this.setState({
            file: this.props.targetRecipe.image,
            preview: this.props.targetRecipe.image
        })
      }
    
      changeTextarea = () => {
        this.multilineTextarea.style.height = 'auto';
        this.multilineTextarea.style.height = this.multilineTextarea.scrollHeight + 'px';
      }

      postEditedRecipe(e) {
        const name = document.getElementById('name');
        const type = document.getElementsByClassName('recipe-type');
        const notes = document.getElementsByClassName('edit-notes')[0];
        const qty = document.getElementsByClassName('qty'); //Measurement quantity (fills measurement parameter in postIngredients)
        const unit = document.getElementsByClassName('unit-measure');
        const steps = document.getElementsByClassName('recipe-steps');
        const ingredients = document.getElementsByClassName('recipe-ingredients');

        //------------------------------------------------------------------IMAGE READER
        
        const formData = new FormData();
        let file = this.state.file;

        let data = new FormData()
        data.append('file', file)
        let filePath = '/uploads/' + file.name;
        
        
        if(this.props.targetRecipe.image == this.state.file){
            filePath = this.state.file;
        }
        else{
            fetch(' http://localhost:8080/upload', {
                method: 'POST',
                body: data
            })
        }
        // ------------------------------------------------------------------SUBMISSION LOGIC

        // console.log(this.props.targetRecipe.id)
        // console.log(name.value)
        // console.log(0)
        // console.log(filePath)
        // console.log(notes.value)
        // console.log(this.props.user.id)
        // console.log('')

        this.props.editRecipe(this.props.targetRecipe.id,name.value,1,filePath,notes.value,this.props.user.id,'')
      }


      Recipe() {
        const recipeId = this.props.targetRecipe.id;
        const userId = this.props.user.id;
        // if(props.isLoading){
        // return(<div className="container">
        //         <div className="row">
        //             <Loader/>
        //         </div>
        //     </div>);     
            
        if (this.props.errMess) {
            return(<div className="container">
            <div className="row">
                <h4>{this.props.errMess}</h4>
            </div>   
        </div>);  
        
        } else { 
        return(
            <div>
                <div className="row">
                    <div className="recipe-info-name" md={9}>
                        <input type="text" model='.name' 
                        name="name" 
                        className="recipe-title"
                        id="name"
                        key={`${Math.floor((Math.random() * 1000))}-min`}
                        defaultValue={this.props.targetRecipe.name}/> 
                    </div>
                </div>
                <div className='component-body'>
                {this.Ingredients (this.props.ingredients, this.props.targetRecipe, this.props.nutrition, this.props.user)}
                {this.RecipeSteps(this.props.targetRecipeSteps)}
                {this.Notes(this.props.targetRecipe.notes)}            
                </div>
            </div>
        )
      }
    }


    Ingredients() { 
         return (    
          
              <div className='row'>
                  <div className='col' md={7}>
                       <h5>Ingredients</h5>
                       {
                           this.props.targetIngredients.map((ingredient, i) => {
                                return (  
                                    <div key={i}>
                                    <input type="number" model={".qty"+i} name={"qty"+i} className="qty ingredients-controls" defaultValue={ingredient.measurement}/>
                                    <select model={".unit"+i} name={"unit"+i} className="unit-measure ingredients-controls" defaultValue={ingredient.unit}>                                 
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
                                    </select>{console.log(ingredient)}
                                    <input type="text" model={".ingredient"+i} defaultValue={ingredient.ingredient_name} name={"ingredient"+i} className="recipe-ingredients ingredients-controls" />
                                </div>      
                                )                       
                            })
                       }
                       
                  </div>
                    <div className="image-submitter">
                            <form>
                                <input type="file" id="img-input" 
                                accept="image/*" 
                                style={{display:"none"}} 
                                ref={this.fileInputRef}
                                onChange={() => {
                                    const file = document.getElementById('img-input').files[0];
                                    if(file && file.type.substr(0,5)==="image"){ //validates file type
                                        this.setState({
                                            file:  file
                                         })
                                    } else {
                                        this.setState({
                                            file:  null
                                         })   
                                    }}} 
                                />
                                { this.state.preview ? 
                                    <img id="preview-img" 
                                    src={this.state.preview} 
                                    onClick={() => {
                                        this.setState({
                                            file:  [],
                                            preview: ''})}}/> 
                                :
                                <div>
                                <button onClick={(e) => {
                                    e.preventDefault();
                                    this.fileInputRef.current.click();
                                }}>Click here to add an image.</button>
                                
                                </div>}
                            </form>
                        </div>
                  <DailyValueForm/>
              </div>
            );
    }
    




    RecipeSteps() {
        // function resizeTextarea (id) {
        //     var a = document.getElementsByClassName("recipe-steps");
        //     a.style.height = 'auto';
        //     a.style.height = a.scrollHeight+'px';
        //   }
          
        //   function init() {
        //     var a = document.getElementsByClassName("recipe-steps");
        //     for(var i=0,inb=a.length;i<inb;i++) {
        //        if(a[i].getAttribute('data-resizable')=='true')
        //         resizeTextarea(a[i].id);
        //     }
        //   }
        const recipeSteps = this.props.targetRecipeSteps.map((step, i) => {
            return(
                <div>
                    <div key={i}>
                        <textarea model={".step"+i} name={"step"+i} defaultValue={step.steps} 
                        className="edit-recipe-steps" onChange={this.changeTextarea} 
                        ref={ref => this.multilineTextarea = ref}/>
                    </div>
                </div>
                )
            });
    
        return ( <div className='row' >         
                    <div>
                        <h5>Steps</h5> 
                        {recipeSteps} 
                    </div>
                </div>
    
        )
    }


    
    Notes() { 

    return (
        <div className='row'>
            <div>
            <h5>Notes</h5>
                <textarea model='.edit-notes'  name="edit-notes" defaultValue={this.props.targetRecipe.notes} className="edit-notes" onChange={this.changeTextarea} ref={ref => this.multilineTextarea = ref}/>
            </div>
        </div>
        );
    }


    

  render() {
            return (
                <div className='container'>
                    <Breadcrumb>
                        <Breadcrumb.Item>
                            <Link to="/recipes">Recipes</Link>  
                        </Breadcrumb.Item>
                        <Breadcrumb.Item>
                            <Link to={"/recipes/"+ this.props.targetRecipe.id}>{this.props.targetRecipe.name}</Link>  
                        </Breadcrumb.Item>
                        <Breadcrumb.Item active>
                            <span>Currently editing: {this.props.targetRecipe.name}</span>
                        </Breadcrumb.Item>
                    </Breadcrumb>
                    {this.Recipe (this.props.targetRecipe,
                        this.props.targetRecipeSteps,
                        this.props.targetIngredients,
                        this.props.ingredients,
                        this.props.user,
                        this.props.users, 
                        this.props.nutrition,
                        this.props.recipeLoading, 
                        this.props.recipeErrMess,
                        this.props.editRecipe)}
                    <div className="container"><button className="submit-buttons" onClick={() => {this.postEditedRecipe()}}>Save Changes</button></div>
                </div>  
            )
        }  
    }
