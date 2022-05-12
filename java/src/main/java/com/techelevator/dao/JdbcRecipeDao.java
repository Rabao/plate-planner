package com.techelevator.dao;

import com.techelevator.model.IngredientNotFoundException;
import com.techelevator.model.Ingredients;
import com.techelevator.model.Recipe;
import com.techelevator.model.RecipeNotFoundException;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.support.rowset.SqlRowSet;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;

@Component
public class JdbcRecipeDao implements RecipeDao{

    private JdbcTemplate jdbcTemplate;

    public JdbcRecipeDao(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    @Override
    public Recipe getRecipe(int id) {
        Recipe recipe = null;
        String sql = "SELECT id, name, num_of_steps, image, notes FROM recipes WHERE id = ? ";

        SqlRowSet results = jdbcTemplate.queryForRowSet(sql,id);
        if(results.next()) {
            recipe = mapRowToRecipe(results);
        } else {
            throw new RecipeNotFoundException();
        }

        return recipe;
    }

    @Override
    public List<Recipe> listRecipe() {
        List<Recipe> recipes = new ArrayList<>();
        String sql = "SELECT id, name, num_of_steps, image, notes FROM recipes ";

        SqlRowSet results = jdbcTemplate.queryForRowSet(sql);
        while(results.next()) {
            Recipe recipe = mapRowToRecipe(results);
            recipes.add(recipe);
        }
        return recipes;
    }

    @Override
    public boolean addRecipe(Recipe recipe) {
        String sql = "INSERT INTO recipes (id, name, num_of_steps, image, notes) " +
                "VALUES (DEFAULT, ?, ?, ?, ?)";
        return jdbcTemplate.update(sql,recipe.getName(),recipe.getNumOfSteps(),
                recipe.getImage(), recipe.getNotes()) == 1;
    }

    @Override
    public boolean deleteRecipe(int id) {
        String sql = "DELETE FROM recipes WHERE id = ? ";
        return jdbcTemplate.update(sql, id) == 1;
    }

    private Recipe mapRowToRecipe(SqlRowSet rs) {
        Recipe recipe = new Recipe();
        recipe.setId(rs.getInt("id"));
        recipe.setName(rs.getString("name"));
        recipe.setNumOfSteps(rs.getInt("num_of_steps"));
        recipe.setImage(rs.getString("image"));
        recipe.setNotes(rs.getString("notes"));
        return recipe;
    };
}
