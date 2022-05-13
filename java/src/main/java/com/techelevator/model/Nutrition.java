package com.techelevator.model;

public class Nutrition {

    private long id;
    private double servingSize;
    private double calories;
    private double caloriesFat;
    private double totalFat;
    private double saturatedFat;
    private double transFat;
    private double cholesterol;
    private double sodium;
    private double potassium;
    private double totalCarbs;
    private double dietaryFiber;
    private double sugar;
    private double sugarAlcohol;
    private double protein;

    public Nutrition() {
    }

    public Nutrition(long id, double servingSize, double calories, double caloriesFat,
                     double totalFat, double saturatedFat, double transFat, double cholesterol,
                     double sodium, double potassium, double totalCarbs,
                     double dietaryFiber, double sugar, double sugarAlcohol, double protein) {
        this.id = id;
        this.servingSize = servingSize;
        this.calories = calories;
        this.caloriesFat = caloriesFat;
        this.totalFat = totalFat;
        this.saturatedFat = saturatedFat;
        this.transFat = transFat;
        this.cholesterol = cholesterol;
        this.sodium = sodium;
        this.potassium = potassium;
        this.totalCarbs = totalCarbs;
        this.dietaryFiber = dietaryFiber;
        this.sugar = sugar;
        this.sugarAlcohol = sugarAlcohol;
        this.protein = protein;
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public double getServingSize() {
        return servingSize;
    }

    public void setServingSize(double servingSize) {
        this.servingSize = servingSize;
    }

    public double getCalories() {
        return calories;
    }

    public void setCalories(double calories) {
        this.calories = calories;
    }

    public double getCaloriesFat() {
        return caloriesFat;
    }

    public void setCaloriesFat(double caloriesFat) {
        this.caloriesFat = caloriesFat;
    }

    public double getTotalFat() {
        return totalFat;
    }

    public void setTotalFat(double totalFat) {
        this.totalFat = totalFat;
    }

    public double getSaturatedFat() {
        return saturatedFat;
    }

    public void setSaturatedFat(double saturatedFat) {
        this.saturatedFat = saturatedFat;
    }

    public double getTransFat() {
        return transFat;
    }

    public void setTransFat(double transFat) {
        this.transFat = transFat;
    }

    public double getCholesterol() {
        return cholesterol;
    }

    public void setCholesterol(double cholesterol) {
        this.cholesterol = cholesterol;
    }

    public double getSodium() {
        return sodium;
    }

    public void setSodium(double sodium) {
        this.sodium = sodium;
    }

    public double getPotassium() {
        return potassium;
    }

    public void setPotassium(double potassium) {
        this.potassium = potassium;
    }

    public double getTotalCarbs() {
        return totalCarbs;
    }

    public void setTotalCarbs(double totalCarbs) {
        this.totalCarbs = totalCarbs;
    }

    public double getDietaryFiber() {
        return dietaryFiber;
    }

    public void setDietaryFiber(double dietaryFiber) {
        this.dietaryFiber = dietaryFiber;
    }

    public double getSugar() {
        return sugar;
    }

    public void setSugar(double sugar) {
        this.sugar = sugar;
    }

    public double getSugarAlcohol() {
        return sugarAlcohol;
    }

    public void setSugarAlcohol(double sugarAlcohol) {
        this.sugarAlcohol = sugarAlcohol;
    }

    public double getProtein() {
        return protein;
    }

    public void setProtein(double protein) {
        this.protein = protein;
    }
}
