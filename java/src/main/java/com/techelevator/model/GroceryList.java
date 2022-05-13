package com.techelevator.model;

public class GroceryList {

    private long listId;
    private long ingredientId;
    private String ingredientName;
    private int qty;

    public GroceryList() {}

    public GroceryList(long listId, long ingredientId, String ingredientName, int qty) {
        this.listId = listId;
        this.ingredientId = ingredientId;
        this.ingredientName = ingredientName;
        this.qty = qty;
    }

    @Override
    public String toString() {
        return  "\n List ID: " + listId +
                "\n Ingredient ID:'" + ingredientId + '\'' +
                "\n Ingredient Name:'" + ingredientName + '\'' +
                "\n Quantity: " + qty;
    }

    public long getListId() {
        return listId;
    }

    public void setListId(long listId) {
        this.listId = listId;
    }

    public long getIngredientId() {
        return ingredientId;
    }

    public void setIngredientId(long ingredientId) {
        this.ingredientId = ingredientId;
    }

    public String getIngredientName() {
        return ingredientName;
    }

    public void setIngredientName(String ingredientName) {
        this.ingredientName = ingredientName;
    }

    public int getQty() {
        return qty;
    }

    public void setQty(int qty) {
        this.qty = qty;
    }
}
