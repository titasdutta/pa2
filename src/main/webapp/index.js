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