package com.techelevator.dao;

import com.techelevator.model.GroceryList;
import com.techelevator.model.GroceryListNotFoundException;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Component;
import org.springframework.jdbc.support.rowset.SqlRowSet;

import java.util.ArrayList;
import java.util.List;

@Component
public class JdbcGroceryListDao implements GroceryListDao{

    private JdbcTemplate jdbcTemplate;

    public JdbcGroceryListDao(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    @Override
    public GroceryList getGroceryList(long id) {
        GroceryList list = null;
        String sql = "SELECT list_id, ingredient_id, ingredient_name, qty, " +
                "user_id, complete FROM grocery_list WHERE list_id = ? ";

        SqlRowSet results = jdbcTemplate.queryForRowSet(sql,id);
        if(results.next()) {
            list = mapRowToGroceryList(results);
        } else {
            throw new GroceryListNotFoundException();
        }

        return list;
    }

    @Override
    public List<GroceryList> listGroceryLists() {
        List<GroceryList> lists = new ArrayList<>();
        String sql = "SELECT * FROM grocery_list ";

        SqlRowSet results = jdbcTemplate.queryForRowSet(sql);
        while(results.next()) {
            GroceryList listItem = mapRowToGroceryList(results);
            lists.add(listItem);
        }
        return lists;
    }

    @Override
    public List<GroceryList> listGroceryListsByUser(long userId) {
        List<GroceryList> lists = new ArrayList<>();
        String sql = "SELECT list_id, ingredient_id, ingredient_name, qty " +
                "user_id, complete FROM grocery_list WHERE list_id = ? ";

        SqlRowSet results = jdbcTemplate.queryForRowSet(sql, userId);
        while(results.next()) {
            GroceryList listItem = mapRowToGroceryList(results);
            lists.add(listItem);
        }
        return lists;
    }

    @Override
    public boolean addNewGroceryList(GroceryList groceryList) {
//        String sql = "INSERT INTO grocery_list (list_id, ingredient_id, ingredient_name, " +
//                "qty, user_id, complete) VALUES (DEFAULT, ?, ?, ?, ?, false)";
//        return jdbcTemplate.update(sql,groceryList.getIngredientId(),groceryList.getIngredientName(),
//                groceryList.getQty(), groceryList.getUserId()) == 1;
        return false;
    }

    @Override
    public boolean toggleGroceryComplete(long id) {
        String sql = "UPDATE grocery_list SET complete = NOT complete " +
                "WHERE list_id = ?";
        return jdbcTemplate.update(sql, id) == 1;
    }

    @Override
    public boolean toggleGroceryCompleteByName(String name, int qty) {
        String sql = "UPDATE grocery_list SET complete = NOT complete " +
                "WHERE ingredient_name = ?";
        return jdbcTemplate.update(sql, name) == 1;
    }

    @Override
    public boolean addNewItemToGroceryList(long id, GroceryList groceryList) {
        String sql = "INSERT INTO grocery_list (list_id, ingredient_id, ingredient_name, " +
                "qty, user_id, complete) VALUES (DEFAULT, (select id from ingredients where name = ?)" +
                ", ?, ?, ?, false)";
        return jdbcTemplate.update(sql,groceryList.getIngredientName(),
                groceryList.getIngredientName(),groceryList.getQty(), groceryList.getUserId()) == 1;
    }

    @Override
    public boolean deleteGroceryList(long id) {
        String sql = "DELETE FROM grocery_list WHERE user_id = ? ";
        return jdbcTemplate.update(sql, id) == 1;
    }

    @Override
    public boolean deleteCompletedGrocery(long id) {
        String sql = "DELETE FROM grocery_list WHERE complete = true " +
                "& user_id = ?";
        return jdbcTemplate.update(sql, id) == 1;
    }

    private GroceryList mapRowToGroceryList(SqlRowSet rs) {
        GroceryList list = new GroceryList();
        list.setListId(rs.getLong("list_id"));
        list.setIngredientId(rs.getLong("ingredient_id"));
        list.setIngredientName(rs.getString("ingredient_name"));
        list.setQty(rs.getInt("qty"));
        list.setUserId(rs.getLong("user_id"));
        list.setComplete(rs.getBoolean("complete"));
        return list;
    };
}
