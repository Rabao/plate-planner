import React from 'react';
import DailyValueForm from './DailyValueForm';

const DailyValue = (props) => {
    return ( <>
                

                    {props.nutrition ?
                        <div id="dv-table">
                            <table>
                            <tr > {console.log("RECIPE NUTRITION :" + props.nutrition)}
                                <td > Serving Size: {props.nutrition.servingSize}</td> 
                                <td > Calories: {props.nutrition.calories} </td> 
                                <td > Carbohydrates: {props.nutrition.totalCarbs} </td> 
                                <td > Protein: {props.nutrition.protein} </td>
                                <td > Fat: {props.nutrition.totalFat} </td> 
                            </tr> 
                            <tr>
                                <td > Saturated Fat: {props.nutrition.saturatedFat} </td> 
                                <td > Sodium: {props.nutrition.sodium} </td> 
                                <td > Fiber: {props.nutrition.dietaryFiber} </td> 
                                <td> Sugar: {props.nutrition.sugar} </td> 
                            </tr> 
                                { CalculateValues } 
                            </table>     
                        </div> 
                        :
                        <div id="dv-table">
                            <h6>Nutrition Data not available.</h6>
                        </div> 
                    }
        </>
    );
}

//Calculator will take nutritional values and add them up, return them to the table above.
function CalculateValues(props) {
    return(
        <div><DailyValueForm/></div>
    )
}

export default DailyValue;