import { SignUp } from "../../services/index.js";

export const Register = () => {
    const rootElement = document.createElement('div');
    rootElement.innerHTML = `
        <div class="flex-container">
            <img class="flex-itens logo-image" src="../images/logo.jpg">
            <form class="flex-container">

                <label class="flex-itens" for="name">Name:</label>
                <input class="flex-itens" id="name" type="text" placeholder="" required>

                <label class="flex-itens" for="username">Username:</label>
                <input class="flex-itens" id="username" type="text" placeholder="" required>

                <label class="flex-itens" for="email">E-mail:</label>
                <input class="flex-itens" id="email" type="email" placeholder="E-mail" required>

                <label class="flex-itens" for="password">Password:</label>
                <input class="flex-itens" id="password" type="password" placeholder="Password" required>

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
    let signUpButton = rootElement.querySelector("#signup-button");

    signUpButton.addEventListener('click', (e) => {
        e.preventDefault();
        SignUp(email.value, password.value, name.value, username.value);
    })

    return rootElement;
};