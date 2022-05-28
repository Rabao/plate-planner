package com.techelevator.dao;

import com.techelevator.model.RecipeIngredients;
import com.techelevator.model.RecipeIngredientsNotFoundException;
import com.techelevator.model.RecipeSteps;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.support.rowset.SqlRowSet;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;

@Component
public class JdbcRecipeIngredientsDao implements RecipeIngredientsDao {

    private JdbcTemplate jdbcTemplate;

    public JdbcRecipeIngredientsDao(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    @Override
    public List<RecipeIngredients> listRecipeIngredients() {
        List<RecipeIngredients> ingredients = new ArrayList<>();
        String sql = "SELECT recipe_id, ingredient_id, ingredient_name, measurement, unit, ingredient_key FROM recipe_ingredients " +
                "ORDER BY ingredient_key";

        SqlRowSet results = jdbcTemplate.queryForRowSet(sql);
        while(results.next()) {
            RecipeIngredients ingredient = mapRowToRecipeIngredients(results);
            ingredients.add(ingredient);
        }
        return ingredients;
    }

    @Override
    public boolean addRecipeIngredients(RecipeIngredients recipeIngredients) {
        String sql = "INSERT INTO recipe_ingredients (recipe_id, ingredient_id, ingredient_name, measurement, unit, ingredient_key) " +
                "VALUES (?, ?, ?, ?, ?, DEFAULT)";
        return jdbcTemplate.update(sql,recipeIngredients.getRecipeId(),recipeIngredients.getIngredientId(),
                recipeIngredients.getingredient_name(),recipeIngredients.getMeasurement(),recipeIngredients.getUnit()) == 1;
    }

    @Override
    public boolean editRecipeIngredients(long id, RecipeIngredients recipeIngredients) {
        String sql = "UPDATE recipe_ingredients SET ingredient_id = ?, ingredient_name = ? , measurement = ? , unit = ? " +
                "WHERE ingredient_key = ? ";
        return jdbcTemplate.update(sql, recipeIngredients.getIngredientId(), recipeIngredients.getingredient_name(),
                recipeIngredients.getMeasurement(),recipeIngredients.getUnit(), id) == 1;
    }

    @Override
    public boolean deleteRecipeIngredients(long id) {
        String sql = "DELETE FROM recipe_ingredients WHERE ingredient_key = ? ";
        return jdbcTemplate.update(sql, id) == 1;
    }

    private RecipeIngredients mapRowToRecipeIngredients(SqlRowSet rs) {
        RecipeIngredients ingredients = new RecipeIngredients();
        ingredients.setRecipeId(rs.getLong("recipe_id"));
        ingredients.setIngredientId(rs.getLong("ingredient_id"));
        ingredients.setingredient_name(rs.getString("ingredient_name"));
        ingredients.setMeasurement(rs.getDouble("measurement"));
        ingredients.setUnit(rs.getString("unit"));
        ingredients.setIngredient_key(rs.getLong("ingredient_key"));
        return ingredients;
    };
}
