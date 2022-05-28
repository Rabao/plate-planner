package com.techelevator.dao;

import com.techelevator.model.MealPlans;

import java.util.List;

public interface MealPlanDao {
    MealPlans getMealPlan(long id);

    List<MealPlans> listMealPlans();

    boolean addMealPlan(MealPlans mealPlan);

    boolean editMealPlan(long id, MealPlans mealPlan);

    boolean deleteMealPlan(long id);
}
