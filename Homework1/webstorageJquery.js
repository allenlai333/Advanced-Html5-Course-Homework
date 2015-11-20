function getLocalStorage()
{
    for (var key in localStorage) {
        addItemToList(key, localStorage[key]);
    }
}

function addItemToList(key, value) {
    var items = $("#items");
    var item = $("<li/>", {
        id: key
    });

    var span = $("<span/>", {
        class: "note"
    });

    span.html(key + ":" + value);

    item.append(span);
    items.append(item);
}

function removeItemFromList(key) {
    $("#" + key).parent().children("#" + key).remove();
}

$(function() {
    getLocalStorage();

    $("#addButton").click(function() {
        var key = $("#key").val();
        var value = $("#value").val();

        if (typeof(localStorage[key]) === "undefined") {
            localStorage.setItem(key, value);
            addItemToList(key, value);
        }
    });

    $("#removeButton").click(function() {
        var key = $("#key").val();
        localStorage.removeItem(key);
        removeItemFromList(key);
    });

    $("#clearButton").click(function(){
        localStorage.clear();
        $("#items").empty();
    });
});
