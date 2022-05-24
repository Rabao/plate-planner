package com.techelevator.model;

public class RecipeTag {
    private long recipeId;
    private String tag;

    public RecipeTag() {
    }

    public RecipeTag(long recipeId, String tag) {
        this.recipeId = recipeId;
        this.tag = tag;
    }

    public long getRecipeId() {
        return recipeId;
    }

    public void setRecipeId(long recipeId) {
        this.recipeId = recipeId;
    }

    public String getTag() {
        return tag;
    }

    public void setTag(String tag) {
        this.tag = tag;
    }
}
