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
import java.sql.ResultSet;
import java.sql.Statement;

@WebServlet(name = "order_details", value = "/order_details")
public class OrderDetailsServlet extends HttpServlet {

    @Override
    public void init() throws ServletException {
        super.init();
    }

    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        try
        {
            PrintWriter out=resp.getWriter();
            out.println("<center><h1>Order Details</h1></center>");
            Context context = new InitialContext();
            Context env = (Context) context.lookup("java:comp/env");
            DataSource ds = (DataSource) env.lookup("jdbc/inf124");
            Connection connection = ds.getConnection();
            Statement stmt = connection.createStatement();
            ResultSet resultSet = stmt.executeQuery("Select * from orders");
            resp.setContentType("text/html");
            out.print("<table border='1' width='100%'");
            out.print("<tr><th>Id</th><th>Product Name</th><th>Quantity</th><th>Price</th><th>First Name</th><th>Last Name</th><th>Phone Number</th><th>Shipping Method</th></tr>");


            while(resultSet.next())
            {
                out.print("<tr><td>"+resultSet.getInt(1)+"</td><td>"+resultSet.getDouble(2)+"</td><td>"+resultSet.getDouble(3)+"</td><td>"+resultSet.getString(4)+"</td><td>"+resultSet.getString(5)+"</td><td>"+resultSet.getString(6)+"</td><td>"+resultSet.getString(7)+"</td>");

            }
            out.print("</table>");


        }
        catch(Exception e)
        {

        }
    }

    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {

    }
}
