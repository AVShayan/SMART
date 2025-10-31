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
    const res = await fetch("https://applied-random-therapy-obligation.trycloudflare.com/user",{
        method:"GET",
        headers:{"Content-Type":"application/json"},
        credentials:"include"
    });
    const user = await res.json();
    if(!user)   alert("Please Log in!");
    const username = document.getElementById('user-name');
    const userRole = document.getElementById('user-role');
    const userControl = document.getElementById('user-permission');
    username.textContent = `Welcome ${user.username !==null ? '' : user.username}!`;
    userRole.textContent = `Role: Tester`;
    userControl.textContent = `Mobile Testing`;
    // If user has no permission, then disable the buttons
    const adminOnly = document.getElementById('admin-only');
    console.log(userRole);
    if(user.role=="user"){
        //adminOnly.style.display = "none";
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
        const res = await fetch('https://applied-random-therapy-obligation.trycloudflare.com/light',{
            method:"GET",
            headers:{"Content-Type":"application/json"},
            credentials:"include"
        });
        const lights = await res.json();
        const grid = document.getElementById("led-grid");
        grid.innerHTML='';
        lights.forEach((light) => {
        const led = document.createElement('div');
        led.classList.add("led");

        const color = document.createElement('h2');
        color.textContent = light.color;
        color.classList.add("color");

        const toggle = document.createElement('button');
        toggle.classList.add('toggle');
        // isOn -> Checking whether light has on class
        // Switch between ON/OFF based on the status of light
        if(light.status == 'ON'){   // If Light is ON
            // Add 'on' to led
            led.classList.add('on');
            toggle.textContent = "Turn OFF";
            toggle.onclick = function(){
                console.log("OFF");
                sendSignal(light.color,'OFF')}
        }else{
            led.classList.remove('on');
            toggle.textContent = "Turn ON";
            toggle.onclick = function(){
                console.log("ON");
                sendSignal(light.color,'ON');}
        }

        led.appendChild(color);
        led.appendChild(toggle);
        //Append the led class to container
        grid.appendChild(led);
    });
    }catch(err){
        console.error(err);
    }
}
// To send Signal API request to Node
async function sendSignal(clr,cmd){
    const SIGNAL = JSON.stringify({"color":clr,"command":cmd});
    const res = await fetch('https://applied-random-therapy-obligation.trycloudflare.com/signal',{
        method:"POST",
        headers:{"Content-Type":"application/json"},
        body: SIGNAL,
        credentials:"include"
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
        const res = await fetch("https://replacing-alice-childhood-transparency.trycloudflare.com/logout",{
        method:"POST",
        credentials:"include"
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



















