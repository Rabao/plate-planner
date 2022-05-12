package com.techelevator.model;

public class Ingredients {

    private int id;
    private String name;
    private String type;

    public Ingredients(){}

    public Ingredients(int id, String name, String type){
        this.id = id;
        this.name = name;
        this.type = type;
    }

    @Override
    public String toString() {
        return  "\n Id: " + id +
                "\n Name:'" + name + '\'' +
                "\n Type: " + type;
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

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }
}
