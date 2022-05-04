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
import java.sql.ResultSet;
import java.sql.Statement;

@WebServlet(name = "recent_order", value = "/recent_order")
public class RecentOrderServlet extends HttpServlet {
    @Override
    public void init() throws ServletException {
        super.init();
    }

    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        resp.setContentType("application/json");
        RequestDispatcher reqDispatch = req.getRequestDispatcher("order_details");
        reqDispatch.include(req,resp);
        HttpSession session = req.getSession(true);

        try{
            PrintWriter out=resp.getWriter();
//            Context context = new InitialContext();
//            Context env = (Context) context.lookup("java:comp/env");
//            DataSource ds = (DataSource) env.lookup("jdbc/inf124");
//            Connection connection = ds.getConnection();
//            Statement stmt = connection.createStatement();
//            ResultSet resultSet = stmt.executeQuery("Select * from orders");
            JsonArray recent_orders = null;
            if (session.getAttribute("order") != null){
                recent_orders = (JsonArray) session.getAttribute("order");
            } else {
                recent_orders = new JsonArray();
            }
            out.write(recent_orders.toString());
            resp.setStatus(200);
            out.close();
        } catch(Exception e){
            e.printStackTrace();
            resp.setStatus(500);
        }
    }

    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {

    }
}
