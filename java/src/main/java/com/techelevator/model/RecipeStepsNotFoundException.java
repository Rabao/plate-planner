package com.techelevator.model;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.NOT_FOUND)
public class RecipeStepsNotFoundException extends RuntimeException {

    public RecipeStepsNotFoundException() {
        super("Recipe steps not found");
    }
}
