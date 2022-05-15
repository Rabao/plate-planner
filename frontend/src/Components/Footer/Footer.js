import React, {Component} from 'react';
import { Breadcrumb } from "react-bootstrap";
import { Link } from "react-router-dom";

export const Footer = ({ hrefIn }) => {

  const items = [
    { href: "/recipes", name: "Recipes" },
    { href: "/groceries", name: "Grocery List" },
    { href: "/mealplans", name: "Meal Plans" },
    { href: "/home", name: "Home" },
    { href: "/login", name: "Login" }
  ];

  return (
      <div className="footer">
        <div className="container">
          <ul>
              <li><Link to="/home">Home</Link></li>
              <li><Link to="/recipes">Recipes</Link></li>
              <li><Link to="/groceries">Groceries</Link></li>
              <li><Link to="/mealplans">Meal Plans</Link></li>
          </ul>
        </div>
    </div>
  );
};