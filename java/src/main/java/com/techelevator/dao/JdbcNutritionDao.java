package com.techelevator.dao;

import com.techelevator.model.Nutrition;
import com.techelevator.model.NutritionNotFoundException;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Component;
import org.springframework.jdbc.support.rowset.SqlRowSet;

import java.util.ArrayList;
import java.util.List;

@Component
public class JdbcNutritionDao implements NutritionDao{

    private JdbcTemplate jdbcTemplate;

    public JdbcNutritionDao(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    @Override
    public Nutrition getNutrition(long id) {
        Nutrition nutrition = null;
        String sql = "SELECT id, serving_size, calories, calories_fat, total_fat, " +
                "saturated_fat, trans_fat, cholesterol, sodium, potassium, total_carbs, " +
                "dietary_fiber, sugar, sugar_alcohol, protein, vitC, calcium, iron, " +
                "vitD, vitB6, cobalamin, magnesium FROM nutrition WHERE id = ?";

        SqlRowSet results = jdbcTemplate.queryForRowSet(sql,id);
        if(results.next()) {
            nutrition = mapRowToNutrition(results);
        } else {
            throw new NutritionNotFoundException();
        }

        return nutrition;
    }

    @Override
    public List<Nutrition> listNutrition() {
        List<Nutrition> nutritionList = new ArrayList<>();
        String sql = "SELECT id, serving_size, calories, calories_fat, total_fat, " +
                "saturated_fat, trans_fat, cholesterol, sodium, potassium, total_carbs, " +
                "dietary_fiber, sugar, sugar_alcohol, protein, vitC, calcium, iron, " +
                "vitD, vitB6, cobalamin, magnesium FROM nutrition";

        SqlRowSet results = jdbcTemplate.queryForRowSet(sql);
        while(results.next()) {
            Nutrition nutrition = mapRowToNutrition(results);
            nutritionList.add(nutrition);
        }
        return nutritionList;
    }

    @Override
    public boolean addNutrition(Nutrition nutrition) {
        String sql = "INSERT INTO nutrition (id,serving_size, calories, calories_fat, total_fat, " +
                "saturated_fat, trans_fat, cholesterol, sodium, potassium, total_carbs, " +
                "dietary_fiber, sugar, sugar_alcohol, protein, vitC, calcium, iron, vitD, " +
                "vitB6, cobalamin, magnesium) VALUES (DEFAULT, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?" +
                ", ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
        return jdbcTemplate.update(sql, nutrition.getServingSize(),
                nutrition.getCalories(),nutrition.getCaloriesFat(), nutrition.getTotalFat(),
                nutrition.getSaturatedFat(),nutrition.getTransFat(), nutrition.getCholesterol(),
                nutrition.getSodium(),nutrition.getPotassium(), nutrition.getTotalCarbs(),
                nutrition.getDietaryFiber(),nutrition.getSugar(), nutrition.getSugarAlcohol(),
                nutrition.getProtein(),nutrition.getVitC(), nutrition.getCalcium(),
                nutrition.getIron(), nutrition.getVitD(),nutrition.getVitB6(),
                nutrition.getCobalamin(), nutrition.getMagnesium()) == 1;
    }

    @Override
    public boolean deleteNutrition(long id) {
        String sql = "DELETE FROM nutrition WHERE id = ? ";
        return jdbcTemplate.update(sql, id) == 1;
    }

    private Nutrition mapRowToNutrition(SqlRowSet rs) {
        Nutrition nutrition = new Nutrition();
        nutrition.setId(rs.getLong("id"));
        nutrition.setServingSize(rs.getDouble("serving_size"));
        nutrition.setCalories(rs.getDouble("calories"));
        nutrition.setCaloriesFat(rs.getDouble("calories_fat"));
        nutrition.setTotalFat(rs.getDouble("total_fat"));
        nutrition.setSaturatedFat(rs.getDouble("saturated_fat"));
        nutrition.setTransFat(rs.getDouble("trans_fat"));
        nutrition.setCholesterol(rs.getDouble("cholesterol"));
        nutrition.setSodium(rs.getDouble("sodium"));
        nutrition.setPotassium(rs.getDouble("potassium"));
        nutrition.setTotalCarbs(rs.getDouble("total_carbs"));
        nutrition.setDietaryFiber(rs.getDouble("dietary_fiber"));
        nutrition.setSugar(rs.getDouble("sugar"));
        nutrition.setSugarAlcohol(rs.getDouble("sugar_alcohol"));
        nutrition.setProtein(rs.getDouble("protein"));
        nutrition.setVitC(rs.getInt("vitC"));
        nutrition.setCalcium(rs.getInt("calcium"));
        nutrition.setIron(rs.getInt("iron"));
        nutrition.setVitD(rs.getInt("vitD"));
        nutrition.setVitB6(rs.getInt("vitB6"));
        nutrition.setCobalamin(rs.getInt("cobalamin"));
        nutrition.setMagnesium(rs.getInt("magnesium"));
        return nutrition;
    };
}
