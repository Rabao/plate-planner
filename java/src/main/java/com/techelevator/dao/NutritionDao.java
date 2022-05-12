package com.techelevator.dao;

import com.techelevator.model.Nutrition;

import java.util.List;

public interface NutritionDao {
    Nutrition getNutrition(int id);

    List<Nutrition> listNutrition();

    boolean addNutrition(Nutrition nutrition);

    boolean deleteNutrition(int id);
}
