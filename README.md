# PA 2 Documentation
## Group Members: Titas Dutta, Gevorg Aroyan, Lauren Nicole Pamintuan
1) We used IntelliJ. The war file was deployed to a Tomcat 9.0 server and we navigate to localhost:8080/disc3 which takes us to the home page.

## REQUIREMENT 1
1) We have 10 products that are dynamically generated. See ProductListServlet.java file in source code.
2) Scroll to the bottom and you can see the last 5 products that were ordered. If this is first time loading the page, then it will be empty. See RecentOrderServlet.java.
3) The rating functionality is implemented here where the users can select the star rating for their order. We decided to do one rating for all the products seen under this section.

## REQUIREMENT 2
1) Click on any product (e.g. click on an image) under the Products section.
2) You will see the product identifier and price is dynamically generated on the "Product Details" page.
3) On the home page, on the top right, there is a "Shopping Cart" icon. Click on it and you can see all the items the user has added to the shopping cart.

## REQUIREMENTS 3 and 4
1) Go to "Shopping Cart" page if not there already by clicking the red shopping cart icon on the home page.
2) Click on "Proceed to Checkout"
3) To test Requirement 3, try putting no input or invalid input for fields such as first name, last name, phone number, email, credit card, and CVV. When you click on "Place Order", there will be an alert message
with the errors listed.
4) To test Requirement 4, put valid input for all the fields and click on "Place Order". You will get two alert messages which after clicking on them, you will ge redirected
to the "Order Details" page which outlines the order. Click on the "back to home page" link at the bottom to be taken back to the home screen.
5) On the home screen, you will be able to see in the "Your Past Orders: " section the 5 most recent products that were ordered.


