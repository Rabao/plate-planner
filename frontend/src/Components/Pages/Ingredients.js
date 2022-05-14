import React, { Component } from 'react'


const ingredients = (props) => {
    if(props.ingredient!=null&&props.nutrition!=null)
    return(
        <div>
            {props.ingredient.name}
            {props.nutrition.sodium}
        </div>
    )
    else
    return(
        <div>
            {console.log(JSON.stringify(props.ingredient) + " " +JSON.stringify(props.nutrition))}
        </div>
    )
}

export default ingredients;