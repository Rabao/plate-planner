package com.techelevator.dao;

import com.techelevator.model.Recipe;
import com.techelevator.model.RecipeSteps;

import java.util.List;


public interface RecipeStepsDao {

    List<RecipeSteps> listRecipeSteps();

    RecipeSteps getRecipeSteps(long id);

    boolean addRecipeSteps(RecipeSteps recipeSteps);

    boolean editRecipeSteps(long id, RecipeSteps recipeSteps);
}
