package com.techelevator.model;
public class MealPlans {
    private long userId;
    private long planId;
    private long recipeId;
    private String start;
    private String stop;
    public MealPlans(){}
    public MealPlans(long userId, long planId, long recipeId, String start, String stop) {
        this.userId = userId;
        this.planId = planId;
        this.recipeId = recipeId;
        this.start = start;
        this.stop = stop;
    }
    public long getUserId() {
        return userId;
    }
    public void setUserId(long userId) {
        this.userId = userId;
    }
    public long getPlanId() {
        return planId;
    }
    public void setPlanId(long planId) {
        this.planId = planId;
    }
    public long getRecipeId() {
        return recipeId;
    }
    public void setRecipeId(long recipeId) {
        this.recipeId = recipeId;
    }
    public String getStart() {
        return start;
    }
    public void setStart(String start) {
        this.start = start;
    }
    public String getStop() {
        return stop;
    }
    public void setStop(String stop) {
        this.stop = stop;
    }
}