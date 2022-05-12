package com.techelevator.dao;

import com.techelevator.model.Ingredients;

import java.util.List;

public interface IngredientsDao {
    Ingredients get(int id);

    List<Ingredients> list();
}
