package com.techelevator.dao;

import com.techelevator.model.Favorites;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.support.rowset.SqlRowSet;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;

@Component
public class JdbcFavoritesDao implements FavoritesDao{

    private JdbcTemplate jdbcTemplate;

    public JdbcFavoritesDao(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    @Override
    public List<Favorites> listUserFavorites() {
        List<Favorites> faves = new ArrayList<>();
        String sql = "SELECT recipeId, userId FROM favorites";

        SqlRowSet results = jdbcTemplate.queryForRowSet(sql);
        while (results.next()) {
            Favorites fave = mapRowToFavorite(results);
            faves.add(fave);
        }
        return faves;
    }

    @Override
    public boolean addFavorite(Favorites favorite) {
        String sql = "INSERT INTO favorites (recipeId, userId) VALUES (?, ?)";
        return jdbcTemplate.update(sql,favorite.getRecipeId(),favorite.getUserId()) == 1;
    }

    @Override
    public boolean deleteFavorite(long recipeId, long userId) {
        String sql = "DELETE FROM favorites WHERE recipeId = ? AND userId = ?";
        return jdbcTemplate.update(sql,recipeId,userId) == 1;
    }


    private Favorites mapRowToFavorite(SqlRowSet rs) {
        Favorites favorite = new Favorites();
        favorite.setRecipeId(rs.getLong("recipeId"));
        favorite.setUserId(rs.getLong("userId"));
        return favorite;
    };
}
