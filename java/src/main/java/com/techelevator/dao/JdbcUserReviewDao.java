package com.techelevator.dao;

import com.techelevator.model.UserReview;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.support.rowset.SqlRowSet;

import java.util.ArrayList;
import java.util.List;

public class JdbcUserReviewDao implements UserReviewDao{

    private JdbcTemplate jdbcTemplate;

    public JdbcUserReviewDao(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    @Override
    public List<UserReview> getListOfReviewsByRecipe(long recipeId) {
        List<UserReview> reviews = new ArrayList<>();
        String sql = "SELECT recipe_id, user_id, rating, comment FROM user_reviews " +
                "WHERE recipe_id = ?";

        SqlRowSet results = jdbcTemplate.queryForRowSet(sql, recipeId);
        while(results.next()) {
            UserReview review = mapRowToReview(results);
            reviews.add(review);
        }
        return reviews;
    }

    @Override
    public List<UserReview> getListOfReviewByUser(long userId) {
        List<UserReview> reviews = new ArrayList<>();
        String sql = "SELECT recipe_id, user_id, rating, comment FROM user_reviews " +
                "WHERE user_id = ?";

        SqlRowSet results = jdbcTemplate.queryForRowSet(sql, userId);
        while(results.next()) {
            UserReview review = mapRowToReview(results);
            reviews.add(review);
        }
        return reviews;
    }

    @Override
    public boolean addReview(UserReview userReview) {
        String sql = "INSERT INTO user_reviews (recipe_id, user_id, rating, comment) " +
                "VALUES (?, ?, ?, ?)";
        return jdbcTemplate.update(sql,userReview.getRecipeId(),userReview.getUserId(),
                userReview.getRating(), userReview.getComment()) == 1;
    }

    @Override
    public boolean deleteReview(long recipeId, long userId) {
        String sql = "DELETE FROM user_reviews WHERE recipe_id = ? " +
                "AND user_id = ? ";
        return jdbcTemplate.update(sql, recipeId, userId) == 1;
    }

    private UserReview mapRowToReview(SqlRowSet rs) {
        UserReview list = new UserReview();
        list.setRecipeId(rs.getInt("list_id"));
        list.setUserId(rs.getInt("user_id"));
        list.setRating(rs.getInt("rating"));
        list.setComment(rs.getString("comment"));
        return list;
    };
}
