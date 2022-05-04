var price = 0;
var product_name = "";
$(document).ready(function() {
    var product = location.href.split("?")[1].split("=")[1];
    jQuery.ajax({
        url: "./product",
        data: {
            "name": product
        },
        method: "GET",
        success: function(result){
            //let resultJSON = JSON.parse(result);
            document.getElementById("product_name").value = result["product"];
            document.getElementById("price").value = "$" + parseInt(result["price"]);
            product_name = result["product"];
            price = parseInt(result["price"]);
        },
        error: function(result){
            console.log("MESSED UP");
        }
    });
 });

function parseQString(query){
    var query_params = query.split("%20");
    console.log(query_params);
    new_query = query_params.join(" ");
    return new_query;
}

//var image =  location.href.split("?")[1].split("&")[1];
//document.getElementById("cloth").src = image;
//
//var price =  location.href.split("?")[1].split("&")[2];
//document.getElementById("price").value = "$" + parseInt(price);
//var quantity = document.getElementById("quantity").value;
document.getElementById("quantity").addEventListener('change', function() {
    var quantity = document.getElementById("quantity").value;
    console.log("GOT IN HERE");
    if(quantity && !isNaN(quantity)){
        document.getElementById("price").value = "$" + (parseInt(quantity)*parseInt(price));
        price = parseInt(quantity)*parseInt(price);
    }
});

// $("#submit").click(function(){
//     alert("Are you sure you want to submit (y/n)?");
// });

function checkQuantity(messages){
    var quantity = document.getElementById("quantity").value;
    if(!quantity || isNaN(quantity)){
        messages.push("Please enter an integer quantity!");
        //alert("Please enter an integer quantity!");
    } else if(quantity < 1){
        messages.push("Please enter a quantity of at least 1!");
    }
}

function printErrorMessages(messages){
    let error_msg = "Please fix the following errors: ";
    // messages.array.forEach(element => {
    //     error_msg += "<br> - " + element.value;
    // });
    for (let i = 0; i < messages.length; i++) {
        error_msg += '\n' + "- " + messages[i];
    }
    alert(error_msg);
}

document.getElementById("submit").onclick = function() {
    //alert("Are you sure you want to submit (y/n)?");
    var messages = [];
    checkQuantity(messages);
//    checkFirstName(messages);
//    checkLastName(messages);
    if(messages.length > 0){
        printErrorMessages(messages);
    } else {
        var quantity = document.getElementById("quantity").value;
        jQuery.ajax({
            url: "./shopping_cart",
            data: {
                "name": product_name,
                "quantity": quantity,
                "price": price
            },
            method: "POST",
            success: function(result){
                alert("Successfully added to Shopping Cart!");
            },
            error: function(result){
                console.log("MESSED UP");
            }
        });

    }
};