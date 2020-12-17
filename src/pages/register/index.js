export const Register = () => {
    const rootElement = document.createElement('div');
    rootElement.innerHTML = `
        <div class="flex-container">
            <img class="flex-itens" src="../images/logo.png">
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

    signUpButton.addEventListener('click', () => {
        firebase.auth().createUserWithEmailAndPassword(email.value, password.value)
            .then(() => {
                alert("Welcome")
            })
            .catch((error) => {
                alert("Ooops, something went wrong!")
                let errorCode = error.code;
                let errorMessage = error.message;
                console.log(errorCode);
                console.log(errorMessage);
            })
    })

    return rootElement;
  };
  