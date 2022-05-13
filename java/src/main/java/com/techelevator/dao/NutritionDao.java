package com.techelevator.dao;

import com.techelevator.model.Nutrition;

import java.util.List;

public interface NutritionDao {
    Nutrition getNutrition(long id);

    List<Nutrition> listNutrition();

    boolean addNutrition(Nutrition nutrition);

    boolean deleteNutrition(long id);
}
