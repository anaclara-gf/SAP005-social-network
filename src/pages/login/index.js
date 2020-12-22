import {onNavigate} from "../../utils/history.js";
import { signIn } from "../../services/index.js";
import { signInGoogle } from "../../services/index.js";

export const Login = () => {
  const rootElement = document.createElement('div');
  rootElement.innerHTML = `
      <div class="flex-container">
        <form class="flex-container">

          <label class="flex-itens" for="email">E-mail:</label>
          <input class="flex-itens" id="email" type="email" placeholder="E-mail" required>

          <label class="flex-itens" for="password">Password:</label>
          <input class="flex-itens" id="password" type="password" placeholder="Password" required>

          <button id="signin-button" class="flex-itens">Sign in</button>
          <button id="signingoogle-button" class="flex-itens">Sign in with Google</button>
        </form>

        <p class="flex-itens">Don't have an account yet?</p>
        <button id="signup-button" class="flex-itens">Sign up</button>
      </div>
  `;
  
  const email = rootElement.querySelector("#email");
  const password = rootElement.querySelector("#password");
  const signInButton = rootElement.querySelector("#signin-button");
  const signInGoogleButton = rootElement.querySelector("#signingoogle-button");
  const signUpButton = rootElement.querySelector("#signup-button");

  signInButton.addEventListener('click', (e) => {
    e.preventDefault();
    signIn(email.value, password.value);
  })

  signInGoogleButton.addEventListener('click', (e) => {
    e.preventDefault();
    signInGoogle();
  })

  signUpButton.addEventListener('click', () => {
    onNavigate("/register");
  })

  return rootElement;
};
