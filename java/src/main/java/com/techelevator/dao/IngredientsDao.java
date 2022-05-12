package com.techelevator.dao;

import com.techelevator.model.Ingredients;

import java.util.List;

public interface IngredientsDao {
    Ingredients getIngredient(int id);

    List<Ingredients> listIngredient();

    List<Ingredients> listIngredientsByRecipe(int recipeId);

    boolean addIngredient(Ingredients ingredient);

    boolean deleteIngredient(int id);
}
