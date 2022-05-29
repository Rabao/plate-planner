package com.techelevator.dao;

import com.techelevator.model.RecipeTag;

import java.util.List;

public interface RecipeTagDao {
    List<RecipeTag> listRecipeTags();

    List<RecipeTag> listRecipeTagsById(long recipeId);

    boolean addRecipeTags(RecipeTag recipeTag);

    boolean deleteRecipeTags(long recipeId);
}
