package com.techelevator.dao;

import com.techelevator.model.Recipe;

import java.util.List;

public interface RecipeDao {
    Recipe getRecipe(int id);

    List<Recipe> listRecipe();

    List<Recipe> listRecipesByIngredient(int ingredientId);

    List<Recipe> listRecipesByType(String type);

    boolean addRecipe(Recipe recipe);

    boolean deleteRecipe(int id);
}
