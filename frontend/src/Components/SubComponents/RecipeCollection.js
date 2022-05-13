import React, { Component } from 'react'

export default class RecipeCollection extends Component {
    constructor(props){
        super(props);
        this.enumRecipeCollection = this.enumRecipeCollection.bind(this);
    }  

    enumRecipeCollection() {
        console.log(this.props.collection);
        // this.props.collection.map((recipe) => {
        //     return(
        //         <div className="card">
        //             <div key={recipe.listId}>
        //                 This is a test item.
        //             </div>
        //         </div>
        //     )
        // });
    }

  render() {
    return (
      <>
        {this.enumRecipeCollection}
      </>
    )
  }
}
