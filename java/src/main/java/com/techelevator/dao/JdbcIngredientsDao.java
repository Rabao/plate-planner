package com.techelevator.dao;

import com.techelevator.model.IngredientNotFoundException;
import com.techelevator.model.Ingredients;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Component;
import org.springframework.jdbc.support.rowset.SqlRowSet;

import java.util.ArrayList;
import java.util.List;

@Component
public class JdbcIngredientsDao implements IngredientsDao{

    private JdbcTemplate jdbcTemplate;

    public JdbcIngredientsDao(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    @Override
    public List<Ingredients> list() {
        List<Ingredients> ingredients = new ArrayList<>();
        String sql = "SELECT id, name, type FROM ingredients ";

        SqlRowSet results = jdbcTemplate.queryForRowSet(sql);
        while(results.next()) {
            Ingredients card = mapRowToIngredient(results);
            ingredients.add(card);
        }
        return ingredients;
    }

    @Override
    public Ingredients get(int id) {
        Ingredients ingredient = null;
        String sql = "SELECT id, name, type FROM ingredients WHERE id = ? ";

        SqlRowSet results = jdbcTemplate.queryForRowSet(sql,id);
        if(results.next()) {
            ingredient = mapRowToIngredient(results);
        } else {
            throw new IngredientNotFoundException();
        }

        return ingredient;
    }

    private Ingredients mapRowToIngredient(SqlRowSet rs) {
        Ingredients ingredients = new Ingredients();
        ingredients.setId(rs.getInt("id"));
        ingredients.setName(rs.getString("name"));
        ingredients.setType(rs.getString("type"));
        return ingredients;
    };
}
