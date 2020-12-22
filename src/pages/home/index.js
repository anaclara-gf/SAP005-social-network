import { SignOut } from "../../services/index.js";

export const Home = () => {
  const rootElement = document.createElement('div');
  rootElement.innerHTML = `
    <div class="flex-container">
      <button class="flex-itens" id="signout-button">Sign out</button>
    </div>
    `;

  let signOutButton = rootElement.querySelector('#signout-button');

  signOutButton.addEventListener('click', (e) => {
    e.preventDefault();
    SignOut();
  })

  return rootElement;
};
