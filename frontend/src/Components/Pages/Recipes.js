import React, { Component } from 'react'
import {Breadcrumb} from 'react-bootstrap'
import {Link} from 'react-router-dom'

export default class Recipes extends Component {
  render() {
    return (
      <div className='container'>
    <Breadcrumb>
        <Breadcrumb.Item>
            <Link to="/home">Home</Link>  
        </Breadcrumb.Item>
        <Breadcrumb.Item active>
            Recipes
        </Breadcrumb.Item>
    </Breadcrumb>
        <div>
            This is the recipes page!
        </div>
      </div>
    )
  }
}
