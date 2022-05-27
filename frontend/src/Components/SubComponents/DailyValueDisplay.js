import React from 'react';
import DailyValueForm from './DailyValueForm';

const DailyValue = (props) => {
    return ( <>
                

                    {props.nutrition ?
                        <div id="dv-table">
                            <table>
                            <tr > {console.log("RECIPE NUTRITION :" + props.nutrition)}
                                <td > <strong>Serving Size:</strong> <span>{props.nutrition.servingSize}</span></td> 
                                <td > <strong>Calories:</strong> <span>{props.nutrition.calories}</span> </td> 
                                <td > <strong>Carbohydrates:</strong> <span>{props.nutrition.totalCarbs}</span> </td> 
                                <td > <strong>Protein:</strong> <span>{props.nutrition.protein}</span> </td>
                                <td > <strong>Fat:</strong> <span>{props.nutrition.totalFat}</span> </td> 
                            </tr> 
                            <tr>
                                <td></td>
                                <td > <strong>Saturated Fat:</strong> <span>{props.nutrition.saturatedFat}</span> </td> 
                                <td > <strong>Sodium:</strong> <span>{props.nutrition.sodium}</span> </td> 
                                <td > <strong>Fiber:</strong> <span>{props.nutrition.dietaryFiber}</span> </td> 
                                <td> <strong>Sugar:</strong> <span>{props.nutrition.sugar}</span> </td> 
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