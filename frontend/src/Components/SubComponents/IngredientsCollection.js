import React, { Component } from 'react'
import {Breadcrumb, Row, Col} from 'react-bootstrap'
import { Link } from 'react-router-dom';

export default class IngredientsCollection extends Component {
    constructor(props){
        super(props);
        this.enumIngredientsCollection = this.enumIngredientsCollection.bind(this);
    }  

    enumIngredientsCollection() {
        const map = this.props.collection.map((ingredients) => {

            // if(recipe != null){
                return(
                    <Col md={2}>
                        <Link to={`/ingredients/${ingredients.id}`}>
                            <div id="ingredients-collection-text">
                                <p>{ingredients.name}</p>
                            </div>
                        </Link>
                    </Col>
                    )
                })
            // }
        return(map)
    }

  render() {
    return (
      <div className="container">
          <div className="row">
            {this.enumIngredientsCollection()}
        </div>
      </div>
    )
  }
}
