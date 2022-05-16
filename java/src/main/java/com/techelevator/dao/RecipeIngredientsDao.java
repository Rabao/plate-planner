package com.techelevator.dao;

import com.techelevator.model.RecipeIngredients;

import java.util.List;

public interface RecipeIngredientsDao {

    List<RecipeIngredients> listRecipeIngredients();

    boolean addRecipeIngredients(RecipeIngredients recipeIngredients);

    boolean deleteRecipeIngredients(long id);
}
