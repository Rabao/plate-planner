package com.techelevator.controller;

import com.techelevator.dao.GroceryListDao;
import com.techelevator.dao.IngredientsDao;
import com.techelevator.dao.NutritionDao;
import com.techelevator.dao.RecipeDao;
import com.techelevator.model.*;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;


import javax.validation.Valid;
import java.util.List;

@CrossOrigin(origins = "http://localhost:3000")
@RestController()
@RequestMapping("/")
public class MealPlanController {

    private IngredientsDao ingredientsDao;
    private NutritionDao nutritionDao;
    private RecipeDao recipeDao;
    private GroceryListDao groceryListDao;

    public MealPlanController(IngredientsDao ingredientsDao, NutritionDao nutritionDao,
                              RecipeDao recipeDao, GroceryListDao groceryListDao) {
        this.ingredientsDao = ingredientsDao;
        this.nutritionDao = nutritionDao;
        this.recipeDao = recipeDao;
        this.groceryListDao = groceryListDao;
    }

    /*****************************************************
    *                                                    *
    *                 INGREDIENTS APIs                   *
    *                                                    *
    *****************************************************/

    @ResponseStatus(HttpStatus.OK)
    @GetMapping(value="ingredients")
    public List<Ingredients> listIngredient(){
        return ingredientsDao.listIngredient();
    }

//    @ResponseStatus(HttpStatus.OK)
//    @GetMapping(value="ingredients")
//    public List<Ingredients> listIngredient(@RequestParam int recipeId){
//        if(recipeId!=0)
//            return ingredientsDao.listIngredientsByRecipe(recipeId);
//        else
//            return ingredientsDao.listIngredient();
//
//    }

    @ResponseStatus(HttpStatus.OK)
    @GetMapping(value="ingredients/recipe")
    public List<Ingredients> listIngredientsByRecipe(@RequestParam int id){
        return ingredientsDao.listIngredientsByRecipe(id);
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

    /*****************************************************
     *                                                    *
     *                 INGREDIENTS APIs                   *
     *                                                    *
     *****************************************************/
    /*****************************************************
     *                                                    *
     *                 NUTRITION APIs                     *
     *                                                    *
     *****************************************************/

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

    /*****************************************************
     *                                                    *
     *                 NUTRITION APIs                     *
     *                                                    *
     *****************************************************/
    /*****************************************************
     *                                                    *
     *                   RECIPE APIs                      *
     *                                                    *
     *****************************************************/

    @ResponseStatus(HttpStatus.OK)
    @GetMapping(value="recipes")
    public List<Recipe> listRecipe(){
        return recipeDao.listRecipe();
    }

    @ResponseStatus(HttpStatus.OK)
    @GetMapping(value="recipes/{id}")
    public Recipe getRecipe(@PathVariable int id){
        return recipeDao.getRecipe(id);
    }

    @ResponseStatus(HttpStatus.CREATED)
    @PostMapping(value="recipes")
    public void addRecipe(@Valid @RequestBody Recipe recipe){
        recipeDao.addRecipe(recipe);
    }

    @ResponseStatus(HttpStatus.NO_CONTENT)
    @RequestMapping(value="recipes/{id}", method = RequestMethod.DELETE )
    public void deleteRecipe(@PathVariable int id) throws NutritionNotFoundException {
        recipeDao.deleteRecipe(id);
    }
    /*****************************************************
     *                                                    *
     *                   RECIPE APIs                      *
     *                                                    *
     *****************************************************/
    /*****************************************************
     *                                                    *
     *                  GROCERY APIs                      *
     *                                                    *
     *****************************************************/

    @ResponseStatus(HttpStatus.OK)
    @GetMapping(value="lists")
    public List<GroceryList> listGroceryLists(){
        return groceryListDao.listGroceryLists();
    }

    @ResponseStatus(HttpStatus.OK)
    @GetMapping(value="lists/{id}")
    public GroceryList getGroceryList(@PathVariable int id){
        return groceryListDao.getGroceryList(id);
    }

    @ResponseStatus(HttpStatus.CREATED)
    @PostMapping(value="lists")
    public void addNewGroceryList(@Valid @RequestBody GroceryList groceryList){
        groceryListDao.addNewGroceryList(groceryList);
    }

    @ResponseStatus(HttpStatus.CREATED)
    @PostMapping(value="lists/{id}")
    public void addNewItemToGroceryList(@PathVariable long id, @Valid @RequestBody GroceryList groceryList){
        groceryListDao.addNewItemToGroceryList(id,groceryList);
    }

    @ResponseStatus(HttpStatus.NO_CONTENT)
    @RequestMapping(value="lists/{id}", method = RequestMethod.DELETE )
    public void deleteGroceryList(@PathVariable long id) throws GroceryListNotFoundException {
        groceryListDao.deleteGroceryList(id);
    }
    /*****************************************************
     *                                                    *
     *                  GROCERY APIs                      *
     *                                                    *
     *****************************************************/
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
