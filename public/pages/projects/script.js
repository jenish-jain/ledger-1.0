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
    let user = fetchUserDetails();
    console.log(user);
    document.getElementById('user').innerText = user.username;  
    user.project.array.forEach(createProjectCard);
}

function createProjectCard(project){
  var cardBody = document.createElement('div');
  cardBody.classList.add('projCard');
  var projName = document.createElement('p');
  projName.innerText = project._id;
  var button = document.createElement('button');
  button.classList.add('cardBtn');
  button.innerText = "open project";
  cardBody.appendChild(projName);
  cardBody.appendChild(button);
}

showUserInfo();