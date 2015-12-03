$(function() {
    var count = 1;
    var dragStartWeek = "";//拖曳的原始星期
    var dragStopWeek = "";//拖曳的後來星期
    var execCount = 1;
    var jsonString = "";

    var jsonData = {
        0: [],
        1: [],
        2: [],
        3: [],
        4: [],
        5: [],
        6: []
    };

    //get localStorage
    if (localStorage.getItem("ToDoList") !== null) {
        jsonData = JSON.parse(localStorage.getItem("ToDoList"));
        var $container = $("#todoList");
        for (var i = 0; i < 7; i++) {
            var weekObj = jsonData[i];
            var j = 0;
            var $weekUL = $container.find("ul").eq(i);
            while (typeof(weekObj[j]) !== "undefined") {
                if (weekObj[j] !== null) {
                    $weekUL.append("<li id='" + weekObj[j]["key"] + "'>" + weekObj[j]["value"] + "</li>");
                }
                j++;
            }
        }
    }

    $("#todoList ul").sortable({
        items: "li:not('.listTitle, .addItem')",
        connectWith: "ul",
        dropOnEmpty: true,
        placeholder: "emptySpace",
        start: function(event, ui) {
            dragStartWeek = $(ui.item).parent().attr("id");
        },
        update: function(event, ui) {
            if (execCount % 2 != 0) {
                var $li = $(ui.item);
                var id = parseInt($li.attr("id"));
                dragStopWeek = $(ui.item).parent().attr("id");
                var jsonData = JSON.parse(localStorage.getItem("ToDoList"));
                jsonData[dragStopWeek].push({
                    "key": id,
                    "value": $li.text()
                });
                delete jsonData[dragStartWeek][(id - 1)];
                localStorage.setItem("ToDoList", JSON.stringify(jsonData));
                //alert(JSON.stringify(localStorage.getItem("ToDoList")));
            }
            execCount++;
        }
    });

    //會傳入您的動作的事件參數event，每個事件所傳入的參數不同
    $("input").keydown(function(event) {
        if (event.keyCode == 13) {
            var item = $(this).val();
            var $ul = $(this).parent().parent();
            $ul.append("<li id='" + count + "'>" + item + "</li>");
            $(this).val('');
            var week = $ul.attr("id");
            jsonData[week].push({
                "key": count,
                "value": item
            });
            jsonString = JSON.stringify(jsonData);
            localStorage.setItem("ToDoList", jsonString);
            count++;
        }
    })

    $("#trash").droppable({
        //在區域中放下的物件
        drop: function(event, ui) {
            ui.draggable.remove();
        }
    });
});
