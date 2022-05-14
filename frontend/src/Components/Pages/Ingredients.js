import React, { Component } from 'react'


const ingredients = (props) => {
    if(props.ingredient!=null&&props.nutrition!=null)
    return(
        <table>
            <tr>
                <th>Ingredient</th>
                <th>{props.ingredient.name}</th>
            </tr>
            <tr>
                <td>Serving Size</td>
                <td>{props.nutrition.servingSize}</td>
            </tr>
            <tr>
                <td>Calories</td>
                <td>{props.nutrition.calories}</td>
            </tr>
            <tr>
                <td>Calories from Fat</td>
                <td>{props.nutrition.caloriesFat}</td>
            </tr>
            <tr>
                <td>Total Fat</td>
                <td>{props.nutrition.totalFat}g</td>
            </tr>
            <tr>
                <td>Saturated Fat</td>
                <td>{props.nutrition.saturatedFat}g</td>
            </tr>
            <tr>
                <td>Trans Fat</td>
                <td>{props.nutrition.transFat}g</td>
            </tr>
            <tr>
                <td>Cholesterol</td>
                <td>{props.nutrition.cholesterol}mg</td>
            </tr>
            <tr>
                <td>Sodium</td>
                <td>{props.nutrition.sodium}mg</td>
            </tr>
            <tr>
                <td>Potassium</td>
                <td>{props.nutrition.potassium}mg</td>
            </tr>
            <tr>
                <td>Total Carbohydrates</td>
                <td>{props.nutrition.totalCarbs}g</td>
            </tr>
            <tr>
                <td>Dietary Fiber</td>
                <td>{props.nutrition.dietaryFiber}g</td>
            </tr>
            <tr>
                <td>Sugar</td>
                <td>{props.nutrition.sugar}g</td>
            </tr>
            <tr>
                <td>Sugar Alcohol</td>
                <td>{props.nutrition.sugarAlcohol}g</td>
            </tr>
            <tr>
                <td>Protein</td>
                <td>{props.nutrition.protein}g</td>
            </tr>
            <tr>
                <td>Vitamin C</td>
                <td>{props.nutrition.vitC}%</td>
            </tr>
            <tr>
                <td>Calcium</td>
                <td>{props.nutrition.calcium}%</td>
            </tr>
            <tr>
                <td>Iron</td>
                <td>{props.nutrition.iron}%</td>
            </tr>
            <tr>
                <td>Vitamin D</td>
                <td>{props.nutrition.vitD}%</td>
            </tr>
            <tr>
                <td>Vitamin B6</td>
                <td>{props.nutrition.vitB6}%</td>
            </tr>
            <tr>
                <td>Cobalamin</td>
                <td>{props.nutrition.cobalamin}%</td>
            </tr>
            <tr>
                <td>Magnesium</td>
                <td>{props.nutrition.magnesium}%</td>
            </tr>
        </table>
    )
    else
    return(
        <div>
            {console.log(JSON.stringify(props.ingredient) + " " +JSON.stringify(props.nutrition))}
        </div>
    )
}

export default ingredients;