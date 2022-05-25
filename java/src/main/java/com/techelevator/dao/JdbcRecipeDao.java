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
    public Recipe getRecipe(long id) {
        Recipe recipe = null;
        String sql = "SELECT id, name, num_of_steps, image, notes, user_id, type " +
                "FROM recipes WHERE id = ? ";

        SqlRowSet results = jdbcTemplate.queryForRowSet(sql,id);
        if(results.next()) {
            recipe = mapRowToRecipe(results);
        } else {
            throw new RecipeNotFoundException();
        }
        return recipe;
    }

    @Override
    public List<Recipe> getRecipesBySearch(String searchbar) {
        List<Recipe> recipes = new ArrayList<>();
        String sql = "SELECT id, name, num_of_steps, image, notes, user_id, type " +
                "FROM recipes INNER JOIN recipe_tags ON recipes.id = recipe_tags.recipeId " +
                "WHERE LOWER(recipe_tags.tag) LIKE LOWER(?) OR LOWER(name) LIKE LOWER(?)";
        SqlRowSet results = jdbcTemplate.queryForRowSet(sql, '%'+searchbar+'%', '%'+searchbar+'%');
        while (results.next()) {
            Recipe recipe = mapRowToRecipe(results);
            recipes.add(recipe);
        }
        return recipes;
    }

    @Override
    public List<Recipe> listRecipe() {
        List<Recipe> recipes = new ArrayList<>();
        String sql = "SELECT id, name, num_of_steps, image, notes, user_id, type FROM recipes ";

        SqlRowSet results = jdbcTemplate.queryForRowSet(sql);
        while (results.next()) {
            Recipe recipe = mapRowToRecipe(results);
            recipes.add(recipe);
        }
        return recipes;
    }

    @Override
    public List<Recipe> listRecipesByIngredient(long ingredient_id) {
        List<Recipe> recipes = new ArrayList<>();
        String sql = "SELECT * " +
                "FROM recipes AS r " +
                "INNER JOIN recipes_ingredients AS ri " +
                "ON ri.recipe_id = r.id " +
                "INNER JOIN ingredients AS i " +
                "ON i.id = ri.ingredient_id " +
                "WHERE i.id = ?";

        SqlRowSet results = jdbcTemplate.queryForRowSet(sql, ingredient_id);
        while(results.next()) {
            Recipe recipe = mapRowToRecipe(results);
            recipes.add(recipe);
        }
        return recipes;
    }

    @Override
    public List<Recipe> listRecipesByType(String type) {
        List<Recipe> recipes = new ArrayList<>();
        String sql = "SELECT id, name, num_of_steps, image, notes, user_id, type FROM recipes " +
                "WHERE type = ?";

        SqlRowSet results = jdbcTemplate.queryForRowSet(sql, type);
        while(results.next()) {
            Recipe recipe = mapRowToRecipe(results);
            recipes.add(recipe);
        }
        return recipes;
    }

    @Override
    public boolean addRecipe(Recipe recipe) {
        String sql = "INSERT INTO recipes (id, name, num_of_steps, image, notes, user_id, type ) " +
                "VALUES (?, ?, ?, ?, ?, ?, ? )";
        return jdbcTemplate.update(sql,recipe.getId(), recipe.getName(), recipe.getNumOfSteps(), recipe.getImage(),
                recipe.getNotes(), recipe.getUserId(), recipe.getType()) == 1;
    }

    @Override
    public boolean editRecipe(long id, String name, int numOfSteps, String image, String notes, int userId, String type) {
        String sql = "UPDATE recipes SET name = ?, num_of_steps = ?, image = ?, notes = ?, user_id = ?, type = ? " +
                "WHERE id = ?";
        return jdbcTemplate.update(sql, name, numOfSteps, image, notes, userId, type, id) == 1;
    }

    @Override
    public boolean deleteRecipe(long id) {
        String sql = "DELETE FROM recipes WHERE id = ? ";
        return jdbcTemplate.update(sql, id) == 1;
    }

    private Recipe mapRowToRecipe(SqlRowSet rs) {
        Recipe recipe = new Recipe();
        recipe.setId(rs.getLong("id"));
        recipe.setName(rs.getString("name"));
        recipe.setNumOfSteps(rs.getInt("num_of_steps"));
        recipe.setImage(rs.getString("image"));
        recipe.setNotes(rs.getString("notes"));
        recipe.setUserId(rs.getInt("user_id"));
        recipe.setType(rs.getString("type"));
        return recipe;
    };
}
