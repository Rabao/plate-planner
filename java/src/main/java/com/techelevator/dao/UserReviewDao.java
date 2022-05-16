package com.techelevator.dao;

import com.techelevator.model.UserReview;

import java.util.List;

public interface UserReviewDao {

    List<UserReview> getListOfReviewsByRecipe();

    List<UserReview> getListOfReviewByUser(long userId);

    boolean addReview(UserReview userReview);

    boolean deleteReview(long id);
}
