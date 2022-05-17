package com.techelevator.model;

public class RecipeSteps {

    private long recipeId;
    public int stepNum;
    private String steps;


    public RecipeSteps() {}

    public RecipeSteps(long recipeId, int stepNum, String steps ) {
        this.recipeId = recipeId;
        this.stepNum = stepNum;
        this.steps = steps;
    }

    public long getRecipeId() {
        return recipeId;
    }

    public void setRecipeId(long id) {
        this.recipeId = id;
    }

    public int getStepNum() {
        return stepNum;
    }

    public void setStepNum(int stepNum) {
        this.stepNum = stepNum;
    }

    public String getSteps() {
        return steps;
    }

    public void setSteps(String steps) {
        this.steps = steps;
    }
}
