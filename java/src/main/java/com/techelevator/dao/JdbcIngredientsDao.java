package com.techelevator.dao;

import com.techelevator.model.Ingredients;
import com.techelevator.model.IngredientNotFoundException;
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
    public Ingredients getIngredient(int id) {
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

    @Override
    public List<Ingredients> listIngredient() {
        List<Ingredients> ingredients = new ArrayList<>();
        String sql = "SELECT id, name, type FROM ingredients ";

        SqlRowSet results = jdbcTemplate.queryForRowSet(sql);
        while(results.next()) {
            Ingredients ingredient = mapRowToIngredient(results);
            ingredients.add(ingredient);
        }
        return ingredients;
    }

    @Override
    public boolean addIngredient(Ingredients ingredient) {
        String sql = "INSERT INTO ingredients (id, name, type) VALUES (DEFAULT, ?, ?)";
        return jdbcTemplate.update(sql,ingredient.getName(),ingredient.getType()) == 1;
    }

    @Override
    public boolean deleteIngredient(int id) {
        String sql = "DELETE FROM ingredients WHERE id = ? ";
        return jdbcTemplate.update(sql, id) == 1;
    }

    private Ingredients mapRowToIngredient(SqlRowSet rs) {
        Ingredients ingredients = new Ingredients();
        ingredients.setId(rs.getInt("id"));
        ingredients.setName(rs.getString("name"));
        ingredients.setType(rs.getString("type"));
        return ingredients;
    };
}
