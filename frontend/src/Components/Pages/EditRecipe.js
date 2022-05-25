import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import { Breadcrumb, Button, Col } from 'react-bootstrap';
import {Modal, ModalBody, ModalHeader} from 'reactstrap';
import { Control, LocalForm, Errors } from 'react-redux-form';
import Loader from '../SubComponents/Loader/Loader';
import IngredientsData from './Ingredients';
import DailyValue from '../SubComponents/DailyValueDisplay';
import {Tooltip} from 'react-tippy';
import 'react-tippy/dist/tippy.css';
import {RiPlayListAddFill} from 'react-icons/ri';


// Import FilePond styles
import 'filepond/dist/filepond.min.css'

// // Import the Image EXIF Orientation and Image Preview plugins
// // Note: These need to be installed separately
// // `npm i filepond-plugin-image-preview filepond-plugin-image-exif-orientation --save`
// import FilePondPluginImageExifOrientation from 'filepond-plugin-image-exif-orientation'
// import FilePondPluginImagePreview from 'filepond-plugin-image-preview'
// import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css'

// // Register the plugins
// registerPlugin(FilePondPluginImageExifOrientation, FilePondPluginImagePreview)

export default class EditRecipe extends Component {
    constructor(props) {
        super(props);
        this.state = {
            ingredientValues: [],
            stepValues: [],
            // files: [
            //     {
            //       source: "index.html",
            //       options: {
            //         type: "local"
            //       }
            //     }
            //   ]
            file: [],
            preview: ''
        };

        this.fileInputRef = React.createRef();
      }

      componentDidUpdate() {
          if(this.state.file){
            const reader = new FileReader();
            reader.onloadend = () => {
                this.setState({
                    preview: [reader.result]
                })
            }
            reader.readAsDataURL(this.state.file);
          } else {
            this.setState({
                preview: null
            })
          }
      }

    //   componentWillUnmount(){}


      Recipe() {
        // (console.log("RECIPE ID: "+ this.props.targetRecipe.id))
        const recipeId = this.props.targetRecipe.id;
        const userId = this.props.user.id;
        // const authorAvatar = props.users.filter((user) => user.id === props.recipe.userId)[0].avatar;
        // function handleSubmit(values) {
        //     props.postComment( recipeId, userId, values.rating, values.userComment);
        //     window.location.reload(false);
        // }
    
        // function getAuthorFromId(id) {
        //     return props.users.allUsers.filter((user) => user.id === parseInt(id,10))[0].username;
        // }
    
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
                    <label htmlFor="name">Recipe Title</label><br/> 
                                            <input type="text" model='.name' 
                                            name="name" 
                                            className="recipe-title"
                                            id="name"
                                            key={`${Math.floor((Math.random() * 1000))}-min`}
                                            defaultValue={this.props.targetRecipe.name}/> 
                    {/* {props.recipe ? <h3>{props.recipe.name}</h3> : <h3>Null</h3>} */}
                    </div>
                    <div className="author-info-postedby" md={2}>
                        {/* <span>Written by:<h6>{getAuthorFromId(props.recipe.userId)}</h6></span>  */}
                    </div>
                    
                    {/* {getAuthorFromId(props.recipe.userId) ?  */}
                    
                    <div className="author-info-avatar" md={1}>
                            {/* <div className="avatar">
                                { authorAvatar ? <img src={authorAvatar}/> : <img src="/avatars/noavatar.png"/>}
                            </div> */}
                    </div>
                    
                    {/* : 
                    
                    <h6>Null</h6>} */}
                    
                </div>
                <div className='component-body'>
                {this.Ingredients (this.props.ingredients, this.props.targetRecipe, this.props.nutrition, this.props.user)}
                {this.RecipeSteps(this.props.targetRecipeSteps)}
                {/* {props.recipeSteps ?<RecipeSteps target={props.recipeSteps} />: <div>Null</div>} */}
                {this.props.targetRecipe ?<Notes target={this.props.targetRecipe.notes}/> : <div>Null</div>}            
                </div>
            </div>
        )
      }
    }


    Ingredients() { 
        const getIngredientFromId = (id) => {
            return this.props.targetIngredients.filter(ingredients => ingredients.id === parseInt(id,10))[0].name;
        }
        
        function handleChange() {  
            this.setState({
               file:  [...this.state.file,document.getElementById('img-input').files[0]]
            })
        }
    
        return (    
          
              <div className='row'>
                  <div className='col' md={7}>
                       <h5>Ingredients</h5>
                       {
                           this.props.targetIngredients.map((ingredient, i) => {
                            // console.log(props.nutrition);
                            
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
                  <div className='col' id="recipe-pg-img-container" md={5}>
                      
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
                                    }
                                    handleChange()}} 
                                />
                                { this.state.preview ? <img id="preview-img" src={this.state.preview}/> 
                                :
                                <div>
                                    <button onClick={(e) => {
                                        e.preventDefault();
                                        this.fileInputRef.current.click();
                                    }}>Add Image</button> 
                                    <p>Filename: {this.state.file.name}</p>
                                    <p>File type: {this.state.file.type}</p>
                                    <p>File size: {this.state.file.size} bytes</p>
                                </div>}
                                
                            </form>
                        </div>


                  {/* <FilePond
                        ref={(ref) => (this.pond = ref)}
                        files={this.state.files}
                        allowMultiple={false}
                        maxFiles={1}
                        server="/upload"
                        name="files" 
                        oninit={() => this.handleInit()}
                        onupdatefiles={fileItems => {
                            // Set currently active file objects to this.state
                            this.setState({
                            files: fileItems.map(fileItem => fileItem.file)
                            });
                        }}
                        /> */}
                      {/* <img id="recipe-pg-img" src={this.props.targetRecipe.image}></img>       */}
                  </div>
                  <DailyValue ingredients={this.props.ingredients}/>
              </div>
            );
    }
    




    RecipeSteps() {
        function resizeTextarea (id) {
            var a = document.getElementsByClassName("recipe-steps");
            a.style.height = 'auto';
            a.style.height = a.scrollHeight+'px';
          }
          
          function init() {
            var a = document.getElementsByClassName("recipe-steps");
            for(var i=0,inb=a.length;i<inb;i++) {
               if(a[i].getAttribute('data-resizable')=='true')
                resizeTextarea(a[i].id);
            }
          }
        const recipeSteps = this.props.targetRecipeSteps.map((step, i) => {
            return(
                <div>
                    <div key={i}>
                        <input type="textarea" model={".step"+i} name={"step"+i} defaultValue={step.steps} className="recipe-steps"/>
                    </div>
                </div>
                // <li key={step.step_num}>{step.steps}</li>
                )
            });
    
        return ( <div className='row' >         
                    <div>
                        <label>Steps</label> 
                        {recipeSteps} 
                    </div>
                </div>
    
        )
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
                        this.props.recipeErrMess)}
                {/* <Recipe recipe={this.props.targetRecipe}
                    recipeSteps={this.props.targetRecipeSteps}
                    ingredients={this.props.targetIngredients}
                    allIngredients={this.props.ingredients}
                    user={this.props.user}
                    users={this.props.users} 
                    nutrition={this.props.nutrition}
                    isLoading={this.props.recipeLoading} 
                    errMess={this.props.recipeErrMess}/> */}
                </div>  
            )
        }  
    }



// function Ingredients(props) { 
//     const getIngredientFromId = (id) => {
//         return props.ingredients.filter(ingredients => ingredients.id === parseInt(id,10))[0].name;
//     }

//     // const recipeIngredients = 
    
    
//     return (    
      
//           <div className='row'>
//               <div className='col' md={7}>
//                    <h5>Ingredients</h5>
//                    {
//                        props.ingredients.map((ingredient, index) => {

//                         let item = '';
                
//                         if(ingredient.measurement<2){
//                             item = " " + ingredient.unit + " ";
//                         } else {
//                             item = " " + ingredient.unit + "s ";
//                         }
                
//                         // console.log(props.nutrition);
                
//                         return (  
//                             <div id="recipe-ingredients" className='row' key={index}>
//                                 <div className='col' md={8}>
//                                     <p className="recipe-ingredient-text">
//                                         <div id="ingredient-measurement"><span>{ingredient.measurement}</span></div>{item} of <Tooltip 
//                                             trigger="mouseenter" arrow="true" position="right-end" max-width={'1000px'} html={(<div id="tooltip"></div>)}><span>{getIngredientFromId(76)}</span></Tooltip>
//                                     </p>
//                                 </div>
//                             </div>
//                              )
                
                         
//                     })
//                    }
                   
//               </div>
//               <div className='col' id="recipe-pg-img-container" md={5}>
//                   <img id="recipe-pg-img" src={props.recipe.image}></img>      
//               </div>
//               <DailyValue ingredients={props.ingredients}/>
//           </div>
//         );
// }




// function RecipeSteps(props) {

//     const recipeSteps = props.target.map((step) => {
//         return(
//             <li key={step.step_num}>{step.steps}</li>
//             )
//         });

//     return ( <div className='row' >         
//                 <div className='col' md={12}>
//                     <h5>Recipe Steps</h5>
//                     <ol id="recipe-steps-list">   
//                         {recipeSteps} 
//                     </ol>
//                 </div>
//             </div>

//     )
// }

function Notes(props) { 

    return (
        <div className='row'>
            <label htmlFor="editNotes">Notes</label>
                <Control.textarea model='.editNotes' 
                    name="editNotes"
                    rows="12" 
                    id="editNotes"
                    placeholder={props.target}/>
        </div>

        );
  }

  
// function Notes(props) { 

//     return (
//         <div className='row'>
//             <div className='col' md={12}>
//                 <h5>Notes</h5>
//                 <p>{props.target}</p>
//             </div>
//         </div>

//         );
//   }
  
  