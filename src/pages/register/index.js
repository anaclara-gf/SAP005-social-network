import { SignUp } from "../../services/index.js";

export const Register = () => {
    const rootElement = document.createElement('div');
    rootElement.innerHTML = `
        <div class="flex-container">
            <section class="registerText">
                 <h1>Register: join our community!</h1>
                 </section>
            <form class="flex-container">

                <label class="flex-itens" for="name">Full name:</label>
                <input class="flex-itens" id="name" type="text" placeholder="" required>

                <label class="flex-itens" for="username">Username:</label>
                <input class="flex-itens" id="username" type="text" placeholder="" required>
            
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
    let email = rootElement.querySelector("#email");
    let password = rootElement.querySelector("#password");
    let passwordRules = rootElement.querySelector('#password-rules');
    let confirmPassword = rootElement.querySelector("#confirm-password");
    let passwordError = rootElement.querySelector("#password-error")
    let bio = rootElement.querySelector("#bio");
    let favGenres = rootElement.querySelector("#fav-genres");
    let signUpButton = rootElement.querySelector("#signup-button");

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

    confirmPassword.addEventListener('input', verifyConfirmPassword);
    password.addEventListener('change', verifyPasswordLength);

    signUpButton.addEventListener('click', (e) => {
        e.preventDefault();
        if(verifyConfirmPassword()){
            SignUp(email.value, password.value, name.value, username.value, bio.value, favGenres.value);
        }
    })

    return rootElement;
};
