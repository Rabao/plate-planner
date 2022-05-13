import React, { Component } from 'react'

export default class RecipeCollection extends Component {
    constructor(props){
        super(props);
        this.enumRecipeCollection = this.enumRecipeCollection.bind(this);
    }  

    enumRecipeCollection() {
        const map = this.props.collection.map((recipe) => {

            // if(recipe != null){
                return(
                    <div className="col" md={4}>
                        <div key={recipe.id} className="recipe-collection">
                            <div id="recipe-collection-text"><p>{recipe.name}</p></div>
                            <img src={recipe.image}/>
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
            {this.enumRecipeCollection()}
        </div>
      </div>
    )
  }
}
