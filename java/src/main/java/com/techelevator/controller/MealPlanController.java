package com.techelevator.controller;

import com.techelevator.dao.IngredientsDao;
import com.techelevator.model.Ingredients;
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


    public MealPlanController(IngredientsDao ingredientsDao) {
        this.ingredientsDao = ingredientsDao;
    }

    @ResponseStatus(HttpStatus.OK)
    @GetMapping(value="ingredients")
    public List<Ingredients> list(){
        return ingredientsDao.list();
    }

    @ResponseStatus(HttpStatus.OK)
    @GetMapping(value="ingredients/{id}")
    public Ingredients get(@PathVariable int id){
        return ingredientsDao.get(id);
    }
//
//    @ResponseStatus(HttpStatus.CREATED)
//    @PostMapping(value="/cards")
//    public void create(@Valid @RequestBody CatCard cardToSave){
//        catCardDao.save(cardToSave);
//    }
//
//
//    @PutMapping(value="/cards/{id}")
//    public void update(@PathVariable int id, @RequestBody CatCard card) throws CatCardNotFoundException {
//        catCardDao.update(id, card);
//    }
//
//    //Added 'method = RequestMethod.DELETE' to enable DELETE via ReactJS REST app.
//    @ResponseStatus(HttpStatus.NO_CONTENT)
//    @RequestMapping(value="/cards/{id}", method = RequestMethod.DELETE )
//    public void delete(@PathVariable int id) throws CatCardNotFoundException {
//        catCardDao.delete(id);
//    }
//
//    private static final String PATH = "/error";
//
//    @RequestMapping(value ="/error")
//    public String error() {
//        return "Error handling";
//    }

}
