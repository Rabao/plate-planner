package com.techelevator.dao;

import com.techelevator.model.Recipe;

import java.util.List;

public interface RecipeDao {
    Recipe getRecipe(int id);

    List<Recipe> listRecipe();

    boolean addRecipe(Recipe recipe);

    boolean deleteRecipe(int id);
}
