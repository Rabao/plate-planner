import React, {Component} from 'react';
import { useNavigate } from 'react-router-dom';
import { Breadcrumb } from "react-bootstrap";
import { Link } from "react-router-dom";

export const Footer = (props) => {
  const navigate = useNavigate();

  const items = [
    { href: "/recipes", name: "Recipes" },
    { href: "/groceries", name: "Grocery List" },
    { href: "/mealplans", name: "Meal Plans" },
    { href: "/home", name: "Home" },
    { href: "/login", name: "Login" }
  ];

  function shuffleObject(array) {
    const shuffle = arr => [...arr].sort(() => Math.random() - 0.5);
    return shuffle(array);
  }

  function submitSearch(tag){
    props.searchRecipe(tag);
    const path = '/recipes/search/'+tag;
    navigate(path);       
  }

  function renderTags() {

    const maxTags = 12;
    const recTags = shuffleObject(props.tags);
    let tagArr = [];
    for(let i = 0; i < maxTags; i ++){
      let tag = recTags[i].tag;
      // console.log(tag)
      tagArr.push(<em className='recipe-tag-footer' onClick={() => {submitSearch(tag)}}>{tag}</em>)}
    return(tagArr)
  }

  return (
      <div className="footer">
        <div className="container">
          <div className="row">  
          </div>
          <div id="footer1-3">
            <ul>
                <li><a href="/home">Home</a></li>
                <li><a href="/recipes">Recipes</a></li>
            </ul>
          </div>
          <div id="footer2-3">
                {props.token ? <li><a href="/user">Visit Your Dashboard</a></li> : <li></li>}
                {props.token ? <li><a href="/add/recipe">Write A Recipe</a></li> : <li></li>}
                {props.token ? <li><a href="/groceries">Track Your Groceries</a></li> : <li></li>}
                {props.token ? <li><a href="/mealplans">Manage Your Meal Plans</a></li> : <li></li>}
          </div>
          <div id="footer3-3">
            <p>Tags:</p>
              {renderTags()}
          </div>
        </div>
    </div>
  );
};