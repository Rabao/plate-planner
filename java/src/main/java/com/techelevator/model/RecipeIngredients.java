package com.techelevator.model;

public class RecipeIngredients {
    private int recipeId;
    private int ingredient_id;
    private String ingredient_name;
    private double measurement;
    private String unit;

    public RecipeIngredients(){}

    public RecipeIngredients(int recipeId, int ingredient_id, String ingredient_name, double measurement, String unit) {
        this.recipeId = recipeId;
        this.ingredient_id = ingredient_id;
        this.ingredient_name = ingredient_name;
        this.measurement = measurement;
        this.unit = unit;
    }

    public int getRecipeId() {
        return recipeId;
    }

    public void setRecipeId(int recipeId) {
        this.recipeId = recipeId;
    }

    public int getIngredientId() {
        return ingredient_id;
    }

    public void setIngredientId(int ingredient_id) {
        this.ingredient_id = ingredient_id;
    }

    public String getIngredientName() {
        return ingredient_name;
    }

    public void setIngredientName(String ingredient_name) {
        this.ingredient_name = ingredient_name;
    }

    public double getMeasurement() {
        return measurement;
    }

    public void setMeasurement(double measurement) {
        this.measurement = measurement;
    }

    public String getUnit() {
        return unit;
    }

    public void setUnit(String unit) {
        this.unit = unit;
    }
}
