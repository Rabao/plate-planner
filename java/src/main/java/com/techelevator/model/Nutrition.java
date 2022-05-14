package com.techelevator.model;

public class Nutrition {

    private long id;
    private double serving_size;
    private double calories;
    private double calories_fat;
    private double total_fat;
    private double saturated_fat;
    private double trans_fat;
    private double cholesterol;
    private double sodium;
    private double potassium;
    private double total_carbs;
    private double dietary_fiber;
    private double sugar;
    private double sugar_alcohol;
    private double protein;
    private int vitC;
    private int calcium;
    private int iron;
    private int vitD;
    private int vitB6;
    private int cobalamin;
    private int magnesium;

    public Nutrition() {
    }

    public Nutrition(long id, double serving_size, double calories, double calories_fat,
                     double total_fat, double saturated_fat, double trans_fat,
                     double cholesterol, double sodium, double potassium, double total_carbs,
                     double dietary_fiber, double sugar, double sugar_alcohol, double protein,
                     int vitC, int calcium, int iron, int vitD, int vitB6, int cobalamin, int magnesium) {
        this.id = id;
        this.serving_size = serving_size;
        this.calories = calories;
        this.calories_fat = calories_fat;
        this.total_fat = total_fat;
        this.saturated_fat = saturated_fat;
        this.trans_fat = trans_fat;
        this.cholesterol = cholesterol;
        this.sodium = sodium;
        this.potassium = potassium;
        this.total_carbs = total_carbs;
        this.dietary_fiber = dietary_fiber;
        this.sugar = sugar;
        this.sugar_alcohol = sugar_alcohol;
        this.protein = protein;
        this.vitC = vitC;
        this.calcium = calcium;
        this.iron = iron;
        this.vitD = vitD;
        this.vitB6 = vitB6;
        this.cobalamin = cobalamin;
        this.magnesium = magnesium;
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public double getserving_size() {
        return serving_size;
    }

    public void setserving_size(double serving_size) {
        this.serving_size = serving_size;
    }

    public double getCalories() {
        return calories;
    }

    public void setCalories(double calories) {
        this.calories = calories;
    }

    public double getcalories_fat() {
        return calories_fat;
    }

    public void setcalories_fat(double calories_fat) {
        this.calories_fat = calories_fat;
    }

    public double gettotal_fat() {
        return total_fat;
    }

    public void settotal_fat(double total_fat) {
        this.total_fat = total_fat;
    }

    public double getsaturated_fat() {
        return saturated_fat;
    }

    public void setsaturated_fat(double saturated_fat) {
        this.saturated_fat = saturated_fat;
    }

    public double gettrans_fat() {
        return trans_fat;
    }

    public void settrans_fat(double trans_fat) {
        this.trans_fat = trans_fat;
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

    public double gettotal_carbs() {
        return total_carbs;
    }

    public void settotal_carbs(double total_carbs) {
        this.total_carbs = total_carbs;
    }

    public double getdietary_fiber() {
        return dietary_fiber;
    }

    public void setdietary_fiber(double dietary_fiber) {
        this.dietary_fiber = dietary_fiber;
    }

    public double getSugar() {
        return sugar;
    }

    public void setSugar(double sugar) {
        this.sugar = sugar;
    }

    public double getsugar_alcohol() {
        return sugar_alcohol;
    }

    public void setsugar_alcohol(double sugar_alcohol) {
        this.sugar_alcohol = sugar_alcohol;
    }

    public double getProtein() {
        return protein;
    }

    public void setProtein(double protein) {
        this.protein = protein;
    }

    public int getVitC() {
        return vitC;
    }

    public void setVitC(int vitC) {
        this.vitC = vitC;
    }

    public int getCalcium() {
        return calcium;
    }

    public void setCalcium(int calcium) {
        this.calcium = calcium;
    }

    public int getIron() {
        return iron;
    }

    public void setIron(int iron) {
        this.iron = iron;
    }

    public int getVitD() {
        return vitD;
    }

    public void setVitD(int vitD) {
        this.vitD = vitD;
    }

    public int getVitB6() {
        return vitB6;
    }

    public void setVitB6(int vitB6) {
        this.vitB6 = vitB6;
    }

    public int getCobalamin() {
        return cobalamin;
    }

    public void setCobalamin(int cobalamin) {
        this.cobalamin = cobalamin;
    }

    public int getMagnesium() {
        return magnesium;
    }

    public void setMagnesium(int magnesium) {
        this.magnesium = magnesium;
    }
}
