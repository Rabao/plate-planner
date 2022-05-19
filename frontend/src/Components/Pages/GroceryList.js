import React, { Component, useState } from 'react'
import {Breadcrumb, Row, Col} from 'react-bootstrap'
import {Link} from 'react-router-dom'
import {FaCheck} from 'react-icons/fa';
// import { Form, FormGroup, Input } from 'react-bootstrap'
import { Control, LocalForm, Errors } from 'react-redux-form';
let found = false;

export default function Groceries(props) {
    

    return(
        <div className='container'>
        <Breadcrumb>
            <Breadcrumb.Item>
                <Link to="/home">Home</Link>  
            </Breadcrumb.Item>
            <Breadcrumb.Item active>
                Grocery List
            </Breadcrumb.Item>
        </Breadcrumb>
        <div className='component-body'>
            {/* <GroceryList
                user={props.user}
                groceries={props.groceries}/> */}
            <AddItem 
                authUser={props.user}
                ingredients={props.ingredients}
                nutrition={props.nutrition}
                groceries={props.groceries}
                postGroceries={props.postGroceries}
                postIngredient={props.postIngredient}
                postNutrition={props.postNutrition}/>
        </div>
      </div>
    )
}

//   If the ingredient/ grocery item exists, auto-complete fields. Else, add to DB.
class AddItem extends Component{
    constructor(props){
        super(props);
        this.state= {
            didUpdate: false,
            listState: [],
            isClicked: false,
        }

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
    }

     /*
    Will iterate through the list format and present DB items in a list. 
  */
    renderGroceryList() {
        let liObj = <div></div>;
        let groceryId = 0;

        const GroceryList = () => {
            let liClass = "component-list-item";
            // {!this.state.isClicked ? liClass = "component-list-item" 
            // : liClass = "component-list-item complete"}

            liObj = this.state.listState.map((item) => {       
                
                    if(item != null){
                                    return(
                                <li className={liClass} key={groceryId}>
                                    <div className="col" md={11}>
                                        <div className="row">
                                                <div className="col" md={10}>
                                                    <p>{item[groceryId].name}</p> 
                                                </div>
                                        <div className="col" md={1}>
                                            <div className="checklist-complete">
                                                <label>Bought</label>
                                                <div className="checklist-check-box" onClick={(e) => {isComplete(e)}}>
                                                {!this.state.isClicked ? <FaCheck className="check unchecked"/> 
                                                :  <FaCheck className="check checked"/> }
                                                </div>
                                            </div>
                                        <div className="checklist-quantity">
                                        {!this.state.isClicked ? <label>Quantity</label>: <React.Fragment></React.Fragment>}
                                            {!this.state.isClicked ? 
                                            <input type="number" name="qty" defaultValue={item[groceryId].qty} /> 
                                            : <React.Fragment></React.Fragment>}
                                        </div>
                                    </div>
                                </div>         
                            </div>
                        </li> 
                ) } else {
                    return(
                        <div></div>)
                        }
                    }
                    )  
                   
                    console.log(groceryId);
                    groceryId+= 1;
                    return(liObj) 
                    
        }
        
        
        const isComplete = (e) => {
            this.setState({isClicked: !this.state.isClicked});       
        }

        return(
            <div>
                <ul className="component-list">
                    {GroceryList()}
                </ul>
            </div> 
        )
    }

    addToGroceryList(values){
        let produce = [{
            name: values.product,
            qty: values.quantity,
            type: values.type
        }]

        this.setState({ 
                    didUpdate: !this.state.didUpdate, 
                    listState: [...this.state.listState, produce]})
    }

    handleSubmit(found, values){
        // if(!found){
        //     this.props.postIngredient(values.product, values.type);
        //     this.props.postNutrition(values.serving,values.calories,
        //         values.fromfat, values.total_fat, values.satfat,
        //         values.trans_fat, values.cholesterol, values.sodium, values.potassium, 
        //         values.carbs, values.fiber, values.sugar, values.sugar_alcohol,
        //         values.protein, values.vitC, values.calcium, values.iron,
        //         values.vitD, values.vitB6, values.cobalamin, values.magnesium);
        // }
        // this.props.postGroceries(1, values.product,
        //     values.quantity, this.props.authUser.id)
        
       
        
        setTimeout(() => {{
        this.addToGroceryList(values);
        console.log(this.state.listState);
        }}, 300)
    }

    handleInputChange(){
        const product = document.getElementById('product');
        found = false;
        let i = -1;
        do{
            i++;
            if(product.value == this.props.ingredients[i].name)
                found = true;
        }while(!found && i<this.props.ingredients.length);
        if(found){
            const type = document.getElementById('type');
            type.value = this.props.ingredients[i].type;
            const serving = document.getElementById('serving');
            serving.value = this.props.nutrition[i].serving_size;
            const calories = document.getElementById('calories');
            calories.value = this.props.nutrition[i].calories;
            const fromfat = document.getElementById('fromfat');
            fromfat.value = this.props.nutrition[i].calories_fat;
            const total_fat = document.getElementById('total_fat');
            total_fat.value = this.props.nutrition[i].total_fat;
            const satfat = document.getElementById('satfat');
            satfat.value = this.props.nutrition[i].saturated_fat;
            const trans_fat = document.getElementById('trans_fat');
            trans_fat.value = this.props.nutrition[i].trans_fat;
            const cholesterol = document.getElementById('cholesterol');
            cholesterol.value = this.props.nutrition[i].cholesterol;
            const sodium = document.getElementById('sodium');
            sodium.value = this.props.nutrition[i].sodium;
            const potassium = document.getElementById('potassium');
            potassium.value = this.props.nutrition[i].potassium;
            const carbs = document.getElementById('carbs');
            carbs.value = this.props.nutrition[i].total_carbs;
            const fiber = document.getElementById('fiber');
            fiber.value = this.props.nutrition[i].dietary_fiber;
            const sugar = document.getElementById('sugar');
            sugar.value = this.props.nutrition[i].sugar;
            const sugar_alcohol = document.getElementById('sugar_alcohol');
            sugar_alcohol.value = this.props.nutrition[i].sugar_alcohol;
            const protein = document.getElementById('protein');
            protein.value = this.props.nutrition[i].protein;
            const vitC = document.getElementById('vitC');
            vitC.value = this.props.nutrition[i].vitC;
            const calcium = document.getElementById('calcium');
            calcium.value = this.props.nutrition[i].calcium;
            const iron = document.getElementById('iron');
            iron.value = this.props.nutrition[i].iron;
            const vitD = document.getElementById('vitD');
            vitD.value = this.props.nutrition[i].vitD;
            const vitB6 = document.getElementById('vitB6');
            vitB6.value = this.props.nutrition[i].vitB6;
            const cobalamin = document.getElementById('cobalamin');
            cobalamin.value = this.props.nutrition[i].cobalamin;
            const magnesium = document.getElementById('magnesium');
            magnesium.value = this.props.nutrition[i].magnesium;
        }
        console.log(found);
    }

    render(){
        return (
            <>
            <div className='row'>
                  <div className='col' md={12}>              
                        <h5>Grocery List</h5>
                            {this.renderGroceryList()}
                  </div>
              </div>
            <h5>Add to List</h5>
            <LocalForm onSubmit={(values) => this.handleSubmit(found, values)}>
                <Row className="form-group">
                    <Col md={8}>
                        <label htmlFor="product">Product</label> 
                        <Control.text model='.product' 
                            id="product" 
                            name="product" 
                            className="form-control"/>
                            {/* onChange={this.handleInputChange}/> */}
                    </Col>
                    <Col md={2}>
                        <label htmlFor="type">Type</label> 
                        <Control.text model='.type' 
                            id="type" 
                            name="type" 
                            className="form-control"/>
                    </Col>
                    <Col md={2}>
                        <label htmlFor="quantity">Quantity</label> 
                        <Control.text type="number"  
                            model='.quantity' 
                            id="quantity" 
                            name="quantity" 
                            className="form-control"/>
                    </Col>
                </Row>
                <Row className="form-group">
                    <Col md={4}>
                        <label htmlFor="serving">Serving Size</label> 
                        <Control.text model='.serving' 
                            id="serving" 
                            name="serving" 
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
                        <label htmlFor="fromfat">Calories from Fat</label> 
                        <Control.text model='.fromfat' 
                            id="fromfat" 
                            name="fromfat" 
                            className="form-control"/>
                    </Col>
                </Row>
                <Row className="form-group">
                    <Col md={4}>
                        <label htmlFor="total_fat">Total Fat</label> 
                            <Control.text model='.total_fat' 
                            id="total_fat" 
                            name="total_fat" 
                            className="form-control"/>
                    </Col>
                    <Col md={4}>
                        <label htmlFor="satfat">Saturated Fat</label> 
                            <Control.text model='.satfat' 
                            id="satfat" 
                            name="satfat" 
                            className="form-control"/>
                    </Col>
                    <Col md={4}>
                        <label htmlFor="trans_fat">Trans Fat</label> 
                            <Control.text model='.trans_fat' 
                            id="trans_fat" 
                            name="trans_fat" 
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
                        <label htmlFor="potassium">Potassium</label> 
                            <Control.text model='.potassium' 
                            id="potassium" 
                            name="potassium" 
                            className="form-control"/>
                    </Col>
                </Row>
                <Row className="form-group">
                    <Col md={2}>
                        <label htmlFor="carbs">Total Carbohydrates</label> 
                            <Control.text model='.carbs' 
                            id="carbs" 
                            name="carbs" 
                            className="form-control"/>
                    </Col>
                    <Col md={2}>
                        <label htmlFor="fiber">Dietary Fiber</label> 
                            <Control.text model='.fiber' 
                            id="fiber" 
                            name="fiber" 
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
                        <label htmlFor="sugar_alcohol">Sugar Alcohol</label> 
                            <Control.text model='.sugar_alcohol' 
                            id="sugar_alcohol" 
                            name="sugar_alcohol" 
                            className="form-control"/>
                    </Col>
                    <Col md={2}>
                        <label htmlFor="protein">Protein</label> 
                            <Control.text model='.protein' 
                            id="protein" 
                            name="protein" 
                            className="form-control"/>
                    </Col>
                    <Col md={2}>
                        <label htmlFor="vitC">Vitamin C</label> 
                            <Control.text model='.vitC' 
                            id="vitC" 
                            name="vitC" 
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
                        <label htmlFor="vitD">Vitamin D</label> 
                            <Control.text model='.vitD' 
                            id="vitD" 
                            name="vitD" 
                            className="form-control"/>
                    </Col>
                    <Col md={2}>
                        <label htmlFor="vitB6">Vitamin B6</label> 
                            <Control.text model='.vitB6' 
                            id="vitB6" 
                            name="vitB6" 
                            className="form-control"/>
                    </Col>
                    <Col md={2}>
                        <label htmlFor="cobalamin">Cobalamin</label> 
                            <Control.text model='.cobalamin' 
                            id="cobalamin" 
                            name="cobalamin" 
                            className="form-control"/>
                    </Col>
                    <Col md={2}>
                        <label htmlFor="magnesium">Magnesium</label> 
                            <Control.text model='.magnesium' 
                            id="magnesium" 
                            name="magnesium" 
                            className="form-control"/>
                    </Col>
                </Row>
                <Row className="form-group">
                    <Col md={12}>
                        <button type='submit' color="primary">Add To Grocery List</button>
                    </Col>
                </Row>
            </LocalForm>
        </>
    )}
  }

