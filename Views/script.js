/*
const user = {
    control: true
};
// After checking above,if user.control = false:-
if(!user.control){
    document.querySelectorAll('.led button').forEach(btn=>btn.classList.add('disabled'));
} 
*/
async function getUserDet(){
    // This function gets the username and his role
    const res = await fetch("https://conferrable-emotionalistic-guillermo.ngrok-free.dev/user",{
        method:"GET",
        headers:{"Content-Type":"application/json"}
    });
    const user = await res.json();
    if(!user)   alert("Please Log in!");
    const username = document.getElementById('user-name');
    const userRole = document.getElementById('user-role');
    const userControl = document.getElementById('user-permission');
    username.textContent = `Welcome ${user.username}!`;
    userRole.textContent = `Role: User`;
    userControl.textContent = `Control: ${user.control ? "Allowed" : "Not-Allowed"}`;
    // If user has no permission, then disable the buttons
    const adminOnly = document.getElementById('admin-only');
    console.log(userRole);
    if(user.role=="user"){
        adminOnly.style.display = "none";
        if(!user.control){
            document.querySelectorAll('.led button').forEach(btn=>{
                btn.disabled=true;
                btn.classList.add('disabled');
            });
        }
    }else{ 
        userRole.style.display="none";}
}
// Render all the connected lights in the room
async function renderLights(){
    try{
        // Make an API request to Node to get all connected lights
        const res = await fetch('https://conferrable-emotionalistic-guillermo.ngrok-free.dev/light',{
            method:"GET",
            headers:{"Content-Type":"application/json"}
        });
        const text = await res.text();
        console.log(text);
    });
    }catch(err){
        console.error(err);
    }
}
// To send Signal API request to Node
async function sendSignal(clr,cmd){
    const SIGNAL = JSON.stringify({"color":clr,"command":cmd});
    const res = await fetch('https://conferrable-emotionalistic-guillermo.ngrok-free.dev/signal',{
        method:"POST",
        headers:{"Content-Type":"application/json"},
        body: SIGNAL
    });
    const result = await res.json();
    if(!res.ok && result.message=='Please Log-in First!'){
        alert(result.message);
        window.location.href="./login.html";
    }
    await renderLights();
}
const logout = document.getElementById('logout-btn');

logout.addEventListener("click",async(e)=>{
    try{
        const res = await fetch("https://conferrable-emotionalistic-guillermo.ngrok-free.dev/logout",{
        method:"POST"
        });
    if(res.ok)
        window.location.href="./login.html";
    else
        alert("Logout Error ! Please try again!")
    }catch(err){
        console.error(err);
    }
});
renderLights();
getUserDet();




