const loginbtn = document.getElementById('loginbtn');
const modal = document.getElementById("signin-modal");

// When the user clicks on the button, open the modal
loginbtn.onclick = function(){
    modal.style.display = "block";
};

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    if (event.target == modal) {
      modal.style.display = "none";
    }
  };


  //script for animation
  
const signUpButton = document.getElementById('signUp');
const signInButton = document.getElementById('signIn');
const container = document.getElementById('container');

signUpButton.addEventListener('click', () => {
    container.classList.add('right-panel-active');
});

signInButton.addEventListener('click', () => {
    container.classList.remove('right-panel-active');
});

let signUpForm = document.getElementById('signUpForm');
signUpForm.addEventListener("submit",signUpUser);

async function signUpUser(){
  event.preventDefault();
  let signUpEle = document.forms.signUpForm.elements;
  console.log(signUpEle.name.value);
  console.log(signUpEle.email.value);
  console.log(signUpEle.password.value);
}

