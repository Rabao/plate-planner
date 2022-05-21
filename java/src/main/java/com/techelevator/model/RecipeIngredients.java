package com.techelevator.model;

public class RecipeIngredients {
    private long recipeId;
    private long ingredient_id;
    private String ingredient_name;
    private double measurement;
    private String unit;

    public RecipeIngredients(){}

    public RecipeIngredients(long recipeId, long ingredient_id, String ingredient_name, double measurement, String unit) {
        this.recipeId = recipeId;
        this.ingredient_id = ingredient_id;
        this.ingredient_name = ingredient_name;
        this.measurement = measurement;
        this.unit = unit;
    }

    public long getRecipeId() {
        return recipeId;
    }

    public void setRecipeId(long recipeId) {
        this.recipeId = recipeId;
    }

    public long getIngredientId() {
        return ingredient_id;
    }

    public void setIngredientId(long ingredient_id) {
        this.ingredient_id = ingredient_id;
    }

    public String getingredient_name() {
        return ingredient_name;
    }

    public void setingredient_name(String ingredient_name) {
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
