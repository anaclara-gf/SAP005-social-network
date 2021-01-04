import { onNavigate } from "../../utils/history.js";
<<<<<<< HEAD
import { signIn } from "../../services/index.js";
import { signInGoogle } from "../../services/index.js";
=======
>>>>>>> master

export const Login = () => {
  const rootElement = document.createElement('div');
  rootElement.innerHTML = `
      <div class="flex-container">

        <article class="introText">
          <h1>Welcome to our community!</h1>
          <p>Tired of spend hours looking at streaming service catalogs to find something interesting to watch? We have the perfect solution for you! Join our community <strong><i>SHOULD I WATCH?</i></strong> and see what your friends are watching and their opinions about series, movies, documentaries and more! You can also write your own reviews and post it for your friends, all you need to do is create an account or login.</p>
        </article>

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
    signIn(email.value, password.value)
    .then(() => {
      onNavigate("/timeline");
    })
    .catch((error) => {
      alert(error.message)
    })
  })

  signInGoogleButton.addEventListener('click', (e) => {
    e.preventDefault();
    signInGoogle()
    .then(() => {
      if(sads){
        onNavigate("/profile");
      }else{
        onNavigate("/home");
      }
    })
    .catch((error) => {
      alert(error.message)
    })
  })

  signUpButton.addEventListener('click', () => {
    onNavigate("/register");
  })

  return rootElement;
};

