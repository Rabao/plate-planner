package com.techelevator.model;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.NOT_FOUND)
public class MealPlanNotFoundException extends RuntimeException{
    public MealPlanNotFoundException() {
        super("Meal plan not found");
    }
}
