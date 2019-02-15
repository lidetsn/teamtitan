$(document).ready(function () {
    var usernameInput = $(".usernameInput")
    var emailInput = $(".emailInput");
    var passwordInput = $(".passwordInput");

    // When the signup button is clicked, we validate the email and password are not blank
    $(".authSubmit").on("click", function (event) {
        event.preventDefault();
        var userData = {
            username: usernameInput.val().trim(),
            email: emailInput.val().trim(),
            password: passwordInput.val().trim()
        };

        if (!userData.email || !userData.password) {
            return;
        }
        // If we have an email and password, run the signUpUser function
        signUpUser(userData.username, userData.email, userData.password);
        usernameInput.val("");
        emailInput.val("");
        passwordInput.val("");
    });

    // Does a post to the signup route. If successful, we are redirected to the members page
    // Otherwise we log any errors
    function signUpUser(username, email, password) {
        console.log("signing them up")
        $.post("/api/postuser", {
            username: username,
            email: email,
            password: password
        }).then(function (data) {
            console.log("Submituser worked");
            // window.location.href = "/";
        }).catch(handleLoginErr);
    }

    function handleLoginErr(err) {
        $("#alert .msg").text(err.responseJSON);
        $("#alert").fadeIn(500);
    }
});
