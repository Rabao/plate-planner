import React from 'react';
import { Breadcrumb } from "react-bootstrap";
import { Link } from "react-router-dom";

export const SiteMap = ({ hrefIn }) => {

  const items = [
    { href: "/recipes", name: "Recipes" },
    { href: "/groceries", name: "Grocery List" },
    { href: "/mealplans", name: "Meal Plans" },
    { href: "/home", name: "Home" },
    { href: "/login", name: "Login" }
  ];

  return (
    <Breadcrumb>
      {items.map((item) =>
        item.href === hrefIn ? (
          <Breadcrumb.Item active>{item.name}</Breadcrumb.Item>
        ) : (
          <Breadcrumb.Item linkProps={{ to: item.href }} linkAs={Link}>
            {item.name}
          </Breadcrumb.Item>
        )
      )}
    </Breadcrumb>
  );
};