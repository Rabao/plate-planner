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
        <ul>
            <li>Home</li>
            <li>Recipes</li>
            <li>Groceries</li>
            <li>Meal Plans</li>
        </ul>
    </div>
  );
};