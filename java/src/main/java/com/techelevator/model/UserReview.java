package com.techelevator.model;

public class UserReview {

    private long recipeId;
    private long userId;
    private int rating;
    private String comment;

    public UserReview() {
    }

    public UserReview(long recipeId, long userId, int rating, String comment) {
        this.recipeId = recipeId;
        this.userId = userId;
        this.rating = rating;
        this.comment = comment;
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

    public int getRating() {
        return rating;
    }

    public void setRating(int rating) {
        this.rating = rating;
    }

    public String getComment() {
        return comment;
    }

    public void setComment(String comment) {
        this.comment = comment;
    }
}
