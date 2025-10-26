// First we get the admin info from Node

async function getAdmin(){
    try{
        const res = await fetch("http://localhost:3500/user",{
        method:"GET",
        headers:{"Content-Type":"application/json"},
        credentials:"include"
    });
    const user = await res.json();
    // Double-check if logged-in user is Admin
    const username=document.getElementById("username");
    const userRole=document.getElementById("user-role");
    if(user.role !== "admin"){
        alert("Access Denied!");
        window.location.href="./login.html";
    }
    username.textContent=`Username: ${user.username}`;
    userRole.textContent="Role: Admin";
    }catch(err){
        console.error(err);
    }
}

// Second,Render all the exisiting users with their roles in the table

async function renderUsers(){
    const res = await fetch("http://localhost:3500/users",{
        method:"GET",
        headers:{"Content-Type":"application/json"},
        credentials:"include"
    });
    const users = await res.json();
    // Consider the table as the container of all the users
    const table=document.getElementById("userTableBody");
    // Add each user as a <tr> element and append it to the table using DOM
    table.innerHTML='';  // Doesnt re-render the users
    users.forEach(user => {
        const row = document.createElement('tr');
        row.innerHTML=`
        <td>${user.username}</td>
        <td>${user.role=='admin'?"Admin":"User"}</td>
        <td>${user.control ? "Allowed":"Denied"}</td>
        <td>
            <button class="action-btn" onclick="toggleControl('${user.username}')">${user.control ? "Revoke" : "Allow"}</button>
            <button class="action-btn" onclick="removeUser('${user.username}')">Rem<button>
        </td>        
        `;
        if(user.username!=='Shayan')  // Main admin
            table.appendChild(row);
    });
}

// To allow admin to add a new user
const userform = document.getElementById('userForm');
userform.addEventListener("submit",async(e)=>{
    e.preventDefault()
    const user = document.getElementById('user').value;
    const password = document.getElementById('password').value;
    const role = document.getElementById('roleSelect').value;
    console.log(role);
    const control = document.getElementById('controlPermission').checked;
    const data = JSON.stringify({"username":user,"password":password,"role":role,"control":control});
    const res = await fetch('http://localhost:3500/user',{
        method:"POST",
        headers:{"Content-Type":"application/json"},
        body: data,
        credentials:"include"
    });
    if(res.ok)
        renderUsers();
});
// To toggle user permission to control lights
async function toggleControl(username){
    const user = JSON.stringify({"username":username});
    const res = await fetch("http://localhost:3500/user",{
        method:"PUT",
        headers:{"Content-Type":"application/json"},
        body: user,
        credentials:"include"
    });
    if(res.ok)
        renderUsers();
}

// To remove an existing user
async function removeUser(username){
    const user = JSON.stringify({"username":username});
    const res = await fetch("http://localhost:3500/user",{
        method:"DELETE",
        headers:{"Content-Type":"application/json"},
        body: user,
        credentials:"include"
    });
    if(res.ok)
        renderUsers();
}

// Display the Logs of Lights
async function renderLogs(){
    const res = await fetch('http://localhost:3500/light',{
        method:"GET",
        headers:{"Content-Type":"application/json"},
        credentials:"include"
    });
    const logTable = document.getElementById('logsTableBody');
    const lightTable = document.getElementById('lightTableBody');
    logTable.innerHTML='';
    lightTable.innerHTML='';
    const lights = await res.json();
    lights.forEach(light => {
        if(light.user){
            const username=light.user.username;
            const action = light.status;
            const color = light.color;
            const utcDate = new Date(light.time);
            time = utcDate.toLocaleTimeString('en-IN',{timeZone:"Asia/Kolkata"});
            const logRow = document.createElement('tr');
            logRow.innerHTML=`
                <td>${username}</td>
                <td>${action}</td>
                <td>${color}</td>
                <td>${time}</td>
            `;
            logTable.appendChild(logRow);
        }
        const lightRow = document.createElement('tr');
        lightRow.innerHTML=`
        <td>${light.color}</td>
        <td>${light.status}</td>
        <td>Connected</td>
        <td><button class='action-btn' onclick="disconnectLight('${light.color}')">Disconnect</button></td>
        `;
        // Append the row to Light Table
        lightTable.appendChild(lightRow);
    });
}

// To add or remove new lights
const lightForm = document.getElementById('lightForm');
lightForm.addEventListener('submit',async(e) => {
    e.preventDefault()
    const color = JSON.stringify({"color":document.getElementById('color').value});
    const res = await fetch('http://localhost:3500/light',{
        method:"POST",
        headers:{"Content-Type":"application/json"},
        body: color,
        credentials:"include"
    });
    if(res.ok)
        renderLogs();
});

// To disconnect a light
async function disconnectLight(color){
    const res = await fetch('http://localhost:3500/light',{
        method:"DELETE",
        headers:{"Content-Type":"application/json"},
        body: JSON.stringify({"color":color}),
        credentials:"include"
    });
    if(res.ok)
        renderLogs();
}
const backBtn = document.getElementById("backBtn");
backBtn.addEventListener('click',async(e)=>{
    window.location.href='./index.html';
})
getAdmin();
renderUsers();
renderLogs();