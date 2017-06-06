
/**
 * Created by JPMC-PC04 on 29/04/2017.
 */

//Submit button
$formSubmitBtn          = $("#info_formBtn");

//Participant form
$participantFormBTtn    = $("#participantBtn");

//Search toggle switch
$searchToggle           = $("#search");
$hiddenSearchHide       = $("#searchHiddenToggle");
$menu                   = $("#menu");

$(document).ready(function () {
    $(document)
        .ajaxStart(function () {
            $("#ajaxSpinnerImage").show();
        })
        .ajaxStop(function () {
            $("#ajaxSpinnerImage").hide();
        });



//Search toggle
    $searchToggle.on("click", function () {
       $("input[name=search]").toggleClass("hide");
    });


//Hidden toggle search
    $hiddenSearchHide.on("click", function () {
        $("input[name=searchHide]").toggleClass("hide");
    });


//Menu dropdown
    $menu.on("click", function () {
        $("#nav").toggleClass("merge");
    });


//Clear local storage
    $("#clearData").on("click", function () {
        localStorage.clear();
    });



//Local storage
    if (localStorage.getItem("flag") !== null) {
        $('#info_form,.msg').remove();
        $('#successDialog2').toggleClass("filledOut");
    }


//Libero form
    $formSubmitBtn.click(function (event) {
    event.preventDefault();
    var myForm = $("#info_form");
    $.ajax({
        method : "post",
        url : "/create",
        data : myForm.serialize(),
        dataType : "json",
        error: function (a,b,c) {
            console.log(a+b+c);
            // alert(a+b+c);
        },
        success: function (response) {
                if(response.message  == "error"){
                    $(".errorDialog").remove();

                    $.each(response, function(key,value) {
                        $("."+key).after("<div class='errorDialog'><span class='errorText glyphicon glyphicon-exclamation-sign'>"+"&nbsp;"+""+value+"</span></div>");
                        $(".errorDialog").on("click",function () {
                            $(this).fadeOut();
                        });
                    });
                }else {
                    $(document).ready(function () {

                        $("#info_form,.msg").fadeOut(function () {

                            $("div#successDialog").fadeIn(400,function () {
                                $(this).toggleClass('afterSuccess');
                            });

                            //Local Storage
                            localStorage.setItem("flag","set");
                            var data = $("#info_form").serializeArray();
                            $.each(data, function (i, obj) {
                                localStorage.setItem(obj.name, obj.value);
                            });

                            if(localStorage.getItem("flag")){
                                var data = $("#info_form").serializeArray();
                                $.each(data, function (i, obj) {
                                    $("[name='" +obj.name+"']").val(localStorage.getItem(obj.email));
                                })
                            }

                            // localStorage.setItem("flag","set");
                            //
                            // var inputPostcode= document.getElementsByName("postcode");
                            // localStorage.setItem("email", inputPostcode.value);
                            //
                            // var inputEmail= document.getElementsByName("email");
                            // localStorage.setItem("email", inputEmail.value);
                            //
                            // var inputRadios= document.getElementsByName("radios");
                            // localStorage.setItem("email", inputRadios.value);
                            //
                            // var inputMobno= document.getElementsByName("mobno");
                            // localStorage.setItem("email", inputMobno.value);

                        });

                    });
                }
            }
        });
    });


//Participant form
    $participantFormBTtn.click(function (event) {
        event.preventDefault();
        var myForm1 = $("#participantForm");
        $.ajax({
            method : "post",
            url : "/update",
            data : myForm1.serialize(),
            dataType : "json",
            error: function (a,b,c) {
                console.log(a+b+c);
                 alert(a+b+c);
            },
            success: function (response) {

                console.log(response.message);

                if(response.message  == "error"){

                    $(".errorDialog").remove();

                    $.each(response, function(k,v) {
                        $("."+k).after("<div class='errorDialog'><span class='errorText'>"+v+"</span></div>");

                        $(".errorDialog").on("click",function () {
                            $(this).fadeOut();
                        });
                    });

                }else{

                    $(".panel").fadeOut(800,function () {
                        $("div#successDialog").slideDown(400,function () {
                            $(this).toggleClass('afterSuccess');
                        });
                    });

                }
            }
        });
    });
});