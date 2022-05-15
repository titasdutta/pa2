<%@ page import = "java.io.*,java.util.*,java.sql.*"%>
<%@ page import = "javax.servlet.http.*,javax.servlet.*" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="sql" uri="http://java.sun.com/jsp/jstl/sql" %>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Order Details</title>

    <script src="http://code.jquery.com/jquery-latest.min.js"></script>
</head>
<body>
<sql:setDataSource var = "snapshot" driver = "com.mysql.jdbc.Driver"
         url = "jdbc:mysql://localhost:3306/inf124?useSSL=false"
         user = "root"  password = "@Askvsksgk290199"/>

         <sql:query dataSource = "jdbc/inf124" var = "result">
            Select * from orders ORDER BY order_id DESC;
         </sql:query>
<table id="details" border='1' width='100%'>
    <tr><th>Id</th><th>Product Name</th><th>Quantity</th><th>Price</th><th>First Name</th><th>Last Name</th><th>Phone Number</th><th>Shipping Method</th></tr>

    <c:forEach var = "row" items = "${result.rows}">
        <tr>
           <td> <c:out value = "${row.id}"/></td>
           <td> <c:out value = "${row.product_name}"/></td>
           <td> <c:out value = "${row.quantity}"/></td>
           <td> <c:out value = "${row.price}"/></td>
           <td> <c:out value = "${row.fname}"/></td>
           <td> <c:out value = "${row.lname}"/></td>
           <td> <c:out value = "${row.phone}"/></td>
           <td> <c:out value = "${row.shipping}"/></td>
        </tr>
    </c:forEach>
</table>
<a href="./index.html">Go Back to Home Page</a>
<script src="./order_details.js"></script>
</body>
</html>