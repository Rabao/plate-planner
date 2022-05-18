package com.techelevator.dao;

import com.techelevator.model.Recipe;

import java.util.List;

public interface RecipeDao {
    Recipe getRecipe(long id);

    List<Recipe> listRecipe();

    List<Recipe> listRecipesByIngredient(long ingredient_id);

    List<Recipe> listRecipesByType(String type);

    boolean addRecipe(Recipe recipe);

    boolean deleteRecipe(long id);
}
