import { signOut } from "../../services/index.js";

export const Home = () => {
  const rootElement = document.createElement('div');
  rootElement.innerHTML = `
      <button id="logout-button"> Log Out</button>
  <div class="flex-container">
    <article class="introText">
      <h1>Welcome to our community!</h1>
      <p>Tired of spend hours looking at streaming service catalogs to find something interesting to watch? We have the
      perfect solution for you! Join our community <strong><i>SHOULD I WATCH?</i></strong> and see what your friends are watching and their
      opinions about series, movies, documentaries and more! You can also write your own reviews and post it for your friends,
      all you need to do is create an account or login.</p>
    </article>
  </div>
  `;

  const logOutButton = rootElement.querySelector("#logout-button");

  logOutButton.addEventListener('click', () => {
    signOut();
  })
  
  return rootElement;
};


