package com.techelevator.dao;

import com.techelevator.model.Recipe;
import com.techelevator.model.RecipeTag;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.support.rowset.SqlRowSet;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;

@Component
public class JdbcRecipeTagDao implements RecipeTagDao{

    private JdbcTemplate jdbcTemplate;

    public JdbcRecipeTagDao(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    @Override
    public List<RecipeTag> listRecipeTags() {
        List<RecipeTag> tags = new ArrayList<>();
        String sql = "SELECT recipeId, tag FROM recipe_tags";

        SqlRowSet results = jdbcTemplate.queryForRowSet(sql);
        while (results.next()) {
            RecipeTag tag = mapRowToTag(results);
            tags.add(tag);
        }
        return tags;
    }

    @Override
    public List<RecipeTag> listRecipeTagsById(long recipeId) {
        List<RecipeTag> tags = new ArrayList<>();
        String sql = "SELECT recipeId, tag FROM recipe_tags WHERE recipeId = ?";

        SqlRowSet results = jdbcTemplate.queryForRowSet(sql, recipeId);
        while (results.next()) {
            RecipeTag tag = mapRowToTag(results);
            tags.add(tag);
        }
        return tags;
    }

    private RecipeTag mapRowToTag(SqlRowSet rs) {
        RecipeTag tag = new RecipeTag();
        tag.setRecipeId(rs.getLong("recipeId"));
        tag.setTag(rs.getString("tag"));
        return tag;
    };
}
