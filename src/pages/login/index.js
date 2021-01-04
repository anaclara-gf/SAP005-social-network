import { onNavigate } from "../../utils/history.js"
import { SignIn } from "../../services/index.js"

export const Login = () => {
  const rootElement = document.createElement('div');
  rootElement.innerHTML = `
      <div class="flex-container">
        <form class="flex-container">

          <label class="flex-itens" for="email">E-mail:</label>
          <input class="flex-itens" id="email" type="email" placeholder="E-mail" required>

          <label class="flex-itens" for="password">Password:</label>
          <input class="flex-itens" id="password" type="password" placeholder="Password" required>
          <p class= "flex-itens" id= "nonUser"></p>

          <button id="signin-button" class="flex-itens">Sign in</button>
          <button id="signingoogle-button" class="flex-itens">Sign in with Google</button>
        </form>

        <p class="flex-itens">Don't have an account yet?</p>
        <button id="signup-button" class="flex-itens">Sign up</button>
      </div>
  `;
  
  const email = rootElement.querySelector("#email");
  const password = rootElement.querySelector("#password");
  const newUser = rootElement.querySelector("#nonUser")
  const signInButton = rootElement.querySelector("#signin-button");
  const signInGoogleButton = rootElement.querySelector("#signingoogle-button");
  const signUpButton = rootElement.querySelector("#signup-button");

  signInButton.addEventListener('click', (e) => {
    e.preventDefault();
    SignIn(email.value, password.value)
    .then(() => {
        onNavigate("/timeline");
        alert("Welcome to 'Should I Watch?'");
    })
    .catch((error) => {
      var errorCode = error.code;
      var errorMessage = error.message;
      alert("Error "+ errorMessage)
      newUser.innerHTML = "Email and password not found."
    })
  });
     


  signInGoogleButton.addEventListener('click', (e) => {
    e.preventDefault();
    onNavigate("/profile");
  })

  signUpButton.addEventListener('click', () => {
    onNavigate("/register");
  })

  return rootElement;
};
