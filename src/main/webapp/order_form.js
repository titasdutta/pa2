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
    var zip = document.getElementById("zip").value;
    var digits = /^[0-9]+$/;
    if(!zip){
        messages.push("Please enter a zip code!");
    } else if(!zip.match(digits)) {
        messages.push("Zip code should only contain digits 0-9!");
    } else if(zip.length > 5){
        messages.push("Zip code should be at max 5 digits!");
    }
}

function checkPhone(messages){
    var phone = document.getElementById("phone").value;
    var phone_format = /^\d{10}$/;

    if(!phone){
        messages.push("Please enter a phone number!");
    } else if(!phone.match(phone_format)){
        messages.push("Phone number must be valid format!");
    } else if(phone.length > 10){
        messages.push("Phone number should be at max 10 digits!");
    }
}

function checkEmail(messages){
    var email = document.getElementById("email").value;
    var email_format = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;

    if(!email){
        messages.push("Please enter an email!");
    } else if(!email.match(email_format)){
        messages.push("Email must be valid format!");
    }
}

function checkCredit(messages){
    var credit_card = document.getElementById("ccn").value;
    var cvv = document.getElementById("cvv").value;
    var expiry = document.getElementById("expiry").value;
    var digits = /^[0-9]+$/;
    var expiry_format = /^(0[1-9]|1[0-2])\/\d{2}$/;

    if(!credit_card){
        messages.push("Please enter a credit card number!");
    } else if(!credit_card.match(digits)) {
        messages.push("Credit card number should only contain digits 0-9!");
    }

    if(!cvv){
        messages.push("Please enter a CVV!");
    } else if(!cvv.match(digits)) {
        messages.push("CVV should only contain digits 0-9!");
    }

    if(!expiry){
        messages.push("Please enter an expiry date!");
    } else if(!expiry.match(expiry_format)) {
        messages.push("Please match expiration date format!");
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

document.getElementById("place_order").onclick = function() {
    var messages = [];
    checkName(messages);
    checkZip(messages);
    checkPhone(messages);
    checkEmail(messages);
    checkCredit(messages);
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
                window.location.href = "./order_details.html";
            },
            error: function(result){
                console.log("MESSED UP");
            }
        });
     }
};