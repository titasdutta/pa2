function parseQString(query){
    var query_params = query.split("%20");
    console.log(query_params);
    new_query = query_params.join(" ");
    return new_query;
}

var qString = location.href.split("?")[1].split("&")[0];
document.getElementById("product_name").value = parseQString(qString);

var image =  location.href.split("?")[1].split("&")[1];
document.getElementById("cloth").src = image;

var price =  location.href.split("?")[1].split("&")[2];
document.getElementById("price").value = "$" + parseInt(price);

document.getElementById("quantity").addEventListener('change', function() {
    var quantity = document.getElementById("quantity").value;
    console.log("GOT IN HERE");
    if(quantity && !isNaN(quantity)){
        document.getElementById("price").value = "$" + (parseInt(quantity)*parseInt(price));
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
    }
}

function checkFirstName(messages){
    var fname = document.getElementById("fname").value;
    if(!fname){
        messages.push("Please enter a first name!");
        //alert("Please enter a first name!");
    }
}

function checkLastName(messages){
    var lname = document.getElementById("lname").value;
    if(!lname){
        messages.push("Please enter a last name!");
        // alert("Please enter a last name!");
    }
}

function checkCreditCard(messages){
    let credit = document.getElementById("cred_card").value;
    if(!credit || credit.length < 16){
        messages.push("Please enter a valid credit card");
        // alert("Please enter a valid credit card");
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
    checkFirstName(messages);
    checkLastName(messages);
    if(messages.length > 0){
        printErrorMessages(messages);
    } else {
        //window.location.href = "https://www.youtube.com/watch?v=p7YXXieghtos";
        //window.location.href = "./email_client.html"; 
    }

};