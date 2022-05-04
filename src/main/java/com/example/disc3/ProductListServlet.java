package com.example.disc3;

import com.google.gson.JsonArray;
import com.google.gson.JsonObject;

import javax.naming.Context;
import javax.naming.InitialContext;
import javax.naming.NamingException;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.sql.DataSource;
import java.io.IOException;
import java.io.PrintWriter;
import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;

@WebServlet(name = "product_list", value = "/product_list")
public class ProductListServlet extends HttpServlet {

    @Override
    public void init() throws ServletException {
        super.init();
    }

    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        resp.setContentType("application/json");

        PrintWriter out = resp.getWriter();

        try {
            Context context = new InitialContext();
            Context env = (Context) context.lookup("java:comp/env");
            DataSource ds = (DataSource) env.lookup("jdbc/inf124");
            Connection con = ds.getConnection();

            Statement stmt = con.createStatement();

            String q = "SELECT * from product p";
            ResultSet rs = stmt.executeQuery(q);
            JsonArray items = new JsonArray();

            while(rs.next()){
                JsonObject item = new JsonObject();
                String product = rs.getString("pname");
                Double price = rs.getDouble("price");
                String image = rs.getString("image");

                item.addProperty("product", product);
                item.addProperty("price", price);
                item.addProperty("image", image);
                items.add(item);
            }

            out.write(items.toString());
            resp.setStatus(200);
            con.close();
        } catch (Exception e) {
            e.printStackTrace();
            resp.setStatus(500);
        }

    }
        @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {

    }
}