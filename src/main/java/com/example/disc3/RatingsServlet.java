package com.example.disc3;

import javax.naming.Context;
import javax.naming.InitialContext;
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

@WebServlet(name = "ratings", value = "/ratings")
public class RatingsServlet extends HttpServlet {
    @Override
    public void init() throws ServletException {
        super.init();
    }

    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {

    }

    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        HttpSession session = req.getSession(true);
        try {
            PrintWriter out = resp.getWriter();
            Context context = new InitialContext();
            Context env = (Context) context.lookup("java:comp/env");
            DataSource ds = (DataSource) env.lookup("jdbc/inf124");
            Connection con = ds.getConnection();

            Statement stmt = con.createStatement();

            String q = "SELECT * from orders ORDER BY order_id DESC LIMIT 1";
            ResultSet rs = stmt.executeQuery(q);
            int order_id = 0;
            while(rs.next()){
                order_id = rs.getInt("order_id");
            }
            String rating = req.getParameter("rating");

            PreparedStatement ps;
            ps = con.prepareStatement("INSERT INTO ratings (order_id, rating) VALUES (?,?)");
            ps.setInt(1, order_id);
            ps.setInt(2, Integer.parseInt(rating));
            ps.executeUpdate();

            resp.setStatus(200);
        } catch(Exception e){
            e.printStackTrace();
            resp.setStatus(500);
        }
    }
}
