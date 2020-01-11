const hostURL = "https://nameless-wave-18089.herokuapp.com/";
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


 function loginUser(){
  event.preventDefault();
  let loginEle = document.forms.signInForm.elements;

  let data = JSON.stringify({
    email:loginEle.email.value,
    password:loginEle.password.value,
  });

 
    let res =  fetch(hostURL + "api/user/login",{
      method:"POST",
      headers:{
        "Content-Type":"application/json"
      },
      body:data,
      redirect: 'follow'
    }).then(response => response.text())
    .then(result => console.log(result))
    .catch(error => console.log('error', error));
    let dataJson =  res.json();
    console.log("Success:", JSON.stringify(dataJson));
    window.location.assign("https://nameless-wave-18089.herokuapp.com/pages/projects/index.html");
}

