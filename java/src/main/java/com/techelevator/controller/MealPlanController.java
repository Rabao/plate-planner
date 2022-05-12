package com.techelevator.controller;

import com.techelevator.dao.IngredientsDao;
import com.techelevator.dao.NutritionDao;
import com.techelevator.model.IngredientNotFoundException;
import com.techelevator.model.Ingredients;
import com.techelevator.model.Nutrition;
import com.techelevator.model.NutritionNotFoundException;
import org.springframework.context.annotation.Bean;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;


import javax.validation.Valid;
import java.util.List;
import java.util.Random;

@CrossOrigin(origins = "http://localhost:8080")
@RestController()
@RequestMapping("/")
public class MealPlanController {

    private IngredientsDao ingredientsDao;
    private NutritionDao nutritionDao;


    public MealPlanController(IngredientsDao ingredientsDao, NutritionDao nutritionDao) {
        this.ingredientsDao = ingredientsDao;
        this.nutritionDao = nutritionDao;
    }

    @ResponseStatus(HttpStatus.OK)
    @GetMapping(value="ingredients")
    public List<Ingredients> listIngredient(){
        return ingredientsDao.listIngredient();
    }

    @ResponseStatus(HttpStatus.OK)
    @GetMapping(value="ingredients/{id}")
    public Ingredients getIngredient(@PathVariable int id){
        return ingredientsDao.getIngredient(id);
    }

    @ResponseStatus(HttpStatus.CREATED)
    @PostMapping(value="ingredients")
    public void addIngredient(@Valid @RequestBody Ingredients ingredient){
        ingredientsDao.addIngredient(ingredient);
    }

    @ResponseStatus(HttpStatus.NO_CONTENT)
    @RequestMapping(value="ingredients/{id}", method = RequestMethod.DELETE )
    public void deleteIngredient(@PathVariable int id) throws IngredientNotFoundException {
        ingredientsDao.deleteIngredient(id);
    }

    @ResponseStatus(HttpStatus.OK)
    @GetMapping(value="nutrition")
    public List<Nutrition> listNutrition(){
        return nutritionDao.listNutrition();
    }

    @ResponseStatus(HttpStatus.OK)
    @GetMapping(value="nutrition/{id}")
    public Nutrition getNutrition(@PathVariable int id){
        return nutritionDao.getNutrition(id);
    }

    @ResponseStatus(HttpStatus.CREATED)
    @PostMapping(value="nutrition")
    public void addNutrition(@Valid @RequestBody Nutrition nutrition){
        nutritionDao.addNutrition(nutrition);
    }

    @ResponseStatus(HttpStatus.NO_CONTENT)
    @RequestMapping(value="nutrition/{id}", method = RequestMethod.DELETE )
    public void deleteNutrition(@PathVariable int id) throws NutritionNotFoundException {
        nutritionDao.deleteNutrition(id);
    }

//
//    @PutMapping(value="/cards/{id}")
//    public void update(@PathVariable int id, @RequestBody CatCard card) throws CatCardNotFoundException {
//        catCardDao.update(id, card);
//    }
//
//
//    private static final String PATH = "/error";
//
//    @RequestMapping(value ="/error")
//    public String error() {
//        return "Error handling";
//    }

}
