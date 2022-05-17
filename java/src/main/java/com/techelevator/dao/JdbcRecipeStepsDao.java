package com.techelevator.dao;

import com.techelevator.model.RecipeSteps;
import com.techelevator.model.RecipeStepsNotFoundException;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.support.rowset.SqlRowSet;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;

@Component
public class JdbcRecipeStepsDao implements RecipeStepsDao {

    private JdbcTemplate jdbcTemplate;

    public JdbcRecipeStepsDao(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    @Override
    public List<RecipeSteps> listRecipeSteps() {
        List<RecipeSteps> steps = new ArrayList<>();
        String sql = "SELECT recipe_id, step_num, step FROM recipe_steps ";

        SqlRowSet results = jdbcTemplate.queryForRowSet(sql);
        while(results.next()) {
            RecipeSteps step = mapRowToRecipeSteps(results);
            steps.add(step);
        }
        return steps;
    }

    @Override
    public RecipeSteps getRecipeSteps(long id) {
        RecipeSteps recipe = null;
        String sql = "SELECT * FROM recipe_steps WHERE recipe_id = ? ";

        SqlRowSet results = jdbcTemplate.queryForRowSet(sql,id);
        if(results.next()) {
            recipe = mapRowToRecipeSteps(results);
        } else {
            throw new RecipeStepsNotFoundException();
        }
        return recipe;
    }

    @Override
    public boolean addRecipeSteps(RecipeSteps recipeSteps) {
        String sql = "INSERT INTO recipe_steps (recipe_id, step_num, step) " +
                "VALUES (?, ?, ?)";
        return jdbcTemplate.update(sql,recipeSteps.getRecipeId(),recipeSteps.getStepNum(),recipeSteps.getSteps()) == 1;
    }

    private RecipeSteps mapRowToRecipeSteps(SqlRowSet rs) {
        RecipeSteps steps = new RecipeSteps();
        steps.setRecipeId(rs.getLong("recipe_id"));
        steps.setStepNum(rs.getInt("step_num"));
        steps.setSteps(rs.getString("step"));
        return steps;
    };
}
