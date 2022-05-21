package com.techelevator.dao;

import com.techelevator.model.RecipeNutrition;

import java.util.List;

public interface RecipeNutritionDao {
    RecipeNutrition getRecipeNutrition(long id);

    List<RecipeNutrition> listRecipeNutrition();

    boolean addRecipeNutrition(RecipeNutrition nutrition);

    boolean deleteRecipeNutrition(long id);
}
