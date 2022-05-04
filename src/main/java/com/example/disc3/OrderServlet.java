package com.example.disc3;

import com.google.gson.JsonArray;
import com.google.gson.JsonElement;
import com.google.gson.JsonObject;

import javax.naming.Context;
import javax.naming.InitialContext;
import javax.servlet.RequestDispatcher;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import javax.sql.DataSource;
import java.io.IOException;
import java.io.PrintWriter;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.Statement;

@WebServlet(name = "order", value = "/order")
public class OrderServlet extends HttpServlet {

    @Override
    public void init() throws ServletException {
        super.init();
    }

    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {

    }

    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        //JsonArray order =  req.getParameter("order");
        PrintWriter out = resp.getWriter();
        HttpSession session = req.getSession(true);
        JsonArray cart = (JsonArray) session.getAttribute("cart");
        String fname = req.getParameter("fname");
        String lname = req.getParameter("lname");
        String phone = req.getParameter("phone");
        String shipping = req.getParameter("shipping");

        try{
            Context context = new InitialContext();
            Context env = (Context) context.lookup("java:comp/env");
            DataSource ds = (DataSource) env.lookup("jdbc/inf124");
            Connection con = ds.getConnection();

            PreparedStatement ps;

            for(JsonElement item : cart){
                JsonObject item_obj = item.getAsJsonObject();
                String product = item_obj.get("product").getAsString();
                Double quantity = item_obj.get("quantity").getAsDouble();
                Double price = item_obj.get("price").getAsDouble();

                // (product, quantity, price, fname, lname, phone, shipping)

                ps = con.prepareStatement("INSERT INTO orders (product, quantity, price, fname, lname, phone, shipping) VALUES(?,?,?,?,?,?,?)");
                ps.setString(1, product);
                ps.setDouble(2, quantity);
                ps.setDouble(3, price);
                ps.setString(4,fname);
                ps.setString(5,lname);
                ps.setString(6,phone);
                ps.setString(7, shipping);
                ps.executeUpdate();

            }
            RequestDispatcher rd = req.getRequestDispatcher("order_details");
            rd.forward(req, resp);
            resp.setStatus(200);
        } catch(Exception e){
            e.printStackTrace();
            resp.setStatus(500);
        }

    }
}
