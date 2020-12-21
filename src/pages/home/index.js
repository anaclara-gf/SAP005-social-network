import {onNavigate} from "../../utils/history.js"

export const Home = () => {
  const rootElement = document.createElement('div');
  rootElement.innerHTML = `
      <button id="logout-button"> Log Out</button>
  `;

  const logOutButton = rootElement.querySelector("#logout-button");

  logOutButton.addEventListener('click', (e) => {
    e.preventDefault();
    onNavigate("/");
  })
  return rootElement;
};


