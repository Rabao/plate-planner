package com.techelevator.dao;

import com.techelevator.model.Ingredients;

import java.util.List;

public interface IngredientsDao {
    Ingredients getIngredient(long id);

    long getIngredientIdByName(String name);

    List<Ingredients> listIngredient();

    List<Ingredients> listIngredientsByRecipe(long recipeId);

    boolean addIngredient(Ingredients ingredient);

    boolean deleteIngredient(long id);
}
