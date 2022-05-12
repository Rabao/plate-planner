import React, { Component } from 'react'
import {Breadcrumb} from 'react-bootstrap'
import {Link} from 'react-router-dom'

function MealPlans(props) {
    return(
        <div className='container'>
        <Breadcrumb>
            <Breadcrumb.Item>
                <Link to="/home">Home</Link>  
            </Breadcrumb.Item>
            <Breadcrumb.Item active>
                Meal Plans
            </Breadcrumb.Item>
        </Breadcrumb>
        <div>
            This is the meal plans page!
        </div>
</div>
    )
}

export default MealPlans;