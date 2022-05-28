package com.techelevator.model;

import java.util.Date;

public class MealPlans {
    private long userId;
    private long planId;
    private long recipeId;
    private String date;
    private String time;

    public MealPlans(){}

    public MealPlans(long userId, long planId, long recipeId, String date, String time) {
        this.userId = userId;
        this.planId = planId;
        this.recipeId = recipeId;
        this.date = date;
        this.time = time;
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

    public String getDate() {
        return date;
    }

    public void setDate(String date) {
        this.date = date;
    }

    public String getTime() {
        return time;
    }

    public void setTime(String time) {
        this.time = time;
    }
}
