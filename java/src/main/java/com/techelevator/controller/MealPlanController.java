package com.techelevator.controller;

import com.techelevator.dao.IngredientsDao;
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
@RequestMapping("/api")
public class IngredientsController {

    private IngredientsDao ingredientsDao;


    public IngredientsController(IngredientsDao ingredientsDao) {
        this.catCardDao = catCardDao;
    }

    @ResponseStatus(HttpStatus.OK)
    @GetMapping(value="/cards")
    public List<CatCard> list(){
        return catCardDao.list();
    }

    @ResponseStatus(HttpStatus.OK)
    @GetMapping(value="/cards/{id}")
    public CatCard get(@PathVariable int id){
        return catCardDao.get(id);
    }

    @ResponseStatus(HttpStatus.OK)
    @GetMapping(path="/cards/random")
    public CatCard random(){
        CatCard card = new CatCard();
        card.setCatFact(catFactService.getFact().getText());
        card.setImgUrl(catPicService.getPic().getFile());
        return card;
    }

    @ResponseStatus(HttpStatus.CREATED)
    @PostMapping(value="/cards")
    public void create(@Valid @RequestBody CatCard cardToSave){
        catCardDao.save(cardToSave);
    }


    @PutMapping(value="/cards/{id}")
    public void update(@PathVariable int id, @RequestBody CatCard card) throws CatCardNotFoundException {
        catCardDao.update(id, card);
    }

    //Added 'method = RequestMethod.DELETE' to enable DELETE via ReactJS REST app.
    @ResponseStatus(HttpStatus.NO_CONTENT)
    @RequestMapping(value="/cards/{id}", method = RequestMethod.DELETE )
    public void delete(@PathVariable int id) throws CatCardNotFoundException {
        catCardDao.delete(id);
    }

    private static final String PATH = "/error";

    @RequestMapping(value ="/error")
    public String error() {
        return "Error handling";
    }

}
