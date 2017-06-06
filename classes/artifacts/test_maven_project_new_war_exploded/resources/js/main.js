/**
 * Created by JPMC-PC04 on 29/04/2017.
 */
//Messages
// $successMsg         = "Thank you";
// $allFieldsRequired  = "All fields are required";
// $requiredmsg = "<span class='error'>This field is required!</span>";

//
// $postcode           = $("#postcode")
// $email           = $("#e_mail")
// $mobileNo           = $("#mobno")


//Form
//$myForm             = $("#info_form");
$myFormContainer    = $("#first-section");
$myResponse1        = $("#response1");
$myResponse2        = $("#response2");
$myResponse3        = $("#response3");
$myResponse4        = $("#response4");

//Submit button
$formSubmitBtn      = $("input[type=submit]");

$formSubmitBtn.click(function (event) {
    event.preventDefault();
    var myForm = $("#info_form");
    $.ajax({
        type : "post",
        url : "/post",
        data : myForm.serialize(),
        dataType : "json",
        error: function () {

        },
        success: function (response) {
            alert("Success!");
            console.log(response);
            $(".error").remove();

            $.each(response, function () {

            });
        }
    });
});


