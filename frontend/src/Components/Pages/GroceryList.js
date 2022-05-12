import React, { Component } from 'react'
import {Breadcrumb} from 'react-bootstrap'
import {Link} from 'react-router-dom'

function Groceries(props) {
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
            <div>
                This is the Groceries page!
            </div>
    </div>
    )
}

export default Groceries;