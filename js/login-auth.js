const authEmail = "admin@admin.com";
const authPwd = "admin123";

function authLogin(inputEmail, inputPwd) {

    if (authEmail == inputEmail && authPwd == inputPwd) {
        localStorage.setItem("wlIsAuth", true);
        localStorage.setItem("wlEmail", inputEmail);
        localStorage.setItem("wlUserName", "Admin");
        window.location.href = "./user-page.html";
        // console.log("Login success");
    } else {
        // console.log("Login error");
    }

}