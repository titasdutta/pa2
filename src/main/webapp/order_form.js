var order = null;
$(document).ready(function() {
    jQuery.ajax({
        url: "./shopping_cart",
        method: "GET",
        success: function(result){
            order = result;
            handleResult(result);
        },
        error: function(result){
            console.log("Something went wrong!");
        }
    });
});

function handleResult(result){
    console.log(result);
    let table = $("#products");
    let items = "";
    var subtotal = 0;

    let cart_size = result.length;
    for(let i = 0; i < cart_size; i++){
        items = items + "<tr><td>" + result[i]["product"] + " x " + result[i]["quantity"] + "(quantity)" +"</td>" +
        "<td>$" + result[i]["price"] + "</td></tr>";
        subtotal += parseInt(result[i]["price"]);
    }

    items = items + "<tr><td>Subtotal</td>" + "<td>$" + subtotal + "</td></tr>";

    table.append(items);
}

function checkName(messages){
    var first_name = document.getElementById("fname").value;
    var last_name = document.getElementById("lname").value;
    var letters = /^[A-Za-z]+$/;

    console.log(first_name);
    console.log(last_name);

    if(!first_name){
        messages.push("Please enter a first name!");
    } else if(!first_name.match(letters)){
        messages.push("Please enter a valid first name with only letters and spaces");
    }

    if(!last_name){
        messages.push("Please enter a last name!");
    } else if(!last_name.match(letters)){
        messages.push("Please enter a valid last name with only letters and spaces");
    }
}

function checkZip(messages){

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

document.getElementById("place_order").onclick = function() {
    var messages = [];
    checkName(messages);
     if(messages.length > 0){
        printErrorMessages(messages);
     } else {
        alert("SUCCESS!");
        var first_name = document.getElementById("fname").value;
        var last_name = document.getElementById("lname").value;
        var phone = document.getElementById("phone").value;
        var shipping = document.getElementById("shipping").value;
        jQuery.ajax({
            url: "./order",
            data: {
                "order": order,
                "fname": first_name,
                "lname": last_name,
                "phone": phone,
                "shipping": shipping
            },
            method: "POST",
            success: function(result){
                alert("Successfully Placed Order!");
            },
            error: function(result){
                console.log("MESSED UP");
            }
        });
     }
};