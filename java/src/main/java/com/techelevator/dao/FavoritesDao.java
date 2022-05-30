package com.techelevator.dao;

import com.techelevator.model.Favorites;

import java.util.List;

public interface FavoritesDao {
    List<Favorites> listUserFavorites();

    boolean addFavorite(Favorites favorite);

    boolean deleteFavorite(long recipeId, long userId);
}
