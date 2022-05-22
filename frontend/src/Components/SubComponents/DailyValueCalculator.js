import React, { useState } from 'react';
import { Breadcrumb, Button, Row, Col } from 'react-bootstrap'
import {Modal, ModalBody, ModalHeader} from 'reactstrap'
import { Control, LocalForm, Errors } from 'react-redux-form';

const DailyValueCalculator = (props) => {
    //Elevate to AddRecipe
    //Create state machines for aggregating nutrition
    // let found = false;

    const [toggle, setToggle] = useState(false);
    const dvCalc = document.getElementsByClassName('toggle-dvcalcComponent')[0];

    function handleToggle() {

        if(dvCalc.classList.contains('_close')){
            dvCalc.classList.remove('_close');
            dvCalc.classList.add('_open');
        } else {
            dvCalc.classList.remove('_open');
            dvCalc.classList.add('_close');
        }

        setToggle({ toggle: !toggle })

    }

    // function handleInputChange() {
    //     const product = document.getElementById('ingredient');
    //     found = false;
    //     let i = -1;

       
       
    //     do{ 
    //         console.log(props.ingredients[i])
    //         i++;
    //         if(product.value == props.ingredients[i].name)
    //             found = true;
    //     }while(!found && i<props.ingredients.length-1);
    //     if(found){
    //         const type = document.getElementById('type');
    //         const servingContainer = document.getElementById('servingContainer');
    //         const servingQuantity = document.getElementById('servingQuantity');
    //         const servingQuantityUnits = document.getElementById('servingQuantityUnits');
    //         const servingSizeWeight = document.getElementById('servingSizeWeight');
    //         const servingSizeUnit = document.getElementById('servingSizeUnit');
    //         const calories = document.getElementById('calories');
    //         const caloriesFat = document.getElementById('caloriesFat');
    //         const totalFat = document.getElementById('totalFat');
    //         const saturatedFat = document.getElementById('saturatedFat');
    //         const transFat = document.getElementById('transFat');
    //         const polyFat = document.getElementById('polyFat');
    //         const monoFat = document.getElementById('monoFat');
    //         const cholesterol = document.getElementById('cholesterol');
    //         const sodium = document.getElementById('sodium');
    //         const totalCarbs = document.getElementById('totalCarbs');
    //         const dietaryFiber = document.getElementById('dietaryFiber');
    //         const sugar = document.getElementById('sugar');
    //         const sugarAlcohol = document.getElementById('sugarAlcohol');
    //         const addedSugar = document.getElementById('addedSugar');
    //         const protein = document.getElementById('protein');
    //         const vitA = document.getElementById('vitA');
    //         const vitB6 = document.getElementById('vitB6');
    //         const vitB12 = document.getElementById('vitB12');
    //         const vitC = document.getElementById('vitC');
    //         const vitD = document.getElementById('vitD');
    //         const vitE = document.getElementById('vitE');
    //         const vitK = document.getElementById('vitK');
    //         const calcium = document.getElementById('calcium');
    //         const iron = document.getElementById('iron');
    //         const magnesium = document.getElementById('magnesium');
    //         const thiamine = document.getElementById('thiamine');
    //         const biotin = document.getElementById('biotin');
    //         const pantoAcid = document.getElementById('pantoAcid');
    //         const potassium = document.getElementById('potassium');
    //         const phosphorous = document.getElementById('phosphorous');
    //         const iodine = document.getElementById('iodine');
    //         const zinc = document.getElementById('zinc');
    //         const selenium = document.getElementById('selenium');
    //         const copper = document.getElementById('copper');
    //         const manganese = document.getElementById('manganese');
    //         const chromium = document.getElementById('chromium');
    //         const molybdenum = document.getElementById('molybdenum');
    //         const chloride = document.getElementById('chloride');

    //         type.value = props.ingredients[i].type;
    //         servingContainer.value = props.nutrition[i].servingSize; //SS by Container
    //         servingQuantity.value = props.nutrition[i].servingSizeQty;
    //         servingQuantityUnits.value = props.nutrition[i].servingSizeQtyUnit;
    //         servingSizeWeight.value = props.nutrition[i].servingSizeWeight;
    //         servingSizeUnit.value = props.nutrition[i].servingSizeUnit;
    //         calories.value = props.nutrition[i].calories;
    //         caloriesFat.value = props.nutrition[i].caloriesFat;
    //         totalFat.value = props.nutrition[i].totalFat;
    //         saturatedFat.value = props.nutrition[i].saturatedFat;
    //         transFat.value = props.nutrition[i].transFat;
    //         polyFat.value = props.nutrition[i].polyFat;
    //         monoFat.value = props.nutrition[i].monoFat;
    //         cholesterol.value = props.nutrition[i].cholesterol;
    //         sodium.value = props.nutrition[i].sodium;

    //         totalCarbs.value = props.nutrition[i].totalCarbs;
    //         dietaryFiber.value = props.nutrition[i].dietaryFiber;
    //         sugar.value = props.nutrition[i].sugar;
    //         sugarAlcohol.value = props.nutrition[i].sugarAlcohol;
    //         addedSugar.value = props.nutrition[i].addedSugar;
    //         protein.value = props.nutrition[i].protein;
    //         vitA.value = props.nutrition[i].vitA;
    //         vitB6.value = props.nutrition[i].vitB6;
    //         vitB12.value = props.nutrition[i].vitB12;
    //         vitC.value = props.nutrition[i].vitC;
    //         vitD.value = props.ingredients[i].vitD;
    //         vitE.value = props.nutrition[i].vitE;
    //         vitK.value = props.nutrition[i].vitK;

    //         calcium.value = props.nutrition[i].calcium;
    //         iron.value = props.nutrition[i].iron;
    //         magnesium.value = props.nutrition[i].magnesium;
    //         thiamine.value = props.nutrition[i].thiamine;

    //         biotin.value = props.nutrition[i].biotin;
    //         pantoAcid.value = props.nutrition[i].pantoAcid;
    //         potassium.value = props.nutrition[i].potassium;
    //         phosphorous.value = props.nutrition[i].phosphorous;
    //         iodine.value = props.nutrition[i].iodine;
    //         zinc.value = props.nutrition[i].zinc;
    //         selenium.value = props.nutrition[i].selenium;
    //         copper.value = props.nutrition[i].copper;
    //         manganese.value = props.nutrition[i].manganese;

    //         chromium.value = props.nutrition[i].chromium;
    //         molybdenum.value = props.nutrition[i].molybdenum;
    //         chloride.value = props.nutrition[i].chloride;

    //     }
    //     // console.log(found);
    // }


    return ( 
            <>
            <LocalForm>
            {/* <LocalForm onSubmit={(values) => this.handleSubmit(found, values)}>
                <Row className="form-group">
                    <Col md={12}>
                        <label htmlFor="ingredient">Ingredient</label> 
                        <Control.text model='.ingredient' 
                            id="ingredient" 
                            name="ingredient" 
                            className="form-control"
                            onChange={()=>{props.handleInputChange()}}/>
                    </Col>
                </Row> */}
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
                        <label htmlFor="saturatedFat">Sat. Fat</label> 
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
                        <label htmlFor="polyFat">Poly. Fat</label> 
                            <Control.text model='.polyFat' 
                            id="polyFat" 
                            name="polyFat" 
                            className="form-control"/>
                    </Col>
                    <Col md={2}>
                        <label htmlFor="monoFat">Mono. Fat</label> 
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
                <div className="dvcalc" onClick={() => {handleToggle()}}><span>Add Optional Vitamins and Minerals</span></div>
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
        </>
    );
}

//  //Calculator will take nutritional values and add them up, return them to the table above.
// function CalculateValues(props) {
//     console.log(props.ingredients);
// }

export default DailyValueCalculator; 