package com.techelevator.model;

public class Favorites {
    private long recipeId;
    private long userId;

    public Favorites() {
    }

    public Favorites(long recipeId, long userId) {
        this.recipeId = recipeId;
        this.userId = userId;
    }

    public long getRecipeId() {
        return recipeId;
    }

    public void setRecipeId(long recipeId) {
        this.recipeId = recipeId;
    }

    public long getUserId() {
        return userId;
    }

    public void setUserId(long userId) {
        this.userId = userId;
    }
}
