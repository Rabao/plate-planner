package com.techelevator.dao;

import com.techelevator.model.GroceryList;
import com.techelevator.model.Ingredients;

import java.util.List;

public interface GroceryListDao {
    GroceryList getGroceryList(long id);

    List<GroceryList> listGroceryLists();

    List<GroceryList> listGroceryListsByUser(long userId);

    boolean addNewGroceryList(GroceryList groceryList);

    boolean addNewItemToGroceryList(long id, GroceryList groceryList);

    boolean deleteGroceryList(long id);
}
