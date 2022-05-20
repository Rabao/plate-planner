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
                toggleGrocery={props.toggleGrocery}
                postIngredient={props.postIngredient}
                postNutrition={props.postNutrition}
                fetchGrocery={props.fetchGrocery}
                toggleFetchGrocery={props.toggleFetchGrocery}/>
        </div>
      </div>
    )
}

function compare( a, b ) {
    if ( a.listId < b.listId ){
      return -1;
    }
    if ( a.listId > b.listId ){
      return 1;
    }
    return 0;
  }

//   If the ingredient/ grocery item exists, auto-complete fields. Else, add to DB.
class AddItem extends Component{
    constructor(props){
        super(props);
        this.state= {
            listState: [],
            isClicked: false,
            groceryId: 0,
            vitToggle: false
        }

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleToggle = this.handleToggle.bind(this);
    }

     /*
    Will iterate through the list format and present DB items in a list. 
  */
    renderGroceryList() {
        this.props.groceries.sort(compare);
        const CurrentGroceryList = () => {
            liObj1 = this.props.groceries.map((grocery, index) => {
                if(grocery.ingredientName!=undefined){
                    return(
                <li className="component-list-item" key={index}>
                    <div className="col" md={11}>
                        <div className="row">
                                <div className="col" md={10}>
                                    {grocery.ingredientName}
                                </div>
                        <div className="col" md={1}>
                            <div className="checklist-complete">
                                <label>Complete</label>
                                <div className="checklist-check-box">
                                    <input type="checkbox" 
                                    id="complete" 
                                    name="complete" 
                                    value="complete" 
                                    defaultChecked={grocery.complete}
                                    onClick={() => this.handleToggle(grocery.listId, '', '')}/>
                                </div>
                            </div>
                        <div className="checklist-quantity">
                            <label>Quantity</label><input type="number" name="qty" defaultValue={grocery.qty}></input> 
                        </div>
                    </div>
                </div>         
            </div>
        </li>
         )} 
         else {
             return(<div></div>)
            }
            })  
        }
        
        let groceryId=0;
        const GroceryList = () => {
           
            liObj2 = this.state.listState.map((item, index) => {
                if(item != null){
                    return(
                <li className="component-list-item" key={groceryId}>
                    <div className="col" md={11}>
                        <div className="row">
                                <div className="col" md={10}>
                                    {item[groceryId].name}
                                </div>
                        <div className="col" md={1}>
                        <div className="checklist-complete">
                                <label>Complete</label>
                                <div className="checklist-check-box">
                                    <input type="checkbox"
                                    id="complete"
                                    name="complete"
                                    value="yes"
                                    onClick={() => this.handleToggle(-1,this.state.listState[index][0].name,this.state.listState[index][0].qty)}/>
                                </div>
                            </div>
                        <div className="checklist-quantity">
                            <label>Quantity</label><input type="number" name="qty" defaultValue={item[groceryId].qty}></input> 
                        </div>
                    </div>
                </div>         
            </div>
        </li>
         )} 
         else {
             return(<div></div>)
            }
        
    //    listArr.push(liObj);
    //     return(listArr)
            })  
            groceryId++;
            return(<div>{liObj1}{liObj2}</div>) 
        }
     
        let listArr = [];
        let liObj1 = <div></div>;
        let liObj2 = <div></div>;

        return(
            <ul className="component-list">
                {CurrentGroceryList()}
                {GroceryList()}
            </ul> 
        )
    }

    handleVitaminToggle(e) {
        const dvCalc = document.getElementsByClassName('toggle-dvcalc')[0];

        if(dvCalc.classList.contains('close')){
            dvCalc.classList.remove('close');
            dvCalc.classList.add('open');
        } else {
            dvCalc.classList.remove('open');
            dvCalc.classList.add('close');
        }

        this.setState({ vitToggle: !this.state.vitToggle })

    }

    addToGroceryList(values){
        let produce = [{
            name: values.product,
            qty: values.quantity,
            type: values.type
        }]
        // this.props.fetchGrocery();

        this.setState({ 
                    listState: [...this.state.listState, produce]})
    }

    handleSubmit(found, values){
        // const product = document.getElementById('product');
        if(!found){
            this.props.postIngredient(values.product, values.type);
            this.props.postNutrition(values.servingContainer, values.servingQuantity, values.servingQuantityUnits, 
                values.servingSizeWeight, values.servingSizeUnit, values.calories, values.caloriesFat, values.totalFat, 
                values.saturatedFat, values.transFat, values.polyFat, values.monoFat, values.cholesterol, values.sodium,
                values.potassium, values.totalCarbs, values.dietaryFiber, values.sugar, values.sugarAlcohol, values.addedSugar,
                values.protein, values.vitA, values.vitB6, values.vitB12, values.vitC, values.vitD, values.vitE, values.vitK,
                values.calcium, values.iron, values.magnesium, values.thiamine, values.biotin, values.pantoAcid, values.phosphorous,
                values.iodine, values.zinc, values.selenium, values.copper, values.manganese, values.chromium, values.molybdenum, 
                values.chloride);
                
            console.log(this.props.nutrition)
            // this.props.postNutrition(values.serving,values.calories,
            //     values.fromfat, values.total_fat, values.satfat,
            //     values.trans_fat, values.cholesterol, values.sodium, values.potassium, 
            //     values.carbs, values.fiber, values.sugar, values.sugar_alcohol,
            //     values.protein, values.vitC, values.calcium, values.iron,
            //     values.vitD, values.vitB6, values.cobalamin, values.magnesium);
            //     console.log(this.props.nutrition)
        }
        // this.props.postGroceries(values.product,
        //     values.quantity, this.props.authUser.id)
        // setTimeout(() => {{
        //     console.log(this.state.listState);
        //     }}, 300)
        
        this.addToGroceryList(values);

    }

    handleToggle(id, name, qty){
        if(id>0)
            this.props.toggleGrocery(id);
        else
            this.props.toggleFetchGrocery(name,qty);
    }

    handleInputChange(){
        const product = document.getElementById('product');
        found = false;
        let i = -1;
        do{
            i++;
            if(product.value == this.props.ingredients[i].name)
                found = true;
        }while(!found && i<this.props.ingredients.length-1);
        if(found){
            const type = document.getElementById('type');
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

            type.value = this.props.ingredients[i].type;
            servingContainer.value = this.props.nutrition[i].servingSize; //SS by Container
            servingQuantity.value = this.props.nutrition[i].servingSizeQty;
            servingQuantityUnits.value = this.props.nutrition[i].servingSizeQtyUnit;
            servingSizeWeight.value = this.props.nutrition[i].servingSizeWeight;
            servingSizeUnit.value = this.props.nutrition[i].servingSizeUnit;
            calories.value = this.props.nutrition[i].calories;
            caloriesFat.value = this.props.nutrition[i].caloriesFat;
            totalFat.value = this.props.nutrition[i].totalFat;
            saturatedFat.value = this.props.nutrition[i].saturatedFat;
            transFat.value = this.props.nutrition[i].transFat;
            polyFat.value = this.props.nutrition[i].polyFat;
            monoFat.value = this.props.nutrition[i].monoFat;
            cholesterol.value = this.props.nutrition[i].cholesterol;
            sodium.value = this.props.nutrition[i].sodium;

            totalCarbs.value = this.props.nutrition[i].totalCarbs;
            dietaryFiber.value = this.props.nutrition[i].dietaryFiber;
            sugar.value = this.props.nutrition[i].sugar;
            sugarAlcohol.value = this.props.nutrition[i].sugarAlcohol;
            addedSugar.value = this.props.nutrition[i].addedSugar;
            protein.value = this.props.nutrition[i].protein;
            vitA.value = this.props.nutrition[i].vitA;
            vitB6.value = this.props.nutrition[i].vitB6;
            vitB12.value = this.props.nutrition[i].vitB12;
            vitC.value = this.props.nutrition[i].vitC;
            vitD.value = this.props.ingredients[i].vitD;
            vitE.value = this.props.nutrition[i].vitE;
            vitK.value = this.props.nutrition[i].vitK;

            calcium.value = this.props.nutrition[i].calcium;
            iron.value = this.props.nutrition[i].iron;
            magnesium.value = this.props.nutrition[i].magnesium;
            thiamine.value = this.props.nutrition[i].thiamine;

            biotin.value = this.props.nutrition[i].biotin;
            pantoAcid.value = this.props.nutrition[i].pantoAcid;
            potassium.value = this.props.nutrition[i].potassium;
            phosphorous.value = this.props.nutrition[i].phosphorous;
            iodine.value = this.props.nutrition[i].iodine;
            zinc.value = this.props.nutrition[i].zinc;
            selenium.value = this.props.nutrition[i].selenium;
            copper.value = this.props.nutrition[i].copper;
            manganese.value = this.props.nutrition[i].manganese;

            chromium.value = this.props.nutrition[i].chromium;
            molybdenum.value = this.props.nutrition[i].molybdenum;
            chloride.value = this.props.nutrition[i].chloride;

        }
        // console.log(found);
    }

    render(){
        return (
            <>
            <div className='row'>
                  <div className='col' md={12}>              
                        <h5>Grocery List</h5>
                            {this.renderGroceryList()}
                         <div className='row'>
                             <LocalForm>
                                {/* <button>Save List</button> */}
                                <button type='submit' class="submit-buttons">Remove Completed</button>
                                <button class="submit-buttons">Reset List</button>
                             </LocalForm>
                         </div>
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
                            className="form-control"
                            onChange={this.handleInputChange}/>
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
                            defaultValue={0}
                            className="form-control"/>
                    </Col>
                </Row>
                <Row className="form-group">
                    <Col md={3}>
                        <label htmlFor="servingContainer">Serving Size per Container</label> 
                        <Control.text model='.servingContainer' 
                            id="servingContainer" 
                            name="servingContainer" 
                            className="form-control"/>
                    </Col>
                    <Col md={2}>
                        <label htmlFor="servingQuantity">Serving Size Quantity</label> 
                        <Control.text model='.servingQuantity' 
                            id="servingQuantity" 
                            name="servingQuantity" 
                            className="form-control"/>
                    </Col>
                    <Col md={3}>
                        <label htmlFor="servingQuantityUnits">Serving Size Quantity Units</label> 
                        <Control.text model='.servingQuantityUnits' 
                            id="servingQuantityUnits" 
                            name="servingQuantityUnits" 
                            className="form-control"/>
                    </Col>
                    <Col md={2}>
                        <label htmlFor="servingSizeWeight">Serving Size Weight</label> 
                        <Control.text model='.servingSizeWeight' 
                            id="servingSizeWeight" 
                            name="servingSizeWeight" 
                            className="form-control"/>
                    </Col>
                    <Col md={2}>
                        <label htmlFor="servingSizeUnit">Serving Size Unit</label> 
                        <Control.text model='.servingSizeUnit' 
                            id="servingSizeUnit" 
                            name="servingSizeUnit" 
                            className="form-control"/>
                    </Col>
                </Row>
                <Row className="form-group">
                    <Col md={6}>
                        <label htmlFor="calories">Calories</label> 
                            <Control.text model='.calories' 
                            id="calories" 
                            name="calories" 
                            className="form-control"/>
                    </Col>
                    <Col md={6}>
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
                        <label htmlFor="dietaryFiber">Dietary Fiber</label> 
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
                        <label htmlFor="sugarAlcohol">Sugar Alcohol</label> 
                            <Control.text model='.sugarAlcohol' 
                            id="sugarAlcohol" 
                            name="sugarAlcohol" 
                            className="form-control"/>
                    </Col>
                    <Col md={2}>
                        <label htmlFor="addedSugar">Added Sugar</label> 
                            <Control.text model='.addedSugar' 
                            id="addedSugar" 
                            name="addedSugar" 
                            className="form-control"/>
                    </Col>
                </Row>
                <div className="dvcalc" onClick={(e) => {this.handleVitaminToggle(e)}}><span>Add Optional Vitamins and Minerals</span></div>
                <div className="toggle-dvcalc close">
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
                            <label htmlFor="pantoAcid">Pantothenic Acid</label> 
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
                <Row className="form-group">
                    <Col md={12}>
                        <button type='submit' class="submit-buttons">Add To Grocery List</button>
                    </Col>
                </Row>
            </LocalForm>
        </>
    )}
  }

