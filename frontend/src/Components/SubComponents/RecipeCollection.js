import React, { Component, useEffect, useState } from 'react'
import Recipes from '../Pages/Recipes'
import {Routes, Route, Navigate, Link, useNavigate } from 'react-router-dom'
// import InfiniteCarousel from 'react-leaf-carousel';
import Carousel, {consts} from 'react-elastic-carousel';
import {HiArrowSmLeft, HiArrowSmRight} from 'react-icons/hi'

function RecipeCollection(props)  {
  const navigate = useNavigate();
  const [data, setdata] = useState(props.collection);
 
  const filterResults = (filter) => {
    const result = props.collection.filter((recipes) => {
      return recipes.type === filter;
    });
    if(filter === "All"){
      setdata(props.collection);
    } else {
      setdata(result);
    }
  }

  function handleClick (e) {
     const targetId = e.id;
     const path = '/recipes/'+e.id;
     navigate(path);       
   }

   function carouselArrow({ type, onClick, isEdge }) {
    const pointer = type === consts.PREV ? <HiArrowSmLeft/> : <HiArrowSmRight/>
    return (
      <button className='carousel-arrows' onClick={onClick} disabled={isEdge}>
        {pointer}
      </button>
    )
  }
  
const breakPoints = [
  { width: 1, itemsToShow: 1 },
  { width: 550, itemsToShow: 2 },
  { width: 768, itemsToShow: 3 },
  { width: 940, itemsToShow: 4 },
  { width: 1200, itemsToShow: 5 },
];


  function enumRecipeCollection() {
    console.log(data);
           const map = data.map(recipe => {
                  return(
                      <div className="col" md={4} key={recipe.id}>
                        <div id="recipe-collection-text"><p><mark>{recipe.name}</mark></p></div>
                          <div className="recipe-collection" onClick={() => {handleClick(recipe)}}>  
                              <img src={recipe.image}/>
                          </div>            
                      </div>
                      )
                  }
              )
              return(map)
            } 
          


  
    return (
      <div className="container">
                    <h3>Try Something New</h3>
                    <label htmlFor='filters'>Filters:</label>
                    <ul className="filters">
                        <li onClick={() => {filterResults('All')}}>All</li>
                        <li onClick={() => {filterResults('Breakfast')}}>Breakfast</li>
                        <li onClick={() => {filterResults('Lunch')}}>Lunch</li>
                        <li onClick={() => {filterResults('Dinner')}}>Dinner</li>
                        <li onClick={() => {filterResults('Snack')}}>Snack</li>
                        <li onClick={() => {filterResults('Dessert')}}>Dessert</li>
                        <li onClick={() => {filterResults('Drinks')}}>Drinks</li>
                    </ul>
          <div className="row">
          <Carousel renderArrow={carouselArrow} breakPoints={breakPoints} pagination={false}>
            {enumRecipeCollection()}
            </Carousel>
            {/* <InfiniteCarousel  breakpoints={[
                                {
                                  breakpoint: 500,
                                  settings: {
                                    slidesToShow: 2,
                                    slidesToScroll: 2,
                                  },
                                },
                                {
                                  breakpoint: 768,
                                  settings: {
                                    slidesToShow: 3,
                                    slidesToScroll: 3,
                                  },
                                },
                              ]}
                              dots={false}
                              slidesToScroll={4}
                              slidesToShow={4}>
              {enumRecipeCollection()}
            </InfiniteCarousel> */}
        </div>
      </div>
    )
  
}
export default RecipeCollection;