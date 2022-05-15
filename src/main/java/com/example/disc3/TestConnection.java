package com.example.disc3;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;

public class TestConnection {
    public static void main(String[] args){
        String url = "jdbc:mysql://localhost:3306/inf124?useSSL=false";
        String username = "root";
        String password = "@Askvsksgk290199";

        System.out.println("Connecting database...");

        try (Connection connection = DriverManager.getConnection(url, username, password)) {
            Class.forName("com.mysql.jdbc.Driver");
            System.out.println("Driver loaded!");
            System.out.println("Database connected!");
            connection.close();
        } catch (SQLException | ClassNotFoundException e) {
            throw new IllegalStateException("Cannot connect the database!", e);
        }
    }
}
