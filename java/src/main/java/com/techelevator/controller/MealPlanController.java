package com.techelevator.controller;

import com.techelevator.dao.*;
import com.techelevator.model.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.mvc.method.annotation.MvcUriComponentsBuilder;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;


import javax.validation.Valid;
import java.io.IOException;
import java.util.List;
import java.util.logging.Logger;
import java.util.stream.Collectors;

import static java.nio.file.Files.copy;
import static java.nio.file.Paths.get;


@CrossOrigin(origins = "http://localhost:3000")
@RestController()
@RequestMapping("/")
public class MealPlanController {

    private static final Logger logger = Logger.getLogger(MealPlanController.class.getName());

    private IngredientsDao ingredientsDao;
    private NutritionDao nutritionDao;
    private RecipeDao recipeDao;
    private GroceryListDao groceryListDao;
    private UserReviewDao userReviewDao;
    private RecipeStepsDao recipeStepsDao;
    private RecipeIngredientsDao recipeIngredientsDao;
    private UserDao userDao;
    private RecipeNutritionDao recipeNutritionDao;
    private RecipeTagDao recipeTagDao;


    public MealPlanController(IngredientsDao ingredientsDao, NutritionDao nutritionDao,
                              RecipeDao recipeDao, RecipeStepsDao recipeStepsDao, RecipeIngredientsDao recipeIngredientsDao,
                              GroceryListDao groceryListDao, UserDao userDao, UserReviewDao userReviewDao,
                              RecipeNutritionDao recipeNutritionDao, RecipeTagDao recipeTagDao) {
        this.ingredientsDao = ingredientsDao;
        this.nutritionDao = nutritionDao;
        this.recipeDao = recipeDao;
        this.groceryListDao = groceryListDao;
        this.userDao = userDao;
        this.userReviewDao = userReviewDao;
        this.recipeStepsDao = recipeStepsDao;
        this.recipeIngredientsDao = recipeIngredientsDao;
        this.recipeNutritionDao = recipeNutritionDao;
        this.recipeTagDao = recipeTagDao;

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

    @ResponseStatus(HttpStatus.OK)
    @GetMapping(value="ingredients/recipe")
    public List<Ingredients> listIngredientsByRecipe(@RequestParam long id){
        return ingredientsDao.listIngredientsByRecipe(id);
    }

    @ResponseStatus(HttpStatus.OK)
    @GetMapping(value="ingredients/{id}")
    public Ingredients getIngredient(@PathVariable long id){
        return ingredientsDao.getIngredient(id);
    }

    @ResponseStatus(HttpStatus.CREATED)
    @PostMapping(value="ingredients")
    public void addIngredient(@Valid @RequestBody Ingredients ingredient){
        ingredientsDao.addIngredient(ingredient);
    }

    @ResponseStatus(HttpStatus.NO_CONTENT)
    @RequestMapping(value="ingredients/{id}", method = RequestMethod.DELETE )
    public void deleteIngredient(@PathVariable long id) throws IngredientNotFoundException {
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
    public Nutrition getNutrition(@PathVariable long id){
        return nutritionDao.getNutrition(id);
    }

    @ResponseStatus(HttpStatus.CREATED)
    @PostMapping(value="nutrition")
    public void addNutrition(@Valid @RequestBody Nutrition nutrition){
        nutritionDao.addNutrition(nutrition);
    }

    @ResponseStatus(HttpStatus.NO_CONTENT)
    @RequestMapping(value="nutrition/{id}", method = RequestMethod.DELETE )
    public void deleteNutrition(@PathVariable long id) throws NutritionNotFoundException {
        nutritionDao.deleteNutrition(id);
    }

    @ResponseStatus(HttpStatus.OK)
    @GetMapping(value="recipes/nutrition")
    public List<RecipeNutrition> listRecipeNutrition(){
        return recipeNutritionDao.listRecipeNutrition();
    }

    @ResponseStatus(HttpStatus.OK)
    @GetMapping(value="recipes/nutrition/{id}")
    public RecipeNutrition getRecipeNutrition(@PathVariable long id){
        return recipeNutritionDao.getRecipeNutrition(id);
    }

    @ResponseStatus(HttpStatus.CREATED)
    @PostMapping(value="recipes/nutrition")
    public void addRecipeNutrition(@Valid @RequestBody RecipeNutrition nutrition){
        recipeNutritionDao.addRecipeNutrition(nutrition);
    }

    @ResponseStatus(HttpStatus.NO_CONTENT)
    @RequestMapping(value="recipes/nutrition/{id}", method = RequestMethod.DELETE )
    public void deleteRecipeNutrition(@PathVariable long id) throws RecipeNutritionNotFoundException {
        recipeNutritionDao.deleteRecipeNutrition(id);
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
    @GetMapping(value="recipes/search/{searchbar}")
    public List<Recipe> getRecipesBySearch(@PathVariable String searchbar){
        return recipeDao.getRecipesBySearch(searchbar);
    }

    @ResponseStatus(HttpStatus.OK)
    @GetMapping(value="recipes/ingredient")
    public List<Recipe> listRecipesByIngredient(@RequestParam long id){
        return recipeDao.listRecipesByIngredient(id);
    }

    @ResponseStatus(HttpStatus.OK)
    @GetMapping(value="recipes/{id}")
    public Recipe getRecipe(@PathVariable long id){
        return recipeDao.getRecipe(id);
    }

    @ResponseStatus(HttpStatus.CREATED)
    @PostMapping(value="recipes")
    public void addRecipe(@Valid @RequestBody Recipe recipe){
        recipeDao.addRecipe(recipe);
    }

    @ResponseStatus(HttpStatus.NO_CONTENT)
    @RequestMapping(value="recipes/{id}", method = RequestMethod.DELETE )
    public void deleteRecipe(@PathVariable long id) throws NutritionNotFoundException {
        recipeDao.deleteRecipe(id);
    }
    /*****************************************************
     *                                                    *
     *                   RECIPE APIs                      *
     *                                                    *
     *****************************************************/
    /*****************************************************
     *                                                    *
     *                RECIPE STEPS APIs                   *
     *                                                    *
     *****************************************************/
    @ResponseStatus(HttpStatus.OK)
    @GetMapping(value="/steps")
    public List<RecipeSteps> listRecipeSteps(){
        return recipeStepsDao.listRecipeSteps();
    }

    @ResponseStatus(HttpStatus.OK)
    @GetMapping(value="/steps/{id}")
    public RecipeSteps getRecipeSteps(@PathVariable long id){
        return recipeStepsDao.getRecipeSteps(id);
    }

    @ResponseStatus(HttpStatus.CREATED)
    @PostMapping(value="/steps")
    public void addRecipeSteps(@Valid @RequestBody RecipeSteps recipeSteps){
        recipeStepsDao.addRecipeSteps(recipeSteps);
    }
    /*****************************************************
     *                                                    *
     *                RECIPE STEPS APIs                   *
     *                                                    *
     *****************************************************/
    /*****************************************************
     *                                                    *
     *             RECIPE INGREDIENTS APIs                *
     *                                                    *
     *****************************************************/
    @ResponseStatus(HttpStatus.OK)
    @GetMapping(value="/recipes/ingredients")
    public List<RecipeIngredients> listRecipeIngredients(){
        return recipeIngredientsDao.listRecipeIngredients();
    }

    @ResponseStatus(HttpStatus.CREATED)
    @PostMapping(value="/recipes/ingredients")
    public boolean addRecipeIngredients(@Valid @RequestBody RecipeIngredients recipeIngredients){
        return recipeIngredientsDao.addRecipeIngredients(recipeIngredients);
    }

    @ResponseStatus(HttpStatus.NO_CONTENT)
    @RequestMapping(value="/recipes/ingredients/{id}", method = RequestMethod.DELETE )
    public boolean deleteRecipeIngredients(@PathVariable long id) throws RecipeIngredientsNotFoundException {
        return recipeIngredientsDao.deleteRecipeIngredients(id);
    }
    /*****************************************************
     *                                                    *
     *             RECIPE INGREDIENTS APIs                *
     *                                                    *
     *****************************************************/
    /*****************************************************
     *                                                    *
     *                  GROCERY APIs                      *
     *                                                    *
     *****************************************************/

    @ResponseStatus(HttpStatus.OK)
    @GetMapping(value="groceries")
    public List<GroceryList> listGroceryLists(){
        return groceryListDao.listGroceryLists();
    }

    @ResponseStatus(HttpStatus.OK)
    @GetMapping(value="groceries/{userId}")
    public List<GroceryList> listGroceryListByUser(@PathVariable long userId){
        return groceryListDao.listGroceryListsByUser(userId);
    }

    @ResponseStatus(HttpStatus.OK)
    @GetMapping(value="groceries/{id}")
    public GroceryList getGroceryList(@PathVariable long id){
        return groceryListDao.getGroceryList(id);
    }

//    @ResponseStatus(HttpStatus.CREATED)
//    @PostMapping(value="groceries")
//    public void addNewGroceryList(@Valid @RequestBody GroceryList groceryList){
//        groceryListDao.addNewGroceryList(groceryList);
//    }

    @ResponseStatus(HttpStatus.CREATED)
    @PostMapping(value="groceries/{userId}")
    public void addNewItemToGroceryList(@PathVariable long userId, @Valid @RequestBody GroceryList groceryList){
        groceryListDao.addNewItemToGroceryList(userId,groceryList);
    }

    @ResponseStatus(HttpStatus.OK)
    @PutMapping(value="groceries/{id}")
    public boolean toggleGroceryComplete(@PathVariable long id) throws GroceryListNotFoundException {
        return groceryListDao.toggleGroceryComplete(id);
    }

    @ResponseStatus(HttpStatus.OK)
    @PutMapping(value="groceries/{name}/{qty}")
    public boolean toggleGroceryCompleteByName(@PathVariable String name,
                                               @PathVariable int qty) throws GroceryListNotFoundException {
        return groceryListDao.toggleGroceryCompleteByName(name, qty);
    }

    @ResponseStatus(HttpStatus.NO_CONTENT)
    @RequestMapping(value="groceries/{id}", method = RequestMethod.DELETE )
    public void deleteGroceryList(@PathVariable long id) throws GroceryListNotFoundException {
        groceryListDao.deleteGroceryList(id);
    }

    @ResponseStatus(HttpStatus.NO_CONTENT)
    @RequestMapping(value="groceries/completed/{id}", method = RequestMethod.DELETE )
    public void deleteCompletedGrocery(@PathVariable long id) throws GroceryListNotFoundException {
        groceryListDao.deleteCompletedGrocery(id);
    }
    /*****************************************************
     *                                                    *
     *                  GROCERY APIs                      *
     *                                                    *
     *****************************************************/
    /*****************************************************
     *                                                    *
     *                  USER REVIEW APIs                  *
     *                                                    *
     *****************************************************/
    @ResponseStatus(HttpStatus.OK)
    @GetMapping(value="reviews/user")
    public List<User> findAll(){
        return userDao.findAll();
    }

    @ResponseStatus(HttpStatus.OK)
    @GetMapping(value="reviews/recipe")
    public List<UserReview> getListOfReviewsByRecipe(){
        return userReviewDao.getListOfReviewsByRecipe();
    }

    @ResponseStatus(HttpStatus.OK)
    @GetMapping(value="reviews/user/{id}")
    public List<UserReview> getListOfReviewByUser(@PathVariable long id){
        return userReviewDao.getListOfReviewByUser(id);
    }

    @ResponseStatus(HttpStatus.CREATED)
    @PostMapping(value="reviews")
    public void addReview(@Valid @RequestBody UserReview userReview){
        userReviewDao.addReview(userReview);
    }

    @ResponseStatus(HttpStatus.NO_CONTENT)
    @RequestMapping(value="reviews/{id}", method = RequestMethod.DELETE )
    public boolean deleteReview(@PathVariable long id)
            throws ReviewNotFoundException {
        return userReviewDao.deleteReview(id);
    }

    @ResponseStatus(HttpStatus.OK)
    @RequestMapping(value="reviews/{id}", method = RequestMethod.PUT)
    public boolean editReview(@PathVariable long id, @RequestParam int rating,
                              @RequestParam String comment) throws ReviewNotFoundException{
        return userReviewDao.editReview(id, rating, comment);
    }

    /*****************************************************
     *                                                    *
     *                  USER REVIEW APIs                  *
     *                                                    *
     *****************************************************/
    /*****************************************************
     *                                                    *
     *                  RECIPE TAGS APIs                  *
     *                                                    *
     *****************************************************/
    @ResponseStatus(HttpStatus.OK)
    @GetMapping(value="tags")
    public List<RecipeTag> listRecipeTags(){
        return recipeTagDao.listRecipeTags();
    }

    /*****************************************************
     *                                                    *
     *                  RECIPE TAGS APIs                  *
     *                                                    *
     *****************************************************/

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
