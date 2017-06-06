/*jason with ajax using jquery*/

$("#click").click(function (event) {
    event.preventDefault();
    $.ajax({
        type: "GET",
        url: "json/data.json",
        dataType: "json",
        success: function (data) {
            var row = "<tr>";
            var trCount = 1;
            $.each(data, function (typeOfUser, val) {
                //USERS ADMIN
                $.each(val, function (email, val) {
                    //EMAIL
                    $("tbody").append("<tr id='row" + trCount + "'>" + "<td>" + email + "</td>");
                    $.each(val, function (key, val) {
                        //PERSONAL INFO
                        if (key !== "birthday") {
                            $("#row" + trCount).append("<td>" + val + "</td>");
                        } else {
                            $("#row" + trCount).append("<td id='birthday" + trCount + "'>");
                            $.each(val, function (i, val) {
                                //BIRTHDAY INFO
                                if (i !== "date") {
                                    $("#birthday" + trCount).append(val + " ");
                                } else {
                                    $("#birthday" + trCount).append(val + ", ");
                                }
                            })
                            $("#row" + trCount).append("</td>");
                        }
                    });
                    $("tbody").append("</tr>");
                    trCount++;
                });
            });
        },
        error: function () {
            console.log("failed to load!");
        }
    });
});



$("#submit").click(function (event) {

    event.preventDefault();
        var inputPostcode= document.getElementById("postcode");
        localStorage.setItem("postcode", inputPostcode.value);

});





/*local storage*/

//var x = document.getElementById("inSubmit");
var thanks = document.getElementById("thanks");
var form = document.getElementById("form");

/*x.onclick = function () {
    form.style.display = "none";
    thanks.style.display = "block";

};*/

if(typeof(Storage)){
    $(function () {
        if(localStorage.length === 0)
        {
            form.style.visibility = "visible";
        }
        $("#inSubmit")
            .click(function (e) {
                e.preventDefault();
                localStorage.setItem("flag","set");
                var data = $("#form").serializeArray();
                $.each(data, function (i, obj) {
                    localStorage.setItem(obj.name, obj.value);
                })
            })
        if(localStorage.getItem("flag")){
        /*var data = $("#form").serializeArray();
            $.each(data, function (x, obj) {
                $("[name='" +obj.name+"']").val(localStorage.getItem(obj.name));
            })*/
            form.style.display = "none";
            thanks.style.display = "block";
        }
    })
}



