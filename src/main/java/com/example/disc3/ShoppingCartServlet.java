package com.example.disc3;

import com.google.gson.JsonArray;
import com.google.gson.JsonObject;

import javax.naming.Context;
import javax.naming.InitialContext;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import javax.sql.DataSource;
import javax.xml.crypto.Data;
import java.io.IOException;
import java.io.PrintWriter;
import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.Statement;

@WebServlet(name = "shopping_cart", value = "/shopping_cart")
public class ShoppingCartServlet extends HttpServlet{

    @Override
    public void init() throws ServletException {
        super.init();
    }

    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        resp.setContentType("application/json");
        PrintWriter out = resp.getWriter();
        HttpSession session = req.getSession(true);
        JsonArray cart = null;
        if(session.getAttribute("cart") != null){
            cart = (JsonArray) session.getAttribute("cart");
        } else {
            cart = new JsonArray();
        }
        out.write(cart.toString());
        resp.setStatus(200);
        out.close();
    }

    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        HttpSession session = req.getSession(true);
        String product = req.getParameter("name");
        String quantity = req.getParameter("quantity");
        String price = req.getParameter("price");

        JsonArray cart = null;
        if(session.getAttribute("cart") != null){
            cart = (JsonArray) session.getAttribute("cart");
        } else {
            cart = new JsonArray();
        }

        JsonObject item = new JsonObject();

        item.addProperty("product", product);
        item.addProperty("quantity", quantity);
        item.addProperty("price", price);
        cart.add(item);

        session.setAttribute("cart", cart);
    }
}
