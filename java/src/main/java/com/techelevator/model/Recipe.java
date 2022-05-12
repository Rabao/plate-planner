package com.techelevator.model;

public class Recipe {

    private int id;
    private String name;
    private int numOfSteps;
    private String image;
    private String notes;

    public Recipe() {
    }

    public Recipe(int id, String name, int numOfSteps, String image, String notes) {
        this.id = id;
        this.name = name;
        this.numOfSteps = numOfSteps;
        this.image = image;
        this.notes = notes;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public int getNumOfSteps() {
        return numOfSteps;
    }

    public void setNumOfSteps(int numOfSteps) {
        this.numOfSteps = numOfSteps;
    }

    public String getImage() {
        return image;
    }

    public void setImage(String image) {
        this.image = image;
    }

    public String getNotes() {
        return notes;
    }

    public void setNotes(String notes) {
        this.notes = notes;
    }
}
