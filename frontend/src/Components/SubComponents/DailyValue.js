import React from 'react';

const DailyValue = () => {
    return ( <>
    <div id="dv-table">
        <table>
        <tr >
            <td > Serving Size: </td> 
            <td > Calories: </td> 
            <td > Carbohydrates: </td> 
            <td > Protein: </td>
            <td > Fat: </td> 
        </tr> 
        <tr>
            <td > Saturated Fat: </td> 
            <td > Sodium: </td> 
            <td > Fiber: </td> 
            <td> Sugar: </td> 
        </tr> 
            { CalculateValues } 
        </table> 
    </div>
        </>
    );
}

//Calculator will take nutritional values and add them up, return them to the table above.
function CalculateValues(props) {
    console.log(props.ingredients);
}

export default DailyValue;