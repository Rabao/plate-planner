import React, { Component } from 'react'


const ingredients = (props) => {
    if(props.ingredient!=null)
    return(
        <div>
            {props.ingredient.name}
        </div>
    )
    else
    return(
        <div>test</div>
    )
}

export default ingredients;