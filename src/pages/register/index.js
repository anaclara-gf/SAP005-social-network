import { SignUp, searchUsername } from "../../services/index.js";

export const Register = () => {
    const rootElement = document.createElement('div');
    rootElement.innerHTML = `
        <div class="flex-container">
            <img class="flex-itens logo-image" src="../images/logo.jpg">
            <form class="flex-container">

                <label class="flex-itens" for="name">Full name:</label>
                <input class="flex-itens" id="name" type="text" placeholder="" required>

                <label class="flex-itens" for="username">Username:</label>
                <input class="flex-itens" id="username" type="text" placeholder="" required>
                <p class="flex-itens" id="username-error"></p> 

                <label class="flex-itens" for="email">E-mail:</label>
                <input class="flex-itens" id="email" type="email" placeholder="E-mail" required>

                <label class="flex-itens" for="password">Password:</label>
                <input class="flex-itens" id="password" type="password" placeholder="Password" required>
                <p class="flex-itens" id="password-rules"></p> 

                <label class="flex-itens" for="confirm-password">Confirm password:</label>
                <input class="flex-itens" id="confirm-password" type="password" placeholder="Password" required>
                <p class="flex-itens" id="password-error"></p>

                <label class="flex-itens" for="bio">Short description of yourself:</label>
                <input class="flex-itens" id="bio" type="text" placeholder="" maxLength="500" required>

                <label class="flex-itens" for="fav-genres">Favorites movie/series genres:</label>
                <input class="flex-itens" id="fav-genres" type="text" placeholder="" maxLength="200" required>

                <button class="flex-itens" id="signup-button">Sign up</button>
                <button class="flex-itens">Sign up with Google</button>
            </form>

            <p class="flex-itens">Already have an account?</p>
            <button class="flex-itens">Sign in</button>
        </div>
    `;

    let name = rootElement.querySelector("#name");
    let username = rootElement.querySelector("#username");
    let usernameError = rootElement.querySelector('#username-error');
    let email = rootElement.querySelector("#email");
    let password = rootElement.querySelector("#password");
    let passwordRules = rootElement.querySelector('#password-rules');
    let confirmPassword = rootElement.querySelector("#confirm-password");
    let passwordError = rootElement.querySelector("#password-error")
    let bio = rootElement.querySelector("#bio");
    let favGenres = rootElement.querySelector("#fav-genres");
    let signUpButton = rootElement.querySelector("#signup-button");

    let usernameAvailable = false;

    const verifyPasswordLength = () => {
        if(password.value.length < 6){
            passwordRules.style.color = 'red';
            passwordRules.innerHTML = 'Your password must have at least 6 characters!';
        }else{
            passwordRules.innerHTML = '';
        }
    }

    const verifyConfirmPassword = () => {
        if(password.value !== confirmPassword.value){
            passwordError.style.color = 'red';
            passwordError.innerHTML = 'Passwords do not match!';
            return false
        }
        else{
            passwordError.innerHTML = '';
            return true
        }
    }
 
    const verifyUsername = () => {
        if(username.value !== "" && username.value !== undefined){
            usernameError.innerHTML = '';
            usernameError.classList.add('loader');
            searchUsername(username.value)
                .then((snapshot) => {
                    if(!snapshot.empty){
                        usernameError.classList.remove('loader');
                        usernameError.style.color = 'red';
                        usernameError.innerHTML = 'Username already exists';
                        usernameAvailable = false;
                    }else{
                        usernameError.classList.remove('loader');
                        usernameError.style.color = 'green';
                        usernameError.innerHTML = 'Username available';
                        usernameAvailable = true;
                    }
                })
        }else{
            usernameError.innerHTML = '';
        }
    }

    confirmPassword.addEventListener('input', verifyConfirmPassword);
    password.addEventListener('change', verifyPasswordLength);
    username.addEventListener('change', verifyUsername);


    signUpButton.addEventListener('click', (e) => {
        e.preventDefault();
        if(verifyConfirmPassword() && usernameAvailable){
            SignUp(email.value, password.value, name.value, username.value, bio.value, favGenres.value);
        }else{
            console.log("Ooops, something went wrong!")
        }
    })

    return rootElement;
};