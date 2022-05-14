import React, { Component } from 'react'
import {Breadcrumb, Row, Col} from 'react-bootstrap'
import {Link} from 'react-router-dom'
import {FaCheck} from 'react-icons/fa';
// import { Form, FormGroup, Input } from 'react-bootstrap'
import { Control, LocalForm, Errors } from 'react-redux-form';

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
            <GroceryList/>
            <AddItem 
                postIngredient={props.postIngredient}
                postNutrition={props.postNutrition}/>
        </div>
      </div>
    )
}

function GroceryList() {

    
    return (
      <> 
          <div className='row'>
              <div className='col' md={12}>              
                   <List />
              </div>
          </div>
      </>
    );
  }

  /*
    Will iterate through the above list format and present DB items in a list. 
  */
  function List() {
      return (
          <>
          <h5>Grocery List</h5> 
            <ul className="component-list">
                <li className="component-list-item">
                <div className="col" md={11}>
                    <div className="row">
                            <div className="col" md={10}>
                                Eggo Waffles
                            </div>
                            <div className="col" md={1}>
                                <div className="checklist-complete">
                                    <label>Complete</label>
                                    <div className="checklist-check-box">
                                        <FaCheck className="check"/>
                                    </div>
                                </div>
                                <div className="checklist-quantity">
                                    <label>Quantity</label><input type="number" name="qty"></input> 
                                </div>
                        </div>
                        </div>         
                    </div>
                </li>
            </ul>
        </>
      )
  }

//   If the ingredient/ grocery item exists, auto-complete fields. Else, add to DB.
  class AddItem extends Component{

    constructor(props){
        super(props);
        
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(values){
        this.props.postIngredient(values.product, values.type);
        this.props.postNutrition(values.serving,values.calories,
            values.fromfat, values.total_fat, values.satfat,
            values.trans_fat, values.cholesterol, values.sodium, values.potassium, 
            values.carbs, values.fiber, values.sugar, values.sugar_alcohol,
            values.protein, values.vitC, values.calcium, values.iron,
            values.vitD, values.vitB6, values.cobalamin, values.magnesium);
    }

    render(){
        return (
            <>
            <h5>Add to List</h5>
            <LocalForm onSubmit={(values) => this.handleSubmit(values)}>
                <Row className="form-group">
                    <Col md={8}>
                        <label htmlFor="product">Product</label> 
                        <Control.text model='.product' 
                            id="product" 
                            name="product" 
                            className="form-control"/>
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

