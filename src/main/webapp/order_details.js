$(document).ready(function() {
    jQuery.ajax({
        url: "./order_details",
        method: "GET",
        success: function(result){
            console.log(result);
            console.log("Loaded successfully");
            handleResult(result);
        },
        error: function(result){
            console.log("Something went wrong!");
        }
    });
});

function handleResult(result){
    let table = $("#details");
    let items = "";

    let order_size = result.length;
    for(let i = 0; i < order_size; i++){
        items = items + "<tr><td>" +result[i]["id"]+"</td><td>"+ result[i]["product_name"]+"</td><td>"+result[i]["quantity"]
        +"</td><td>"+result[i]["price"]+"</td><td>"+result[i]["fname"] +"</td><td>"+result[i]["lname"]+"</td><td>"
        +result[i]["phone"]+"</td><td>" + result[i]["shipping"] + "</td></tr>";
    }

    table.append(items);
}