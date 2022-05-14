import React, { Component } from 'react'

export default class IngredientsCollection extends Component {
    constructor(props){
        super(props);
        this.enumIngredientsCollection = this.enumIngredientsCollection.bind(this);
    }  

    enumIngredientsCollection() {
        const map = this.props.collection.map((ingredients) => {

            // if(recipe != null){
                return(
                    <div className="col" md={4}>
                        <div key={ingredients.id} className="ingredients-collection">
                            <div id="ingredients-collection-text"><p>{ingredients.name}</p></div>
                        </div>            
                    </div>
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
