// const hostURL = "https://nameless-wave-18089.herokuapp.com/";
const hostURL = "http://localhost:3000/";

async function fetchUserDetails(){
    let user = await fetch(hostURL+ "api/user/dashboard");
    // let userJson = await user.json();
    console.log(user);
}

fetchUserDetails()