const config = require('../config/config');
const hostURL = config.host_url;

// const hostURL = "http://localhost:3000/";
const loginbtn = document.getElementById("loginbtn");
const modal = document.getElementById("signin-modal");

// When the user clicks on the button, open the modal
loginbtn.onclick = function() {
  modal.style.display = "block";
};

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
};

//script for animation

const signUpButton = document.getElementById("signUp");
const signInButton = document.getElementById("signIn");
const container = document.getElementById("container");

signUpButton.addEventListener("click", () => {
  container.classList.add("right-panel-active");
});

signInButton.addEventListener("click", () => {
  container.classList.remove("right-panel-active");
});

let signUpForm = document.getElementById("signUpForm");
signUpForm.addEventListener("submit", signUpUser);

async function signUpUser() {
  event.preventDefault();
  let signUpEle = document.forms.signUpForm.elements;
  // console.log(signUpEle.name.value);
  // console.log(signUpEle.email.value);
  // console.log(signUpEle.password.value);
  let data = JSON.stringify({
    username: signUpEle.name.value,
    email: signUpEle.email.value,
    password: signUpEle.password.value
  });
  try {
    let res = await fetch(hostURL + "api/user/register", {
      method: "POST",
      body: data,
      headers: {
        "Content-Type": "application/json"
      }
    });
    let dataJson = await res.json();
    console.log("Success:", JSON.stringify(dataJson));
    console.log("Successful Signup");    
    document.forms.signUpForm.reset();
    // document.getElementById("signUpFormMsg").innerText = "please login in with your credentials";
    alert("login with your newely created credentials");
    document.getElementById("signIn").click();
  } catch (error) {
    console.log("error", error);
  }
}


async function loginUser(){
  event.preventDefault();
  let loginEle = document.forms.signInForm.elements;
  let userEmail = loginEle.email.value;
  let userPass = loginEle.password.value;
  console.log(userEmail);
  if(userEmail=="" && userPass== ""){
    document.getElementById("signInFormMsg").innerText ="email and password field cannot be empty";
  }else if(userEmail == ""){
    document.getElementById("signInFormMsg").innerText ="email field cannot be empty";
  }else if(userPass == ""){
    document.getElementById("signInFormMsg").innerText="password field cannot be empty";
  }else{
    
    let data = JSON.stringify({
      email:userEmail,
      password:userPass,
    });
    
      let res = await fetch(hostURL + "api/user/login",{
        method:"POST",
        body:data,
        headers:{
          "Content-Type":"application/json"
        },
        redirect: 'follow'
      });
      if(res.status == "404"){
        // document.getElementById('signInFormMsg').innerText = "please register first";
        alert("no user exist with this name , please register first");
        document.getElementById('signUp').click();
      }else if(res.status == "200"){
        window.location.assign(hostURL+"/pages/projects/index.html");
      }else{
        alert(res.text());
      }
      document.forms.signInForm.reset();
  }
}

