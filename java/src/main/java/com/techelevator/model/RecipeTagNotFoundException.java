package com.techelevator.model;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.NOT_FOUND)
public class RecipeTagNotFoundException extends RuntimeException {

    public RecipeTagNotFoundException() {
        super("Recipe tag not found");
    }
}
