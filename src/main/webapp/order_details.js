$(document).ready(function() {
    jQuery.ajax({
        url: "./order_details",
        method: "GET",
        success: function(result){
            console.log("Loaded successfully");
        },
        error: function(result){
            console.log("Something went wrong!");
        }
    });
});