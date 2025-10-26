/* Collect the username and password and send it to backend for authentication */

loginForm.addEventListener("submit",async(e) => {
    e.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const data = JSON.stringify({"username":username,"password":password});
    const res = await fetch("https://ten-geckos-cry.loca.lt/login",{
        method:"POST",
        headers:{"Content-Type":"application/json"},
        body: data
    });
    const result = await res.json();
    if(res.ok){
        loginMsg.style.color="green";
        loginMsg.textContent = "Login Success!";
        window.location.href="./index.html"
    }else{
        loginMsg.style.color = "red";
        loginMsg.textContent = result.message;
    }

});


