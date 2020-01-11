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
    console.log(user);
    document.getElementById('user').innerText = user.username;  
    user.projects.forEach(createProjectCard);
}

function createProjectCard(project){
  let projectPanel = document.getElementById('live-proj');
  var cardBody = document.createElement('div');
  cardBody.classList.add('projCard');
  var projName = document.createElement('p');
  projName.innerText = project._id;
  var button = document.createElement('button');
  button.classList.add('cardBtn');
  button.innerText = "open project";
  cardBody.appendChild(projName);
  cardBody.appendChild(button);
  projectPanel.appendChild(cardBody);
}

showUserInfo();

async function logout(){
  
  fetch( hostURL+"/api/user/logout",{
    method: 'GET',
    redirect: 'follow'
  }).then(response => response.text())
    .then(result => console.log(result))
    .catch(error => console.log('error', error));

    window.location.assign("https://nameless-wave-18089.herokuapp.com/");
}