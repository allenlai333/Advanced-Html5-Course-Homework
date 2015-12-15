$(function () {
    var isSave = false;

    //離線儲存
    var $content = $("#inputDiv").contents();
    var dataJSON = {
        Name: "",
        Tel: "",
        Addr: ""
    };

    if (localStorage.getItem("MyAddressBook") !== null) {
        dataJSON = JSON.parse(localStorage.getItem("MyAddressBook"));
        $content.find("[name=Name]").val(dataJSON.Name);
        $content.find("[name=Tel]").val(dataJSON.Tel);
        $content.find("[name=Addr]").val(dataJSON.Addr);
    }

    $(window).on("beforeunload", function () {
        if (!isSave) {
            dataJSON.Name = $content.find("[name=Name]").val();
            dataJSON.Tel = $content.find("[name=Tel]").val();
            dataJSON.Addr = $content.find("[name=Addr]").val();

            localStorage.setItem("MyAddressBook", JSON.stringify(dataJSON));
        }
    });

    $('#save').on('click', function () {
        isSave = true;
        localStorage.removeItem("MyAddressBook");
    });
});