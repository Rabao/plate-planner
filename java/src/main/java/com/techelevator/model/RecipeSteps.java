package com.techelevator.model;

public class RecipeSteps {

    private long recipe_id;
    public int step_num;
    private String steps;


    public RecipeSteps() {}

    public RecipeSteps(long recipe_id, int step_num, String steps ) {
        this.recipe_id = recipe_id;
        this.steps = steps;
        this.step_num = step_num;
    }

    public long getRecipeId() {
        return recipe_id;
    }

    public void setRecipeId(long id) {
        this.recipe_id = id;
    }

    public int getStepNum() {
        return step_num;
    }

    public void setStepNum(int stepNum) {
        this.step_num = stepNum;
    }

    public String getSteps() {
        return steps;
    }

    public void setSteps(String steps) {
        this.steps = steps;
    }
}
