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
    // document.getElementById('user').innerText = userJson.username;
}

let user = await fetchUserDetails();
console.log(user);