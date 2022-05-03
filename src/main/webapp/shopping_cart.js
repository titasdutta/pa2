$(document).ready(function() {
    jQuery.ajax({
        url: "./shopping_cart",
        method: "GET",
        success: function(result){
            handleResult(result);
        },
        error: function(result){
            console.log("Something went wrong!");
        }
    });
});

function handleResult(result){
    console.log(result);
    let table = $("#shopping_table");
    let items = "";

    let cart_size = result.length;
    for(let i = 0; i < cart_size; i++){
        items = items + "<tr><td>" + result[i]["product"] +"</td>" +
        "<td> Quantity: " + result[i]["quantity"] + "</td>" +
        "<td>" + result[i]["price"] + "</td></tr>";

    }

    table.append(items);
}