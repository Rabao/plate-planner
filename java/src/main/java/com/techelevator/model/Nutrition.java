package com.techelevator.model;

public class Nutrition {

    private long id;
    private String serving_size;
    private double calories;
    private double calories_fat;
    private double total_fat;
    private double saturated_fat;
    private double trans_fat;
    private double poly_fat;
    private double mono_fat;
    private double cholesterol;
    private double sodium;
    private double potassium;
    private double total_carbs;
    private double dietary_fiber;
    private double sugar;
    private double sugar_alcohol;
    private double added_sugar;
    private double protein;
    private int vitA;
    private int vitB6;
    private int vitB12;
    private int vitC;
    private int vitD;
    private int vitE;
    private int vitK;
    private int calcium;
    private int iron;
    private int magnesium;
    private int thiamine;
    private int biotin;
    private int panto_acid;
    private int phosphorous;
    private int iodine;
    private int zinc;
    private int selenium;
    private int copper;
    private int manganese;
    private int chromium;
    private int molybdenum;
    private int chloride;


    public Nutrition() {
    }

    public Nutrition(long id, String serving_size, double calories, double calories_fat, double total_fat, double saturated_fat, double trans_fat, double poly_fat, double mono_fat,
                     double cholesterol, double sodium, double potassium, double total_carbs, double dietary_fiber, double sugar, double sugar_alcohol,
                     double added_sugar, double protein, int vitA, int vitB6, int vitB12, int vitC, int vitD, int vitE, int vitK, int calcium, int iron,
                     int magnesium, int thiamine, int biotin, int panto_acid, int phosphorous, int iodine, int zinc, int selenium, int copper,
                     int manganese, int chromium, int molybdenum, int chloride) {
        this.id = id;
        this.serving_size = serving_size;
        this.calories = calories;
        this.calories_fat = calories_fat;
        this.total_fat = total_fat;
        this.saturated_fat = saturated_fat;
        this.trans_fat = trans_fat;
        this.poly_fat = poly_fat;
        this.mono_fat = mono_fat;
        this.cholesterol = cholesterol;
        this.sodium = sodium;
        this.potassium = potassium;
        this.total_carbs = total_carbs;
        this.dietary_fiber = dietary_fiber;
        this.sugar = sugar;
        this.sugar_alcohol = sugar_alcohol;
        this.added_sugar = added_sugar;
        this.protein = protein;
        this.vitA = vitA;
        this.vitB6 = vitB6;
        this.vitB12 = vitB12;
        this.vitC = vitC;
        this.vitD = vitD;
        this.vitE = vitE;
        this.vitK = vitK;
        this.calcium = calcium;
        this.iron = iron;
        this.magnesium = magnesium;
        this.thiamine = thiamine;
        this.biotin = biotin;
        this.panto_acid = panto_acid;
        this.phosphorous = phosphorous;
        this.iodine = iodine;
        this.zinc = zinc;
        this.selenium = selenium;
        this.copper = copper;
        this.manganese = manganese;
        this.chromium = chromium;
        this.molybdenum = molybdenum;
        this.chloride = chloride;
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getServingSize() {
        return serving_size;
    }

    public void setServingSize(String serving_size) {
        this.serving_size = serving_size;
    }

    public double getCalories() {
        return calories;
    }

    public void setCalories(double calories) {
        this.calories = calories;
    }

    public double getCaloriesFat() {
        return calories_fat;
    }

    public void setCaloriesFat(double calories_fat) {
        this.calories_fat = calories_fat;
    }

    public double getTotalFat() {
        return total_fat;
    }

    public void setTotalFat(double total_fat) {
        this.total_fat = total_fat;
    }

    public double getSaturatedFat() {
        return saturated_fat;
    }

    public void setSaturatedFat(double saturated_fat) {
        this.saturated_fat = saturated_fat;
    }

    public double getTransFat() {
        return trans_fat;
    }

    public void setTransFat(double trans_fat) {
        this.trans_fat = trans_fat;
    }

    public double getPolyFat() {
        return poly_fat;
    }

    public void setPolyFat(double poly_fat) {
        this.poly_fat = poly_fat;
    }

    public double getMonoFat() {
        return mono_fat;
    }

    public void setMonoFat(double mono_fat) {
        this.mono_fat = mono_fat;
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
        return total_carbs;
    }

    public void setTotalCarbs(double total_carbs) {
        this.total_carbs = total_carbs;
    }

    public double getDietaryFiber() {
        return dietary_fiber;
    }

    public void setDietaryFiber(double dietary_fiber) {
        this.dietary_fiber = dietary_fiber;
    }

    public double getSugar() {
        return sugar;
    }

    public void setSugar(double sugar) {
        this.sugar = sugar;
    }

    public double getSugarAlcohol() {
        return sugar_alcohol;
    }

    public void setSugarAlcohol(double sugar_alcohol) {
        this.sugar_alcohol = sugar_alcohol;
    }

    public double getAddedSugar() {
        return added_sugar;
    }

    public void setAddedSugar(double added_sugar) {
        this.added_sugar = added_sugar;
    }

    public double getProtein() {
        return protein;
    }

    public void setProtein(double protein) {
        this.protein = protein;
    }

    public int getVitA() {
        return vitA;
    }

    public void setVitA(int vitA) {
        this.vitA = vitA;
    }

    public int getVitB6() {
        return vitB6;
    }

    public void setVitB6(int vitB6) {
        this.vitB6 = vitB6;
    }

    public int getVitB12() {
        return vitB12;
    }

    public void setVitB12(int vitB12) {
        this.vitB12 = vitB12;
    }

    public int getVitC() {
        return vitC;
    }

    public void setVitC(int vitC) {
        this.vitC = vitC;
    }

    public int getVitD() {
        return vitD;
    }

    public void setVitD(int vitD) {
        this.vitD = vitD;
    }

    public int getVitE() {
        return vitE;
    }

    public void setVitE(int vitE) {
        this.vitE = vitE;
    }

    public int getVitK() {
        return vitK;
    }

    public void setVitK(int vitK) {
        this.vitK = vitK;
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

    public int getMagnesium() {
        return magnesium;
    }

    public void setMagnesium(int magnesium) {
        this.magnesium = magnesium;
    }

    public int getThiamine() {
        return thiamine;
    }

    public void setThiamine(int thiamine) {
        this.thiamine = thiamine;
    }

    public int getBiotin() {
        return biotin;
    }

    public void setBiotin(int biotin) {
        this.biotin = biotin;
    }

    public int getPantoAcid() {
        return panto_acid;
    }

    public void setPantoAcid(int panto_acid) {
        this.panto_acid = panto_acid;
    }

    public int getPhosphorous() {
        return phosphorous;
    }

    public void setPhosphorous(int phosphorous) {
        this.phosphorous = phosphorous;
    }

    public int getIodine() {
        return iodine;
    }

    public void setIodine(int iodine) {
        this.iodine = iodine;
    }

    public int getZinc() {
        return zinc;
    }

    public void setZinc(int zinc) {
        this.zinc = zinc;
    }

    public int getSelenium() {
        return selenium;
    }

    public void setSelenium(int selenium) {
        this.selenium = selenium;
    }

    public int getCopper() {
        return copper;
    }

    public void setCopper(int copper) {
        this.copper = copper;
    }

    public int getManganese() {
        return manganese;
    }

    public void setManganese(int manganese) {
        this.manganese = manganese;
    }

    public int getChromium() {
        return chromium;
    }

    public void setChromium(int chromium) {
        this.chromium = chromium;
    }

    public int getMolybdenum() {
        return molybdenum;
    }

    public void setMolybdenum(int molybdenum) {
        this.molybdenum = molybdenum;
    }

    public int getChloride() {
        return chloride;
    }

    public void setChloride(int chloride) {
        this.chloride = chloride;
    }

}
