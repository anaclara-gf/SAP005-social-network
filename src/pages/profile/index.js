import { onNavigate } from "../../utils/history.js";
import { InfoProfile } from "../../services/index.js";

export const Profile = () => {
    const rootElement = document.createElement('div');
    rootElement.innerHTML = `
        <div class="flex-container">
            <img class="flex-itens logo-image" src="../images/logo.jpg">
            <form class="flex-container">

            <label class="flex-itens" for="name">Full name:</label>
            <input class="flex-itens" id="name" type="text" placeholder="" required>

            <label class="flex-itens" for="username">Username:</label>
            <input class="flex-itens" id="username" type="text" placeholder="" required>
            
            <label class="flex-itens" for="bio">Short description of yourself:</label>
            <input class="flex-itens" id="bio" type="text" placeholder="" maxLength="500" rows="5" cols="33"required>

            <label class="flex-itens" for="fav-genres">Favorites movie/series genres:</label>
            <input class="flex-itens" id="fav-genres" type="text" placeholder="" maxLength="200" required>

            <button id="saveprofile-button" class="flex-itens">Finish Register</button>
        </form>
    </div>
    `;

    const name = rootElement.querySelector("#name");
    const username = rootElement.querySelector("#username");
    const bio = rootElement.querySelector("#bio");
    const favGenres = rootElement.querySelector("#fav-genres");
    const saveProfileButton = rootElement.querySelector("#saveprofile-button");

    saveProfileButton.addEventListener('click', (e) => {
        e.preventDefault();
        InfoProfile(name.value, username.value, bio.value, favGenres.value)
        onNavigate("/home")
    })

    return rootElement;
};