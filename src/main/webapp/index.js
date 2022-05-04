$(document).ready(function() {
    jQuery.ajax({
            url: "./product_list",
            method: "GET",
            success: function(result){
                popProducts(result);
            },
            error: function(result){
                console.log("Something went wrong!");
            }
        });
    jQuery.ajax({
        url: "./recent_order",
        method: "GET",
        success: function(result){
            popRecent(result);
        },
        error: function(result){
            console.log("Something went wrong!");
        }
    });
});

function popProducts(result){
    console.log(result);
    let table = $("#store_items");
    let table_row = "";
    table_row = generateImageRow(table_row,result,0);
    table_row = generateDescRow(table_row,result,0);
    table_row = generateImageRow(table_row,result,5);
    table_row = generateDescRow(table_row,result,5);
    table.append(table_row);
}

function popRecent(result){
    console.log(result);
    let order_table = $("#orders");
    let table_row = "";
    table_row = generateRecentImg(table_row,result,0);
    table_row = generateRecentDesc(table_row,result,0);
    order_table.append(table_row);
}

function generateImageRow(table_row, result, start){
    table_row = table_row + "<tr>";
    for(let i = start; i < start+5; i++){
        table_row = table_row + "<td><a href=\"./detailed_description.html?name=" + result[i]["product"] + "\">"
        + "<img src=\"" + result[i]["image"] + "\">" + "</a></td>";
    }
    table_row = table_row + "</tr>";
    return table_row;
}

function generateDescRow(table_row, result, start){
    table_row = table_row + "<tr>";
    for(let i = start; i < start+5; i++){
        table_row = table_row + "<td><a href=\"./detailed_description.html?name=" + result[i]["product"] + "\" id=\"" + result[i]["product"]
        + "\">" + result[i]["product"] + "</a>" + "<br> $" + result[i]["price"] + "</td>";
    }
    table_row = table_row + "</tr>";
    return table_row;
}

function generateRecentImg(table_row, result, start){
    table_row = table_row + "<tr>";

}

function generateRecentDesc(table_row, result, start){
    table_row = table_row + "<tr>";
    for(let i = start; i < start+5; i++){
            table_row = table_row + "<td><a href=\"./detailed_description.html?name=" + result[i]["product_name"] + "\" id=\"" + result[i]["product_name"]
            + "\">" + result[i]["product_name"] + "</a>" + "<br> $" + result[i]["price"] + "</td>";
     }
    table_row = table_row + "</tr>";
    return table_row;
}