package com.techelevator.model;

public class GroceryList {

    private long listId;
    private long ingredient_id;
    private String ingredient_name;
    private int qty;
    private long userId;
    private boolean isComplete;

    public GroceryList() {}

    public GroceryList(long listId, long ingredient_id, String ingredient_name, int qty,
                       long userId, boolean isComplete) {
        this.listId = listId;
        this.ingredient_id = ingredient_id;
        this.ingredient_name = ingredient_name;
        this.qty = qty;
        this.userId = userId;
        this.isComplete = isComplete;
    }

    @Override
    public String toString() {
        return  "\n List ID: " + listId +
                "\n Ingredient ID:'" + ingredient_id + '\'' +
                "\n Ingredient Name:'" + ingredient_name + '\'' +
                "\n Quantity: " + qty;
    }

    public long getListId() {
        return listId;
    }

    public void setListId(long listId) {
        this.listId = listId;
    }

    public long getIngredientId() {
        return ingredient_id;
    }

    public void setIngredientId(long ingredient_id) {
        this.ingredient_id = ingredient_id;
    }

    public String getIngredientName() {
        return ingredient_name;
    }

    public void setIngredientName(String ingredient_name) {
        this.ingredient_name = ingredient_name;
    }

    public int getQty() {
        return qty;
    }

    public void setQty(int qty) {
        this.qty = qty;
    }

    public long getUserId() {
        return userId;
    }

    public void setUserId(long userId) {
        this.userId = userId;
    }

    public boolean isComplete() {
        return isComplete;
    }

    public void setComplete(boolean complete) {
        isComplete = complete;
    }
}
