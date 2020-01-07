// const hostURL = "https://nameless-wave-18089.herokuapp.com/";
const hostURL = "http://localhost:3000/";

async function fetchUserDetails(){
    let res = await fetch(hostURL+ "api/user/dashboard");
    let userJson = await res.json();
    console.log(res);
    console.log(userJson);
}

fetchUserDetails()