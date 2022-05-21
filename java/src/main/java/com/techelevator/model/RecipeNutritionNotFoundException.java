package com.techelevator.model;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.NOT_FOUND)
public class RecipeNutritionNotFoundException extends RuntimeException {

    public RecipeNutritionNotFoundException() {
        super("Recipe nutrition not found");
    }
}
