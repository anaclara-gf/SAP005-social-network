import { signOut } from "../../services/index.js";
import {onNavigate} from "../../utils/history.js"

export const Home = () => {
  const rootElement = document.createElement('div');
  rootElement.innerHTML = `
  <div class="flex-container">
    <article class="introText">
      <h1>Welcome to our community!</h1>
      <p>Tired of spend hours looking at streaming service catalogs to find something interesting to watch? We have the
      perfect solution for you! Join our community <strong><i>SHOULD I WATCH?</i></strong> and see what your friends are watching and their
      opinions about series, movies, documentaries and more! You can also write your own reviews and post it for your friends,
      all you need to do is create an account or login.</p>
    </article>
  </div>
  <div class="flex-container">
    <button class="flex-itens" id="signout-button">Sign out</button>
  </div>
  `;

  let signOutButton = rootElement.querySelector('#signout-button');

  signOutButton.addEventListener('click', (e) => {
    e.preventDefault();
    signOut();
    onNavigate("/");
  })
  return rootElement;
};


