package com.example.disc3;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;

@WebServlet(name = "hello", value = "/hello")
public class HelloServlet extends HttpServlet {

    @Override
    public void init() throws ServletException {
        super.init();
    }

    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        PrintWriter writer = resp.getWriter();
        writer.println("<html> <body>");
        // String name = req.getParameter("name");
        // String email = req.getParameter("email");
        // writer.println("Name: "+ name + " Email: " + email);
        writer.println("<h3> Data was submitted </h3>");
        writer.println("</body> </html> ");
    }
}
