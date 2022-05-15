<%@ page isELIgnored="false" %>
<%@ page import = "java.io.*,java.util.*,java.sql.*"%>
<%@ page import = "javax.servlet.http.*,javax.servlet.*" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="sql" uri="http://java.sun.com/jsp/jstl/sql" %>

<!DOCTYPE html>
<html>
<head>
    <style>
        .header{background-color: #333; overflow: hidden;}
    </style>
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="stylesheet" href="./mystyle.css" type="text/css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
    <script src="http://code.jquery.com/jquery-latest.min.js"></script>
</head>
<body>
    <sql:setDataSource var = "snapshot" driver = "com.mysql.jdbc.Driver"
             url = "jdbc:mysql://localhost:3306/inf124?useSSL=false"
             user = "root"  password = "@Askvsksgk290199"/>

     <sql:query dataSource = "jdbc/inf124" var = "result">
        SELECT * from product p;
     </sql:query>
     <sql:query dataSource = "jdbc/inf124" var = "recent">
        Select * from orders ORDER BY order_id DESC LIMIT 5;
     </sql:query>
    <div class = "header">
        <ul>
            <li><a href="./index.html">Home</a></li>
            <!-- <li><a href="contact.asp">Contact</a></li> -->
            <li><a href="./about_page.html">About</a></li>
            <li><a href="./shopping_cart.html" style="float:right"><i class="fa fa-shopping-cart" style="font-size:36px;color:red;float:right"></i></a></li>
          </ul>

    </div>
    <p class="introduction-paragraph">Our eCommerce store provides a variety of clothing for men and women. <br>Keeping you stylish at affordable prices.</br></p>
    <div class = "products">
        <h1>Products</h1>
        <table id = "store_items">
        <tr>
            <c:forEach var = "row" end="4" items = "${result.rows}">
                <td><a href="./detailed_description.html?name=${row.pname}"><img src="${row.image}"></a></td>
            </c:forEach>
        </tr>
        <tr>
            <c:forEach var = "row" end="4" items = "${result.rows}">
                <td>
                    <a href="./detailed_description.html?name=${row.pname}" id="${row.pname}">
                        <c:out value = "${row.pname}"/>
                    </a>
                    <br> $ <c:out value = "${row.price}"/>
                </td>
            </c:forEach>
        </tr>
        <tr>
            <c:forEach var = "row" begin="5" end="9" items = "${result.rows}">
                <td><a href="./detailed_description.html?name=${row.pname}"><img src="${row.image}"></a></td>
            </c:forEach>
        </tr>
        <tr>
            <c:forEach var = "row" begin="5" end="9" items = "${result.rows}">
                <td>
                    <a href="./detailed_description.html?name=${row.pname}" id="${row.pname}">
                        <c:out value = "${row.pname}"/>
                    </a>
                    <br> $ <c:out value = "${row.price}"/>
                </td>
            </c:forEach>
        </tr>
        </table>
        <h2>Your Past Orders: </h2>
        <table id="orders">
        <tr>
            <c:forEach var = "row" items = "${recent.rows}">
                <td>
                    <a href="./detailed_description.html?name=${row.product}" id="${row.product}">
                        <c:out value = "${row.product}"/>
                    </a>
                    <br> $ <c:out value = "${row.price}"/>
                </td>
            </c:forEach>
        </tr>
        </table>
        <p> Please rate this order: </br> </p>
        <div id="rating" class="rating">

            <input type="radio" id="star5" name="rating" value="5"><label for="star5" class="full"></label>
            <input type="radio" id="star4" name="rating" value="4"><label for="star4" class="full"></label>
            <input type="radio" id="star3" name="rating" value="3"><label for="star3" class="full"></label>
            <input type="radio" id="star2" name="rating" value="2"><label for="star2" class="full"></label>
            <input type="radio" id="star1" name="rating" value="1"><label for="star1" class="full"></label>
        </div>
    </div>
</body>
</html>