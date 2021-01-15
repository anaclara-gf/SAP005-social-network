/* eslint-disable no-alert */
import { searchUsername, InfoProfile } from '../../services/index.js';
import { onNavigate } from '../../utils/history.js';

export const Profile = () => {
  const rootElement = document.createElement('div');
  rootElement.classList.add('flex-contaner', 'profile-page');
  rootElement.innerHTML = `
        <form class=" profile flex-container">
            <label class="flex-itens" for="name">Full name:</label>
            <input class="flex-itens" id="name" type="text" placeholder="" required>
            
            <label class="flex-itens" for="username">Username:</label>
            <input class="flex-itens" id="username" type="text" placeholder="" required>
            <p class="flex-itens" id="username-error"></p> 
    
            <label class="flex-itens" for="bio">Short description of yourself:</label>
            <input class="flex-itens" id="bio" type="text" placeholder="" maxLength="500" rows="5" cols="33"required>
            
            <label class="flex-itens" for="fav-genres">Favorites movie/series genres:</label>
            <input class="flex-itens" id="fav-genres" type="text" placeholder="" maxLength="200" required>
            
            <button id="saveprofile-button" class="flex-itens">Finish Register</button>
        </form>
    `;

  const name = rootElement.querySelector('#name');
  const username = rootElement.querySelector('#username');
  const usernameError = rootElement.querySelector('#username-error');
  const bio = rootElement.querySelector('#bio');
  const favGenres = rootElement.querySelector('#fav-genres');
  const saveProfileButton = rootElement.querySelector('#saveprofile-button');
  let usernameAvailable = false;

  const verifyUsername = () => {
    if (username.value !== '' && username.value !== undefined) {
      usernameError.innerHTML = '';
      usernameError.classList.add('loader');
      searchUsername(username.value)
        .then((snapshot) => {
          if (!snapshot.empty) {
            usernameError.classList.remove('loader');
            usernameError.style.color = 'red';
            usernameError.innerHTML = 'Username already exists';
            usernameAvailable = false;
          } else {
            usernameError.classList.remove('loader');
            usernameError.style.color = 'green';
            usernameError.innerHTML = 'Username available';
            usernameAvailable = true;
          }
        });
    } else {
      usernameError.innerHTML = '';
    }
  };

  username.addEventListener('change', verifyUsername);

  saveProfileButton.addEventListener('click', (e) => {
    e.preventDefault();
    if (usernameAvailable) {
      e.preventDefault();
      InfoProfile(name.value, username.value, bio.value, favGenres.value)
        .then(() => {
          onNavigate('/timeline');
        })
        .catch((error) => {
          alert(error.message);
        });
    } else {
      alert('Username already in use!');
    }
  });

  return rootElement;
};
