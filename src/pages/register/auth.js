import { SignUp } from "../../services/index.js";
import { onNavigate } from "../../utils/history.js";

export const Register = () => {
    const rootElement = document.createElement('div');
    rootElement.innerHTML = `
        <div class="flex-container">
            <img class="flex-itens logo-image" src="../images/logo.jpg">
            <form class="flex-container">

                <label class="flex-itens" for="email">E-mail:</label>
                <input class="flex-itens" id="email" type="email" placeholder="E-mail" required>

                <label class="flex-itens" for="password">Password:</label>
                <input class="flex-itens" id="password" type="password" placeholder="Password" required>
                <p class="flex-itens" id="password-rules"></p> 

                <label class="flex-itens" for="confirm-password">Confirm password:</label>
                <input class="flex-itens" id="confirm-password" type="password" placeholder="Password" required>
                <p class="flex-itens" id="password-error"></p>

                <button id="signup-button" class="flex-itens">Sign up</button>
            </form>

            <p class="flex-itens">Already have an account?</p>
            <button id ="signin-button" class="flex-itens">Sign in</button>
        </div>
    `;

    const email = rootElement.querySelector("#email");
    const password = rootElement.querySelector("#password");
    const passwordRules = rootElement.querySelector('#password-rules');
    const confirmPassword = rootElement.querySelector("#confirm-password");
    const passwordError = rootElement.querySelector("#password-error");
    const signUpButton = rootElement.querySelector("#signup-button");
    const signInButton = rootElement.querySelector("#signin-button");

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
    password.addEventListener('input', verifyPasswordLength);

    signUpButton.addEventListener('click', (e) => {
        e.preventDefault();
        if(verifyConfirmPassword()){
            SignUp(email.value, password.value, name.value);
        }
    })

    signInButton.addEventListener('click', () => {
        onNavigate("/login")
    })

    return rootElement;
};