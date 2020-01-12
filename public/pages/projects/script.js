const hostURL = "https://nameless-wave-18089.herokuapp.com/";
// const hostURL = "http://localhost:3000/";

 async function fetchUserDetails(){
    let cookie = document.cookie;
    let res = await fetch(hostURL + "api/user/dashboard",
    {redirect: 'follow',
     headers:{
        "Cookie":cookie
      }});
    let userJson = await res.json();
    console.log(res);
    console.log(userJson);
    return userJson;
  }

 async function showUserInfo(){
   let user = await fetchUserDetails();
    document.getElementById('user').innerText = user.username;  
    user.projects.forEach(createProjectCard);
  }
  
  showUserInfo();

function createProjectCard(project){
  let projectPanel = document.getElementById('live-proj');
  let cardBody = document.createElement('div');
  cardBody.classList.add('projCard');
  let projName = document.createElement('p');
  projName.classList.add('card-title');
  projName.innerText = project.name;
  let projDesc = document.createElement('p');
  projDesc.classList.add('card-description');
  projDesc.innerHTML='<span>Start Date</span> ' + project.startDate + '<br/><span>Status </span>' + project.status ;
  let button = document.createElement('button');
  button.classList.add('cardBtn','tooltip');
  button.innerHTML ='<i class="material-icons">double_arrow</i><span class="tooltiptext">Go to your project</span>' ;
  cardBody.appendChild(projName);
  cardBody.appendChild(projDesc);
  cardBody.appendChild(button);
  projectPanel.appendChild(cardBody);
}


async function logout(){
  
  fetch( hostURL+"/api/user/logout",{
    method: 'GET',
    redirect: 'follow'
  }).then(response => response.text())
    .then(result => console.log(result))
    .catch(error => console.log('error', error));

    window.location.assign("https://nameless-wave-18089.herokuapp.com/");
}

async function createNewProj(){
  let user = await fetchUserDetails();
  let projName = document.getElementById('newProjName').innerText;
  let userId = user._id;
    console.log(userId);
  let body=JSON.stringify({
    userId:userId,
    name:projName,
    startDate:Date.now(),
    status:"Ongoing"
  })

  let res= await fetch(hostURL+"api/user",{
    method: 'PUT',
    headers: {"Content-Type": "application/json"},
    body: body,
    redirect: 'follow'
  })
  .then(response => response.text())
  .then(result => console.log(result))
  .catch(error => console.log('error', error));
}