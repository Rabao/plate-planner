package com.techelevator.dao;

import com.techelevator.model.RecipeIngredients;
import com.techelevator.model.RecipeSteps;

import java.util.List;

public interface RecipeIngredientsDao {

    List<RecipeIngredients> listRecipeIngredients();

    boolean addRecipeIngredients(RecipeIngredients recipeIngredients);

    boolean editRecipeIngredients(long id, RecipeIngredients recipeIngredients);

    boolean deleteRecipeIngredients(long id);
}
