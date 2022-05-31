import React, { useState } from 'react';
import { Breadcrumb, Button, Row, Col } from 'react-bootstrap'
import {Modal, ModalBody, ModalHeader} from 'reactstrap'
import { Control, LocalForm, Errors } from 'react-redux-form';

const DailyValueForm = (props) => {
    //Elevate to AddRecipe
    //Create state machines for aggregating nutrition

    const [toggle, setToggle] = useState(false);
    const dvCalc = document.getElementsByClassName('toggle-dvcalc')[0];
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

    return ( 
            <>
            <div data-id="dvcalc"><h5>Nutritional Value</h5></div>
                <div className="toggle-dvcalc">
                <LocalForm>   
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
                </LocalForm>
            </div>
        </>
    );
}

export default DailyValueForm; 